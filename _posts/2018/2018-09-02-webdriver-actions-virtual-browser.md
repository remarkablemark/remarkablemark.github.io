---
layout: post
title: WebDriver actions in virtual browser
date: 2018-09-02 14:23:50 -4000
excerpt: Performing WebDriver actions in a virtual browser with Selenium Python.
categories: python selenium webdriver virtual browser
---

Normally, you'd do the following to click a button with [Python Selenium](https://selenium-python.readthedocs.io/):
```py
from selenium import webdriver

driver = webdriver.Firefox()
driver.get('https://myurl.com')
element = driver.find_element_by_id('mybutton');
element.click();
```

But what if you're on a virtual browser like [BrowserStack](https://www.browserstack.com/)? How would you find and click the element now that commands like [`find_element_by_id`](https://selenium-python.readthedocs.io/api.html#selenium.webdriver.remote.webdriver.WebDriver.find_element_by_id) no longer work?

The trick is to make WebDriver perform a [click action](https://selenium-python.readthedocs.io/api.html#selenium.webdriver.common.action_chains.ActionChains.click) at a specific set of coordinates:
```py
element = driver.find_element_by_tag_name('body')
action = webdriver.common.action_chains.ActionChains(driver)
action.move_to_element_with_offset(element, xoffset, yoffset)
action.click()
action.perform()
```

The question now is how do you figure out what the X and Y offsets are?

You can go to the url on another browser with the same window dimensions and use [`getBoundingClientRect`](https://developer.mozilla.org/docs/Web/API/Element/getBoundingClientRect) in the [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/) or [Firefox](https://developer.mozilla.org/docs/Tools/Web_Console) Console:
```js
var element = driver.getElementById('mybutton');
console.log(element.getBoundingClientRect());
```

Since the properties are relative to the top-left of the viewport, we can use `left` and `top`.

When testing your Selenium script, use [`context_click`](https://selenium-python.readthedocs.io/api.html#selenium.webdriver.common.action_chains.ActionChains.context_click) instead of `click` to display the right click menu on desktop browsers. Then adjust the X and Y offsets as you see fit. That's all!

The full script:
```py
from selenium import webdriver

driver = webdriver.Firefox()
driver.get('https://virtual-myurl.com')
element = driver.find_element_by_tag_name('body')
action = webdriver.common.action_chains.ActionChains(driver)
action.move_to_element_with_offset(element, 150, 250)
action.click()
action.perform()
```
