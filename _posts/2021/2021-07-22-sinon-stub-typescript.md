---
layout: post
title: Sinon Stub with TypeScript
date: 2021-07-22 22:16:06
excerpt: How to use Sinon stubs with TypeScript.
categories: typescript sinon
---

<!--email_off-->

This post goes over how to use Sinon stubs with TypeScript.

## Stub

Given [`@types/sinon`](https://www.npmjs.com/package/@types/sinon) is installed, [stubs](https://sinonjs.org/releases/latest/stubs/) are automatically typed:

```ts
const object = {
  method: (name: string) => name,
};
const methodStub = sinon.stub(object, 'method');
```

### SinonStubbedMember

Use `SinonStubbedMember` to type a stubbed function:

```ts
let methodStub: sinon.SinonStubbedMember<typeof object.method>;
methodStub = sinon.stub(object, 'method');
```

### SinonStub

Use [type assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) to specify a `SinonStub`:

```ts
object.method as sinon.SinonStub;
```

<!--/email_off-->
