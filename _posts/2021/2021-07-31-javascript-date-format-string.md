---
layout: post
title: Format JavaScript date into yyyy-MM-dd
date: 2021-07-31 22:59:10
excerpt: How to format a JavaScript date into a yyyy-MM-dd (year-month-day) string.
categories: javascript date
---

This post goes over how to format a JavaScript [date](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) into a yyyy-MM-dd (year-month-day) string:

- [ISO String](#iso-string)
- [Locale String](#locale-string)
- [Date Methods](#date-methods)

> Don't forget to adjust your date according to timezone.

## ISO String

With [Date.prototype.toISOString()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString):

```js
new Date().toISOString().split('T')[0];
```

Which is equivalent to:

```js
new Date().toISOString().slice(0, 10);
```

## Locale String

With [Date.prototype.toLocaleDateString()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString):

```js
new Date().toLocaleDateString('en-CA');
```

## Date Methods

With [date instance methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#instance_methods):

```js
function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return [year, month, day].join('-');
}
```
