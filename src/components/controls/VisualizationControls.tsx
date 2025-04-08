import React from 'react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface VisualizationControlsProps {
  onAmplitudeChange?: (value: number) => void;
  onFrequencyChange?: (value: number) => void;
  onSmoothingChange?: (value: number) => void;
  onToggleOption?: (option: string, value: boolean) => void;
  colorPalette?: string;
  onPaletteChange?: (palette: string) => void;
}

const COLOR_PALETTES = {
  default: ['#4F46E5', '#7C3AED'],
  cool: ['#3B82F6', '#06B6D4'],
  warm: ['#F59E0B', '#7C3AED'],
};

export const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  onAmplitudeChange,
  onFrequencyChange,
  onSmoothingChange,
  onToggleOption,
  colorPalette,
  onPaletteChange,
}) => {
  const [displayOptions, setDisplayOptions] = React.useState({
    mirror: false,
    fill: true,
    peaks: true,
    grid: true,
  });

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amplitude</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            defaultValue="1"
            onChange={(e) => onAmplitudeChange?.(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Frequency Response</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue="0.5"
            onChange={(e) => onFrequencyChange?.(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Smoothing</label>
          <input
            type="range"
            min="0"
            max="0.9"
            step="0.1"
            defaultValue="0.4"
            onChange={(e) => onSmoothingChange?.(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <label className="text-sm font-medium mb-2">Color Palette</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(COLOR_PALETTES).map(([name, colors]) => (
            <button
              key={name}
              onClick={() => onPaletteChange?.(name)}
              className={clsx(
                "p-2 rounded border",
                colorPalette === name ? "border-indigo-500" : "border-gray-700"
              )}
            >
              <div className="h-4 rounded" style={{
                background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`
              }} />
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(displayOptions).map(([option, enabled]) => (
            <div key={option} className="flex items-center justify-between">
              <span className="text-sm capitalize">{option}</span>
              <Switch
                checked={enabled}
                onChange={(checked) => {
                  setDisplayOptions(prev => ({ ...prev, [option]: checked }));
                  onToggleOption?.(option, checked);
                }}
                className={`${
                  enabled ? 'bg-indigo-600' : 'bg-gray-700'
                } relative inline-flex h-5 w-9 items-center rounded-full transition-colors`}
              >
                <span className={`${
                  enabled ? 'translate-x-5' : 'translate-x-1'
                } inline-block h-3 w-3 rounded-full bg-white transition-transform`} />
              </Switch>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
