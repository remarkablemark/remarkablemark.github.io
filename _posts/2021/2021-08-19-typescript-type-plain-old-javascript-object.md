---
layout: post
title: 'TypeScript: how to type a POJO'
date: 2021-08-19 20:25:24
excerpt: How to type a Plain Old JavaScript Object (POJO) in TypeScript.
categories: typescript pojo
---

This post goes over how to type a Plain Old JavaScript Object (POJO) in [TypeScript](https://www.typescriptlang.org/):

- [Interface](#interface)
- [Type Alias](#type-alias)
- [Record](#record)

See [playground](https://www.typescriptlang.org/play?#code/PTAEEkDsBcFMCcBmBDAxrAUASxgl6IB5AIwCtZVpQBvDUUAbQGtYBPALlAGdp4cBzALqdkkVgG4MAX0kZUAe0g9Q8shWgBGTuBLlKoALw06oRPPmcA5MWTxLAGmmyQoACqsADrFABBADZYyFwY0J7euuruXobG9MxsnDx8kEIiYpIyGHKKyqp60ABMnBGUUd5GtPRmFqDWtg5OWS4AShTy8AAm2UpUeeoAzJytCp0APEkC9qCirAB8MZWm5lY2do6ZQA).

## Interface

To type a POJO using an [interface](https://www.typescriptlang.org/docs/handbook/2/objects.html):

```ts
interface IObject {
  [key: string]: any;
}
```

Usage example:

```ts
const object1: IObject = {
  foo: 'bar',
};
```

## Type Alias

To type a POJO using a [type alias](https://www.typescriptlang.org/docs/handbook/2/objects.html):

```ts
type ObjectType = {
  [key: string]: any;
};
```

Usage example:

```ts
const object2: ObjectType = {
  foo: 'bar',
};
```

## Record

To type a POJO using a [record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype):

```ts
Record<string, any>;
```

Usage example:

```ts
const object3: Record<string, any> = {
  foo: 'bar',
};
```
