---
layout: post
title: TypeScript export CommonJS and ES Modules
date: 2020-05-05 21:58:53
excerpt: How to export to both CommonJS and ES Modules in TypeScript.
categories: typescript commonjs es6 modules export
---

> **TL;DR**: To export to both CommonJS and ES Modules in TypeScript, set the default property in the export:
>
> ```ts
> myModule.default = myModule;
> export = myModule;
> ```

## Prerequisites

Install [`typescript`](https://www.npmjs.com/package/typescript) globally (if you haven't already):

```sh
$ npm install --global typescript
```

Given function `myModule`:

```ts
// index.ts
const myModule = () => {};
```

## CommonJS

To export default in CommonJS:

```ts
// index.ts
// ...
export = myModule;
```

Verify the output by running `tsc index.ts`:

```js
// index.js
'use strict';
var myModule = function() {};
module.exports = myModule;
```

This means you can require with CommonJS:

```ts
const myModule = require('./index');
```

But importing with ES Modules will cause the error:

```ts
error TS1259: Module '"index"' can only be default-imported using the 'esModuleInterop' flag

1 import myModule from './index';
         ~~~~~~~~

  index.ts:3:1
    3 export = myModule;
      ~~~~~~~~~~~~~~~~~~
    This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.


Found 1 error.
```

## ES Modules

To export default in ES Modules:

```ts
// index.ts
// ...
export default myModule;
```

Verify the output by running `tsc index.ts`:

```js
// index.js
'use strict';
exports.__esModule = true;
var myModule = function() {};
exports['default'] = myModule;
```

This means you can import with ES Modules:

```ts
import myModule from './index';
```

But requiring with CommonJS means you'll need to use the `default` property:

```ts
const myModule = require('./index').default;
```

## CommonJS + ES Modules

If you try to export both CommonJS and ES Modules:

```ts
// index.ts
// ...
export = myModule;
export default myModule;
```

You'll get the error:

```sh
$ tsc index.ts
index.ts:3:1 - error TS2309: An export assignment cannot be used in a module with other exported elements.

3 export = myModule;
  ~~~~~~~~~~~~~~~~~~


Found 1 error.
```

So how do we allow for interoperability? We can copy [Babel](https://babeljs.io/)'s approach and set the `default` property on the main export object:

```ts
// index.ts
// ...
myModule.default = myModule;
export = myModule;
```

This works for `myModule` since a `Function` is an instance of `Object` in JavaScript.

As a result, you can import with both CommonJS and ES Module syntax:

```js
// CommonJS
const myModule = require('./index');

// ES Modules
import myModule from './index';
```
