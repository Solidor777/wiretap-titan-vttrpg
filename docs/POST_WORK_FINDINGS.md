# Post-work findings

Gotchas and issues from post-work reviews that deserve attention. Not a to-do list.

- A fresh `npm install` with npm 10.8.1 on Node 26.11.1 fails in the peer-set resolver
  (`Cannot read properties of null (reading 'edgesOut')`). The committed `package-lock.json` avoids it; regenerate the
  lockfile with care.
