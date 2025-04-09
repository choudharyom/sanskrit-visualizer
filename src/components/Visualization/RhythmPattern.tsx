import React, { useRef, useEffect } from 'react';

interface RhythmPatternProps {
  analyser: AnalyserNode;
  width: number;
  height: number;
}

const RhythmPattern: React.FC<RhythmPatternProps> = ({ analyser, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const gridSize = 20;
    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);

      let energy = 0;
      for (let i = 0; i < bufferLength; i++) {
        energy += dataArray[i];
      }
      energy /= bufferLength;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const value = dataArray[(i * j) % bufferLength] / 255;
          const size = value * gridSize * 0.5;
          
          // Accent highlight for strong beats
          ctx.fillStyle = energy > 100 ? '#ef4444' : '#60a5fa';
          ctx.beginPath();
          ctx.arc(
            i * gridSize + gridSize / 2,
            j * gridSize + gridSize / 2,
            size,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [analyser, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default RhythmPattern;