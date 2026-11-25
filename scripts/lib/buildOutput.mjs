import path from 'node:path';

/**
 * The output settings of the Vite build. The build writes to `<root>/dist/` (the paths `module.json` names) and never
 * empties it, because nothing in this project deletes files. The build has no dynamic import, so it emits only the
 * files `RELEASE_DIST_FILES` lists, under the bundler's default naming.
 * @param {string} root - The module root directory.
 * @returns {{ outDir: string, emptyOutDir: boolean }} The `build` settings to merge.
 */
export function buildOutput(root) {
   return {
      outDir: path.resolve(root, 'dist'),
      emptyOutDir: false,
   };
}
