import React, { useEffect, useRef } from 'react';

interface FrequencySpectrumProps {
  frequencyData?: Uint8Array;
  smoothing?: number;
}

export const FrequencySpectrum: React.FC<FrequencySpectrumProps> = ({
  frequencyData,
  smoothing = 0.8
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevDataRef = useRef<Uint8Array>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frequencyData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply smoothing
    const smoothedData = new Uint8Array(frequencyData.length);
    for (let i = 0; i < frequencyData.length; i++) {
      const prev = prevDataRef.current?.[i] || 0;
      smoothedData[i] = prev * smoothing + frequencyData[i] * (1 - smoothing);
    }
    prevDataRef.current = smoothedData;

    // Draw frequency bars
    const barWidth = canvas.width / smoothedData.length;
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#7C3AED');

    ctx.fillStyle = gradient;
    smoothedData.forEach((value, i) => {
      const height = (value / 255) * canvas.height;
      ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
    });
  }, [frequencyData, smoothing]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-gray-900 rounded"
      width={512}
      height={256}
    />
  );
};
