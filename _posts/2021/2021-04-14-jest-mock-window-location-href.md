---
layout: post
title: 'Jest: mock window.location.href'
date: 2021-04-14 20:42:37
excerpt: How to mock `window.location.href` getter and setter in Jest tests.
categories: jest test spy mock window javascript nodejs
---

> This post was inspired by a [question](https://disq.us/p/2gbnd4z) from ["Jest: mock window.location methods"]({% post_url 2018/2018-11-17-mock-window-location %}).

How do we use [Jest](https://jestjs.io/) to [mock](https://jestjs.io/docs/mock-function-api) [`window.location.href`](https://stackoverflow.com/questions/7077770/window-location-href-and-window-open-methods-in-javascript) since it's an accessor ([getter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/get)/[setter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/set)) instead of a method?

You would recreate `window.location` with the `href` getter/setter mocked.

## Example

Mock the `href` getter:

```js
delete window.location;
window.location = {};
const getHrefSpy = jest.fn();
Object.defineProperty(window.location, 'href', {
  get: getHrefSpy,
});
```

Test that `href` is called:

```js
it('mocks window.location.href', () => {
  expect(getHrefSpy).not.toHaveBeenCalled();
  window.location.href;
  expect(getHrefSpy).toHaveBeenCalled();
});
```

## Code

Full test example:

```js
// jest-mock-window-location-href.test.js
const { location } = window;
const getHrefSpy = jest.fn(() => 'example.com');
const setHrefSpy = jest.fn(href => href);

beforeAll(() => {
  delete window.location;
  window.location = {};
  Object.defineProperty(window.location, 'href', {
    get: getHrefSpy,
    set: setHrefSpy,
  });
});

it('mocks window.location.href', () => {
  expect(getHrefSpy).not.toHaveBeenCalled();
  console.log(window.location.href);
  expect(getHrefSpy).toHaveBeenCalled();
});

afterAll(() => {
  window.location = location;
});
```

## Demo

[Replit](https://replit.com/@remarkablemark/Jest-mock-windowlocationhref#jest-mock-window-location-href.test.js):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Jest-mock-windowlocationhref?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
