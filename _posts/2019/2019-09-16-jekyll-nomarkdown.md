---
layout: post
title: Jekyll nomarkdown
date: 2019-09-16 20:03:27
excerpt: How to not process markdown in Jekyll with kramdown extension nomarkdown.
categories: jekyll markdown kramdown nomarkdown
---

## Problem

Recently, I tried rendering an `img` before a `script` tag on a [Jekyll](https://jekyllrb.com) [page](https://jekyllrb.com/docs/pages/):

```html
<img />
<script>
  console.log(2 > 1);
</script>
```

However, what was outputted was:

```html
<p>
  <img />
  <script>
    console.log(2 &gt; 1);
  </script>
</p>
```

The `img` and `script` were _wrapped_ in a `p` tag and the `script` contents were _escaped_.

## Solution

It turned out that I needed to _stop processing with **kramdown**_ and _output the content as-is_.

Wrapping `img` with [nomarkdown](https://kramdown.gettalong.org/syntax.html#extensions) extension solved the issue for me:

```html
{::nomarkdown}
<img />
{:/nomarkdown}
<script>
  console.log(2 > 1);
</script>
```
