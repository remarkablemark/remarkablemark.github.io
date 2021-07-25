---
layout: post
title: JavaScript UTC date string
date: 2021-04-28 16:56:03
excerpt: How to generate a UTC date string in JavaScript and Node.js.
categories: javascript nodejs date
---

How to generate a [UTC](https://wikipedia.org/wiki/Coordinated_Universal_Time) date string in [JavaScript](https://wikipedia.org/wiki/JavaScript) and [Node.js](https://nodejs.org/).

## Node.js

Enter the `node` [REPL](https://nodejs.org/api/repl.html):

```sh
node
```

Generate new [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date):

```js
new Date();
```

Or call [`toISOString`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString):

```js
new Date().toISOString();
```

See example:

```sh
node
Welcome to Node.js v16.1.0.
Type ".help" for more information.
> new Date()
2021-04-28T20:49:52.578Z
> new Date().toISOString()
'2021-04-28T20:49:54.488Z'
```

## Browser

Open browser `Console` via Developer Tools and run:

```js
new Date().toISOString();
```

The date string will be formatted like:

```
YYYY-MM-DDTHH:mm:ss.sssZ
```
