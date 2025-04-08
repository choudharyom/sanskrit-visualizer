import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, StopIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

interface AudioControlsProps {
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onVolumeChange?: (volume: number) => void;
  duration?: number;
}

class AudioPlayer {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  onPlay,
  onPause,
  onStop,
  onVolumeChange,
  duration = 0,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(new AudioPlayer());
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateProgress = () => {
      setCurrentTime(playerRef.current.getCurrentTime());
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      updateProgress();
    } else {
      cancelAnimationFrame(rafRef.current!);
    }

    return () => {
      cancelAnimationFrame(rafRef.current!);
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              isPlaying ? onPause?.() : onPlay?.();
            }}
            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700"
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              onStop?.();
            }}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <StopIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <SpeakerWaveIcon className="w-5 h-5" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setVolume(newVolume);
              onVolumeChange?.(newVolume);
            }}
            className="w-24"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">{formatTime(currentTime)}</span>
        <div className="flex-1 h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <span className="text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
};
