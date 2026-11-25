# Wiretap Titan plan

Goals and decisions for the module, and work not yet built. Work history goes to `PROGRESS.md`.

## Goals

- **G1 Titan support for Wiretap.** Everything Wiretap needs to know about the Titan VTTRPG system lives here, so
  Wiretap's shipped code stays system agnostic.
- **G2 A Wiretap add-on.** The module requires Wiretap and runs only in Titan worlds (`module.json` `relationships`).
  It reaches Wiretap only through Wiretap's public plugin API.

## Decisions

- **D1 Same toolchain as Wiretap.** JavaScript, Svelte 5 (runes) mounted directly into ApplicationV2, SCSS, Vite to
  `dist/`, vitest, ESLint, stylelint, the same code style.

## Work not yet built

- Receive the Titan-specific content that leaves Wiretap: the per-subtype key-field lists of Wiretap's compact
  document view. How an add-on supplies key fields to Wiretap is designed with the owner first.
