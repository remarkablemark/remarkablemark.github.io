---
layout: post
title: Minimal Express Server
date: 2017-01-17 19:06:00
updated: 2020-12-26 16:53:31
excerpt: How to set up a minimal Express web server on Node.js.
categories: server express web nodejs javascript
---

This article goes over how to set up a minimal [Express](https://b.remarkabl.org/express-js) web server.

## Prerequisites

- [Node.js](http://b.remarkabl.org/nodejs-site)

## Server

Install [express](https://www.npmjs.com/package/express):

```sh
$ npm install express
```

Create `index.js`:

```sh
$ touch index.js
```

Require the module:

```js
const express = require('express');
```

Then initialize the app:

```js
const app = express();
```

Create the index route:

```js
app.get('/', (req, res, next) => {
  res.send('<h1>Hello, Express!</h1>');
});
```

> `req` and `res` are abbreviations of **request** and **response**, respectively.

Listen on port `3000`:

```js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
```

Run the server:

```sh
$ node index.js
```

Go to <a href="http://localhost:3000" target="_blank" data-proofer-ignore>http://localhost:3000</a> to access the site.

## Code

`package.json`:

```json
{
  "dependencies": {
    "express": "latest"
  }
}
```

`index.js`:

```js
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Hello, Express!</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
```

## Demo

<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/express?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

The [Repl.it](https://repl.it/@remarkablemark/express) demo includes:

- [morgan](https://www.npmjs.com/package/morgan) (HTTP request logger)
- route not found (404 error)
- error handling (500 internal server error)
