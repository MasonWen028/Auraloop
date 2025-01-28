import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  plugins: [react(), wasm(), svgr({
    svgrOptions: {
      icon: true,
    },
  })],
  optimizeDeps: {
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Maps '@' to './src'
    },
  },
});
