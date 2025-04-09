import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faVolumeUp,
  faMicrophone,
  faUpload,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

function SanskritVerseSection({ initialVerse, onAudioGenerated }) {
  const [verse, setVerse] = useState(initialVerse);
  const [processing, setProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleVerseChange = (event) => {
    setVerse(event.target.value);
  };

  const processVerse = async () => {
    setProcessing(true);
    try {
      // Call TTS API (example using a hypothetical REST endpoint)
      const response = await fetch('http://localhost:5000/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: verse,
          languageCode: 'sa-IN', // Sanskrit (may need custom handling)
          voiceName: 'hi-IN-Standard-A', // Closest available voice (Hindi as proxy)
        }),
      });

      if (!response.ok) throw new Error('TTS request failed');
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      // Pass audio URL to parent component
      if (onAudioGenerated) {
        onAudioGenerated(audioUrl);
      }
    } catch (error) {
      console.error('Error generating TTS:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="mb-12">
      <div className="bg-slate-800 rounded-xl shadow-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Sanskrit Verse</h2>
        <div className="my-6">
          <textarea
            className="w-full h-48 bg-slate-700 text-white p-4 rounded-md font-noto-devanagari text-2xl leading-relaxed focus:outline-none"
            value={verse}
            onChange={handleVerseChange}
          />
        </div>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center ${
            processing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={processVerse}
          disabled={processing}
        >
          <FontAwesomeIcon
            icon={faCog}
            className="mr-2 animate-spin"
            style={{ display: processing ? 'inline-block' : 'none' }}
          />
          {processing ? 'Processing...' : 'Generate Audio'}
        </button>

        {audioUrl && (
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center bg-slate-700 p-2 rounded-lg w-full sm:w-auto">
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <div className="flex-grow mx-3">
                <div className="h-2 bg-slate-600 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0:00</span>
                  <span>0:00</span> {/* Update with real duration later */}
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faVolumeUp} className="text-blue-400 mr-2" />
                <input type="range" className="control-slider w-16" min="0" max="100" defaultValue="75" />
              </div>
            </div>
            <button className="bg-slate-700 hover:bg-slate-600 text-blue-400 px-4 py-2 rounded-lg flex items-center w-full sm:w-auto justify-center">
              <FontAwesomeIcon icon={faMicrophone} className="mr-2" /> Record Recitation
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-blue-400 px-4 py-2 rounded-lg flex items-center w-full sm:w-auto justify-center">
              <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload Audio
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SanskritVerseSection;