---
layout: post
title: 'WebDriverJS: Chrome profile'
date: 2016-11-27 22:30:00
updated: 2019-08-28 14:06:27
excerpt: How to open a Chrome profile using WebDriverJS (Selenium for Node.js).
categories: webdriverjs chrome browser chromedriver nodejs javascript selenium webdriver
---

## Motivation

[WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs), by default, initializes browsers _without_ any profile data. This is to ensure a _pristine state_.

But did you know, there's a way to initialize a driver _with_ a browser profile. In this tutorial, we'll learn how to do that with Chrome.

## Prerequisites

You need the following installed:

- [Chrome browser](https://www.google.com/chrome/)
- [ChromeDriver](https://developer.chrome.com/docs/chromedriver/downloads)

Install Chrome browser with Homebrew:

```sh
brew cask install google-chrome
```

Install ChromeDriver:

```sh
brew cask install chromedriver
```

These steps are covered in this [video](https://www.youtube.com/watch?v=5lWOV0rnYRo).

## Build driver

To build your driver:

```js
const { Builder } = require('selenium-webdriver');

const builder = new Builder();
builder.forBrowser('chrome');
const driver = builder.build();
```

Check out article [WebDriverJS: Launch a browser]({% post_url 2016/2016-11-25-webdriverjs-launch-browser %}) for more details.

## Chrome options

Before initializing the driver, add argument `user-data-dir` or `--user-data-dir` to [Chrome options](https://www.selenium.dev/documentation/webdriver/browsers/chrome/#options):

```js
const { Options } = require('selenium-webdriver/chrome');

const options = new Options();
// replace `./path/to/profile` with your Chrome profile path
options.addArguments('user-data-dir=./path/to/profile');
```

> **Note**: ChromeDriver expects `./path/to/profile/Default/` to exist. If it doesn't exist, it'll create the `Default/` directory for your profile path.

Set the Chrome options to your builder before building the driver:

```js
// ...
builder.setChromeOptions(options);
const driver = builder.build();
```

You can verify the profile path is correct by opening `chrome://version` in your WebDriver browser:

```js
driver.get('chrome://version');
```

## Addendum

You can find all code examples (as well as others), in my [webdriverjs-recipes](https://github.com/remarkablemark/webdriverjs-recipes) repository.
