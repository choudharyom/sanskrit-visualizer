import React, { useEffect, useRef } from 'react';
import { createGradientTexture } from '../../utils/webgl';

export const Spectrogram: React.FC<{ frequencyData?: Uint8Array }> = ({ frequencyData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<Uint8Array[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frequencyData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update spectrogram history
    historyRef.current.push(new Uint8Array(frequencyData));
    if (historyRef.current.length > canvas.width) {
      historyRef.current.shift();
    }

    // Draw spectrogram
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    historyRef.current.forEach((data, x) => {
      data.forEach((value, y) => {
        const intensity = value / 255;
        ctx.fillStyle = `rgba(124, 58, 237, ${intensity})`;
        ctx.fillRect(x, canvas.height - y, 1, 1);
      });
    });
  }, [frequencyData]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-gray-900 rounded"
      width={512}
      height={256}
    />
  );
};
