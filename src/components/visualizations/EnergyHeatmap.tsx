import React, { useEffect, useRef } from 'react';

interface EnergyHeatmapProps {
  overtones: number[];
  energy: Float32Array;
}

export const EnergyHeatmap: React.FC<EnergyHeatmapProps> = ({ overtones, energy }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !overtones.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.8;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circular heatmap
    overtones.forEach((freq, i) => {
      const radius = maxRadius * ((i + 1) / overtones.length);
      const intensity = energy[Math.floor(freq)] / 255;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(124, 58, 237, ${intensity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [overtones, energy]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-gray-900 rounded"
      width={512}
      height={512}
    />
  );
};
