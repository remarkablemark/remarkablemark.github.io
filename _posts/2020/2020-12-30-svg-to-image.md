---
layout: post
title: SVG to Image
date: 2020-12-30 21:04:20
updated: 2026-08-16 19:05:40
excerpt: How to convert and download SVG to image (PNG or JPEG) on the frontend.
categories: svg image png jpeg jsfiddle javascript
---

<script async src="https://jsfiddle.net/remarkablemark/fxg4Lvdt/embed/result/"></script>

## Overview

### Breakdown

The steps to save SVG to image are:

1. Load the [SVG](https://developer.mozilla.org/docs/Web/SVG) in the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
2. Draw the SVG as an [image](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/Image) in a [canvas](https://developer.mozilla.org/docs/Web/API/Canvas_API)
3. Trigger a [download](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download)

### Features

The features in my example are:

- Add the ability to resize the SVG in the canvas
- Add the option to update the filename
- Try to retrieve the filename from the SVG `<title>`
- Add the option to change the file extension from `png` to `jpeg`
- Use [HTML5 form validation](https://developer.mozilla.org/docs/Learn/Forms/Form_validation#Using_built-in_form_validation)

### Sample SVG

Here are some sample SVG's you can use to test against the converter:

- [Wikimedia Commons](https://commons.wikimedia.org/wiki/SVG_examples)
- [W3C](https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/)

### Links

- [JSFiddle](https://jsfiddle.net/remarkablemark/fxg4Lvdt/)
- [Gist](https://gist.github.com/remarkablemark/2450678b4118701c2c2231a6358bccb3)
- [SVG to Image](https://remarkablemark.org/svg-to-image/)
