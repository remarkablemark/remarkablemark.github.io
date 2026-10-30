---
layout: post
title: How to install OpenCode with npm
date: 2026-10-30 13:12:00
excerpt: How to install OpenCode with npm.
categories: opencode npm node install
---

Install [OpenCode](https://opencode.ai/) with [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/):

```sh
npm install --global @opencode/cli@latest
```

If you have [`--ignore-scripts`]({% post_url 2026/2026-05-15-secure-npm-install-with-ignore-scripts %}) enabled, you'll get the error when opening OpenCode:

```sh
opencode
```

```
Error: @opencode/cli's postinstall script was not run.

This occurs when installation scripts are disabled.
Run the package postinstall script or reinstall with scripts enabled.
```

Run the postinstall script:

```sh
node "$(npm root -g)/@opencode/cli/postinstall.mjs"
```

Then open OpenCode:

```sh
opencode
```
