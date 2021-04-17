---
layout: post
title: Create stopwatch with HTML/JavaScript
date: 2021-04-16 22:02:46
excerpt: How to create a stopwatch with HTML and JavaScript.
categories: html javascript web stopwatch worker
---

This article goes over how to build a simple stopwatch web app using HTML and JavaScript.

## Seconds

Display seconds with [`setInterval`](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) and [`innerText`](https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText):

```html
<!-- index.html -->
<h1>0</h1>

<script>
  var heading = document.querySelector('h1');
  var seconds = 0;

  setInterval(function () {
    seconds += 1;
    heading.innerText = seconds;
  }, 1000);
</script>
```

## Minutes and Seconds

Display minutes and seconds in the format of `MM:SS` with [`padStart`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/padStart):

```html
<!-- index.html -->
<h1>00:00</h1>

<script>
  var heading = document.querySelector('h1');
  var seconds = 0;

  setInterval(function () {
    seconds += 1;
    heading.innerText = formatTime(seconds);
  }, 1000);

  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return (
      String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')
    );
  }
</script>
```

## Web Worker

If the stopwatch is running but you switch to another tab, you'll notice the stopwatch is slower than expected.

This is because inactive browser tabs have lower priority execution.

To combat this imprecision, use [Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) to run `setInterval` in a separate background thread.

Move the timing logic to `worker.js` but replace set `innerText` with [`postMessage`](https://developer.mozilla.org/docs/Web/API/Worker/postMessage):

```js
// worker.js
var seconds = 0;

setInterval(function () {
  seconds += 1;
  postMessage(formatTime(seconds)); // sends message to worker
}, 1000);

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return (
    String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')
  );
}
```

Update `index.html` to create the worker and listen to [`onmessage`](https://developer.mozilla.org/docs/Web/API/Worker/onmessage):

```html
<!-- index.html -->
<h1>00:00</h1>

<script>
  var heading = document.querySelector('h1');
  var worker = new Worker('worker.js');
  worker.onmessage = function (event) {
    heading.innerText = event.data;
  };
</script>
```

## Demo

[Repl.it](https://replit.com/@remarkablemark/Stopwatch):

<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/Stopwatch?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
