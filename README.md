# Wiretap: Titan VTTRPG

Titan VTTRPG support for [Wiretap](https://github.com/Solidor777/wiretap), the Foundry VTT bridge for AI agents.
Wiretap itself is system agnostic; this module holds what is specific to the Titan system.

## Requirements

- Foundry VTT v14.
- The Titan VTTRPG game system (`titan`).
- The Wiretap module (`wiretap`).

## Status

The module is set up but holds no features yet.

## Development

```bash
npm install
npm run build          # Vite build to dist/
npm test               # vitest unit tests
npm run eslint
npm run stylelint
npm run check:release  # dist/ holds only the release files
```

## License

MIT. See `LICENSE-MIT`.
