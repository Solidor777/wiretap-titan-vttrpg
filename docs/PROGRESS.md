# Wiretap Titan progress

## Module skeleton (2026-11-25)

- `module.json`: id `wiretap-titan-vttrpg`, limited to the `titan` system, requires the `wiretap` module.
- Toolchain copied from Wiretap: Vite build to `dist/`, vitest, ESLint, stylelint, `check:build` and `check:release`.
  `package-lock.json` started from Wiretap's lockfile, because a fresh `npm install` (npm 10.8.1, Node 26.11.1) failed
  in npm's peer-set resolver (`Cannot read properties of null (reading 'edgesOut')`); npm pruned it to this module's
  dependencies.
- MEASURED: `npm run build`, `npm test` (1 file, 3 tests), `npm run eslint`, `npm run stylelint`,
  `npm run check:release` all pass.
- Claude Code workspace: `.claude/CLAUDE.md`, and the user-scope `wiretap@personal-skills` plugin (Wiretap's skills and
  agents) enabled in `.claude/settings.json`.
