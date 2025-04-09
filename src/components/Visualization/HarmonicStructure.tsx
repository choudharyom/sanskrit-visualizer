import React, { useRef, useEffect } from 'react';

interface HarmonicStructureProps {
  analyser: AnalyserNode;
  width: number;
  height: number;
}

const HarmonicStructure: React.FC<HarmonicStructureProps> = ({ analyser, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const GOLDEN_RATIO = 1.61803398875;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = Math.min(width, height) / 4;

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#fbbf24'; // Golden color

      for (let i = 0; i < bufferLength; i += 10) {
        const angle = (i / bufferLength) * 2 * Math.PI * GOLDEN_RATIO;
        const value = (dataArray[i] / 255) * baseRadius;
        const radius = baseRadius * (1 + Math.log(i + 1) / Math.log(bufferLength));
        
        const x = centerX + Math.cos(angle) * (radius + value);
        const y = centerY + Math.sin(angle) * (radius + value);

        ctx.beginPath();
        ctx.arc(x, y, 2 + value / 50, 0, 2 * Math.PI);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [analyser, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HarmonicStructure;