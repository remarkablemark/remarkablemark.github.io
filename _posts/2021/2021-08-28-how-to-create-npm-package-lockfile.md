---
layout: post
title: 'npm: How to create a package-lock.json'
date: 2021-08-28 20:06:17
excerpt: How to create an npm package lockfile (package-lock.json).
categories: npm
---

By default, [npm install](https://docs.npmjs.com/cli/v7/commands/npm-install) automatically generates a [`package-lock.json`](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json):

```sh
npm install
```

However, the lockfile can be disabled in [.npmrc](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc):

```bash
# .npmrc
package-lock=false
```

To create a lockfile, pass the option `--package-lock-only`:

```sh
npm install --package-lock-only
```

Or pass the option [`--package-lock`](https://docs.npmjs.com/cli/v7/commands/npm-install#package-lock):

```sh
npm install --package-lock
```
