import React, { useRef, useEffect } from 'react';

const GOLDEN_RATIO = 1.618033988749895;

export const HarmonicStructure: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawHarmonicCircle = (ctx: CanvasRenderingContext2D) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;

      // Create gradient for circle
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#4F46E5'); // Indigo
      gradient.addColorStop(1, '#7C3AED'); // Purple

      // Draw main circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw golden ratio spirals
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / GOLDEN_RATIO;
        const spiralRadius = radius * (1 - i / 10);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, spiralRadius, angle, angle + 0.1);
        ctx.strokeStyle = `rgba(246, 173, 85, ${1 - i / 8})`; // Gold with fading opacity
        ctx.stroke();
      }
    };

    // Initial render
    drawHarmonicCircle(ctx);

    // Cleanup
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-gray-100 font-medium mb-2">Harmonic Structure</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-64 bg-gray-900 rounded"
        width={512}
        height={512}
      />
    </div>
  );
};
