export const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
};

export const createGradientTexture = (gl: WebGL2RenderingContext, colors: string[]) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  const pixels = new Uint8Array(colors.flatMap(color => {
    const matches = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    return matches ? [
      parseInt(matches[1], 16),
      parseInt(matches[2], 16),
      parseInt(matches[3], 16),
      255
    ] : [0, 0, 0, 255];
  }));
  
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    colors.length,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels
  );
  
  return texture;
};
