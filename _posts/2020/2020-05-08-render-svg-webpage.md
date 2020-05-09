---
layout: post
title: Render SVG on webpage
date: 2020-05-08 22:35:19
excerpt: How to render SVG on a webpage using inline SVG, image, image data URI, CSS data URI, and base64 data URI.
categories: svg image data uri css base64
---

There are several ways to render an SVG on a webpage:

- [Inline SVG](#inline-svg)
- [Image](#image)
- [Data URI](#data-uri)
  - [Image](#image-1)
  - [CSS](#css)
  - [Base64](#base64)

## Inline SVG

Given an SVG of a magenta square:

<svg width="50" height="50"><rect width="50" height="50" style="fill: #b0b;" /></svg>

To inline SVG, all you need to do is to insert it into the HTML:

```html
<svg>
  <rect width="50" height="50" style="fill: #b0b;" />
</svg>
```

## Image

If the SVG is a file:

```
https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/svg.svg
```

It can be loaded as an image:

```html
<img src="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/svg.svg" />
```

## Data URI

Inlining an SVG in the [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) is another way to render it. The advantage is it loads faster (since there's no request). The disadvantage is it can't be cached and the size is larger than the original.

### Image

To embed an SVG in an [image data URI](https://css-tricks.com/lodge/svg/09-svg-data-uris/):

```html
<img
  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='50' height='50' /></svg>"
/>
```

The [data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme) is as follows:

```
data:[<media-type>][;charset],<data>
```

> Note: I left `charset` blank in my example.

As a result, the following is required for the image to render correctly:

```
data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><!-- content --></svg>
```

However, there's a [catch](#encoding).

### CSS

To embed an SVG in a [CSS background-image](https://css-tricks.com/lodge/svg/09-svg-data-uris/):

```css
.square {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" /></svg>');
}
```

However, there's a [catch](#encoding).

### Encoding

The one catch with data URI is that certain characters need to be [encoded](https://en.wikipedia.org/wiki/Percent-encoding).

For example, the following image will fail to load:

```html
<img
  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='50' height='50' style='fill: #b0b;' /></svg>"
/>
```

The reason is because of the reserved `#` character. If `#` is replaced with `%23`, the image will render.

### Base64

Converting the SVG to [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) is one way to go around encoding issues:

```html
<img
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPSc1MCcgaGVpZ2h0PSc1MCcgc3R5bGU9J2ZpbGw6ICNiMGI7JyAvPjwvc3ZnPg=="
/>
```

Here, we had to specify the `base64` charset in the data URI scheme.

The one disadvantage of base64 is that the data becomes more than 2x larger.

## Demo

<script async src="//jsfiddle.net/remarkablemark/r6q59Ljn/embed/html,css,result/"></script>
