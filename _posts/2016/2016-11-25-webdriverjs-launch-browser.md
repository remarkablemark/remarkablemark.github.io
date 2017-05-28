---
layout: post
title: "WebDriverJS: Launch a browser"
date: 2016-11-25 23:21:00 -4000
excerpt: How to launch a browser or driver with WebDriverJS, Selenium for Node.js.
categories: selenium webdriverjs nodejs firefox
---

If you want to automate browsers, [Selenium](http://www.seleniumhq.org) is your tool of choice.

There are several [languages](https://github.com/SeleniumHQ/selenium#documentation) that you can use, but my focus will be on the JavaScript API, which is known as [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs).

### Prerequisites

You'll need [Node.js installed](https://www.youtube.com/watch?v=F2uovvU-dLA). You can install it [here](https://nodejs.org) or if you have [homebrew installed](https://www.youtube.com/watch?v=44FhlEiMEpU):

```sh
$ brew install node
```

Then install [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver):

```sh
$ npm install selenium-webdriver
```

Make sure that the version you install is [supported](https://www.npmjs.com/package/selenium-webdriver#user-content-node-support-policy) by your version of node.

I'll be assuming that you have a browser like [Firefox](https://www.mozilla.org/firefox) installed. With Firefox 48+, you'll need [geckodriver]({% post_url 2016/2016-11-06-selenium-geckodriver %}) installed additionally in order to control the browser.

### Code

Launching a browser is very simple:

```js
// launch-driver.js

const webdriver = require('selenium-webdriver');

// instantiate the firefox browser
const builder = new webdriver.Builder();
builder.forBrowser('firefox');
const driver = builder.build();

// go to the url
driver.get('http://example.com');

// print the title
driver.getTitle().then(title => console.log(title));

// close the browser
driver.quit();
```

Now you can run your script:

```sh
$ node launch-driver.js
```
