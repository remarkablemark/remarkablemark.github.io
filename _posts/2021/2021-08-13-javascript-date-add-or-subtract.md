---
layout: post
title: Add or subtract JavaScript date
date: 2021-08-13 21:03:44
excerpt: How to add or subtract a JavaScript date.
categories: javascript date
---

This post goes over how to add or subtract a JavaScript [date](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date).

## Add

To add 1 day to today (now):

```js
const date = new Date();
date.setDate(date.getDate() + 1);
```

To add 2 months to tomorrow:

```js
const date = new Date();
date.setDate(date.getDate() + 1);
date.setMonth(date.getMonth() + 2);
```

To add 42 days to `2020-04-20`:

```js
const date = new Date('2020-04-20');
date.setDate(date.getDate() + 42);
```

## Subtract

To subtract 1 day from today (now):

```js
const date = new Date();
date.setDate(date.getDate() - 1);
```

To subtract 2 months from yesterday:

```js
const date = new Date();
date.setDate(date.getDate() - 1);
date.setMonth(date.getMonth() - 2);
```

To subtract 42 days from `2020-04-20`:

```js
const date = new Date('2020-04-02');
date.setDate(date.getDate() - 42);
```
