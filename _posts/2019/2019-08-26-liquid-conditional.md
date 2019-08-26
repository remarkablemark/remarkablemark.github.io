---
layout: post
title: Conditional operation with Liquid
date: 2019-08-26 14:43:56
excerpt: How to perform conditional operation with Liquid template language.
categories: liquid conditional template markup jekyll
---

## Problem

I saw an opportunity to improve my [Liquid](https://shopify.github.io/liquid/) markup when I was updating the following [Jekyll](https://jekyllrb.com/) [layout](https://jekyllrb.com/docs/layouts/):

```html
{% raw %}<time datetime="{{ page.date | date_to_xmlschema }}">
  {{ page.date | date: "%b %d, %Y" }}
</time>{% endraw %}
```

I added a new [FrontMatter](https://jekyllrb.com/docs/front-matter/) field `updated` and I wanted to conditionally render it:

```yml
---
date:    2017-09-23 20:36:38
updated: 2019-08-25 14:16:02 # optional
---
```

## First Attempt

My first attempt was to use [control flow](https://shopify.github.io/liquid/tags/control-flow/):

```html
{% raw %}{% if page.updated %}
  <time datetime="{{ page.updated | date_to_xmlschema }}">
    {{ page.updated | date: "%b %d, %Y" }}
  </time>
{% else %}
  <time datetime="{{ page.date | date_to_xmlschema }}">
    {{ page.date | date: "%b %d, %Y" }}
  </time>
{% endif %}{% endraw %}
```

However, it didn't feel that [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) so I tried assigning a [ternary operator](https://en.wikipedia.org/wiki/%3F:) to a [variable](https://shopify.github.io/liquid/tags/variable/):

```
{% raw %}{% assign date = page.updated ? page.updated : page.date %}{% endraw %}
```

Unfortunately, that didn't work.

## Final Solution

I did some digging and discovering a [comment](https://github.com/Shopify/liquid/issues/236#issuecomment-355624636) that recommended the [default](https://shopify.github.io/liquid/filters/default/) filter:

```
{% raw %}{{ a | default: b }}{% endraw %}
```

That ended up working nicely for my use case so I was able to refactor my markup to the following:

```html
{% raw %}{% assign date = page.updated | default: page.date %}
<time datetime="{{ date | date_to_xmlschema }}">
  {{ date | date: "%b %d, %Y" }}
</time>{% endraw %}
```
