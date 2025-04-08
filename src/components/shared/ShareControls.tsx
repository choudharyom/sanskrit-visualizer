import React from 'react';
import { exportAnalysisData, generateShareableLink } from '../../utils/dataExport';

interface ShareControlsProps {
  analysisData: {
    frequency: number[];
    rhythm: { peaks: number[]; tempo: number };
    overtones: number[];
  };
}

export const ShareControls: React.FC<ShareControlsProps> = ({ analysisData }) => {
  const [shareUrl, setShareUrl] = React.useState('');

  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex gap-2">
        <button
          onClick={() => exportAnalysisData(analysisData)}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Export Analysis
        </button>
        <button
          onClick={() => setShareUrl(generateShareableLink(analysisData))}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Generate Link
        </button>
      </div>
      
      {shareUrl && (
        <div className="flex gap-2 items-center">
          <input
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-700 rounded"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};
