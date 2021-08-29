---
layout: post
title: 'JavaScript: generate SHA-256 hash'
date: 2021-08-29 12:28:46
excerpt: How to generate a SHA-256 hexadecimal hash using Node.js and JavaScript in the browser.
categories: javascript nodejs hash
---

This post goes over how to generate a [SHA-256](https://wikipedia.org/wiki/SHA-2) [hexadecimal hash](https://www.movable-type.co.uk/scripts/sha256.html) using Node.js and JavaScript in the browser:

- [Node.js](#nodejs)
- [Browser](#browser)

## Node.js

To generate a SHA-256 hash in Node.js using [crypto](https://nodejs.org/api/crypto.html#crypto_crypto):

```js
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}
```

Usage:

```js
console.log(hash('foo')); // '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
```

[Demo](https://replit.com/@remarkablemark/Nodejs-SHA-256-hash):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Nodejs-SHA-256-hash?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Browser

To generate a SHA-256 hash in the browser using [SubtleCrypto](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string):

```js
function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  });
}
```

Or written in async/await:

```js
async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}
```

Usage:

```js
hash('foo').then((hex) => console.log(hex)); // '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
```

[Demo](https://replit.com/@remarkablemark/JavaScript-SHA-256-hash):

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/JavaScript-SHA-256-hash?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
