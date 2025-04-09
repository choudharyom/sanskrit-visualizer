// components/Header.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faOm} className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Sanskrit Verse Visualizer</h1>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> New Visualization
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;