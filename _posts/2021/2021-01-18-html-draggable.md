---
layout: post
title: Drag-and-drop with HTML draggable
date: 2021-01-18 17:31:22
updated: 2021-01-19 20:03:20
excerpt: How native drag-and-drop for the web works with the HTML5 draggable attribute.
categories: html javascript draggable youtube livestream
---

On my [2021-01-18 livestream](https://youtu.be/hCsuyZHlUtY?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ), I learned about [drag-and-drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) using the HTML5 [draggable](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#draggableattribute) attribute:

<iframe width="100%" height="720" src="https://www.youtube.com/embed/hCsuyZHlUtY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What I Learned

### draggable

Set [draggable](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#draggableattribute) to `true` to make an element draggable:

```html
<input draggable="true" />
```

### dragstart

Use the [`dragstart`](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event) event attribute to set the [drag data](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragdata):

```html
<input
  draggable="true"
  ondragstart="event.dataTransfer.setData('text', event.target.tagName);"
/>
```

Or add the event listener using JavaScript:

```js
document
  .querySelector('input')
  .addEventListener('dragstart', function onDragStart(event) {
    event.dataTransfer.setData('text', event.target.tagName);
  });
```

### dragover

Use the [`dragover`](https://developer.mozilla.org/docs/Web/API/Document/dragover_event) event attribute to prevent the default action:

```html
<fieldset ondragover="event.preventDefault();"></fieldset>
```

Or add the event listener using JavaScript:

```js
document
  .querySelector('fieldset')
  .addEventListener('dragover', function onDragOver(event) {
    event.preventDefault();
  });
```

### drop

Use the [`drop`](https://developer.mozilla.org/docs/Web/API/Document/drop_event) event attribute to prevent the default action:

```html
<fieldset ondrop="onDrop(event);"></fieldset>
<script>
  function onDrop(event) {
    var tagName = event.dataTransfer.getData('text');
    event.target.appendChild(document.querySelector(tagName));
    event.preventDefault();
  }
</script>
```

Or add the event listener using JavaScript:

```js
document
  .querySelector('fieldset')
  .addEventListener('drop', function onDrop(event) {
    var tagName = event.dataTransfer.getData('text');
    event.target.appendChild(document.querySelector(tagName));
    event.preventDefault();
  });
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/HTML-draggable):

<iframe height="600px" width="100%" src="https://repl.it/@remarkablemark/HTML-draggable?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Links

- [YouTube video](https://youtu.be/hCsuyZHlUtY?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ)
- [W3docs](https://www.w3docs.com/learn-html/html-draggable-attribute.html)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)
