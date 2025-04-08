import React, { useRef, useEffect } from 'react';

const GRID_SIZE = 8;
const DOT_RADIUS = 4;

export const RhythmPattern: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGrid = () => {
      const cellWidth = canvas.width / GRID_SIZE;
      const cellHeight = canvas.height / GRID_SIZE;

      ctx.strokeStyle = '#374151'; // gray-700
      ctx.lineWidth = 1;

      // Draw grid lines
      for (let i = 1; i < GRID_SIZE; i++) {
        const x = i * cellWidth;
        const y = i * cellHeight;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawDot = (x: number, y: number, intensity: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, DOT_RADIUS * 2);
      gradient.addColorStop(0, `rgba(124, 58, 237, ${intensity})`); // Purple
      gradient.addColorStop(1, `rgba(124, 58, 237, 0)`);

      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Initial render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    // Demo pattern - replace with actual rhythm data
    const cellWidth = canvas.width / GRID_SIZE;
    const cellHeight = canvas.height / GRID_SIZE;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if ((i + j) % 3 === 0) {
          drawDot(
            i * cellWidth + cellWidth / 2,
            j * cellHeight + cellHeight / 2,
            0.8
          );
        }
      }
    }

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-gray-100 font-medium mb-2">Rhythm Pattern</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-64 bg-gray-900 rounded"
        width={512}
        height={512}
      />
    </div>
  );
};
