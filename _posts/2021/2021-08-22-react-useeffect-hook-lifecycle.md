---
layout: post
title: React useEffect hook lifecycle
date: 2021-08-22 14:16:57
excerpt: Understanding React useEffect hook lifecycle.
categories: react
---

This post goes over the React [useEffect](https://reactjs.org/docs/hooks-effect.html) hook lifecycle:

- [Mount](#mount)
- [Update](#update)
- [Unmount](#unmount)

## Prerequisites

Import `useEffect`:

```js
import { useEffect } from 'react';
```

## Mount

Component did mount:

```js
useEffect(() => {
  console.log('mount');
}, []);
```

## Update

Component did update:

```js
useEffect(() => {
  console.log('update');
});
```

Component did update on data change:

```js
useEffect(() => {
  console.log('update on data change');
}, [data]);
```

Component will unmount or did update on data change:

```js
useEffect(() => {
  return () => {
    console.log('update on data change or unmount');
  };
}, [data]);
```

## Unmount

Component will unmount:

```js
useEffect(() => {
  return () => {
    console.log('unmount');
  };
}, []);
```
