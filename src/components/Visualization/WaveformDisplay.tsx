import React, { useRef, useEffect } from 'react';

interface WaveformDisplayProps {
  analyser: AnalyserNode;
  width: number;
  height: number;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ analyser, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // WebGL setup
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    const animate = () => {
      analyser.getByteTimeDomainData(dataArray);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Gradient setup
      const gradient = gl.createShader(gl.FRAGMENT_SHADER);
      if (gradient) {
        gl.shaderSource(gradient, `
          precision mediump float;
          varying vec2 vPosition;
          void main() {
            vec3 purple = vec3(0.58, 0.2, 0.93);
            gl_FragColor = vec4(purple * (1.0 - vPosition.y), 1.0);
          }
        `);
      }

      const centerY = height / 2;
      const vertices: number[] = [];
      for (let i = 0; i < bufferLength; i++) {
        const x = (i / bufferLength) * width;
        const y = (dataArray[i] / 128.0 - 1) * centerY;
        vertices.push(x / width * 2 - 1, y / height * 2);
      }

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STREAM_DRAW);
      
      gl.drawArrays(gl.LINE_STRIP, 0, bufferLength);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      gl.deleteBuffer(gl.createBuffer());
    };
  }, [analyser, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default WaveformDisplay;