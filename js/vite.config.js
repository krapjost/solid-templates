import UnoCSS from 'unocss/vite';
import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vite';
import { presetHeadlessUi } from 'unocss-preset-primitives';
import { presetForms } from '@julr/unocss-preset-forms';
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns'

import {
  presetUno,
  presetWebFonts,
  presetIcons,
  presetAttributify,
  presetTypography,
  presetTagify
} from 'unocss';

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnoCSS({
      theme: {
        colors: {
          'pulp': {
            50: '#F0EDE9',
            100: '#D6CCC2',
            200: '#BFAF9F',
            300: '#A8927C',
            400: '#9C836A',
            500: '#8C755D',
            600: '#695746',
            700: '#57493A',
            800: '#342C23',
            900: '#110F0C',
          },
          'ink': {
            50: '#E3E5D8',
            100: '#D3D6C2',
            200: '#BABF9F',
            300: '#AEB38D',
            400: '#949C6A',
            500: '#858C5D',
            600: '#646946',
            700: '#53573A',
            800: '#323423',
            900: '#11110C',
          },
          'pen': {
            50: '#E2D3D5',
            100: '#D6C2C5',
            200: '#CBB0B4',
            300: '#BF9FA4',
            400: '#A87C82',
            500: '#9C6A72',
            600: '#7A5258',
            700: '#573A3F',
            800: '#342326',
            900: '#110C0D',
          },
        }
      },
      shortcuts: [
        {
          dots: 'i-carbon-overflow-menu-vertical p-8 text-2xl',
          full: 'w-full h-full',
          prime_color: 'bg-pulp-50 text-pulp-800 dark:bg-pulp-800 dark:text-white',
          second_color: 'bg-pulp-200 text-pulp-900 dark:bg-pulp-900 dark:text-pulp-100',
          modal_color: 'bg-pulp-100 text-black dark:bg-black dark:text-pulp-100 shadow-lg shadow-black/20 dark:shadow-black/20 border border-pulp-100 dark:border-black',
          modal_item_color: 'hover:bg-pulp-200 dark:hover:bg-pulp-900',
          icon_color: 'bg-transparent text-pulp-900 hover:text-pulp-700 transition hover:bg-white dark:text-white dark:hover:text-pulp-200 dark:hover:bg-black',
          divider: '-my-2 divide-y divide-pulp-200 dark:divide-pulp-800',
          text_label: "block text-sm font-medium text-pen-600 dark:text-pen-200",
          text_input: "mt-1 w-full rounded-sm text-sm shadow-sm border-none focus:border-none focus:ring-pen-200 dark:focus:ring-pen-700 dark:bg-pen-900",
          hl_color: 'bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-white',
        },
        [/^btn-(.*)$/, ([, c]) =>
          `bg-${c}-600 border-${c}-600 hover:text-${c}-600 active:text-${c}-500 dark:hover:bg-${c}-700 dark:hover:text-white inline-block shrink-0 rounded-sm border px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring`],
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
        presetHeadlessUi(),
        presetForms(),
        presetHeroPatterns(),
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
