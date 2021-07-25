---
layout: post
title: How to log entire JavaScript object in Node.js REPL
date: 2019-06-21 22:02:22
excerpt: How to log and display the entire JavaScript object in Node.js.
categories: console inspect pojo object json javascript nodejs
---

## Problem

Given we have the **POJO** (Plain Old JavaScript Object):

```js
const obj = {
  1: {
    2: {
      3: {
        4: {}
      }
    }
  }
};
```

When you log the object (in [Node.js](https://nodejs.org/)):

```js
console.log(obj);
```

You get the following:

```js
{ '1': { '2': { '3': [Object] } } }
```

What happened to `{ 4: {} }`?

Node.js formats [`console.log`](https://nodejs.org/api/console.html#console_console_log_data_args) output with [`util.inspect`](https://nodejs.org/api/util.html#util_util_inspect_object_options) so deeply nested objects are replaced with `[Object]`:

```sh
node
> const obj = { 1: { 2: { 3: { 4: {} } } } };
> util.inspect(obj);
'{ \'1\': { \'2\': { \'3\': [Object] } } }'
```

So how can we log the entire object?

## Solution

### util.inspect

With [`util.inspect`](https://nodejs.org/api/util.html#util_util_inspect_object_options), you can recurse through the entire object by setting the option `depth` to `null`:

```js
const util = require('util');
console.log(util.inspect(obj, { depth: null }));
```

```sh
node index.js
{ '1': { '2': { '3': { '4': {} } } } }
```

### console.dir

Alternatively, the same thing can be accomplished with [`console.dir`](https://nodejs.org/api/console.html#console_console_dir_obj_options):

```js
console.dir(obj, { depth: null });
```

### JSON.stringify

Lastly, you can always fallback to [`JSON.stringify`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify):

```js
console.log(JSON.stringify(obj, null, 2));
```

```json
{
  "1": {
    "2": {
      "3": {
        "4": {}
      }
    }
  }
}
```

The only disadvantage of `JSON.stringify` is that it doesn't handle circular references well:

```js
const obj = {};
obj['1'] = obj;
JSON.stringify(obj);
```

```
TypeError: Converting circular structure to JSON
    at JSON.stringify (<anonymous>)
```
