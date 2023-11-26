---
layout: post
title: 'Fix Jest error "ReferenceError: Request is not defined"'
date: 2023-11-26 18:46:17
excerpt: 'How to fix Jest error "ReferenceError: Request is not defined".'
categories: jest
---

## Problem

If you get the [Jest](https://jestjs.io/) error:

```
ReferenceError: Request is not defined
```

This is due to [jsdom](https://github.com/jsdom/jsdom) not supporting [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) (see [#1724](https://github.com/jsdom/jsdom/issues/1724)).

## Solution 1

One approach is to install [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch):

```sh
npm install --save-dev whatwg-fetch
```

And polyfill it in one of Jest's [setupFiles](https://jestjs.io/docs/configuration#setupfiles-array) like `setupTests.js`:

```js
import 'whatwg-fetch';
```

Alternatively, you can install [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch):

```sh
npm install --save-dev isomorphic-fetch
```

And polyfill it in one of Jest's [setupFiles](https://jestjs.io/docs/configuration#setupfiles-array) like `setupTests.js`:

```js
import 'isomorphic-fetch';
```

## Solution 2

If you plan to mock fetch, you can install [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock):

```sh
npm install --save-dev jest-fetch-mock
```

Then enable it one of Jest's [setupFiles](https://jestjs.io/docs/configuration#setupfiles-array) like `setupTests.js`:

```js
require('jest-fetch-mock').enableMocks();
```
