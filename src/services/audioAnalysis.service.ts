export class AudioAnalysisService {
  private audioContext: AudioContext;
  private analyserNode: AnalyserNode;
  private sourceNode: AudioBufferSourceNode | null = null;

  constructor() {
    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;
  }

  connectSource(audioBuffer: AudioBuffer) {
    this.sourceNode?.disconnect();
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = audioBuffer;
    this.sourceNode.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
  }

  getFrequencyData(): Uint8Array {
    const dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(dataArray);
    return dataArray;
  }

  getWaveformData(): Uint8Array {
    const dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  analyzeHarmonics() {
    const floatData = new Float32Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getFloatFrequencyData(floatData);
    return detectOvertones(floatData);
  }

  analyzeRhythmPattern() {
    const timeData = new Float32Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getFloatTimeDomainData(timeData);
    return analyzeRhythm(timeData, this.audioContext.sampleRate);
  }
}
