import React, { useState, useEffect, useRef } from 'react';
import WaveformDisplay from './Visualization/WaveformDisplay';
import FrequencySpectrum from './Visualization/FrequencySpectrum';
import HarmonicStructure from './Visualization/HarmonicStructure';
import RhythmPattern from './Visualization/RhythmPattern';


const VisualizationSection: React.FC<{ audioSource?: string }> = ({
  audioSource = 'https://www2.cs.uic.edu/~i101/SoundFiles/prelude.mp3'
}) => {
  const [activeViz, setActiveViz] = useState('waveform');
  const [isPlaying, setIsPlaying] = useState(false); // Track playback state
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio setup without auto-playing
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;

    audioElementRef.current = new Audio(audioSource);
    audioElementRef.current.crossOrigin = 'anonymous';

    if (audioContextRef.current && analyserRef.current && audioElementRef.current) {
      const source = audioContextRef.current.createMediaElementSource(audioElementRef.current);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioSource]);

  // Handle play button click
  const handlePlay = () => {
    if (audioElementRef.current && !isPlaying) {
      audioElementRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Audio playback failed:', error);
        });
    }
  };

  const vizComponents = {
    waveform: WaveformDisplay,
    frequency: FrequencySpectrum,
    circular: HarmonicStructure,
    particle: RhythmPattern,
  };

  const ActiveVizComponent = analyserRef.current ? vizComponents[activeViz] : null;

  return (
    <section className="mb-12">
      <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-wrap">
          <div className="w-full flex overflow-x-auto p-4 space-x-2 bg-slate-900">
            {[
              { id: 'waveform', icon: 'fa-wave-square', label: 'Waveform' },
              { id: 'frequency', icon: 'fa-chart-bar', label: 'Frequency' },
              { id: 'circular', icon: 'fa-circle-notch', label: 'Harmonics' },
              { id: 'particle', icon: 'fa-snowflake', label: 'Rhythm' },
            ].map((viz) => (
              <button
                key={viz.id}
                className={`visualization-btn px-4 py-2 rounded-lg bg-slate-700 text-white whitespace-nowrap ${
                  activeViz === viz.id ? 'active bg-blue-600' : 'text-slate-300'
                }`}
                onClick={() => setActiveViz(viz.id)}
              >
                <i className={`fas ${viz.icon} mr-2`}></i> {viz.label}
              </button>
            ))}
            {/* Play Button */}
            <button
              className="px-4 py-2 rounded-lg bg-green-600 text-white whitespace-nowrap"
              onClick={handlePlay}
              disabled={isPlaying}
            >
              <i className="fas fa-play mr-2"></i> Play
            </button>
          </div>
          <div ref={containerRef} className="w-full p-6">
            {ActiveVizComponent && analyserRef.current && containerRef.current && (
              <ActiveVizComponent
                analyser={analyserRef.current}
                width={containerRef.current.offsetWidth}
                height={containerRef.current.offsetHeight}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualizationSection;