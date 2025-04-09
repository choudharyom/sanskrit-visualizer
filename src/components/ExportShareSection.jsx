// components/ExportShareSection.jsx
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShareAlt, faLink } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Add icons to library
library.add(faDownload, faShareAlt, faLink, faTwitter, faInstagram);

function ExportShareSection() {
    return (
      <section className="mb-12">
                <div class="bg-slate-800 rounded-xl shadow-xl p-6">
                    <h2 class="text-xl font-semibold text-blue-400 mb-4">Export & Share</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-lg font-medium text-blue-300 mb-3">Export Visualizations</h3>
                            <div class="flex flex-wrap gap-3">
                                <button class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fas fa-image mr-2"></i> PNG Image
                                </button>
                                <button class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fas fa-video mr-2"></i> MP4 Video
                                </button>
                                <button class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fas fa-file-audio mr-2"></i> Audio (MP3)
                                </button>
                                <button class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fas fa-code mr-2"></i> JSON Data
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg font-medium text-blue-300 mb-3">Share Online</h3>
                            <div class="flex flex-wrap gap-3">
                                <button class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fab fa-twitter mr-2"></i> Twitter
                                </button>
                                <button class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fab fa-instagram mr-2"></i> Instagram
                                </button>
                                <button class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fas fa-link mr-2"></i> Copy Link
                                </button>
                                <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                                    <i class="fas fa-paper-plane mr-2"></i> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
      </section>
    );
  }
  
  export default ExportShareSection;