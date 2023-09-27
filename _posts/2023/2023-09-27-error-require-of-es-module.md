---
layout: post
title: 'How to fix "Error [ERR_REQUIRE_ESM]: require() of ES Module"'
date: 2023-09-27 19:07:17
excerpt: 'How to fix npm install error "Error [ERR_REQUIRE_ESM]: require() of ES Module".'
categories: npm nodejs
---

## Problem

When I ran `npm install`:

```sh
npm install
```

I got the error:

```
node_modules/cypress/node_modules/listr2/dist/renderer/default.renderer.js:7
const cliWrap = require("wrap-ansi");
                ^

Error [ERR_REQUIRE_ESM]: require() of ES Module node_modules/wrap-ansi/index.js from node_modules/cypress/node_modules/listr2/dist/renderer/default.renderer.js not supported.
Instead change the require of index.js in node_modules/cypress/node_modules/listr2/dist/renderer/default.renderer.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (node_modules/cypress/node_modules/listr2/dist/renderer/default.renderer.js:7:17)
    at Object.<anonymous> (node_modules/cypress/node_modules/listr2/dist/utils/renderer.js:4:28)
    at Object.<anonymous> (node_modules/cypress/node_modules/listr2/dist/lib/task.js:11:20)
    at Object.<anonymous> (node_modules/cypress/node_modules/listr2/dist/listr.js:7:16)
    at Object.<anonymous> (node_modules/cypress/node_modules/listr2/dist/index.js:13:14)
    at Object.<anonymous> (node_modules/cypress/lib/tasks/install.js:10:5)
    at Object.<anonymous> (node_modules/cypress/index.js:12:5) {
  code: 'ERR_REQUIRE_ESM'
```

This seems to be related to the package `wrap-ansi`.

## Solution

I first printed all the versions of the package that is installed:

```sh
npm ls wrap-ansi
```

Output:

```
├─┬ @badeball/cypress-cucumber-preprocessor@18.0.6
│ ├─┬ glob@10.3.10
│ │ └─┬ jackspeak@2.3.6
│ │   └─┬ @isaacs/cliui@8.0.2
│ │     └── wrap-ansi@8.1.0 deduped invalid: "^7.0.0" from node_modules/cypress/node_modules/listr2, "^7.0.0" from node_modules/cliui
```

Then I set [resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) in `package.json`:

```json
{
  "resolutions": {
    "wrap-ansi": "^7.0.0"
  }
}
```

Once `wrap-ansi` is set to the version that `npm ls` expects, `npm install` should now work:

```sh
npm install
```
