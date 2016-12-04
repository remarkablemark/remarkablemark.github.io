---
layout: post
title: "WebDriverJS: Launch a browser"
date: 2016-11-26 03:21:00 -4000
excerpt: How to launch a browser with WebDriverJS (Selenium for Node.js).
categories: webdriverjs node javascript selenium firefox
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

### Script

Launching a browser is very simple:

```js
// main.js

const webdriver = require('selenium-webdriver');

const builder = new webdriver.Builder();
builder.forBrowser('firefox');
const driver = builder.build();

driver.get('http://example.com');
driver.getTitle().then(title => console.log(title));
driver.quit();
```

If you're using Firefox 48+, you'll also need to [install geckodriver]({% post_url 2016/2016-11-06-selenium-geckodriver %}).

Now you can run your script:

```sh
$ node main.js
```

You'll see Firefox open, go to [example.com](http://example.com), and then close. Nice!
