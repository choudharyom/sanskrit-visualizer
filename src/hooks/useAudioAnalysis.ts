import { useEffect, useState } from 'react';
import { AudioAnalysisService } from '../services/audioAnalysis.service';

export const useAudioAnalysis = (audioBuffer: AudioBuffer | null) => {
  const [analysisService] = useState(() => new AudioAnalysisService());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (audioBuffer) {
      analysisService.connectSource(audioBuffer);
      setIsAnalyzing(true);
    }
    return () => setIsAnalyzing(false);
  }, [audioBuffer, analysisService]);

  return {
    getFrequencyData: () => analysisService.getFrequencyData(),
    getWaveformData: () => analysisService.getWaveformData(),
    isAnalyzing
  };
};
