---
layout: post
title: 'WebDriverJS: Writing Cucumber tests'
date: 2020-10-25 18:52:50
excerpt: How to write browser automation BDD tests using Cucumber and WebDriverJS (Selenium WebDriver for Node.js).
categories: cucumber gherkin webdriverjs selenium webdriver nodejs javascript
---

## Background

From the [Cucumber.js](https://github.com/cucumber/cucumber-js) README:

> [Cucumber](https://cucumber.io/) is a tool for running automated tests written in plain language.

In other words, Cucumber helps accomplish [Behavior-Driven Development (BDD)](https://en.wikipedia.org/wiki/Behavior-driven_development) using [Gherkin](https://cucumber.io/docs/gherkin/) syntax.

## Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm)
- [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [geckodriver](https://github.com/mozilla/geckodriver)

If you're on macOS, you can install the prerequisites with [Homebrew](https://brew.sh/):

```sh
$ brew install node
$ brew cask install firefox
$ brew install geckodriver
```

## Install

Install [cucumber](https://www.npmjs.com/package/cucumber) and [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver):

```sh
$ npm install cucumber@6 selenium-webdriver
```

The versions we're using are:

```sh
$ npm ls --depth=0
├── cucumber@6.0.5
└── selenium-webdriver@4.0.0-alpha.7
```

## Setup

Create a file named `cucumber.js`:

```sh
$ touch cucumber.js
```

Add the content:

```js
// cucumber.js
module.exports = {
  default: `--format-options '{"snippetInterface": "synchronous"}'`,
};
```

Run `cucumber-js` to see that no scenarios/steps are found.

```sh
$ npx cucumber-js

0 scenarios
0 steps
0m00.000s
```

## Feature

Create a directory named `features`:

```sh
$ mkdir features
```

> The spelling and capitalization of the directory name must be exact here.

Create a `.feature` file inside the directory. We'll name it `google-search.feature`:

```sh
$ touch features/google-search.feature
```

Write the scenario:

```
# features/google-search.feature
Feature: Google search

  Scenario: Googling remarkablemark.
    Given I am on the Google homepage
    When I search for "remarkablemark"
    Then the page title is "remarkablemark - Google Search"
```

Run `npx cucumber-js` to see the warnings:

```sh
$ npx cucumber-js
UUU

Warnings:

1) Scenario: Googling remarkablemark. # features/google-search.feature:4
   ? Given I am on the Google homepage
       Undefined. Implement with the following snippet:

         Given('I am on the Google homepage', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? When I search for "remarkablemark"
       Undefined. Implement with the following snippet:

         When('I search for {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then the page title is "remarkablemark - Google Search"
       Undefined. Implement with the following snippet:

         Then('the page title is {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


1 scenario (1 undefined)
3 steps (3 undefined)
0m00.000s
```

This is expected because the [step definitions](https://github.com/cucumber/cucumber-js/blob/v6.0.5/docs/support_files/step_definitions.md) are undefined.

## Step Definitions

Create a `.js` file inside the `features` directory for your steps. We'll name it `google-search-steps.js`:

```sh
$ touch features/google-search-steps.js
```

Import `Given`, `When`, and `Then` from `cucumber` and paste the steps from earlier:

```js
// features/google-search-steps.js
const { Given, When, Then } = require('cucumber');

Given('I am on the Google homepage', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I search for {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the page title is {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
```

Run `npx cucumber-js` to see the warnings:

```sh
$ npx cucumber-js
P--

Warnings:

1) Scenario: Googling remarkablemark. # features/google-search.feature:4
   ? Given I am on the Google homepage # features/google-search-steps.js:4
       Pending
   - When I search for "remarkablemark" # features/google-search-steps.js:9
   - Then the page title is "remarkablemark - Google Search" # features/google-search-steps.js:14

1 scenario (1 pending)
3 steps (1 pending, 2 skipped)
0m00.002s
```

## Selenium WebDriver

Fill out the [step definitions](https://github.com/cucumber/cucumber-js/blob/v6.0.5/docs/support_files/step_definitions.md) with WebDriverJS actions in `features/google-search-steps.js`.

### BeforeAll

Build the driver before the `Given` step:

```js
const { Builder } = require('selenium-webdriver');

const driver = new Builder().forBrowser('firefox').build();
```

### AfterAll

Quit the driver in the `AfterAll` [hook](https://github.com/cucumber/cucumber-js/blob/v6.0.5/docs/support_files/hooks.md):

```js
const { AfterAll } = require('cucumber');

AfterAll('end', async function () {
  await driver.quit();
});
```

### Given

Fill out the `Given` step:

```js
Given('I am on the Google homepage', async function () {
  await driver.get('https://www.google.com/');
});
```

### When

Fill out the `When` step:

```js
When('I search for {string}', async function (string) {
  const element = await driver.findElement(By.name('q'));
  element.sendKeys(string, Key.RETURN);
  await driver.sleep(1000);
});
```

> It's recommended to use [wait until](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html) instead of [sleep](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html#sleep) so the test runs fast and doesn't become flaky.

### Then

Fill out the `Then` step:

```js
Then('the page title is {string}', async function (string) {
  assert.equal(await driver.getTitle(), string);
});
```

Run `npx cucumber-js` to see the failure:

```sh
$ npx cucumber-js
F--

Failures:

1) Scenario: Googling remarkablemark. # features/google-search.feature:4
   ✖ Given I am on the Google homepage # features/google-search-steps.js:8
       Error: function timed out, ensure the promise resolves within 5000 milliseconds
           at Timeout._onTimeout (./node_modules/cucumber/lib/user_code_runner.js:76:18)
           at listOnTimeout (internal/timers.js:531:17)
           at processTimers (internal/timers.js:475:7)
   - When I search for "remarkablemark" # features/google-search-steps.js:12
   - Then the page title is "remarkablemark - Google Search" # features/google-search-steps.js:18

1 scenario (1 failed)
3 steps (1 failed, 2 skipped)
0m05.045s
```

### Timeout

[Timeouts](https://github.com/cucumber/cucumber-js/blob/6.x/docs/support_files/timeouts.md#timeouts) can be specified via 2 ways:

1. Global
2. Step (or hook)

#### Global Timeout

To specify a global timeout:

```js
const { setDefaultTimeout } = require('cucumber');

const FIVE_SECONDS = 5 * 1000; // default
setDefaultTimeout(FIVE_SECONDS);
```

#### Step Timeout

To specify a step timeout:

```js
Given('I am on the Google homepage', { timeout: 10000 }, async function () {
  await driver.get('https://www.google.com/');
});
```

> Notice how an object containing the timeout is specified as the 2nd argument of the step function.

Run `npx cucumber-js` to verify that the scenario passes:

```sh
$ npx cucumber-js
...

1 scenario (1 passed)
3 steps (3 passed)
0m06.881s
```

Success!

## Final Steps

The final `features/google-search-steps.js` looks like this:

```js
// features/google-search-steps.js
const assert = require('assert');
const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, Key } = require('selenium-webdriver');

const driver = new Builder().forBrowser('firefox').build();

Given('I am on the Google homepage', { timeout: 10000 }, async function () {
  await driver.get('https://www.google.com/');
});

When('I search for {string}', async function (string) {
  const element = await driver.findElement(By.name('q'));
  element.sendKeys(string, Key.RETURN);
  await driver.sleep(1000);
});

Then('the page title is {string}', async function (string) {
  assert.equal(await driver.getTitle(), string);
});

AfterAll('end', async function () {
  await driver.quit();
});
```

## Resources

Check out [WebDriverJS recipes](https://github.com/remarkablemark/webdriverjs-recipes) for more examples.

### Cucumber

- [Cucumber: 10 Minute Tutorial](https://cucumber.io/docs/guides/10-minute-tutorial/)
- [Cucumber: Browser Automation](https://cucumber.io/docs/guides/browser-automation/)

### Selenium

- [WebDriverJS: async/await]({% post_url 2019/2019-08-27-webdriverjs-async-await %})
- [Using geckodriver with Selenium]({% post_url 2016/2016-11-06-selenium-geckodriver %})
- [BrowserStack: Selenium with Cucumber JS](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/cucumber-js)
- [selenium-webdriver documentation](https://www.selenium.dev/selenium/docs/api/javascript/index.html)
