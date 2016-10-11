---
layout: post
title: Setting the binary for WebDriverJS
date: 2016-06-16 01:08:00 -4000
excerpt: Learn how to set the browser binary for Selenium WebDriver for Node.js. Firefox will be used in this WebDriverJS example.
categories: selenium-webdriver webdriverjs firefox binary node javascript
---

How can we create our WebDriver instance with a browser that's installed in a different or unique location?

The trick, of course, is to set the [binary](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/binary_exports_Binary.html) of the browser when we [build](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html) our driver.

Here's how it's done for FirefoxDriver using [WebDriverJS](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html):

```js
// make sure you installed `selenium-webdriver` locally with npm
var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');

// build a FirefoxDriver
var builder = new webdriver.Builder().forBrowser('firefox');
// and set the binary path below (replace 'path/to/firefox/binary')
builder.setFirefoxOptions(new firefox.Options().setBinary('/path/to/firefox/binary'));
```

Finally, given that WebDriverJS allows us to configure the [options](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/index_exports_Options.html) for Chrome, IE, Opera, and PhantomJS, this means that we can do the same for those browsers as well.

Check out the full [example](https://gist.github.com/remarkablemark/e56ce969c4d5fe81f7a639f519cb417b) below:

<script src="https://gist.github.com/remarkablemark/e56ce969c4d5fe81f7a639f519cb417b.js"></script>
