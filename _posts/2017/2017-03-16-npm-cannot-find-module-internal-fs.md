---
layout: post
title: "npm error: cannot find module 'internal/fs'"
date: 2017-03-16 23:50:00
excerpt: "Resolving npm error: cannot find module 'internal/fs'."
categories: npm error
---

I encountered a strange [npm error](https://github.com/nodejs/node/issues/9377) when I switched Node.js versions.

I started to get the following error whenever I tried to install a package:

```sh
npm install html-react-parser
npm ERR! Darwin 15.3.0
npm ERR! argv "/usr/local/bin/node" "/usr/local/bin/npm" "install" "html-react-parser"
npm ERR! node v7.0.0
npm ERR! npm  v3.10.8
npm ERR! code MODULE_NOT_FOUND

npm ERR! Cannot find module 'internal/fs'
```

In the end, what fixed it for me was when I switched back to the previous version of node and updated npm:

```sh
nvm use node && npm update --global npm
```

If that doesn't work for you, then you may also need to clean cache, install latest Node.js, and update npm:

```sh
npm cache clean && nvm use node && npm update -g
```
