---
layout: post
title: "Get URL's of files loaded by the browser"
date: 2021-04-06 21:27:29
excerpt: How to get the URL's of files loaded by the browser using JavaScript.
categories: javascript browser
---

Use [`performance.getEntries()`](https://developer.mozilla.org/docs/Web/API/Performance/getEntries) to get a list of resources loaded in the browser:

```js
performance.getEntries();
```

## Stylesheet

To get the stylesheet URL's loaded in the browser:

```js
performance
  .getEntries()
  .map(entry => entry.name)
  .filter(url => url.includes('.css'));
```

## Scripts

To get the script URL's loaded in the browser:

```js
performance
  .getEntries()
  .map(entry => entry.name)
  .filter(url => /\.js$/.test(url));
```
