const ctx: Worker = self as any;

ctx.addEventListener('message', (e: MessageEvent) => {
  const { audioData, fftSize } = e.data;
  
  // Process FFT in chunks
  const chunkSize = 1024;
  const chunks = [];
  
  for (let i = 0; i < audioData.length; i += chunkSize) {
    const chunk = audioData.slice(i, i + chunkSize);
    const fftResult = performFFT(chunk, fftSize);
    chunks.push(fftResult);
  }
  
  ctx.postMessage({ chunks });
});
