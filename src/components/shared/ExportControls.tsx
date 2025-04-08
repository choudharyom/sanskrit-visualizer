import React from 'react';
import { exportCanvasAsPNG, generateVisualizationVideo } from '../../utils/export';

interface ExportControlsProps {
  canvases: HTMLCanvasElement[];
  audioBuffer?: AudioBuffer;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ canvases, audioBuffer }) => {
  return (
    <div className="flex gap-2 p-4 bg-gray-800 rounded-lg">
      <button
        onClick={() => exportCanvasAsPNG(canvases[0], 'visualization.png')}
        className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
      >
        Export PNG
      </button>
      
      <button
        onClick={() => {
          if (audioBuffer) {
            generateVisualizationVideo(canvases, audioBuffer, 'visualization.webm');
          }
        }}
        disabled={!audioBuffer}
        className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        Export Video
      </button>
    </div>
  );
};
