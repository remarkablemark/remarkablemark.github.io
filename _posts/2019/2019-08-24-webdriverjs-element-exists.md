---
layout: post
title: 'WebDriverJS: Check if element exits'
date: 2019-08-24 18:52:30
excerpt: How to check if an element exists with WebDriverJS (Selenium Webdriver for Node.js).
categories: selenium webdriver webdriverjs nodejs javascript
---

> This article assumes you have a [driver]({% post_url 2016/2016-11-25-webdriverjs-launch-browser %}) initialized.

There are 2 ways to check if an element exists with [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs):

1. [findElement](#findelement)
2. [findElements](#findelements)

## findElement

You can use [findElement](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Driver.html#findElement) to check if `NoSuchElementError` is thrown:

```js
driver
  .findElement({
    className: 'nonexistent-class',
  })
  .catch(error => {
    if (error.name === 'NoSuchElementError') {
      // handle when element is not found
    }
  });
```

_Note_: This can also be written with `then` instead of `catch`:

```js
driver
  .findElement({
    className: 'nonexistent-class',
  })
  .then(null, error => {
    if (error.name === 'NoSuchElementError') {
      // handle when element is not found
    }
  });
```

## findElements

You can use [findElements](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Driver.html#findElements) to check if the length of elements is 0:

```js
driver
  .findElements({
    className: 'nonexistent-class',
  })
  .then(elements => {
    if (elements.length === 0) {
      // handle when element is not found
    }
  });
```
