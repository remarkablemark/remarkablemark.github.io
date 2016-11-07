---
layout: post
title: Using geckodriver with Selenium
date: 2016-11-06 23:53:00 -4000
excerpt: In order to control Firefox 48+ with Selenium, you'll need to install geckodriver and put it in the PATH.
categories: selenium geckodriver firefox node
---

With [Firefox](https://www.mozilla.org/firefox/desktop/) 48+ using [Gecko](https://developer.mozilla.org/docs/Gecko/FAQ) engine, you'll need to install [geckodriver](https://github.com/mozilla/geckodriver) in order to use [Selenium](https://github.com/SeleniumHQ/selenium).

You can install geckodriver [here](https://github.com/mozilla/geckodriver/releases), or if you're on Mac, you can install it with [homebrew](http://brew.sh):

```sh
$ brew install geckodriver
```

If you didn't install with brew, you'll need to make sure that the **geckodriver executable** is found in `PATH`.

Now you can control Firefox with Selenium.

### [Node.js](https://nodejs.org) example:

Install dependencies:

```sh
$ node --version
v7.0.0

$ npm install selenium-webdriver
/project/path
└── selenium-webdriver@3.0.0
```

Create script:

```js
// main.js
const webdriver = require('selenium-webdriver');

const builder = new webdriver.Builder();
builder.forBrowser('firefox');
const driver = builder.build();

driver.get('https://www.google.com');
driver.getTitle(title => console.log(title));
driver.quit();
```

Run the script:

```sh
$ node main.js
```
