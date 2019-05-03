---
layout: post
title: How to mock window.location methods
date: 2018-11-17 19:47:17 -4000
excerpt: How to mock or spy on `window.location` methods in Jest tests.
categories: jest test spy mock window javascript
---

There may be a scenario where you need to [mock](https://jestjs.io/docs/en/mock-function-api) a method from [`window.location`](https://developer.mozilla.org/docs/Web/API/Location#Methods) in your [Jest](https://jestjs.io/) tests:

```js
it('mocks and calls window.location.reload', () => {
  window.location.reload = jest.fn();
  window.location.reload();
  expect(window.location.reload).toHaveBeenCalled();
});
```

If you run the test above, it unfortunately fails.

## Spy on method

While [spying](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) on the method does make the test pass:

```js
// window.location.reload = jest.fn();
jest.spyOn(window.location, 'reload');
```

You still get an annoying error in your console:

```
console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
  Error: Not implemented: navigation (except hash changes)
```

This is because [jsdom](https://github.com/jsdom/jsdom) is trying to make the method behave like it would in a browser since you're running this in [Node.js](https://nodejs.org/).

## Mock method (attempt 2)

To clear the error, `location.reload` needs to be made [configurable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description) before it can be reassigned to a [mock function](https://jestjs.io/docs/en/jest-object#jestfnimplementation):

```js
Object.defineProperty(window.location, 'reload', {
  configurable: true,
});
window.location.reload = jest.fn();
```

When you run the test this time, it should pass without errors.

## Update for jsdom >=14

It has been brought to my [attention]({% post_url 2018/2018-11-17-mock-window-location %}#comment-4446972247) that the approach no longer works for [jsdom](https://github.com/jsdom/jsdom) >=14.

The new solution is to delete `location` and recreate `reload` as a mock:

```js
delete window.location;
window.location = { reload: jest.fn() };
```

Thanks to [Josh](https://gist.github.com/joshjg) for sharing the alternative.

## Final solution

Here's the refactored final solution:

```js
describe('window.location.reload', () => {
  // reference of the original method
  const { reload } = window.location;

  beforeAll(() => {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
    });
    window.location.reload = jest.fn();
    // delete window.location;
    // window.location = { reload: jest.fn() };
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

Check out the [Gist](https://gist.github.com/remarkablemark/5cb571a13a6635ab89cf2bb47dc004a3) that inspired this post.
