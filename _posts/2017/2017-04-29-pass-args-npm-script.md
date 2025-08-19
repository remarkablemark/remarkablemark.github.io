---
layout: post
title: Passing arguments to npm scripts
date: 2017-04-29 20:42:06 -4000
excerpt: How to pass arguments on the command-line to an npm script.
categories: npm script cli
---

Passing arguments to a Node.js script is pretty straightforward:

```js
// index.js
console.log(process.argv.slice(2));
```

```sh
node index.js --arg
[ '--arg' ]
```

But how do we pass our arguments to an [npm script](https://docs.npmjs.com/cli/commands/npm-run)?

Given the following `package.json`:

```json
{
  "scripts": {
    "main": "node index.js"
  }
}
```

We pass our arguments after the end of options delimiter (`--`):

```sh
npm run main -- --arg
[ '--arg' ]
```

This holds true even for nested npm scripts:

```json
{
  "scripts": {
    "main": "node index.js",
    "nested": "npm run main"
  }
}
```

```sh
npm run nested -- -- --arg
[ '--arg' ]
```
