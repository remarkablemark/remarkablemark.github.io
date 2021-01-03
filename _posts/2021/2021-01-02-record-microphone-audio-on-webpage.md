---
layout: post
title: Record microphone audio on webpage
date: 2021-01-02 20:48:41
excerpt: How to stream and record microphone audio on a webpage using HTML5 and JavaScript.
categories: web audio microphone html javascript
---

The article goes over how to stream and record microphone audio using HTML5 and JavaScript.

## HTML

Add [`<audio>`](https://developer.mozilla.org/docs/Web/HTML/Element/audio) with [`controls`](https://developer.mozilla.org/docs/Web/HTML/Element/audio#controls) and record/stop buttons:

```html
<audio controls></audio>
<button id="record">Record</button>
<button id="stop">Stop</button>
```

## JavaScript

Get the microphone audio using [`MediaDevices.getUserMedia()`](https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia):

```js
var constraints = { audio: true };
navigator.mediaDevices.getUserMedia(constraints);
```

Record the microphone audio with [`MediaRecorder`](https://developer.mozilla.org/docs/Web/API/MediaRecorder):

```js
navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  var mediaRecorder = new MediaRecorder(stream);
  var chunks = [];
  mediaRecorder.addEventListener('dataavailable', function (event) {
    chunks.push(event.data);
  });
});
```

When data is available, store the chunks:

```js
navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  // ...
  var chunks = [];
  mediaRecorder.addEventListener('dataavailable', function (event) {
    chunks.push(event.data);
  });
});
```

When the media recorder is stopped, convert the chunks to a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and set it on `<audio>`:

```js
navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  // ...
  var audio = document.querySelector('audio');
  mediaRecorder.addEventListener('stop', function () {
    var blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    var url = URL.createObjectURL(blob);
    audio.src = url;
    chunks = []; // reset
  });
});
```

When the record button is clicked, start recording:

```js
// ...
document.getElementById('record').addEventListener('click', function () {
  mediaRecorder.start();
});
```

When the stop button is clicked, stop recording:

```js
// ...
document.getElementById('stop').addEventListener('click', function () {
  mediaRecorder.stop();
});
```

## Code

Full example:

```html
<!-- index.html -->
<audio controls></audio>
<button id="record">Record</button>
<button id="stop">Stop</button>
<script>
  var audio = document.querySelector('audio');
  var constraints = { audio: true };

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    var mediaRecorder = new MediaRecorder(stream);
    var chunks = [];

    mediaRecorder.addEventListener('dataavailable', function (event) {
      chunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', function () {
      var blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
      var url = URL.createObjectURL(blob);
      audio.src = url;
      chunks = []; // reset
    });

    document.getElementById('record').addEventListener('click', function () {
      mediaRecorder.start();
    });

    document.getElementById('stop').addEventListener('click', function () {
      mediaRecorder.stop();
    });
  });
</script>
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/record-microphone-audio):

<p>
<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/record-microphone-audio?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
</p>

You will get `Permission denied` when running the Repl.it in an `<iframe>`. You can check out the [demo webpage](https://record-microphone-audio--remarkablemark.repl.co/) instead:

<p>
<iframe height="100px" width="100%" src="https://record-microphone-audio--remarkablemark.repl.co/" allow="microphone" frameborder="no" scrolling="no"></iframe>
</p>

## Resources

- [Using the MediaStream Recording API](https://developer.mozilla.org/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API)
- [Capture Audio and Video in HTML5](https://www.html5rocks.com/en/tutorials/getusermedia/intro/)
- [MDN Web Docs: MediaDevices.getUserMedia()](https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia)
- [Capture webcam video on webpage]({% post_url 2020/2020-12-17-capture-webcam-video-on-webpage %})
