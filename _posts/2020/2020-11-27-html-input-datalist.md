---
layout: post
title: HTML input and datalist
date: 2020-11-27 19:39:18
excerpt: Use HTML datalist to provide autocomplete options for input element.
categories: html input datalist
---

Given [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element:

```html
<input type="text" />
```

The [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) element provides autocomplete options via the [`<option>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) element:

```html
<datalist>
  <option value="" />
</datalist>
```

Here's an example of selecting a range of colors:

```html
<label>Choose color: <input list="colors" /></label>

<datalist id="colors">
  <option value="Red" />
  <option value="Green" />
  <option value="Blue" />
</datalist>
```

See [JSFiddle](https://jsfiddle.net/remarkablemark/nya308kc/):

<script async src="https://jsfiddle.net/remarkablemark/nya308kc/embed/result,html/"></script>

[To get the input value]({% post_url 2020/2020-10-20-textarea-value-change %}) in JavaScript, listen for the `input` or `change` event:

```js
document.querySelector('input').addEventListener('input', function (event) {
  console.log(event.target.value);
});
```
