import React, { useEffect, useRef } from 'react';
import { createShader, createGradientTexture } from '../../utils/webgl';

export const WaveformDisplay: React.FC<{ audioData?: Float32Array }> = ({ audioData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;
    glRef.current = gl;

    // WebGL setup
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);

    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec4 color;
      void main() {
        gl_FragColor = color;
      }
    `);

    // Create program and setup attributes
    const program = gl.createProgram();
    if (!program) throw new Error('Failed to create program');

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('Failed to link program: ' + gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);

    // Setup buffers and attributes
    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);

    // Setup uniform locations
    const colorLocation = gl.getUniformLocation(program, 'color');
    gl.uniform4f(colorLocation, 0.486, 0.227, 0.929, 1.0); // Purple color

    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  // Update animation frame
  useEffect(() => {
    if (!audioData || !glRef.current) return;
    
    const gl = glRef.current;
    const vertices = new Float32Array(audioData.length * 2);
    
    // Convert audio data to vertices
    for (let i = 0; i < audioData.length; i++) {
      const x = (i / audioData.length) * 2 - 1;
      const y = audioData[i];
      vertices[i * 2] = x;
      vertices[i * 2 + 1] = y;
    }

    // Update vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Draw waveform
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP, 0, audioData.length);
    
  }, [audioData]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-gray-900 rounded"
      width={512}
      height={256}
    />
  );
};
