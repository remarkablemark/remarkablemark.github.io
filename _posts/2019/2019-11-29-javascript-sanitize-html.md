---
layout: post
title: How to sanitize HTML with JavaScript
date: 2019-11-29 22:51:13
excerpt: How to sanitize HTML with JavaScript (or jQuery) to prevent XSS.
categories: html sanitize javascript jquery xss
---

Given a string with unsanitized HTML:

```js
var unsanitizedHTML = '<script>alert("XSS");</script>';
```

You can sanitize the string using [`innerText`](https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText) and [`innerHTML`](https://developer.mozilla.org/docs/Web/API/Element/innerHTML):

```js
var element = document.createElement('div');
element.innerText = unsanitizedHTML;
var sanitizedHTML = element.innerHTML;
```

This escapes the HTML entities to prevent [XSS (cross-site scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks:

```
&lt;script&gt;alert("XSS");&lt;/script&gt;
```

Helper function:

```js
/**
 * @param {string} text
 * @return {string}
 */
function sanitizeHTML(text) {
  var element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
}
```

You can also clean the string using [jQuery](https://jquery.com/):

```js
var sanitizedHTML = $('<div>').text(unsanitizedHTML).html();
```

Helper function:

```js
/**
 * @param {string} text
 * @return {string}
 */
function sanitizeHTML(text) {
  return $('<div>').text(text).html();
}
```
