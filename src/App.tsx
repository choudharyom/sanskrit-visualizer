import React from 'react';
import { MainLayout } from './components/layouts/MainLayout';
import { ControlsTest } from './components/test/ControlsTest';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ControlsTest />
    </div>
  );
}

export default App;
