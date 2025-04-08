import React from 'react';
import {
  AudioControls,
  VisualizationControls,
  FileUpload,
  SanskritInput
} from '../controls';

export const ControlsTest: React.FC = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="p-4 bg-gray-800 rounded">
        <h2 className="text-lg mb-2">Audio Controls Test</h2>
        <AudioControls
          onPlay={() => console.log('play')}
          onPause={() => console.log('pause')}
          onStop={() => console.log('stop')}
          duration={120}
        />
      </div>

      <div className="p-4 bg-gray-800 rounded">
        <h2 className="text-lg mb-2">Visualization Controls Test</h2>
        <VisualizationControls
          onAmplitudeChange={(v) => console.log('amplitude', v)}
          onFrequencyChange={(v) => console.log('frequency', v)}
        />
      </div>

      <div className="p-4 bg-gray-800 rounded">
        <h2 className="text-lg mb-2">File Upload Test</h2>
        <FileUpload
          onFileAccepted={(f) => console.log('file accepted', f)}
          onError={(e) => console.error(e)}
        />
      </div>

      <div className="p-4 bg-gray-800 rounded">
        <h2 className="text-lg mb-2">Sanskrit Input Test</h2>
        <SanskritInput
          onTextChange={(t) => console.log('text', t)}
        />
      </div>
    </div>
  );
};
