---
layout: post
title: 'TypeScript: type unknown properties'
date: 2021-04-17 21:14:22
excerpt: How to type unknown object properties in TypeScript.
categories: typescript object
---

Given a JavaScript object with unknown property names but known property values, how can we type the object in [TypeScript](https://www.typescriptlang.org/)?

## Object Literal

Unknown properties for [object literals](https://www.typescriptlang.org/docs/handbook/2/objects.html) can be typed like so:

```ts
// index.ts
type Props = {
  [key: string]: string;
};
```

Example use case:

```ts
const props: Props = {
  id: 'foo',
};
```

## Record

The [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype) utility type also works as an alternative here:

```ts
// index.ts
type Props = Record<string, string>;
```

Example use case:

```ts
const props: Props = {
  id: 'foo',
};
```

## Intersection

To type both known and unknown properties, use [intersection types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types):

```ts
// index.ts
type Props = Record<string, string> & {
  style: Record<string, string>;
};
```

Example use case:

```ts
const props: Props = {
  id: 'foo',
  style: {
    color: '#bada55',
  },
};
```
