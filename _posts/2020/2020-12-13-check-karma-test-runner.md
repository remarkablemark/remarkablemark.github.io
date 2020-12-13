---
layout: post
title: Check if test is running Karma
date: 2020-12-13 14:57:00
excerpt: How to check if your JavaScript test is running Karma.
categories: karma javascript test
---

To check if your JavaScript test is running [Karma](https://karma-runner.github.io/latest/index.html), verify that `window.__karma__` exists:

```js
function isKarma() {
  return typeof window === 'object' && typeof window.__karma__ === 'object';
}
```
