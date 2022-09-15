---
layout: post
title: Get textarea value on change
date: 2020-10-20 22:00:04
excerpt: How to get textarea value on input or change event using JavaScript.
categories: html javascript
---

Given a [`textarea`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) element:

```html
<textarea></textarea>
```

## Input

To get the textarea value on [input](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) event:

```js
document.querySelector('textarea').addEventListener('input', function (event) {
  console.log(event.target.value);
});
```

This logs the value every time the value changes.

<script async src="https://jsfiddle.net/remarkablemark/ms0bqf9L/embed/result,js,html/"></script>

## Change

To get the textarea value on [change](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) event:

```js
document.querySelector('textarea').addEventListener('change', function (event) {
  console.log(event.target.value);
});
```

This logs the value after the textarea element loses focus.

<script async src="https://jsfiddle.net/remarkablemark/e2tmLbgw/embed/result,js,html/"></script>
