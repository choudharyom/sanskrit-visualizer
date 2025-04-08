export const createRAFLoop = (callback: () => void) => {
  let frameId: number;
  let isRunning = false;

  const loop = () => {
    if (!isRunning) return;
    frameId = requestAnimationFrame(loop);
    callback();
  };

  return {
    start: () => {
      if (isRunning) return;
      isRunning = true;
      loop();
    },
    stop: () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
    }
  };
};

export const setupWebGLContext = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext('webgl2');
  if (!gl) throw new Error('WebGL2 not supported');
  return gl;
};
