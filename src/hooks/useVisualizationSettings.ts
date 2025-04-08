import { useState } from 'react';

export interface VisualizationSettings {
  amplitude: number;
  frequency: number;
  smoothing: number;
  colorPalette: string;
  options: {
    mirror: boolean;
    fill: boolean;
    peaks: boolean;
    grid: boolean;
  };
}

export const useVisualizationSettings = (initialSettings?: Partial<VisualizationSettings>) => {
  const [settings, setSettings] = useState<VisualizationSettings>({
    amplitude: 1,
    frequency: 0.5,
    smoothing: 0.4,
    colorPalette: 'default',
    options: {
      mirror: false,
      fill: true,
      peaks: true,
      grid: true,
    },
    ...initialSettings,
  });

  const updateSettings = (updates: Partial<VisualizationSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings };
};
