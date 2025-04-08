export class AudioPlayer {
  private audioContext: AudioContext;
  private source: AudioBufferSourceNode | null = null;
  private startTime: number = 0;
  private pausedAt: number = 0;
  private isPlaying: boolean = false;

  constructor() {
    this.audioContext = new AudioContext();
  }

  async loadAudio(buffer: AudioBuffer) {
    this.stop();
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = buffer;
    this.source.connect(this.audioContext.destination);
  }

  play() {
    if (!this.source || this.isPlaying) return;
    
    this.source.start(0, this.pausedAt);
    this.startTime = this.audioContext.currentTime - this.pausedAt;
    this.isPlaying = true;
  }

  pause() {
    if (!this.isPlaying) return;
    
    this.pausedAt = this.audioContext.currentTime - this.startTime;
    this.stop();
  }

  stop() {
    this.source?.stop();
    this.source = null;
    this.isPlaying = false;
    this.pausedAt = 0;
  }

  getCurrentTime(): number {
    if (!this.isPlaying) return this.pausedAt;
    return this.audioContext.currentTime - this.startTime;
  }
}
