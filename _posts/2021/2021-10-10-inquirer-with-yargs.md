---
layout: post
title: Inquirer with yargs
date: 2021-10-10 22:34:42
excerpt: How to use Inquirer with yargs.
categories: inquirer yargs cli
---

This post goes over how to use [Inquirer](https://github.com/SBoudrias/Inquirer.js) with [yargs](https://github.com/yargs/yargs).

## Inquirier

Prompt for name:

```js
const inquirer = require('inquirer');

(async () => {
  const answers = await inquirer.prompt([
    {
      message: 'What is your name?',
      name: 'name',
      type: 'string',
    },
  ]);

  console.log(`Hello, ${answers.name}!`);
})();
```

## Yargs

Parse [command-line arguments](https://nodejs.org/docs/latest/api/process.html#process_process_argv) with name option:

```js
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

(async () => {
  const argv = yargs(hideBin(process.argv))
    .options({
      name: {
        demandOption: true,
        describe: 'Your name',
        type: 'string',
      },
    })
    .parseSync();

  console.log(`Hello, ${argv.name}!`);
})();
```

## Inquirer with yargs

Prompt with Inquirer before parsing arguments with yargs:

```js
const inquirer = require('inquirer');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

const options = {
  name: {
    // inquirer
    message: 'What is your name?',
    name: 'name',
    // yargs
    demandOption: true,
    describe: 'Your name',
    // shared
    type: 'string',
  },
};

(async () => {
  const answers = await inquirer.prompt(Object.values(options));

  Object.entries(answers).forEach(([key, value]) => {
    value && process.argv.push(`--${key}`, value);
  });

  const argv = yargs(hideBin(process.argv)).options(options).parseSync();

  console.log(`Hello, ${argv.name}!`);
})();
```

## Demo

[Replit](https://replit.com/@remarkablemark/inquirer-yargs#index.js) example:

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/inquirer-yargs?lite=true#index.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
