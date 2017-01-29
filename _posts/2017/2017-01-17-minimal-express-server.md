---
layout: post
title: Minimal Express Server
date: 2017-01-17 19:06:00 -4000
excerpt: How to set up a minimal Node.js server using the Express web framework.
categories: server express web nodejs javascript
---

Let's go over how to set up a minimal [Express](https://b.remarkabl.org/express-js) server. You'll need [Node.js installed](https://b.remarkabl.org/1Rpc056).

First install [express](https://www.npmjs.com/package/express):

```sh
$ npm install express
```

Then create `server.js`:

```sh
$ touch server.js
```

Import the module and initialize your app:

```js
// server.js
var express = require('express');
var app = express();
```

Then create the index route:

```js
app.get('/', function(request, response, next) {
    response.send('<h1>Hello, world!</h1>');
});
```

Make sure that your server is listening to a port:

```js
var PORT = 3000;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});
```

And now you can run the server:

```sh
$ node server.js
```

Your site should be up at [http://localhost:3000](http://localhost:3000) (open the url in a browser). And that's it!
