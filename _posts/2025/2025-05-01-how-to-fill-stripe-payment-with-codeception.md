---
layout: post
title: How to fill Stripe payment with Codeception
date: 2025-05-01 20:16:57
excerpt: How to fill Stripe payment with Codeception WebDriver.
categories: stripe codeception webdriver selenium php
---

This post goes over how to fill [Stripe payment](https://stripe-payments-demo.appspot.com/) with [Codeception WebDriver](https://codeception.com/docs/modules/WebDriver).

## Bootstrap

Follow the [quickstart](https://codeception.com/quickstart) to bootstrap Codeception.

## Before

In the `_before`, open the [Stripe page](https://stripe-payments-demo.appspot.com/) and switch to the Stripe iframe:

```php
public function _before(AcceptanceTester $I): void
{
    $I->amOnPage('/');
    $iframe = 'iframe[title="Secure card payment input frame"]';
    $I->waitForElement($iframe);
    $I->scrollTo($iframe);
    $I->switchToIFrame($iframe);
}
```

The `scrollTo` isn't necessary but helps with troubleshooting the test.

## Card

Fill the the card number:

```php
$I->fillField('input[placeholder="Card number"]', '4242424242424242');
```

You can also use the selectors:

- `input[name="cardnumber"]`
- `input[aria-label="Credit or debit card number"]`

## Expiration

Fill the expiration date:

```php
$I->fillField('input[placeholder="MM / YY"]', '1234');
```

You can also use the selectors:

- `input[name="exp-date"]`
- `input[aria-label="Credit or debit card expiration date"]`

Alternatively, you can type the value:

```php
$I->type('1234');
```

## CVC

Fill the expiration CVC:

```php
$I->fillField('input[placeholder="CVC"]', '123');
```

You can also use the following selectors:

- `input[name="cvc"]`
- `input[aria-label="Credit or debit card CVC/CVV"]`

```php
$I->type('123');
```

Alternatively, you can type the value:

```php
$I->type('123');
```

## After

Don't forget to switch back to the parent page after you're done:

```php
$I->switchToIFrame();
```
