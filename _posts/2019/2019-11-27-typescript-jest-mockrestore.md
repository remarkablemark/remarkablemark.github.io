---
layout: post
title: Call Jest mockRestore in TypeScript
date: 2019-11-27 22:46:04
excerpt: How to call `mockRestore` on a Jest spy instance in TypeScript.
categories: jest spy mock mockRestore typescript test
---

## Problem

I was trying to invoke [`mockRestore()`](https://jestjs.io/docs/en/mock-function-api.html#mockfnmockrestore) on a [Jest spy](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname):

```ts
jest.spyOn(Date, 'now');
Date.now.mockRestore();
```

However, [TypeScript](https://www.typescriptlang.org/) throws the error:

```
2339[QF available]: Property 'mockRestore' does not exist on type '() => number'.
```

## Attempt

So I tried doing a [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions):

```ts
(Date.now as jest.SpyInstance).mockRestore();
```

But that still didn't work:

```
2352[QF available]: Conversion of type '() => number' to type 'SpyInstance<{}>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first. Property 'mockRestore' is missing in type '() => number'.
```

## Solution

Ultimately, I was able to resolve the error by assigning the spy instance to a variable:

```ts
const spy = jest.spyOn(Date, 'now');
spy.mockRestore();
```

This also means the logic can be organized in setup and teardown blocks:

```ts
let spy: jest.SpyInstance;

beforeAll(() => {
  spy = jest.spyOn(Date, 'now');
});

afterAll(() => {
  spy.mockRestore();
});
```
