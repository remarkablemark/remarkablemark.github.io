---
layout: post
title: How to reload a Node.js module
date: 2019-09-02 21:39:07
updated: 2019-09-04 22:38:25
excerpt: How to reload (delete and re-require) a Node.js module during testing.
categories: nodejs module javascript mocha jest
---

Recently, I needed to _reload_ (remove and re-require) a Node.js module during testing.

I found a [Stackoverflow answer](https://stackoverflow.com/questions/15666144/how-to-remove-module-after-require-in-node-js#answer-15666221) that deleted the module from the [require.cache](https://nodejs.org/api/modules.html#modules_require_cache) before requiring it again:

```js
delete require.cache[require.resolve('./path/to/module')];
require('./path/to/module');
```

## Mocha

Applying this approach to my [Mocha](https://mochajs.org/) test:

```js
const myModule = require('./my-module');

beforeEach(() => {
  delete require.cache[require.resolve('./my-module')];
});

it('imports the same module but as a separate instance', () => {
  expect(require('./my-module')).not.toBe(myModule);
});
```

## Jest

[Jest](https://jestjs.io/en/), on the other hand, makes it easy with [`jest.resetModules`](https://jestjs.io/docs/en/jest-object.html#jestresetmodules):

```js
const myModule = require('./my-module');

beforeEach(() => {
  jest.resetModules();
});

it('imports the same module but as a separate instance', () => {
  expect(require('./my-module')).not.toBe(myModule);
});
```

For module isolation, there's [`jest.isolateModules`](https://jestjs.io/docs/en/jest-object.html#jestisolatemodulesfn) which creates a sandbox registry for modules loaded inside a callback function.
