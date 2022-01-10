---
layout: post
title: CSS flexbox reorder elements
date: 2022-01-10 18:00:34
excerpt: How to reorder HTML elements with CSS flexbox.
categories: html css flexbox
---

This post goes over how to reorder elements with [CSS flexbox](https://developer.mozilla.org/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).

## Problem

Given the HTML markup:

```html
<div id="order2">2</div>
<div id="order3">3</div>
<div id="order1">1</div>
```

How does one reorder the elements with CSS flexbox?

## Solution

First wrap the HTML elements in a parent container:

```html
<div id="container">
  <div id="order2">2</div>
  <div id="order3">3</div>
  <div id="order1">1</div>
</div>
```

Then use CSS [flexbox order](https://yoksel.github.io/flex-cheatsheet/#section-order) to control the sequence:

```css
#container {
  display: flex;
  flex-flow: column;
}

#order1 {
  order: 1;
}

#order2 {
  order: 2;
}

#order3 {
  order: 3;
}
```

If there are more elements, add more CSS styles:

```css
#order4 {
  order: 4;
}

#order5 {
  order: 5;
}

/* ... */
```

## Demo

[JSFiddle](https://jsfiddle.net/remarkablemark/he8c1daj/):

<script async src="//jsfiddle.net/remarkablemark/he8c1daj/embed/html,css,result/"></script>
