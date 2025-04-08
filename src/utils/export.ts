export const exportCanvasAsPNG = async (canvas: HTMLCanvasElement, filename: string) => {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

export const generateVisualizationVideo = async (
  canvases: HTMLCanvasElement[],
  audioBuffer: AudioBuffer,
  filename: string
) => {
  const stream = new MediaStream([
    ...canvases.map(canvas => canvas.captureStream().getVideoTracks()[0]),
    new AudioContext().createMediaStreamDestination().stream.getAudioTracks()[0]
  ]);

  const recorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9'
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  recorder.start();
  // Stop recording after audio duration
  setTimeout(() => recorder.stop(), audioBuffer.duration * 1000);
};
