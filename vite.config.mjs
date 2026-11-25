import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'path';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
import { buildOutput } from './scripts/lib/buildOutput.mjs';

const __filename = fileURLToPath(import.meta.url); // Resolved path to this config file.
const __dirname = path.dirname(__filename); // Directory containing this config file.

// Foundry package path used for the base URL and dev-server proxy rules.
const s_PACKAGE_ID = 'modules/wiretap-titan-vttrpg';

const s_COMPRESS = true; // Compress the module bundle with terser.
const s_SOURCEMAPS = true; // Generate sourcemaps for the bundle.

export default () => {
   /** @type {import('vite').UserConfig} */
   return {
      root: 'src/',
      base: `/${s_PACKAGE_ID}/`,
      publicDir: false,
      cacheDir: '../.vite-cache',

      resolve: {
         conditions: ['import', 'browser'],
         alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
         },
      },

      esbuild: {
         target: ['es2022'],
      },

      css: {
         postcss: {
            plugins: [autoprefixer()],
         },
         preprocessorOptions: {
            scss: {
               api: 'modern-compiler',
            },
         },
      },

      define: {
         'process.env.NODE_ENV': JSON.stringify('production'),
      },

      // Port 30002 keeps this dev server clear of Wiretap's (30001); both proxy the Foundry server on 30000.
      server: {
         port: 30002,
         open: '/game',
         proxy: {
            [`^(/${s_PACKAGE_ID}/(assets|lang|packs|style.css))`]: 'http://localhost:30000',
            [`^(?!/${s_PACKAGE_ID}/)`]: 'http://localhost:30000',
            '/socket.io': { target: 'ws://localhost:30000', ws: true },
         },
      },

      build: {
         // dist/ and no emptying: see `buildOutput`.
         ...buildOutput(__dirname),
         sourcemap: s_SOURCEMAPS,
         brotliSize: true,
         minify: s_COMPRESS ? 'terser' : false,
         target: ['es2022'],
         terserOptions: s_COMPRESS ? { ecma: 2022 } : void 0,
         lib: {
            entry: './index.js',
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'style',
         },
      },

      plugins: [
         svelte({
            configFile: false,
            preprocess: sveltePreprocess({
               scss: {
                  api: 'modern',
                  prependData: '@use "src/styles/Root.scss" as *;',
               },
               postcss: {
                  plugins: [autoprefixer()],
               },
            }),
            onwarn: (warning, handler) => {
               if (warning.code === 'vite-plugin-svelte-preprocess-many-dependencies') {
                  return;
               }
               handler(warning);
            },
         }),
      ],
   };
};
