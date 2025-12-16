---
layout: post
title: Jest mock Amplitude Browser SDK
date: 2025-12-16 16:32:51
excerpt: How to mock Amplitude Browser SDK with Jest.
categories: jest mock amplitude sdk javascript
---

This post goes over how to mock [Amplitude Browser SDK](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2) with [Jest](https://jestjs.io/).

## Problem

I installed [Amplitude Analytics SDK](https://www.npmjs.com/package/@amplitude/analytics-browser) in my frontend project:

```sh
npm install @amplitude/analytics-browser
```

But when I ran my Jest tests, I got the error:

```
TypeError: (0 , analytics_core_1.UUID) is not a function

  at ./node_modules/@amplitude/analytics-browser/src/config.ts:283:9
```

## Solution

I created a mock file `amplitude-analytics-browser-mock.js`:

```sh
mkdir -p __mocks__ && touch __mocks__/amplitude-analytics-browser-mock.js
```

With the code:

```js
// __mocks__/amplitude-analytics-browser-mock.js
module.exports = {
  init: jest.fn(),
  track: jest.fn(),
  identify: jest.fn(),
  Identify: jest.fn(),
};
```

I updated my [Jest config's](https://jestjs.io/docs/configuration) [moduleNameMapper](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring):

```js
/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    '^@amplitude/analytics-browser$':
      '<rootDir>/__mocks__/amplitude-analytics-browser-mock.js',
  },
};

module.exports = config;
```

Then my tests passed!
