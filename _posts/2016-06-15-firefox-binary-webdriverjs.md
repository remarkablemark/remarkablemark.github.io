---
layout: post
title: "Setting the binary for WebDriverJS"
date: 2016-06-15 21:08:00
excerpt: "How to set the browser binary for Selenium WebDriver for Node.js. Firefox will be used as an example."
categories: selenium-webdriver webdriverjs firefox binary node javascript
---

How can we create our WebDriver instance with a browser that's installed in a different or unique location?

The trick, of course, is to set the [binary](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/binary_exports_Binary.html) of the browser when we [build](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html) our driver.

Here's how it's done for FirefoxDriver using [WebDriverJS](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html):

<script src="https://gist.github.com/remarkablemark/4c2592930c9fa185bb0f3cd60216a28c.js"></script>

Check out the full example [here](https://gist.github.com/remarkablemark/e56ce969c4d5fe81f7a639f519cb417b).

Finally, given that WebDriverJS allows us to configure the [options](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/index_exports_Options.html) for Chrome, IE, Opera, and PhantomJS, this means that we can do the same for those browsers as well.
