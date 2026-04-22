// @ts-check
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  server: {
    historyApiFallback: true,
  },
  html: {
    title: 'Assetflow',
    favicon: './src/assets/bg.jpeg',
    meta: {
      description: 'Aplikasi reservasi aset perusahaan',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },
});
