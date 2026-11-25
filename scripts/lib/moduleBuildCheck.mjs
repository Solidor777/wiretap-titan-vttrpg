import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * List the files `module.json` makes Foundry load (`esmodules` and `styles`) that do not exist under the module root.
 * Foundry resolves these paths against the module directory, so a build that writes elsewhere leaves the module
 * without its code or styles.
 * @param {string} root - The module root directory.
 * @returns {string[]} The manifest paths that name no file; empty when the build output is where the manifest says.
 */
export function findMissingBuildFiles(root) {
   /** @type {{ esmodules?: string[], styles?: string[] }} The parsed manifest. */
   const manifest = JSON.parse(readFileSync(path.join(root, 'module.json'), 'utf8'));
   return [
      ...(manifest.esmodules ?? []),
      ...(manifest.styles ?? []),
   ].filter((file) => !existsSync(path.join(root, file)));
}

/** @type {readonly string[]} The only files a release may ship from `dist/`: the production build's output. */
export const RELEASE_DIST_FILES = [
   'index.js',
   'index.js.map',
   'style.css',
];

/**
 * List the files in `dist/` that a release must not ship. A production build does not remove files an earlier build
 * left behind, so a renamed entry or chunk stays in `dist/` until it is recycled.
 * @param {string} root - The module root directory.
 * @returns {string[]} The names in `dist/` other than the production build's files, sorted; empty when `dist/` holds
 *          only those or does not exist.
 */
export function findUnexpectedDistFiles(root) {
   /** @type {string} The build output directory. */
   const dist = path.join(root, 'dist');
   if (!existsSync(dist)) {
      return [];
   }
   return readdirSync(dist)
      .filter((name) => !RELEASE_DIST_FILES.includes(name))
      .sort();
}
