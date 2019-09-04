---
layout: post
title: 'Jest: mock window.location methods'
date: 2018-11-17 19:47:17
updated: 2019-09-03 20:20:31
excerpt: How to mock `window.location` methods in a Jest test.
categories: jest test spy mock window javascript nodejs
---

There may be a situation where you need to [mock](https://jestjs.io/docs/en/mock-function-api) methods on [`window.location`](https://developer.mozilla.org/docs/Web/API/Location#Methods) in [Jest](https://jestjs.io/en/):

```js
it('mocks and calls window.location.reload', () => {
  window.location.reload = jest.fn();
  window.location.reload();
  expect(window.location.reload).toHaveBeenCalled();
});
```

When you run the test, it _fails_.

## Spy on method

[Spying](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) on `window.location` does make the test pass:

```js
// window.location.reload = jest.fn();
jest.spyOn(window.location, 'reload');
```

But you'll get the console error:

```
console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
  Error: Not implemented: navigation (except hash changes)
```

This happens because [jsdom](https://github.com/jsdom/jsdom) is trying to make the method behave like its browser counterpart. However, the test is running in [Node.js](https://nodejs.org/en/).

## Mock method

To remove the error, `location.reload` needs to be made [configurable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description) before being assigned to a [mock](https://jestjs.io/docs/en/jest-object#jestfnimplementation):

```js
Object.defineProperty(window.location, 'reload', {
  configurable: true,
});
window.location.reload = jest.fn();
```

When you run the test this time, it should _pass_ without errors.

## Update for jsdom 14+

Unfortunately, this no longer works for [jsdom](https://github.com/jsdom/jsdom) >=14.

The new solution is to delete `location` and recreate `reload` as a mock:

```js
delete window.location;
window.location = { reload: jest.fn() };
```

Credit goes to [Josh](https://gist.github.com/remarkablemark/5cb571a13a6635ab89cf2bb47dc004a3#gistcomment-2905726) for bringing this to my [attention](https://disq.us/p/21jm1qv).

## Solution

Here's the refactored final solution:

```js
describe('window.location', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('mocks `reload`', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls `reload`', () => {
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
```

### Gist

The [gist](https://gist.github.com/remarkablemark/5cb571a13a6635ab89cf2bb47dc004a3) that inspired this post:

{% gist 5cb571a13a6635ab89cf2bb47dc004a3 %}

### Repl.it

Run the test in this [repl.it](https://repl.it/@remarkablemark/Jest-mock-windowlocation):

<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/Jest-mock-windowlocation?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
