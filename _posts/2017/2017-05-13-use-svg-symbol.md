---
layout: post
title: Use SVG symbol
date: 2017-05-13 22:28:19 -4000
excerpt: How to use SVG elements multiple times in the same document with symbol.
categories: svg symbol html
---

Let's say you have the following [SVG](https://wikipedia.org/wiki/Scalable_Vector_Graphics):

```html
<svg>
  <circle cx="20" cy="20" r="20" fill="red" />
</svg>
```

How can you re-use it multiple times in the same document without duplicating it?

With [symbol](https://developer.mozilla.org/docs/Web/SVG/Element/symbol), you can do so via template objects.

### Example

Wrap the shape with [`<symbol>`](https://developer.mozilla.org/docs/Web/SVG/Element/symbol) and set an `id` on it:

```html
<svg>
  <symbol id="circle">
    <circle cx="20" cy="20" r="20" fill="red" />
  </symbol>
</svg>
```

Then with [`<use>`](https://developer.mozilla.org/docs/Web/SVG/Element/use), reference the element to render it:

```html
<svg>
  <use xlink:href="#circle" />
</svg>
```

Since the `<svg>` containing `<symbol>` still occupies space on the page, you'll want to remove it from the layout flow:

```html
<svg style="display: none;">
  <symbol id="circle">
    <circle cx="20" cy="20" r="20" fill="red" />
  </symbol>
</svg>
```
