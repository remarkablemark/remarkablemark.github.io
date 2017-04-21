---
layout: post
title: Create MD5 hash with Node.js
date: 2017-04-21 03:45:00 -4000
excerpt: How to calculate an MD5 hash of a string with Node.js.
categories: nodejs md5 hash
---

Given a string:

```js
var string = 'my string';
```

You can generate an [MD5 hash](https://wikipedia.org/wiki/MD5) like so:

```js
var crypto = require('crypto');
var hash = crypto.createHash('md5').update(string).digest('hex');
console.log(hash);
```

As a reminder, you probably don't want to use the MD5 algorithm for encryption as it can be easily [brute-forced](https://wikipedia.org/wiki/Brute-force_attack).

However, it does serve as a useful checksum to verify data integrity.

Here's a module that calculates MD5 hashes:

{% gist ef52f3fb1c16cf7aaf8aae1fc81aceca %}
