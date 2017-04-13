---
layout: post
title: How to prettify a JavaScript object
date: 2017-03-20 04:03:00 -4000
excerpt: How to prettify a POJO (Plain Old JavaScript Object).
categories: javascript pojo json prettify
---

Assuming you have a **POJO** (Plain Old JavaScript Object):

```js
var object = {
    key: 'value'
    // properties...
};
```

[JSON.stringify](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) can be used to prettify the output:

```js
console.log(
    JSON.stringify(object, null, 4);
);
```

If you're using Node.js and your object has **circular references**, you'll want to use something like [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options):

```js
var util = require('util');
console.log(
    util.inspect(object, { depth: null });
);
```
