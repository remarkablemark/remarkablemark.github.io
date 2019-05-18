---
layout: post
title: How to click on reCAPTCHA with Codeception
date: 2019-05-17 20:51:30
excerpt: How to click on the reCAPTCHA checkbox with Codeception (PHP Selenium WebDriver).
categories: php selenium webdriver codeception recaptcha javascript
---

When writing our [PHP Selenium WebDriver](https://codeception.com/docs/modules/WebDriver) tests, how can we click on the [reCAPTCHA](https://developers.google.com/recaptcha/) checkbox with [Codeception](https://codeception.com/)?

The module has the method [`switchToIFrame`](https://codeception.com/docs/modules/WebDriver#switchtoiframe), which takes the [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) name as the first argument.

However, we have a problem&mdash;the reCAPTCHA iframe name is a randomly generated hash (see [example](https://www.google.com/recaptcha/api2/demo) below):

```html
<iframe
  src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-&co=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbTo0NDM.&hl=en&v=v1557729121476&size=normal&cb=9iioc4rv76zy"
  width="304"
  height="78"
  role="presentation"
  name="a-urpst7czwgqi"
  frameborder="0"
  scrolling="no"
  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
></iframe>
```

Thus, to retrieve the iframe name, we can use JavaScript:

```js
document.querySelector("iframe[src*='recaptcha']").getAttribute("name");
```

To execute the script and get the value in our test, you can use [`executeJS`](https://codeception.com/docs/modules/WebDriver#executejs):

```php
$name = $I->executeJS(
  'return document.querySelector("iframe[src*=\'recaptcha\']").getAttribute("name");'
);
```

Now, you can switch to the iframe, click on the reCAPTCHA anchor button, and switch back to the main window:

```php
$I->switchToIFrame($name);
$I->click('#recaptcha-anchor');
$I->switchToIFrame();
```

Alternatively, you can override the reCAPTCHA iframe with a custom name:

```php
$name = 'my-recaptcha';
$I->executeJS(
  sprintf(
    'document.querySelector("iframe[src*=\'recaptcha\']").setAttribute("name", "%s");',
    $name
  )
);
```
