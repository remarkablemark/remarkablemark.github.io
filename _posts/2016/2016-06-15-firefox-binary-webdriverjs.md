---
layout: post
title: "WebDriverJS: Setting the binary"
date: 2016-06-16 01:08:00 -4000
excerpt: To instantiate a WebDriver from a specific path, you can set the browser binary before building the driver. In this tutorial, we'll be using Firefox as our driver.
categories: selenium webdriverjs firefox binary nodejs
---

Is it possible to build a WebDriver using a browser that's not installed in its default location?

You can by [setting the binary](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/binary_exports_Binary.html).

This is useful if you want to use a different version or executable of a browser.

Here's how it's done for Firefox with the [WebDriverJS API](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html):

```js
// set-binary-driver.js

var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var builder = new webdriver.Builder().forBrowser('firefox');

// path to binary
var binaryPath = '/path/to/firefox/binary';
builder.setFirefoxOptions(
  new firefox.Options().setBinary(binaryPath)
);
```

> If you're not familiar with Selenium for Node.js, check out my post [WebDriverJS: Launch a browser]({% post_url 2016/2016-11-25-webdriverjs-launch-browser %}).

This can be done for browsers like Chrome, IE, Opera, and PhantomJS since WebDriverJS allows us to configure the driver [options](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/index_exports_Options.html).

See complete [example](https://gist.github.com/remarkablemark/e56ce969c4d5fe81f7a639f519cb417b):

{% gist e56ce969c4d5fe81f7a639f519cb417b %}
