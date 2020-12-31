---
layout: post
title: SVG to Image
date: 2020-12-30 21:04:20
excerpt: Convert and download SVG to image (PNG or JPEG) on the frontend.
categories: svg image png jpeg jsfiddle javascript
---

<script async src="//jsfiddle.net/remarkablemark/fxg4Lvdt/embed/result/"></script>

## Overview

### Inspiration

The [JSFiddle](https://jsfiddle.net/remarkablemark/fxg4Lvdt/) is inspired by the article ["Convert SVG to PNG using your browser"](https://mybyways.com/blog/convert-svg-to-png-using-your-browser).

### Breakdown

The steps to save SVG to image are:

1. Load the [SVG](https://developer.mozilla.org/docs/Web/SVG) in the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
2. Draw the SVG as an [image](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/Image) in a [canvas](https://developer.mozilla.org/docs/Web/API/Canvas_API)
3. Trigger a [download](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download)

### Improvements

The improvements made in my example are:

- Added the ability to resize SVG in canvas
- Added the option to update the filename
- Added the option to change the file extension from `png` to `jpeg`
- Used [HTML5 form validation](https://developer.mozilla.org/docs/Learn/Forms/Form_validation#Using_built-in_form_validation)
- Prevented memory leaks by cleaning up event listeners
- Improved accessibility
- Stopped supporting older browsers

### Sample SVG

Here are some sample SVG's you can use to test against the converter:

- [Wikimedia Commons](https://commons.wikimedia.org/wiki/SVG_examples)
- [W3C](https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/)

### Code

See [JSFiddle](https://jsfiddle.net/remarkablemark/fxg4Lvdt/) or [Gist](https://gist.github.com/remarkablemark/2450678b4118701c2c2231a6358bccb3).
