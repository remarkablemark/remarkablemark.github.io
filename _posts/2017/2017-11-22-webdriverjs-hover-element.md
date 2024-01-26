---
layout: post
title: 'WebDriverJS: Hover over element'
date: 2017-11-22 20:23:14
excerpt: How to hover over an element with WebDriverJS (Selenium Webdriver for Node.js).
categories: selenium webdriver webdriverjs nodejs javascript
---

Assuming you have a [driver]({% post_url 2016/2016-11-25-webdriverjs-launch-browser %}) launched and found the following [WebElement](https://www.selenium.dev/documentation/webdriver/elements/finders/):

```js
const myElement = driver.findElement({ css: '#myElement' });
```

You can hover over it using the [mouseMove](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/) action sequence:

```js
driver.actions().mouseMove(myElement).perform();
```

Alternatively, you could move the mouse over the element [location](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/):

```js
myElement.getLocation().then((location) => {
  driver.actions().mouseMove(location).perform();
});
```
