import React from 'react';

export interface AudioPlayerProps {
  audioUrl?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onVolumeChange?: (volume: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  onPlay,
  onPause,
  onStop,
  onVolumeChange
}) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    onPause?.();
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onStop?.();
  };

  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} src={audioUrl} />
      <button onClick={isPlaying ? handlePause : handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};
