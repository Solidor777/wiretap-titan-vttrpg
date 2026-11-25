import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Directory containing this config file.

export default {
   plugins: [
      svelte({
         preprocess: sveltePreprocess({
            scss: { prependData: '@use "src/styles/Root.scss" as *;' },
         }),
      }),
   ],
   resolve: {
      conditions: ['browser'],
      dedupe: ['svelte'],
      alias: {
         '~/': `${path.resolve(__dirname, 'src')}/`,
      },
   },
   test: {
      environment: 'happy-dom',
      globals: true,
      include: ['tests/unit/**/*.test.js'],
   },
};
