---
layout: post
title: 'How to fix Selenium Standalone error "getDownloadStream"'
date: 2025-07-16 18:23:41
excerpt: 'How to fix Selenium Standalone error "getDownloadStream". Could not download https://msedgedriver.azureedge.net/117.0.2045.55/edgedriver_mac64.zip'
categories: selenium standalone error
---

This post goes over how to fix [Selenium Standalone](https://github.com/webdriverio/selenium-standalone) error "getDownloadStream". Could not download `https://msedgedriver.azureedge.net/117.0.2045.55/edgedriver_mac64.zip`

## Problem

If you're trying to install the Selenium drivers:

```sh
npx selenium-standalone install
```

You might get the error:

```
----------
selenium-standalone installation starting
----------

---
selenium install:
from: https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.10.0/selenium-server-4.10.0.jar
to: node_modules/selenium-standalone/.selenium/selenium-server/4.10.0/selenium-server.jar
---
chrome install:
from: https://storage.googleapis.com/chrome-for-testing-public/138.0.7204.157/mac-arm64/chromedriver-mac-arm64.zip
to: node_modules/selenium-standalone/.selenium/chromedriver/latest-mac-arm64/chromedriver
---
firefox install:
from: https://github.com/mozilla/geckodriver/releases/download/v0.36.0/geckodriver-v0.36.0-macos-aarch64.tar.gz
to: node_modules/selenium-standalone/.selenium/geckodriver/latest-mac-arm64/geckodriver
---
chromiumedge install:
from: https://msedgedriver.azureedge.net/117.0.2045.55/edgedriver_mac64_m1.zip
to: node_modules/selenium-standalone/.selenium/chromiumedgedriver/latest-mac-arm64/msedgedriver

Error in "getDownloadStream". Could not download https://msedgedriver.azureedge.net/117.0.2045.55/edgedriver_mac64_m1.zip
See more details below:
getaddrinfo ENOTFOUND msedgedriver.azureedge.net
node_modules/selenium-standalone/lib/install.js:326
          throw new Error('Could not download ' + downloadUrl);
          ^

Error: Could not download https://msedgedriver.azureedge.net/117.0.2045.55/edgedriver_mac64_m1.zip
    at Request.<anonymous> (node_modules/selenium-standalone/lib/install.js:326:17)
    at Object.onceWrapper (node:events:639:26)
    at Request.emit (node:events:524:28)
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)

Node.js v22.12.0
```

## Solution

The issue is that the [`msedgedriver.azureedge.net` has been sunsetted](https://github.com/SeleniumHQ/selenium/issues/15024) and is replaced with [`msedgedriver.microsoft.com`](https://github.com/SeleniumHQ/selenium/issues/16063).

Until [selenium-standalone#944](https://github.com/webdriverio/selenium-standalone/pull/944) is merged and released, a workaround is to create a config with the correct URL:

```sh
touch config.js
```

```js
// config.js
module.exports = {
  baseURL: 'https://github.com/SeleniumHQ/selenium/releases/download',
  version: process.env.SELENIUM_VERSION || '4.10.0',

  drivers: {
    chrome: {
      version: 'latest',
      channel: 'stable',
      arch: process.arch,
      onlyDriverArgs: [],
      baseURL: 'https://storage.googleapis.com/chrome-for-testing-public',
    },
    firefox: {
      version: 'latest',
      fallbackVersion: '0.30.0',
      arch: process.arch,
      onlyDriverArgs: [],
      baseURL: 'https://github.com/mozilla/geckodriver/releases/download',
    },
    chromiumedge: {
      version: 'latest',
      fallbackVersion: '117.0.2045.55',
      arch: process.arch,
      onlyDriverArgs: [],
      baseURL: 'https://msedgedriver.microsoft.com',
    },
  },
};
```

Install Selenium Standalone with the config:

```sh
npx selenium-standalone install --config=config.js
```

Then start should work:

```sh
npx selenium-standalone start
```

See [selenium-standalone#945](https://github.com/webdriverio/selenium-standalone/issues/945).
