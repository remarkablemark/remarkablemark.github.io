---
layout: post
title: 'WebDriverJS: async/await'
date: 2019-08-27 14:12:48
excerpt: How to use async/await for WebDriverJS scripting (Selenium Webdriver for Node.js).
categories: async/await promise webdriverjs selenium webdriver nodejs javascript
---

## Promise manager

Before async/await, the only way to use [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) was through its [promise manager](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/promise.html).

The example below performs a Google search:

```js
// promise-manager.js
const { Builder, By, Key, until } = require('selenium-webdriver');

// initializes chrome browser
const driver = new Builder().forBrowser('chrome').build();

// navigates to Google and then prints title
driver.get('https://www.google.com/');
driver.getTitle().then(title => console.log('getTitle:', title));

// enters `webdriver` in search input and then presses Enter key
driver.findElement(By.name('q')).sendKeys('webdriver', Key.ENTER);

// waits up to 1 second for title to change and then prints title
driver.wait(until.titleContains('webdriver'), 1000);
driver.getTitle().then(title => console.log('getTitle:', title));

// closes browser
driver.quit();
```

As you can tell, the promise manager makes an _asynchronous_ API look somewhat _synchronous_.

## Async/await

With [Node.js](https://nodejs.org/) 8+, we can now use the [async/await](https://javascript.info/async-await) syntax.

The following refactors our example to async/await:

```js
// async-await.js
const { Builder, By, Key, promise, until } = require('selenium-webdriver');

// disable promise manager
promise.USE_PROMISE_MANAGER = false;

// wrap in async function
async function run() {
  let driver;

  // use try-catch-finally
  try {
    // we need to `await` for the promise to finish
    driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://www.google.com/');
    // the resolved value can be saved to a variable
    const title = await driver.getTitle();
    console.log('getTitle:', title);

    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.ENTER);

    await driver.wait(until.titleContains('webdriver'), 1000);
    // `await` can be used inside `console.log`
    console.log('getTitle:', await driver.getTitle());
  } catch (error) {
    // when a promise is rejected
    console.error(error);
  } finally {
    // executes after `try` or `catch`
    await driver.quit();
  }
}

// call async function
run();
```

The main thing to notice is that our code is wrapped inside an [async function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function). This allows us to utilize [try-catch-finally](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/try...catch).

Overall, the code looks much _cleaner_ and _less complex_.

Another thing to note is that we had to [disable the promise manager](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs#step-1-disabling-the-promise-manager):

```js
const { promise } = require('selenium-webdriver');
promise.USE_PROMISE_MANAGER = false;
```

Alternatively, it can be disabled by setting the environment variable:

```
SELENIUM_PROMISE_MANAGER=0
```

Which means we can do the following before running the script:

```sh
SELENIUM_PROMISE_MANAGER=0 node async-await.js
```

## Addendum

You can find all code examples (as well as others), in my [webdriverjs-recipes](https://github.com/remarkablemark/webdriverjs-recipes) repository.
