import { useState, useEffect } from 'react';

export const useAudioContext = () => {
  const [audioContext] = useState(() => new AudioContext());
  const [analyser] = useState(() => audioContext.createAnalyser());

  useEffect(() => {
    return () => {
      audioContext.close();
    };
  }, [audioContext]);

  return { audioContext, analyser };
};
