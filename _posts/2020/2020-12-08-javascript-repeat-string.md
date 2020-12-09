---
layout: post
title: JavaScript repeat string
date: 2020-12-08 19:23:08
excerpt: How to repeat a string in JavaScript.
categories: javascript string
---

## Built-in

To repeat a string a number times in JavaScript, use the built-in [`String.prototype.repeat()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/repeat).

Here's an example that repeats `Na` 16 times:

```js
'Na'.repeat(16) + ' Batman!'; // 'NaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNa Batman!'
```

This method is [supported](https://caniuse.com/mdn-javascript_builtins_string_repeat) across all browers except [IE](https://en.wikipedia.org/wiki/Internet_Explorer_11). If you can't wait until Internet Explorer is deprecated (August 17, 2021), you can write your own function or [polyfill](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/repeat#Polyfill).

## Function

To repeat a string N times using a custom function:

```js
/**
 * Repeat a string N times.
 *
 * @param  {string} string
 * @param  {number} [count]
 * @return {string}
 */
function repeat(string, count) {
  if (!string || !count) {
    return '';
  }
  return Array(count + 1).join(string);
}
```

## Combination

To combine the built-in method and the custom function into one:

```js
/**
 * Repeat a string N times.
 *
 * @param  {string} string
 * @param  {number} [count]
 * @return {string}
 */
function repeat(string, count) {
  if (!string || !count) {
    return '';
  }
  if (typeof string.repeat === 'function') {
    return string.repeat(count);
  }
  return Array(count + 1).join(string);
}
```
