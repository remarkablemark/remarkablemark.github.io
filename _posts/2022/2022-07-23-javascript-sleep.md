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

## Demo

[Replit](https://replit.com/@remarkablemark/JavaScript-sleep#index.js):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/JavaScript-sleep?lite=true#index.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
