---
layout: post
title: ES modules in the browser
date: 2019-09-20 22:57:56
excerpt: How to use ES modules (ECMAScript 6 modules) in the browser.
categories: es6 ecmascript modules import javascript browser
---

**ES modules** (ECMAScript 6 modules) allows the use of the static [import](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) statement.

## Inline Script

To use ES modules as an _inline script_:

```html
<!-- index.html -->
<script type="module">
  import script from './script.js';
</script>
```

## External Script

To use ES modules as an _external script_:

```html
<!-- index.html -->
<script type="module" src="./script.js"></script>
```

As you can tell in both examples, the `<script>` tag must have the attribute `type="module"` for `import` to work.

## Browser Support

You can find the browser support [here](https://caniuse.com/#feat=es6-module).

## Demo

See the [Replit](https://replit.com/@remarkablemark/ES-modules) demo:

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/ES-modules?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
