import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/** @type {string} The module root, two levels above this file (tests/unit/). */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** @type {object} The parsed module manifest Foundry reads. */
const manifest = JSON.parse(readFileSync(path.join(root, 'module.json'), 'utf8'));

describe('module.json', () => {
   it('limits the module to the Titan system', () => {
      expect(manifest.relationships.systems).toEqual([
         {
            id: 'titan',
            type: 'system',
         },
      ]);
   });

   it('requires the Wiretap module', () => {
      expect(manifest.relationships.requires).toEqual([
         {
            id: 'wiretap',
            type: 'module',
         },
      ]);
   });

   it('loads the built entry from dist/', () => {
      expect(manifest.esmodules).toEqual(['dist/index.js']);
   });
});
