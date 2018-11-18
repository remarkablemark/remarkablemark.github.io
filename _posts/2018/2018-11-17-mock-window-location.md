---
layout: post
title: How to mock window.location methods
date: 2018-11-17 19:47:17 -4000
excerpt: How to mock or spy on `window.location` methods in Jest tests.
categories: jest test spy mock window
---

## Mock method

When writing [Jest](https://jestjs.io/) tests, there may be a scenario where you need to mock [window.location](https://developer.mozilla.org/docs/Web/API/Location#Methods) methods:

```js
it('mocks and calls window.location.reload', () => {
  window.location.reload = jest.fn();
  window.location.reload();
  expect(window.location.reload).toHaveBeenCalled();
});
```

However, when the test is run, it fails.

## Spy on method

Spying on the method does make the test pass:

```js
it('mocks and calls window.location.reload', () => {
  jest.spyOn(window.location, 'reload');
  window.location.reload();
  expect(window.location.reload).toHaveBeenCalled();
});
```

But we still get the console error:

```
console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
  Error: Not implemented: navigation (except hash changes)
```

This is because [jsdom](https://github.com/jsdom/jsdom) is trying to make the method behave like it would in a browser.

## Mock method (2nd attempt)

To make the error go away, the property needs to be [configurable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description) and assigned to a mock function:

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

Here's a tidied up example:

```js
describe('window.location.reload', () => {
  // copy of the original method
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

This post was inspired by the [Gist](https://gist.github.com/remarkablemark/5cb571a13a6635ab89cf2bb47dc004a3).
