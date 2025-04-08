import { useState, useEffect } from 'react';

export interface VisualizationData {
  frequencyData: Float32Array;
  waveformData: Float32Array;
  isAnalyzing: boolean;
}

export const useVisualization = (analyserNode: AnalyserNode | null) => {
  const [data, setData] = useState<VisualizationData>({
    frequencyData: new Float32Array(),
    waveformData: new Float32Array(),
    isAnalyzing: false
  });

  useEffect(() => {
    if (!analyserNode) return;

    const frequencyData = new Float32Array(analyserNode.frequencyBinCount);
    const waveformData = new Float32Array(analyserNode.frequencyBinCount);

    const updateData = () => {
      analyserNode.getFloatFrequencyData(frequencyData);
      analyserNode.getFloatTimeDomainData(waveformData);
      
      setData({
        frequencyData: new Float32Array(frequencyData),
        waveformData: new Float32Array(waveformData),
        isAnalyzing: true
      });

      requestAnimationFrame(updateData);
    };

    updateData();
    return () => setData(prev => ({ ...prev, isAnalyzing: false }));
  }, [analyserNode]);

  return data;
};
