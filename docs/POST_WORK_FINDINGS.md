# Post-work findings

Gotchas and issues from post-work reviews that deserve attention. Not a to-do list.

- npm 11 does not run dependency install scripts until they are approved; `npm install` warns that
  `@parcel/watcher` (an optional dependency of Sass's file watcher) was skipped. The build, tests and lints do not
  need it.
