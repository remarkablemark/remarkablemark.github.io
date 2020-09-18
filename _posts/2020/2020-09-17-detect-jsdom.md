---
layout: post
title: Detect jsdom environment
date: 2020-09-17 21:06:13
excerpt: How to detect if your script is running in jsdom.
categories: jsdom nodejs javascript
---

## Node.js

To detect if your script is running in [Node.js]({% post_url 2016/2016-10-13-detect-environment-commonjs %}):

```js
typeof process === 'object' && process.title === 'node';
```

## jsdom

To detect if your script is running in [jsdom](https://github.com/jsdom/jsdom):

```js
typeof window === 'object' && window.name === 'nodejs';
```

Or check the user agent:

```js
typeof navigator === 'object' && navigator.userAgent === 'node.js';
```

See the [issue](https://github.com/jsdom/jsdom/issues/1537) that inspired this post.
