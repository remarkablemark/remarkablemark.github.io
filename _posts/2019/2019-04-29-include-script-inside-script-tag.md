---
layout: post
title: How to include a script inside a script tag
date: 2019-04-29 20:34:24
excerpt: Three ways to include a script inside of an HTML script tag.
categories: html script javascript
---

What if you needed to [`document.write`](https://developer.mozilla.org/docs/Web/API/Document/write) a script within a [script element](https://developer.mozilla.org/docs/Web/HTML/Element/script) like below:

```html
<script>
  document.write('<script src="file.js"></script>');
</script>
```

Unfortunately, it will fail to parse since the `</script>` inside the JavaScript literal would be interpreted as a closing tag.

Essentially, the HTML parser would interpret the markup as:

```html
<script>
  document.write('<script src="file.js">
</script>
');</script>
```

So how can you prevent this behavior?

### Solution 1

You can split the `</script>` string:

```html
<script>
  document.write('<script src="file.js"></' + 'script>');
</script>
```

### Solution 2

You can replace `<` with `\x3C`:

```html
<script>
  document.write('\x3Cscript src="file.js">\x3C/script>');
</script>
```

### Solution 3

You can append a script element:

```html
<script>
  var script = document.createElement('script');
  script.src = 'file.js';
  document.write(script.outerHTML);
</script>
```
