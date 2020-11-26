---
layout: post
title: Set browser cookie using JavaScript
date: 2020-11-25 22:36:54
excerpt: How to set a browser cookie using JavaScript.
categories: browser cookie javascript
---

> **TL;DR**: execute in console to set cookie name `NAME` and value `VALUE`:
>
> ```js
> document.cookie = 'NAME=VALUE; path=/';
> ```

Did you know you can set a [document cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) without a browser extension?

This is done by executing JavaScript code in the browser console.

## Console

Open the browser console:

1. Right-click the webpage
2. Select `Inspect`/`Inspect Element`
3. Go to the `Console` panel

## Code

Given a cookie with name `NAME` and value `VALUE`, the JavaScript code will look like:

```js
document.cookie = 'NAME=VALUE; path=/';
```

> `path=/` ensures the cookie is not limited to the current path of the document location. See [options](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Syntax).

Paste the JavaScript code in the browser `Console` and hit Enter to execute it.

To see all cookies, run the following JavaScript code in the browser `Console`:

```js
console.log(document.cookie);
```
