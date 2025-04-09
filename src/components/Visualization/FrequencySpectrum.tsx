import React, { useRef, useEffect } from 'react';

interface FrequencySpectrumProps {
  analyser: AnalyserNode;
  width: number;
  height: number;
}

const FrequencySpectrum: React.FC<FrequencySpectrumProps> = ({ analyser, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = (width / bufferLength) * 2.5;

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#3b82f6'); // Blue
      gradient.addColorStop(1, '#9333ea'); // Purple
      ctx.fillStyle = gradient;

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [analyser, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default FrequencySpectrum;