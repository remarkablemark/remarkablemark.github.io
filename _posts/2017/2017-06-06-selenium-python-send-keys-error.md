---
layout: post
title: "Selenium Python: send keys error"
date: 2017-06-06 23:06:00 -4000
excerpt: How to fix the `send_keys` error coming from Selenium WebDriver for Python.
categories: selenium webdriver python error
---

I ran into the following error when executing a Selenium script written in [Python](https://github.com/SeleniumHQ/selenium/wiki/Python-Bindings):

```
selenium.common.exceptions.WebDriverException: Message: Expected [object Undefined] undefined to be a string
```

Delving through the stacktrace, I found that the problem was coming from [`send_keys`](https://selenium-python.readthedocs.io/api.html#selenium.webdriver.common.action_chains.ActionChains.send_keys):

```
self._execute(Command.SEND_KEYS_TO_ELEMENT, {'value': keys_to_typing(value)})
```

After researching the [issue](https://github.com/mozilla/geckodriver/issues/659), I discovered that **Firefox 53+** requires **geckodriver 16+**.

So I updated [geckodriver](https://github.com/mozilla/geckodriver/releases) with [homebrew](https://brew.sh/):

```sh
brew upgrade geckodriver
```

After running Selenium again, I received a new error:

```
KeyError: 'sessionId'
```

It turned out I also needed to upgrade the [selenium](https://pypi.python.org/pypi/selenium) Python package:

```sh
pip install selenium --upgrade
```

Now everything's working again.
