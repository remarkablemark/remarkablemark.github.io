---
layout: post
title: How to use Redis with Node.js (ioredis)
date: 2022-03-18 20:34:27
excerpt: How to use Redis with Node.js via npm package ioredis.
categories: redis nodejs ioredis
---

This article goes over how to use [Redis](https://redis.io/) with [Node.js](https://nodejs.org/) via npm package [ioredis](https://github.com/luin/ioredis).

## Install

Install [ioredis](https://www.npmjs.com/package/ioredis):

```sh
npm install ioredis
```

## Connect

Import Redis:

```js
const Redis = require('ioredis');
```

Connect to Redis with options:

```js
const redis = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
```

For example, to connect to local Redis:

```js
const redis = new Redis({
  host: 'localhost',
  port: 6379,
});
```

Alternatively, Redis can be connected with a URL string:

```js
const redis = new Redis(process.env.REDIS_URL);
```

The URL string has the format:

```
redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>
```

So the local Redis URL is:

```
redis://localhost:6379
```

## Commands

### set

Set key with value:

```js
await redis.set('key', 'value'); // returns 'OK'
```

### get

Get value from key:

```js
await redis.get('key'); // returns 'value'
```

### del

Delete key-value pair:

```js
await redis.del('key'); // returns 1
```

Delete multiple key-value pairs:

```js
await redis.del(['key1', 'key2']);
```

> `del` doesn't allow pattern matching (`*`).

### keys

Search by key:

```js
await redis.keys('key'); // returns ['key']
```

Search by keys:

```js
await redis.keys('key1', 'key2');
await redis.keys(['key1', 'key2']);
```

Search by pattern:

```js
await redis.keys('k*'); // returns ['key']
```

Get all keys:

```js
await redis.keys('*'); // returns ['key']
```

### scan

Scan performs better than `keys` if there's a lot of data:

```js
await redis.scan(0, 'MATCH', '*'); // returns ['0', ['key']]
```

[`scanStream`](https://github.com/luin/ioredis#streamify-scanning) creates a [ReadableStream](https://nodejs.org/api/stream.html):

```js
const stream = redis.scanStream({ match: '*' });
let keys = [];

stream.on('data', (resultKeys) => {
  keys = keys.concat(resultKeys);
});

stream.on('end', () => {
  console.log(keys); // returns ['key']
});

stream.on('error', (error) => {
  throw error;
});
```

## Demo

[Replit](https://replit.com/@remarkablemark/ioredis):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/ioredis?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
