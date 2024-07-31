---
layout: post
title: Understanding JavaScript import and export
date: 2024-07-31 15:49:15
excerpt: Understanding how JavaScript import and export works.
categories: javascript import export
---

This post goes over how JavaScript `import` and `export` works.

## Module

Let's say you have a module `child.mjs`:

```js
// child.mjs
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}
```

And you have a module `parent.mjs`:

```js
// parent.mjs
console.log(typeof add);
```

What happens when you run `parent.mjs`?

```sh
node parent.mjs
```

It outputs `undefined`:

```
undefined
```

## Export

To export a value, you need to use the `export` keyword:

```js
// child.mjs
export function add(a, b) {
  return a + b;
}
// ...
```

## Import

To import a value, you need to use the `import` keyword:

```js
// parent.mjs
import { add } from './child.mjs';

console.log(typeof add);
```

When you run `parent.mjs`?

```sh
node parent.mjs
```

It outputs `function`:

```
function
```

## Multiple

You should notice that you cannot import `subtract` since it's not exported, so let's export it:

```js
// child.mjs
// ...
export function subtract(a, b) {
  return a - b;
}
```

To import multiple values from a module, use the `*` keyword:

```js
// parent.mjs
import * as child from './child.mjs';

console.log(child);
```

Run `parent.mjs`:

```sh
node parent.mjs
```

And see the output:

```
[Module: null prototype] {
  add: [Function: add],
  subtract: [Function: subtract]
}
```

What if you want to export an import?

```js
// parent.mjs
import { add } from './child.mjs';

export { add };
```

Alternatively:

```js
// parent.mjs
export { add } from './child.mjs';
```

To export all values:

```js
// parent.mjs
export * from './child.mjs';
```

This means another module can import from `child.mjs`:

```js
// grandparent.mjs
import { add, subtract } from './parent.mjs';
```

## Default

Lastly, there's default export:

```js
// child.mjs
export default function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

To import the default export:

```js
// parent.mjs
import add from './child.mjs';
```

To import the default and named export:

```js
// parent.mjs
import add, { subtract } from './child.mjs';
```
