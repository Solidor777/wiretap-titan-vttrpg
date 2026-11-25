import autoprefixer from 'autoprefixer';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} Preprocessing for editor tooling; matches vite.config.mjs. */
const config = {
   preprocess: sveltePreprocess({
      scss: {
         api: 'modern',
         prependData: '@use "src/styles/Root.scss" as *;',
      },
      postcss: {
         plugins: [autoprefixer()],
      },
   }),
};

export default config;
