---
layout: post
title: Capture webcam video on webpage
date: 2020-12-17 16:05:23
updated: 2021-01-02 20:30:04
excerpt: How to capture and stream webcam video on a webpage using HTML5 and JavaScript.
categories: web video html javascript
---

The article goes over how to stream webcam video using HTML5 and JavaScript.

## HTML

Add [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video) with [`autoplay`](https://developer.mozilla.org/docs/Web/HTML/Element/video#attr-autoplay) enabled:

```html
<video autoplay></video>
```

## JavaScript

Stream the video media using [`MediaDevices.getUserMedia()`](https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia):

```js
var constraints = { video: true };
var video = document.querySelector('video');
navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  video.srcObject = stream;
});
```

## Code

Full example:

```html
<!-- index.html -->
<video autoplay></video>
<script>
  var constraints = { video: true };
  var video = document.querySelector('video');
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
  });
</script>
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/webcam-video):

<p>
<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/webcam-video?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
</p>

If you get `Requested device not found`, this is because:

- your webcam is disabled.

If you get `Permission denied`, this is because:

- the `<iframe>` isn't able to call `getUserMedia()` due to security permissions, or
- you [blocked the site from accessing your camera](https://support.google.com/chrome/answer/2693767).

Check out the [demo webpage](https://webcam-video.remarkablemark.repl.co/) instead:

<iframe height="500px" width="100%" src="https://webcam-video.remarkablemark.repl.co/" allow="camera" frameborder="no"></iframe>

## Resources

- [Capture Audio and Video in HTML5](https://www.html5rocks.com/en/tutorials/getusermedia/intro/)
- [MDN Web Docs: MediaDevices.getUserMedia()](https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia)
