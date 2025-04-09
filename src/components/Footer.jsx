// components/Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer class="bg-slate-900 mt-12">
    <div class="container mx-auto py-8 px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
                <h2 class="text-xl font-bold text-white flex items-center">
                    <i class="fas fa-om text-blue-500 mr-2"></i> Sanskrit Verse Visualizer
                </h2>
                <p class="text-slate-400 mt-2">Explore the beauty of Sanskrit verse through audio visualization</p>
            </div>
            <div class="flex space-x-4">
                <a href="#" class="text-slate-400 hover:text-blue-500"><i class="fab fa-github text-xl"></i></a>
                <a href="#" class="text-slate-400 hover:text-blue-500"><i class="fab fa-twitter text-xl"></i></a>
                <a href="#" class="text-slate-400 hover:text-blue-500"><i class="fab fa-youtube text-xl"></i></a>
            </div>
        </div>
        <div class="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; 2025 Sanskrit Verse Visualizer. All rights reserved.</p>
        </div>
    </div>
</footer>
  );
}

export default Footer;