---
layout: post
title: 'WebDriverJS: Launch a browser'
date: 2016-11-25 23:21:00
updated: 2020-10-17 21:02:17
excerpt: How to launch a browser with WebDriverJS, which is Selenium for Node.js.
categories: webdriverjs selenium nodejs javascript firefox
---

If you want to automate browsers, [Selenium](https://www.selenium.dev/) is your tool of choice.

There are several [languages](https://github.com/SeleniumHQ/selenium#documentation) to choose from, but my focus will be on the JavaScript API, which is also known as [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs).

## Prerequisites

### Node.js

Install [Node.js](https://nodejs.org/) (see [video](https://www.youtube.com/watch?v=F2uovvU-dLA)). To [install with homebrew](https://www.youtube.com/watch?v=44FhlEiMEpU):

```sh
brew install node
```

This should come with [npm](https://www.npmjs.com/) installed.

### selenium-webdriver

Install [`selenium-webdriver`](https://www.npmjs.com/package/selenium-webdriver):

```sh
npm install selenium-webdriver
```

Make sure the `selenium-webdriver` version is [supported](https://www.npmjs.com/package/selenium-webdriver#user-content-node-support-policy) by your version of Node.js.

### Firefox

Install [Firefox](https://www.mozilla.org/firefox). For Firefox 48+, you'll need [geckodriver]({% post_url 2016/2016-11-06-selenium-geckodriver %}) in order to control the browser.

## Script

Create script `launch-driver.js`:

```sh
touch launch-driver.js
```

Import `selenium-webdriver`:

```js
const { Builder } = require('selenium-webdriver');
```

Build the driver:

```js
const driver = new Builder().forBrowser('firefox').build();
```

Open page in browser:

```js
driver.get('http://example.com');
```

Print the page title:

```js
driver.getTitle().then(title => console.log(title));
```

Close the browser:

```js
driver.quit();
```

Here's the full script:

```js
// launch-driver.js

const { Builder } = require('selenium-webdriver');

// initialize the driver
const driver = new Builder().forBrowser('firefox').build();

// open the url
driver.get('http://example.com');

// print the title
driver.getTitle().then(title => console.log(title));

// close the browser
driver.quit();
```

Run the script:

```sh
node launch-driver.js
```

## Examples

See [WebDriverJS recipes](https://github.com/remarkablemark/webdriverjs-recipes).
