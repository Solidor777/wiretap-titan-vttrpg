# Wiretap Titan VTTRPG Module — Agent Instructions

## Project
- A Foundry VTT module that adds Titan VTTRPG support to Wiretap, the Foundry bridge for AI agents. Wiretap itself is
  system agnostic; everything specific to the Titan system belongs here.
- It requires the `wiretap` module and runs only in Titan worlds (`module.json` `relationships`). It reaches Wiretap
  only through Wiretap's public plugin API.
- Platform: Foundry VTT v14 (ApplicationV2 API).
- Stack: JavaScript, Svelte 5 (Runes), SCSS. The same toolchain and code style as Wiretap.
- Integration: Svelte mounts directly to ApplicationV2. No middleware.
- All source resides in `src/`. Build output goes to `dist/`.
- Related code on this machine: Wiretap at `../wiretap/` (branch work happens there, not here) and the Titan system at
  `../../systems/titan/`.

## Reference Docs
| Doc | Role |
|---|---|
| `docs/README.md` | Index of everything in `docs/` |
| `docs/PLAN.md` | Forward-looking plan: goals, decisions, work not yet built |
| `docs/PROGRESS.md` | Work history: what was built, results, revisions |
| `docs/OPEN_BUGS.md` | Currently open bugs |
| `docs/CLOSED_BUGS.md` | Closed bugs and their history |
| `docs/TODO.md` | Deferred-work backlog |
| `docs/POST_WORK_FINDINGS.md` | Living record of post-work review issues. NOT a to-do list |

## Validation
- Work is done only when every gate below passes:

```bash
npm run build
npm test
npm run eslint
npm run stylelint
npm run check:release
```

| Gate | Fails when |
|---|---|
| `npm run check:release` | a file `module.json` loads does not exist, or `dist/` holds a file other than `index.js`, `index.js.map` and `style.css` |

- On a crash, read the crash output yourself before reporting.

## Collaboration

### Immutable History & Context
- Never destroy, rewrite, or drop commits: no `push --force`, `reset --hard`, or history-dropping `rebase`. Prefer
  `revert` or new commits.
- Delete work branches after the work is done, but confirm first.
- Pause and alert the user when the context window approaches or exceeds 80%, and advise compaction or a clear.

### Architectural Consent
- Before non-trivial work, summarize the intended change and verify it against `docs/PLAN.md`.
- Dependencies, file layouts, and public APIs are architectural choices requiring consent.
- If a plan fails to produce expected results, assume improper implementation before a flawed spec.
- A change this module needs in Wiretap (a new plugin API, a hook) is Wiretap work: raise it with the user, never
  patch `../wiretap/` from here.

### Complications
- Fix issues immediately as they arise, with unit tests for small, clear follow-ups. Don't defer by default.
- Defer only work that actively conflicts with the current goal or context limits, or that needs cascading changes
  requiring architectural decisions (surface those to the user).
- Log every bug to `docs/OPEN_BUGS.md` and every other deferred item to `docs/TODO.md`. Nothing goes unlogged.
- Surface complications the moment you find them, not at the end of a run.

### Warnings & Precedence
- Warn and confirm with the user when instructions conflict or are flawed.
- This project `CLAUDE.md` supersedes any other instruction, the Wiretap plugin's skills and agents included.

### No Backwards Compatibility
- The module has not been published, so until further notice: rename, remove, or reshape any API, setting, or file
  format when the design calls for it. Keep no aliases, shims, deprecation paths, or migrations.

### Headless Browsers Only
- E2E tests and agent browser work run headless (Playwright with `headless: true`). Do not use the Playwright MCP
  `browser_*` tools for Foundry work; they open a visible Chrome window.

## Shared resources
Only one task at a time may use each of these.

| Resource | Used by | How to tell it is free |
|---|---|---|
| `dist/` | `npm run build` | No build in progress |
| Live Foundry server on port 30000, the `test-titan` world | Wiretap's and Titan's e2e runs, `npm run dev` here (proxies 30000) | No e2e run active in `../wiretap/` or `../../systems/titan/` |

## Code Style

### Formatting
- 120-character wrap limit.
- Always use multi-line `{}` for conditional scopes.
- Objects with more than 1 property and arrays with more than 1 entry are multi-line.
- Svelte components with more than 1 property are multi-line, with `>` or `/>` on a new line.

### Typing & Documentation
- Variables: typed, with a single-line descriptive comment.
- Functions: multi-line comment detailing purpose, typed parameters (`{Type} [optionalParam] - description`), and
  typed return values (including async operations).
- Classes and objects: strictly typed using `@extends`, `@typedef`, and `@typeof` where applicable.
- Comments have perfect spelling, grammar, and indentation, and succinctly capture what the code does.

### CSS
- `:global` style selectors are forbidden.

## Code Hygiene
- No test or e2e code is compiled into shipping builds.
- All build output goes to `dist/` (the manifest loads `dist/index.js`). No build step deletes files.
- Before packaging, run `npm run build` and `npm run check:release`.
- No dynamic imports in shipping builds, ever.

## Security & IP
- Zero tolerance for intellectual property infringement and data leaks. System state, test fixtures, and debug dumps
  stay free of proprietary code, credentials, and PII.

### Clean-Room Implementations
- Never ingest, reproduce, or reference proprietary, copyrighted, or leaked code. Never mention proprietary software in
  source files.
- When an algorithm is required, implement it clean-room from academic papers, standard formulas, or public API
  documentation, and cite the source.

### Secrets & PII
- Code, config, tests, and debug dumps contain no PII, real user data, or hardcoded secrets. Inject secrets via
  environment variables or a credential manager.
- Test fixtures are deterministic and obviously synthetic. Use reserved test values (`example.com`, `555` numbers).
- If workspace context, logs, or instructions contain PII or secrets, scrub them immediately. Never echo them into
  tracking files, `debug/dumps/`, or commit messages.

## Comments
- Optimize for machine context and exact state. Lead with load-bearing facts: invariants, constraints, hidden coupling.
- State what the code does or why it exists, in the present tense. Express historical reasons as present constraints.
- Banned: project history, bug-fix narration, task IDs, sprint references, spec documents, and narration addressed to
  reviewers.
- Cite the source and justify the choice for every algorithmic or data-flow decision.
- Use a `TODO:` prefix describing the technical work. No assignee, date, or ticket ID. Log every `TODO:` in
  `docs/TODO.md`.
- Treat existing comments as stale until verified against the executing code. Never leave a comment the current code
  contradicts.
- **Good:** `// Uses a Set to enforce O(1) lookups; duplicate entries degrade rendering performance.`
- **Bad:** `// Previously we used an Array here, but it caused O(n) lookups in v2.1.`

## Documentation

### Tracking Files
- Every plan and spec includes documentation updates as a required final step. The last step before clearing or
  compacting context is updating every tracking file.
- `docs/PLAN.md` stays forward-looking. Never write "as built" notes, measured results, or dates of work into it.
- Implementation history goes to `docs/PROGRESS.md`.
- `docs/TODO.md`: deferrals only. Delete completed items. Bugs never go here.
- `docs/OPEN_BUGS.md`: log new bugs, add details on new discoveries, delete completed bugs.
- `docs/CLOSED_BUGS.md`: move completed bugs here.
- `docs/POST_WORK_FINDINGS.md`: log mid-run anomalies.

### Debug Dumps
- Write all debug artifacts to `debug/dumps/` at the workspace root, never to the repo root or `dist/`. Never commit
  them; recycle them with `trash` once the bug family is resolved.

### Release Builds
- Debug code never reaches release builds. Before committing, strip temporary instrumentation: `console.log`,
  `debugger;`, commented-out scaffolding.

### Commits & Pushes
- Commit each logical work-unit as soon as local CI passes, without asking. Don't batch unrelated concerns into one
  commit.
- Push only when a full milestone completes.

## Wiretap Skills & Agents (plugin `wiretap@personal-skills`)
- The user-scope plugin `wiretap` holds Wiretap's codebase skills and agents, enabled for this workspace in
  `.claude/settings.json`. They describe Wiretap's code: every path in them is relative to `../wiretap/`, not to this
  module.
- Load `wiretap:wiretap-codebase-core` before work that uses or depends on Wiretap's APIs, then the subsystem skill the
  work touches (for example `wiretap:wiretap-scripts` for the script registry and the compact view's key fields,
  `wiretap:wiretap-mcp-bridge` for registered tools).
- Agents: `wiretap:foundry-module-dev` for client `.js` / `.svelte` work, `wiretap:wiretap-coder` for everything else,
  `wiretap:wiretap-spec-reviewer` then `wiretap:wiretap-code-reviewer` after each task. Their briefs carry this file's
  rules, because the agents were written for Wiretap.
- The plugin is a copy of Wiretap's `.claude/skills` and `.claude/agents`; Wiretap's own copies stay authoritative
  until the plugin is wired into the Wiretap workspace.
