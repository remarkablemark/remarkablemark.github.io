---
layout: post
title: JavaScript detect touchscreen
date: 2026-08-16 19:00:26
excerpt: How to detect touchscreen with JavaScript.
categories: javascript touchscreen
---

## Modern browsers

For modern browsers, check for `(pointer: coarse)`:

```js
window.matchMedia?.('(pointer: coarse)').matches;
```

## Legacy browsers

For older browsers, check for any touch:

```js
'ontouchstart' in window || navigator.maxTouchPoints > 0;
```
