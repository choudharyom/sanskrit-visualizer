export class AudioService {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
  }

  async convertToAudioBuffer(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
    try {
      return await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Audio Processing Error:', error);
      throw new Error('Failed to process audio');
    }
  }

  async convertFormat(audioBuffer: AudioBuffer, format: 'mp3' | 'wav'): Promise<Blob> {
    const offlineContext = new OfflineAudioContext({
      numberOfChannels: audioBuffer.numberOfChannels,
      length: audioBuffer.length,
      sampleRate: audioBuffer.sampleRate,
    });

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const renderedBuffer = await offlineContext.startRendering();
    const mimeType = format === 'mp3' ? 'audio/mpeg' : 'audio/wav';
    
    return new Blob([renderedBuffer], { type: mimeType });
  }

  async analyzeAudio(audioBuffer: AudioBuffer) {
    return {
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
      analysis: {
        rms: this.calculateRMS(audioBuffer),
        peakAmplitude: this.calculatePeakAmplitude(audioBuffer),
        frequency: await this.analyzeFrequency(audioBuffer),
      }
    };
  }

  private calculateRMS(audioBuffer: AudioBuffer): number {
    const data = audioBuffer.getChannelData(0);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i] * data[i];
    }
    return Math.sqrt(sum / data.length);
  }

  private calculatePeakAmplitude(audioBuffer: AudioBuffer): number {
    const data = audioBuffer.getChannelData(0);
    let peak = 0;
    for (let i = 0; i < data.length; i++) {
      const abs = Math.abs(data[i]);
      if (abs > peak) peak = abs;
    }
    return peak;
  }

  private async analyzeFrequency(audioBuffer: AudioBuffer): Promise<Float32Array> {
    const analyser = this.audioContext.createAnalyser();
    analyser.fftSize = 2048;
    
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    
    const frequencyData = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(frequencyData);
    
    return frequencyData;
  }
}
