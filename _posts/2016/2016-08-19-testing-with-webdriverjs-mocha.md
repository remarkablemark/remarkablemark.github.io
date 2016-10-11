---
layout: post
title: Writing WebDriverJS tests with Mocha
date: 2016-08-19 13:24:00 -4000
excerpt: In order to write WebDriverJS tests with Mocha, the testing module from selenium-webdriver should be used.
categories: webdriverjs mocha testing selenium nodejs
---

Let's test your understanding of writing [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) tests with [Mocha](https://mochajs.org).

Based on the following code, what do you think will happen?

```js
var webdriver = require('selenium-webdriver');

describe('webdriverjs test', function() {
    before(function(done) {
        this.driver = new webdriver.Builder().forBrowser('firefox').build();
        done();
    });

    it('should go to Google', function(done) {
        this.driver.get('https://www.google.com');
        this.driver.getTitle().then(function(title) {
            require('assert').equal(title, 'Google');
            done();
        });
    });
});
```

With some confidence, you say, "The test will pass."

However, when you run it, you get **1 failing** test with the following message:

```
Error: timeout of 2000ms exceeded.
Ensure the done() callback is being called in this test.
```

Okay, so you think to yourself, "All that's needed is to increase the [timeout](https://mochajs.org/#timeouts) and the test will pass."

You are _right_... but implementing that fix won't solve the _real_ problem; and hence, the flaky behavior will continue to occur as your test suite gets larger and more complex.

"So what should I do?"

You should stop using Mocha's global methods (`describe`, `before`, `it`) and start using [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)'s `testing` module.

This is the biggest gotcha when starting out with WebDriverJS and Mocha.

The [testing](https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/testing/index.js) module is essential because WebDriverJS is asynchronous and for the tests to work, a wrapper was provided for Mocha's global functions.

(_If you want a more in-depth explanation of how WebDriverJS works, you can watch this [video](https://b.remarkabl.org/2b7DdPA)._)

So let's fix the code and do things the right way:

```js
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('webdriverjs test', function() {
    test.before(function(done) {
        this.driver = new webdriver.Builder().forBrowser('firefox').build();
        done();
    });

    test.it('should go to Google', function(done) {
        this.driver.get('https://www.google.com');
        this.driver.getTitle().then(function(title) {
            require('assert').equal(title, 'Google');
            done();
        });
    });
});
```

For the rest of the code and more examples, you can check out my [repository](https://github.com/remarkablemark/webdriverjs-recipes) of WebDriverJS recipes.
