---
layout: post
title: Jest spyOn function
date: 2018-04-10 19:48:31
excerpt: When writing tests, Jest can be used to spy on functions in a module.
categories: test jest spy function module javascript
---

Given a module that exports functions:

```js
// module.js
export const foo = () => 'foo';
export const bar = () => 'bar';
```

Testing them is easy with [Jest](https://jestjs.io/):

```js
// module.test.js
import { foo, bar } from './module';

describe('foo', () => {
  it('returns "foo"', () => {
    expect(foo()).toBe('foo');
  });
});

describe('bar', () => {
  it('returns "bar"', () => {
    expect(bar()).toBe('bar');
  });
});
```

But what if a function is called within another function?

```js
// module.js
// ...
export const foobar = () => foo() + bar();
```

You can still check the return value explicitly:

```js
// module.test.js
// ...
describe('foobar', () => {
  it('returns "foobar"', () => {
    expect(foobar()).toBe('foobar');
  });
});
```

But there are cases where it's desirable to spy on the function to ensure it was called.

To do that in our example requires a minor modification to our module:

```js
// module.js
// ...
export const foobar = () => main.foo() + main.bar();

const main = {
  foo,
  bar,
  foobar,
};

export default main;
```

Now you can [spy on](https://jestjs.io/docs/jest-object#jestspyonobject-methodname) the function in your test:

```js
// module.test.js
import main, { foo, bar, foobar } from './module';

// ...

describe('foobar', () => {
  let fooSpy;
  let barSpy;

  beforeAll(() => {
    // main.foo === foo
    // main.bar === bar
    fooSpy = jest.spyOn(main, 'foo');
    barSpy = jest.spyOn(main, 'bar');
  });

  it('calls `foo` and `bar`', () => {
    expect(fooSpy).toHaveBeenCalled();
    expect(barSpy).toHaveBeenCalled();
  });

  afterAll(() => {
    // fooSpy.mockReset();
    // barSpy.mockReset();
    fooSpy.mockRestore();
    barSpy.mockRestore();
  });
});
```
