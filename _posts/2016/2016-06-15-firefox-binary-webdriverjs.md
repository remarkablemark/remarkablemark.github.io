---
layout: post
title: 'WebDriverJS: Setting the binary'
date: 2016-06-15 21:08:00
updated: 2019-09-07 22:53:40
excerpt: How to initialize a WebDriver by setting the browser binary or executable using WebDriverJS (Selenium for Node.js).
categories: webdriverjs selenium webdriver firefox binary nodejs javascript
---

[WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) uses the _default_ browser binary (or executable) to initialize a driver.

## setBinary

To initialize a browser with a _different_ binary, use [Options](https://www.selenium.dev/documentation/webdriver/browsers/firefox/#options) [`setBinary`](https://www.selenium.dev/documentation/webdriver/browsers/firefox/#start-browser-in-a-specified-location).

The following example builds a _FirefoxDriver_ with a specified binary:

```js
const { Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/firefox');

// replace `path/to/binary` with your binary path
const options = new Options().setBinary('path/to/binary');

const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();

driver.start();
```

This is useful if you installed multiple browser executables and wanted to specify an executable.

## Code

Check out the [Gist](https://gist.github.com/remarkablemark/e56ce969c4d5fe81f7a639f519cb417b) for the full example:

{% gist e56ce969c4d5fe81f7a639f519cb417b %}

For more information on Selenium for Node.js, check out my post [WebDriverJS: Launch a browser]({% post_url 2016/2016-11-25-webdriverjs-launch-browser %}).
