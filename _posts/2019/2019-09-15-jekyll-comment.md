---
layout: post
title: Jekyll comment
date: 2019-09-15 14:05:47
excerpt: How to comment something out in a Jekyll project.
categories: jekyll liquid markdown kramdown comment
---

There are 3 ways to _comment_ out text or code in a [Jekyll](https://jekyllrb.com/) project:

1. [HTML](#html)
2. [Liquid](#liquid)
3. [kramdown](#kramdown)

## HTML

To make an [HTML comment](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML/Getting_started#HTML_comments):

```html
<!-- My comment -->
```

## Liquid

To make a [Liquid comment](https://shopify.github.io/liquid/tags/comment/):

```liquid
{% raw %}{% comment %}My comment{% endcomment %}{% endraw %}
```

## kramdown

To make a [kramdown comment](https://kramdown.gettalong.org/quickref.html#extensions):

```md
{::comment}My comment{:/comment}
```
