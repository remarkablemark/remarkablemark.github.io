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

If you installed without homebrew, you'll need to make sure that the [executable is found in the system path](https://developer.mozilla.org/docs/Mozilla/QA/Marionette/WebDriver#Add_executable_to_system_path):

```sh
# append to your bash config file (e.g., `~/.bashrc`)
export PATH=$PATH:/path/to/geckodriver
```

Now you can [launch a Firefox browser]({% post_url 2016/2016-11-25-webdriverjs-launch-browser %}) with Selenium.
