import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite'
import {presetUno, presetWebFonts, presetIcons, presetAttributify, presetTypography, presetTagify} from 'unocss';

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnoCSS({
      shortcuts: [
      ],
      presets: [
        presetAttributify(),
        presetTypography(),
        presetWebFonts({
          provider: 'google', // default provider
          fonts: {
          sans: 'Roboto',
          mono: ['Fira Code', 'Fira Mono:400,700'],
          }
        }),
        presetTagify(),
        presetIcons({
          cdn: 'https://esm.sh/'
        }),
        presetUno(),
      ]
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
