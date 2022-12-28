---
layout: post
title: Socket.IO quickstart
date: 2019-09-27 20:26:57
updated: 2021-10-02 20:47:35
excerpt: How to quickly get started with Socket.IO.
categories: socketio express nodejs javascript
---

This post goes over how to get started with [Socket.IO](https://socket.io/):

- [Express](#express)
- [Socket.IO](#socketio)
- [Demo](#demo)

## Express

Install [express](https://www.npmjs.com/package/express):

```sh
npm install express
```

Create an [express app]({% post_url 2017/2017-01-17-minimal-express-server %}):

```js
// index.js
const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);

const PORT = 3000;
server.listen(PORT, () => console.log('Listening on *:' + PORT));
```

Create directory `public`, which will serve static files:

```sh
mkdir public
```

Create `index.html`:

```sh
echo 'Hello world' > public/index.html
```

Update the express app to [serve the static directory](https://expressjs.com/en/starter/static-files.html):

```js
// index.js
// ...
app.use(express.static('public'));
```

Start the server:

```sh
node index.js
```

Go to `localhost:3000` in your browser to see `Hello world`:

```sh
open http://localhost:3000/
```

## Socket.IO

Install [socket.io](https://www.npmjs.com/package/socket.io):

```sh
npm install socket.io
```

Add Socket.IO to the [server](https://socket.io/docs/v4/server-initialization/):

```js
// index.js
// ...
const Server = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
```

Add Socket.IO to the [client](https://socket.io/docs/v4/client-initialization/):

```html
<!-- public/index.html -->
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
  socket.on('connect', function () {
    console.log('User connected');
  });
</script>
```

Press [`Ctrl-C`](https://wikipedia.org/wiki/Control-C) to stop the server and then restart the server:

```sh
node index.js
```

Refresh the page to see messages show up in your browser and terminal console.

You can start [sending and receiving events](https://socket.io/docs/v4/emitting-events/)!

## Demo

[Replit](https://replit.com/@remarkablemark/socketio-quickstart#package.json) example:

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/socketio-quickstart?lite=true#package.json" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
