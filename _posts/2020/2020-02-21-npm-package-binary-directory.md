---
layout: post
title: npm package binary directory
date: 2020-02-21 20:47:13
excerpt: From an npm package binary, learn how to get the directory of the package and the directory of the project that installed the binary.
categories: npm package binary executable directory
---

> TL;DR: [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd) will return the directory of the running process; [`__dirname`](https://nodejs.org/api/globals.html#globals_dirname) will return the directory of the actual file.

## Motivation

I was working on an npm package executable and I wanted to know the directory of the package as well as the project.

## Setup

Create the following directories:

```sh
$ mkdir a/ b/
```

`a` will contain your _**app**_ project and `b` will contain your npm package _**binary**_.

## Package

Enter directory `b`:

```sh
$ cd b/
```

Initialize the `package.json`:

```sh
$ npm init -y
```

Create your script:

```sh
$ touch script.js
```

Add the following code to your script:

```js
#!/usr/bin/env node

console.log('process.cwd():', process.cwd());
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);
console.log('process.mainModule:', process.mainModule);
```

Set the [bin](https://docs.npmjs.com/files/package.json#bin) field in `package.json`:

```json
{
  "name": "b",
  "bin": "script.js"
}
```

[Symlink your package](https://docs.npmjs.com/cli-commands/link.html):

```sh
$ npm link

/usr/local/bin/b -> /usr/local/lib/node_modules/b/script.js
/usr/local/lib/node_modules/b -> /Users/remarkablemark/b
```

## Project

Enter directory `a`:

```sh
$ cd ../a/
```

[Install `b` as a symlink](https://docs.npmjs.com/cli-commands/link.html):

```sh
$ npm link b
/Users/remarkablemark/a/node_modules/b -> /usr/local/lib/node_modules/b -> /Users/remarkablemark/b
```

When you execute the binary:

```sh
$ npx b # yarn b
```

You'll get the output:

```
process.cwd(): /Users/remarkablemark/a
__dirname: /Users/remarkablemark/b
__filename: /Users/remarkablemark/b/script.js
process.mainModule: Module {
  id: '.',
  path: '/Users/remarkablemark/b',
  exports: {},
  parent: null,
  filename: '/Users/remarkablemark/b/script.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/remarkablemark/b/node_modules',
    '/Users/remarkablemark/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```

## Conclusion

By executing binary `b` in directory `a` (via [npm](https://www.npmjs.com/), [npx](https://www.npmjs.com/package/npx), or [yarn](https://yarnpkg.com/)):

- you can get the directory of `b` using [`__dirname`](https://nodejs.org/api/globals.html#globals_dirname) or [`process.mainModule.path`](https://nodejs.org/api/process.html#process_process_mainmodule)
- you can get the directory of `a` using [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd) (this works even if you're in a subdirectory of `a`)

In other words, `process.cwd()` will return the root directory of the app, whereas `__dirname` will return the directory of the binary file.
