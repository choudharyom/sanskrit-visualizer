import { useState } from 'react';
import Header from './components/Header';
import SanskritVerseSection from './components/SanskritVerseSection';
import VisualizationSection from './components/VisualizationSection';
import AudioAnalysisSection from './components/AudioAnalysisSection';
import ExportShareSection from './components/ExportShareSection';
import Footer from './components/Footer';

const defaultSanskritVerse = `ॐ शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं 
विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्। 
लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं 
वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥३॥`;

function App() {
  const [isVerseProcessed, setIsVerseProcessed] = useState(false)
  const [audioSource, setAudioSource] = useState(null);

  const handleAudioGenerated = (audioUrl) => {
    setAudioSource(audioUrl);
    setIsVerseProcessed(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SanskritVerseSection
          initialVerse={defaultSanskritVerse}
          onAudioGenerated={handleAudioGenerated}
        />
        {<VisualizationSection audioSource={audioSource} />}
        {<AudioAnalysisSection audioSource={audioSource} />}
        <ExportShareSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;