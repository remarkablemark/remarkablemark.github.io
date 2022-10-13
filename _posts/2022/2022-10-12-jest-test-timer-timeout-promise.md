---
layout: post
title: Jest test setTimeout and Promise
date: 2022-10-12 22:01:20
excerpt: How to test JavaScript setTimeout and Promise with Jest.
categories: jest test javascript
---

If you have a Jest test that calls [`setTimeout`](https://developer.mozilla.org/docs/Web/API/setTimeout) and [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise):

```js
// timeout-promise.test.js
jest.useFakeTimers();

const utils = {
  async timeout(seconds) {
    await Promise.resolve((resolve) => setTimeout(resolve, seconds * 1000));
  },
};

it('waits 1 second', async () => {
  await utils.timeout(1);
  // ...
});
```

The test will fail with the error:

```
thrown: "Exceeded timeout of 5000 ms for a test.
Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."
```

The solution is to remove [`jest.useFakeTimers`](https://jestjs.io/docs/jest-object#jestusefaketimersfaketimersconfig) and stub out `timeout` with [`jest.spyOn`](https://jestjs.io/docs/jest-object#jestspyonobject-methodname):

```diff
 // timeout-promise.test.js
-jest.useFakeTimers();

 const utils = {
   async timeout(seconds) {
     await Promise.resolve((resolve) => setTimeout(resolve, seconds * 1000));
   },
 };

 it('waits 1 second', async () => {
+  const timeoutSpy = jest.spyOn(utils, 'timeout').mockResolvedValueOnce();
   await utils.timeout(1);
   // ...
+  timeoutSpy.mockRestore();
 });
```

The updated test code will now pass:

```js
// timeout-promise.test.js
const utils = {
  async timeout(seconds) {
    await Promise.resolve((resolve) => setTimeout(resolve, seconds * 1000));
  },
};

it('waits 1 second', async () => {
  const timeoutSpy = jest.spyOn(utils, 'timeout').mockResolvedValueOnce();
  await utils.timeout(1);
  // ...
  timeoutSpy.mockRestore();
});
```
