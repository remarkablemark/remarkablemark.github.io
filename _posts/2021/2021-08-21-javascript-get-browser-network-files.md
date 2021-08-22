---
layout: post
title: 'JavaScript: get browser network files'
date: 2021-08-21 20:18:48
excerpt: How to get browser network files using JavaScript's `performance.getEntries()`.
categories: javascript browser
---

Use [`performance.getEntries()`](https://developer.mozilla.org/docs/Web/API/Performance/getEntries) to get a list of network files:

```js
performance.getEntries();
```

To filter files by the `.js` extension:

```js
performance
  .getEntries()
  .map((entry) => entry.name)
  .filter((url) => url.includes('.js'));
```

To filter files by the `.css` extension:

```js
performance
  .getEntries()
  .map((entry) => entry.name)
  .filter((url) => url.includes('.css'));
```
