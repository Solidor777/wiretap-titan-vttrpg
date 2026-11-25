# Wiretap Titan progress

## Module skeleton (2026-11-25)

- `module.json`: id `wiretap-titan-vttrpg`, limited to the `titan` system, requires the `wiretap` module.
- Toolchain copied from Wiretap: Vite build to `dist/`, vitest, ESLint, stylelint, `check:build` and `check:release`.
- `package-lock.json` is generated fresh by npm 11.20.0 (the npm Node 26.11.1 ships). A stale global npm 10.8.1
  shadowed it and crashed in its peer-set resolver (`Cannot read properties of null (reading 'edgesOut')`); MEASURED:
  the same `package.json` installs with npm 11.20.0 and fails with 10.8.1. The global npm 10.8.1 was recycled.
- MEASURED: `npm run build`, `npm test` (1 file, 3 tests), `npm run eslint`, `npm run stylelint`,
  `npm run check:release` all pass.
- Claude Code workspace: `.claude/CLAUDE.md`, and the user-scope `wiretap@personal-skills` plugin (Wiretap's skills and
  agents) enabled in `.claude/settings.json`.
