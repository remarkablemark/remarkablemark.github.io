---
layout: post
title: How to simulate sleep in JavaScript
date: 2022-07-23 13:44:44
excerpt: How to simulate sleep in JavaScript.
categories: javascript
---

This post goes over how to simulate sleep in JavaScript.

## Sleep

Function:

```js
async function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}
```

## Usage

Example:

```js
(async () => {
  console.log('Start');
  await sleep(5); // sleep 5 seconds
  console.log('End');
})();
```
