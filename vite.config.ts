import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          visualizations: [
            './src/components/visualizations/WaveformDisplay',
            './src/components/visualizations/FrequencySpectrum',
            './src/components/visualizations/HarmonicStructure',
            './src/components/visualizations/RhythmPattern'
          ]
        }
      }
    }
  }
});
