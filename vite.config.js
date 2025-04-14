import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite'
import tailwindcss from '@tailwindcss/vite' /* instead of @tailwindcss/postcss */

export default defineConfig({
  plugins: [svelte(), svelteTesting(), tailwindcss()],
  base: '/stonks/',
  test: {
    globals: true,
    environment: 'jsdom', // or 'jsdom' for browser-like environment
    include: ['test/**/*.test.ts'], // or .js if you're testing JS files,
    setupFiles: ["test/setup.ts"]
  },
});