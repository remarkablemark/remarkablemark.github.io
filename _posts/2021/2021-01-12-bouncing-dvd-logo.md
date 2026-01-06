---
layout: post
title: Bouncing DVD Logo
date: 2021-01-12 19:19:19
excerpt: How to create a bouncing DVD logo website using HTML/CSS/JS and p5.js.
categories: html css javascript p5js
---

<iframe height="600px" width="100%" src="https://remarkablemark.org/Bouncing-DVD-Logo/" scrolling="no" frameborder="no"></iframe>

The site is built with:

- HTML/CSS/JS
- [p5.js](https://p5js.org/)

## Code

- [Replit demo](https://replit.com/@remarkablemark/Bouncing-DVD-Logo)
- [GitHub repository](https://github.com/remarkablemark/Bouncing-DVD-Logo)

## Explanation

Initialize the variables:

```js
var images = [];
var imageIndex = 0;
var position = createVector(0, 0);
var velocity = p5.Vector.fromAngle(45);
velocity.mult(5);
```

During [`preload()`](https://p5js.org/reference/#/p5/preload), load the DVD images:

```js
function preload() {
  for (var i = 1; i < 8; i++) {
    var image = loadImage('assets/dvd' + i + '.svg');
    images.push(image);
  }
}
```

> `dvd1.svg` to `dvd8.svg` are found in the `assets/` directory.

During [`setup()`](https://p5js.org/reference/#/p5/setup), create a canvas with the same width and height as the [`window`](https://developer.mozilla.org/docs/Web/API/Window):

```js
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}
```

During [`draw()`](https://p5js.org/reference/#/p5/draw), move the DVD towards its path and check for boundary collision:

```js
function draw() {
  background('#111');
  var image = images[imageIndex];
  var hasCollision = checkBoundaryCollision(image);
  if (hasCollision) {
    imageIndex++;
    if (imageIndex + 1 > images.length) {
      imageIndex = 0;
    }
    image = images[imageIndex];
  }
  position.add(velocity);
  image(image, position.x, position.y);
}
```

Here's how the boundary collision is checked:

```js
function checkBoundaryCollision(image) {
  var hasCollision = false;

  // left or right collision
  if (position.x < 0 || position.x + image.width > width) {
    velocity.x *= -1;
    hasCollision = true;
  }

  // top or bottom collision
  if (position.y < 0 || position.y + image.height > height) {
    velocity.y *= -1;
    hasCollision = true;
  }

  return hasCollision;
}
```
