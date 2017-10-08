---
layout: post
title: "WebDriverJS: Firefox profile"
date: 2016-12-01 23:55:00 -4000
excerpt: How to set the Firefox profile path when working with WebDriverJS (Selenium for Node.js).
categories: webdriverjs firefox node javascript selenium
---

Let's go over how to set the Firefox profile for [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) (_Selenium for Node.js_).

### Prerequisites

First, you'll need [Firefox](https://www.youtube.com/watch?v=UYOcXBF4ESs) and [geckodriver](https://github.com/mozilla/geckodriver/releases) (you can follow this [video](https://www.youtube.com/watch?v=5lWOV0rnYRo) if you're on Mac).

If you have [homebrew installed](https://www.youtube.com/watch?v=44FhlEiMEpU), you can run the following:

```sh
# install the browser
$ brew cask install firefox

# install the driver
$ brew install geckodriver
```

### Building your driver

Now you want to build your driver. See how it's done [here]({% post_url 2016/2016-11-25-webdriverjs-launch-browser %}).

### Firefox options

Before instantiating the driver, you want to set the profile in [Firefox options](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/index_exports_Options.html):

```js
const firefox = require('selenium-webdriver/firefox');
const options = new firefox.Options();
// replace `/path/to/profile`
options.setProfile('/path/to/profile');
```

> Unlike [ChromeDriver]({% post_url 2016/2016-11-27-webdriverjs-chrome-profile %}), the profile must be valid otherwise the driver will fail to build. To create and manage Firefox profiles, see the official [documentation](https://support.mozilla.org/en-US/kb/profile-manager-create-and-remove-firefox-profiles).

Update the builder so WebDriverJS launches Firefox based on the specified profile:

```js
builder.forBrowser('firefox');
builder.setFirefoxOptions(options);
```

To confirm the profile is correct, you can check the path if you go to `about:support`:

```js
const driver = builder.build();
driver.get('about:support');
```
