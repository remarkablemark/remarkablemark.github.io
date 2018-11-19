---
layout: post
title: How to mock window.location methods
date: 2018-11-17 19:47:17 -4000
excerpt: How to mock or spy on `window.location` methods in Jest tests.
categories: jest test spy mock window
---

## Mock method

You may encounter a scenario where you need to [mock](https://jestjs.io/docs/en/mock-function-api) [`window.location`](https://developer.mozilla.org/docs/Web/API/Location#Methods) methods in your [Jest](https://jestjs.io/) tests:

```js
it('mocks and calls window.location.reload', () => {
  window.location.reload = jest.fn();
  window.location.reload();
  expect(window.location.reload).toHaveBeenCalled();
});
```

However, when you run the test, it fails.

## Spy on method

[Spying on](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) the method does make the test pass:

```js
it('mocks and calls window.location.reload', () => {
  jest.spyOn(window.location, 'reload');
  window.location.reload();
  expect(window.location.reload).toHaveBeenCalled();
});
```

But you'll still get the error in your console:

```
console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
  Error: Not implemented: navigation (except hash changes)
```

This is because [jsdom](https://github.com/jsdom/jsdom) is trying to make the method behave like it would in a browser.

## Mock method (2nd attempt)

To clear the error, the `window.location.reload` property needs to be made [configurable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description) before reassigning it to a [mock function](https://jestjs.io/docs/en/jest-object#jestfnimplementation):

```js
it('mocks and calls window.location.reload', () => {
  Object.defineProperty(window.location, 'reload', {
    configurable: true,
  });
  window.location.reload = jest.fn();
  window.location.reload();
  expect(window.location.reload).toHaveBeenCalled();
});
```

Now when you run the test, it should pass.

## Final solution

Here's the solution but refactored for better organization:

```js
describe('window.location.reload', () => {
  // reference of the original method
  const { reload } = window.location;

  beforeAll(() => {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
    });
    window.location.reload = jest.fn();
  });

  afterAll(() => {
    window.location.reload = reload;
  });

  it('mocks method', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls method', () => {
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
```

You can check out the [Gist](https://gist.github.com/remarkablemark/5cb571a13a6635ab89cf2bb47dc004a3) that inspired this post.
