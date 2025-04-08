import { useRef, useEffect } from 'react';
import { useResponsive } from './useResponsive';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Optimize canvas resolution based on device
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const scaleFactor = isMobile ? 0.75 : 1;

    canvas.width = rect.width * dpr * scaleFactor;
    canvas.height = rect.height * dpr * scaleFactor;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr * scaleFactor, dpr * scaleFactor);
    }
  }, [isMobile]);

  return canvasRef;
};
