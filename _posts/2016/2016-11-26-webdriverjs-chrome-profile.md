---
layout: post
title: "WebDriverJS: Chrome profile"
date: 2016-11-27 22:30:00 -4000
excerpt: How to set the Chrome profile path when working with WebDriverJS (Selenium for Node.js).
categories: webdriverjs chrome node javascript selenium
---

How do we set the Chrome profile for [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) (_Selenium for Node.js_)?

### Prerequisites

First, you'll need [Chrome](https://www.google.com/chrome/browser/) and [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) (you can following this [video](https://www.youtube.com/watch?v=5lWOV0rnYRo) if you're on Mac OS).

If you have [homebrew installed](https://www.youtube.com/watch?v=44FhlEiMEpU), you can run the following:

```sh
# install the browser
$ brew cask install google-chrome

# install the driver
$ brew install chromedriver
```

### Building your driver

Now you want to start building your driver. See how it's done [here]({% post_url 2016-11-25-webdriverjs-launch-browser %}).

Don't forget to swap `firefox` with `chrome`:

```js
builder.forBrowser('chrome');
```

### Chrome options

Before instantiating the driver, you want to pass the profile as an argument in [Chrome options](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Options.html):

```js
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
// replace `path/to/profile`
options.addArguments('user-data-dir=path/to/profile');
```

**_Note:_** ChromeDriver expects `path/to/profile/Default/`. If that's not found, it will create the `Default` directory.

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
