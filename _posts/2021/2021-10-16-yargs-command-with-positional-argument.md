---
layout: post
title: Yargs command with positional argument
date: 2021-10-16 14:01:24
excerpt: How to add a yargs command with positional arguments.
categories: yargs javascript cli
---

This post goes over how to add a [yargs](https://github.com/yargs/yargs) command with positional arguments.

## Prerequisites

Install [yargs](https://www.npmjs.com/package/yargs):

```sh
npm install yargs
```

Create script `index.js` and import yargs:

```js
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');
```

## Command

To have the [command](https://yargs.js.org/docs/#api-reference-commandmodule) accept a [positional argument](https://github.com/yargs/yargs/blob/main/docs/advanced.md#positional-arguments):

```js
const argv = yargs(hideBin(process.argv))
  .command('<argument>', 'Positional argument')
  .parseSync();
```

To make the command **required** and not _optional_:

```js
const argv = yargs(hideBin(process.argv))
  .command('<argument>', 'Positional argument')
  .demandCommand(1)
  .parseSync();
```

To print out the 1st positional argument:

```js
console.log(argv._[0]);
```

## Code

Here's the full code:

```js
// index.js
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

const argv = yargs(hideBin(process.argv))
  .command('<argument>', 'Positional argument')
  .demandCommand(1)
  .parseSync();

console.log('1st positional argument:', argv._[0]);
```

## Demo

[Replit](https://replit.com/@remarkablemark/yargs-command-with-positional-argument#index.js):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/yargs-command-with-positional-argument?lite=true#index.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
