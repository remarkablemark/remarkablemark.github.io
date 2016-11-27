---
layout: post
title: "WebDriverJS: Chrome profile"
date: 2016-11-27 22:30:00 -4000
excerpt: How to set the Chrome profile path when working with WebDriverJS (Selenium for Node.js).
categories: webdriverjs chrome node javascript selenium
---

How do we set the Chrome profile for [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) (Selenium for Node.js)?

### Prerequisites

First, you'll need [chromedriver](https://www.youtube.com/watch?v=5lWOV0rnYRo). If you have [homebrew installed](https://www.youtube.com/watch?v=44FhlEiMEpU), you can run the following command:

```sh
$ brew install chromedriver
```

### Building your driver

Then you want to start building your driver. See how it's done [here]({% post_url 2016-11-25-webdriverjs-launch-browser %}) and swap `firefox` with `chrome`:

```js
builder.forBrowser('chrome');
```

### Chrome options

But before the driver is instantiated, you want to set the [Chrome options](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Options.html).

In order to specify the Chrome profile, you'll need to pass the `user-data-dir` argument:

```js
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
// replace `path/to/profile`
options.addArguments('user-data-dir=path/to/profile');
```

Now let's update the builder so WebDriverJS launches Chrome based on the specified profile:

```js
builder.forBrowser('chrome');
builder.setChromeOptions(options);
```

To confirm that the profile is correct, you can check the path in `chrome://version`:

```js
const driver = builder.build();
driver.get('chrome://version');
```
