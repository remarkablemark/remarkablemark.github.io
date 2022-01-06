---
layout: post
title: Sinon Testing Best Practices
date: 2022-01-05 20:48:15
excerpt: Sinon best practices for testing spies, stubs, and mocks.
categories: sinon test javascript
---

This post goes over [Sinon](https://sinonjs.org/) testing best practices:

- [sandbox](#sandbox)
- [describe](#describe)
- [each](#each)
- [assert](#assert)
- [match](#match)
- [type](#type)

## sandbox

Create a new [sandbox](https://sinonjs.org/releases/v12.0.1/sandbox/) instead of using the default one.

❌ Bad:

```js
sinon.stub(obj, 'method');
```

✅ Good:

```js
const sandbox = sinon.createSandbox();
sandbox.stub(obj, 'method');
```

## describe

Create a sandbox inside of the `describe` block:

```js
describe(() => {
  const sandbox = sinon.createSandbox();
});
```

This prevents mocked objects from leaking to other tests.

## each

It's good practice to set up and restore all fakes for each test:

```js
beforeEach(() => {
  sandbox.stub(obj, 'method');
});

afterEach(() => {
  sandbox.restore();
});
```

## assert

Use Sinon's built-in [assertions](https://sinonjs.org/releases/v12.0.1/assertions/) to display more robust error messages.

❌ Bad:

```js
expect(spy).toBeCalled(1);
```

✅ Good:

```js
sinon.assert.called(spy);
```

## match

Use [matchers](https://sinonjs.org/releases/v12.0.1/matchers/) to match partial object.

❌ Bad:

```js
expect(spy.getCall(0).args[0].foo).toEqual('bar');
```

✅ Good:

```js
sinon.assert.calledWith(spy, sinon.match({ foo: 'bar' }));
```

## type

When using [TypeScript](https://www.typescriptlang.org/), type the stubbed member:

```ts
let stub: sinon.SinonStubbedMember<typeof obj.method>;
```

Or type cast to a stub:

```ts
stub as Sinon.Stub;
```

Use [Type Assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) if the provided value is different:

```ts
stub.returns(value as string);
```
