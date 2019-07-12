---
layout: post
title: Override element property in TypeScript
date: 2019-07-11 22:42:09
excerpt: How to override element property `offsetHeight` in TypeScript in jsdom test environment.
categories: typescript javascript jsdom test
---

I was trying to override element property [`offsetHeight`](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetHeight) in my [jsdom](https://github.com/jsdom/jsdom) tests:

```ts
const element = document.createElement('div');
element.offsetHeight = 42;
```

But I received the TypeScript diagnostic error:

```
error TS2540: Cannot assign to 'offsetHeight' because it is a constant or a read-only property.
```

To resolve the error, I ended up using [`Object.defineProperty`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) to override the `offsetHeight` getter:

```ts
Object.defineProperty(element, 'offsetHeight', {
  get() {
    return 42;
  }
});
```

Now the test compiles and runs!
