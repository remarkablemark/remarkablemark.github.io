---
layout: post
title: Puppeteer example without async/await
date: 2018-04-15 19:56:56 -4000
excerpt: Puppeteer example without async/await.
categories: puppeteer async await promise javascript nodejs
---

Given [puppeteer](https://www.npmjs.com/package/puppeteer) is installed:

```sh
# with npm
$ npm install puppeteer

# or with yarn
$ yarn add puppeteer
```

The current [example](https://github.com/GoogleChrome/puppeteer#usage) uses [async/await](https://javascript.info/async-await):

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
```

But how do you write the equivalent without async/await?

It's pretty straightforward once you realize all the methods return [promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise):

```js
const puppeteer = require('puppeteer');

let _browser;
let _page;

puppeteer
  .launch()
  .then(browser => (_browser = browser))
  .then(browser => (_page = browser.newPage()))
  .then(page => page.goto('https://example.com'))
  .then(() => _page)
  .then(page => page.screenshot({ path: 'example.png' }))
  .then(() => _browser.close());
```

However, writing it this way is a bit more verbose because you need to make sure the right object is passed in the thenable chain.
