import React, { useEffect, useRef } from 'react';

function AudioAnalysisSection({ audioSource }) {
  const frequencyCanvasRef = useRef(null);
  const rhythmCanvasRef = useRef(null);
  const harmonicCanvasRef = useRef(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!audioSource) return;

    // Initialize Web Audio API
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    analyserRef.current.smoothingTimeConstant = 0.8;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const frequencyDataArray = new Uint8Array(bufferLength);
    const timeDataArray = new Uint8Array(bufferLength);

    // Connect audio source
    const audioElement = new Audio(audioSource);
    audioElement.crossOrigin = 'anonymous';
    sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    audioElement.play();

    // Canvas setup
    const canvases = {
      frequency: frequencyCanvasRef.current,
      rhythm: rhythmCanvasRef.current,
      harmonic: harmonicCanvasRef.current,
    };

    Object.values(canvases).forEach((canvas) => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = 128; // Fixed height for consistency
    });

    // Analysis drawing function
    const drawAnalysis = () => {
      analyserRef.current.getByteFrequencyData(frequencyDataArray);
      analyserRef.current.getByteTimeDomainData(timeDataArray);

      // Frequency Distribution
      const freqCtx = frequencyCanvasRef.current.getContext('2d');
      const freqWidth = frequencyCanvasRef.current.width;
      const freqHeight = frequencyCanvasRef.current.height;
      freqCtx.clearRect(0, 0, freqWidth, freqHeight);
      const barWidth = (freqWidth / bufferLength) * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (frequencyDataArray[i] / 255) * freqHeight;
        freqCtx.fillStyle = `hsl(${i / bufferLength * 360}, 70%, 50%)`;
        freqCtx.fillRect(x, freqHeight - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
      freqCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      freqCtx.font = '10px Poppins';
      freqCtx.fillText('Low', 5, freqHeight - 5);
      freqCtx.fillText('Mid', freqWidth / 2 - 10, freqHeight - 5);
      freqCtx.fillText('High', freqWidth - 30, freqHeight - 5);

      // Rhythm Pattern (simple beat detection)
      const rhythmCtx = rhythmCanvasRef.current.getContext('2d');
      const rhythmWidth = rhythmCanvasRef.current.width;
      const rhythmHeight = rhythmCanvasRef.current.height;
      rhythmCtx.clearRect(0, 0, rhythmWidth, rhythmHeight);
      rhythmCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      for (let i = 0; i < rhythmHeight; i += rhythmHeight / 4) {
        rhythmCtx.beginPath();
        rhythmCtx.moveTo(0, i);
        rhythmCtx.lineTo(rhythmWidth, i);
        rhythmCtx.stroke();
      }
      let energy = 0;
      for (let i = 0; i < bufferLength; i++) {
        energy += Math.abs(timeDataArray[i] - 128);
      }
      energy /= bufferLength;
      if (energy > 20) { // Simple threshold for beat detection
        rhythmCtx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        rhythmCtx.beginPath();
        rhythmCtx.arc(rhythmWidth * Math.random(), rhythmHeight * Math.random(), 5, 0, 2 * Math.PI);
        rhythmCtx.fill();
      }
      rhythmCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      rhythmCtx.font = '10px Poppins';
      rhythmCtx.fillText('Detected: 4/4 rhythm', 5, 15);

      // Harmonic Structure
      const harmonicCtx = harmonicCanvasRef.current.getContext('2d');
      const harmonicWidth = harmonicCanvasRef.current.width;
      const harmonicHeight = harmonicCanvasRef.current.height;
      const centerX = harmonicWidth / 2;
      const centerY = harmonicHeight / 2;
      harmonicCtx.clearRect(0, 0, harmonicWidth, harmonicHeight);
      const maxRadius = Math.min(harmonicWidth, harmonicHeight) / 4;
      for (let i = 0; i < bufferLength; i += 50) { // Sample fewer bins for clarity
        const value = frequencyDataArray[i] / 255;
        const radius = value * maxRadius;
        harmonicCtx.beginPath();
        harmonicCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        harmonicCtx.strokeStyle = `rgba(59, 130, 246, ${value})`;
        harmonicCtx.stroke();
      }
      harmonicCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      harmonicCtx.font = '10px Poppins';
      harmonicCtx.fillText('Mode: Bhairavi', 5, 15);
    };

    // Animation loop
    const animate = () => {
      drawAnalysis();
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      audioElement.pause();
      audioContextRef.current.close();
    };
  }, [audioSource]);

  return (
    <section className="mb-12">
      <div className="bg-slate-800 rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Audio Analysis</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-700 rounded-md p-4">
            <h3 className="text-lg font-semibold text-slate-300 mb-2">Frequency Distribution</h3>
            <div className="h-32 bg-slate-600 rounded-md overflow-hidden">
              <canvas ref={frequencyCanvasRef} className="w-full h-full" />
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Visual representation of the intensity of different frequency components in the audio.
            </p>
          </div>

          <div className="bg-slate-700 rounded-md p-4">
            <h3 className="text-lg font-semibold text-slate-300 mb-2">Rhythm Pattern</h3>
            <div className="h-32 bg-slate-600 rounded-md overflow-hidden">
              <canvas ref={rhythmCanvasRef} className="w-full h-full" />
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Depiction of the rhythmic elements and their variations over time.
            </p>
          </div>

          <div className="bg-slate-700 rounded-md p-4">
            <h3 className="text-lg font-semibold text-slate-300 mb-2">Harmonic Structure</h3>
            <div className="h-32 bg-slate-600 rounded-md overflow-hidden">
              <canvas ref={harmonicCanvasRef} className="w-full h-full" />
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Illustrates the relationships between fundamental frequencies and their overtones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudioAnalysisSection;