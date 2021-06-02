---
layout: post
title: 'Jekyll: Copy code to clipboard'
date: 2021-06-01 21:13:22
excerpt: 'How to add a "Copy" code to clipboard button to a Jekyll site.'
categories: jekyll javascript html css
---

This post goes over how to add a "Copy" code to clipboard button to a Jekyll site. It's inspired by the functionality on [Docusaurus](https://docusaurus.io/) and [GitHub](https://github.com/).

## Copy button

Code blocks rendered by the rouge highlighter have the `highlight` class on the `<pre>` element:

```js
var codeBlocks = document.querySelectorAll('pre.highlight');
```

Create the copy button element:

```js
var copyButton = document.createElement('button');
copyButton.type = 'button';
copyButton.ariaLabel = 'Copy code to clipboard';
copyButton.innerText = 'Copy';
```

Append it to the code block:

```js
codeBlock.append(copyButton);
```

The button shouldn't show by default:

```css
pre.highlight > button {
  opacity: 0;
}
```

On code block hover, show the button:

```css
pre.highlight:hover > button {
  opacity: 1;
}
```

On button active or focus, show it:

```css
pre.highlight > button:active,
pre.highlight > button:focus {
  opacity: 1;
}
```

On click, [copy the code to the clipboard](https://developer.mozilla.org/docs/Web/API/Clipboard/writeText):

```js
codeBlocks.forEach(function (codeBlock) {
  // ...
  copyButton.addEventListener('click', function () {
    var code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);
  });
});
```

Provide feedback when it's copied:

```js
copyButton.innerText = 'Copied';
var fourSeconds = 4000;

setTimeout(function () {
  copyButton.innerText = 'Copy';
}, fourSeconds);
```

## Code

Include the JavaScript in `_layouts/post.html`.

```js
// assets/js/post.js
var codeBlocks = document.querySelectorAll('pre.highlight');

codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerText = 'Copy';

  codeBlock.append(copyButton);

  copyButton.addEventListener('click', function () {
    var code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);

    copyButton.innerText = 'Copied';
    var fourSeconds = 4000;

    setTimeout(function () {
      copyButton.innerText = 'Copy';
    }, fourSeconds);
  });
});
```

Import the Sass in `assets/css/style.scss`:

```css
/* _sass/_post.css */
pre.highlight > button {
  opacity: 0;
}

pre.highlight:hover > button {
  opacity: 1;
}

pre.highlight > button:active,
pre.highlight > button:focus {
  opacity: 1;
}
```

Check out the [code example](https://github.com/remarkablemark/remarkablemark.github.io/commit/614f16f).
