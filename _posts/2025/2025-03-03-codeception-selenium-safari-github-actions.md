---
layout: post
title: Run Codeception Selenium on Safari with GitHub Actions
date: 2025-03-03 20:50:11
excerpt: How to run Codeception Selenium tests on Safari browser in GitHub Actions.
categories: codeception selenium safari test github actions
---

This post goes over how to run [Codeception](https://codeception.com/) [Selenium](https://www.selenium.dev/) tests on [Safari](https://www.apple.com/safari/) browser in [GitHub Actions](https://github.com/features/actions).

## Prerequisites

- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Java](https://www.java.com/)
- [Safari](https://www.apple.com/safari/)

## Bootstrap

Install Codeception via Composer:

```sh
composer require --dev codeception/codeception
```

Bootstrap Codeception:

```sh
vendor/bin/codecept bootstrap
```

Create an acceptance test:

```sh
vendor/bin/codecept generate:cest Acceptance First
```

Write your test `tests/Acceptance/FirstCest.php`:

```php
<?php

declare(strict_types=1);

namespace Tests\Acceptance;

use Tests\Support\AcceptanceTester;

final class FirstCest
{
    public function _before(AcceptanceTester $I): void
    {
        $I->amOnPage('/');
    }

    public function tryToTest(AcceptanceTester $I): void
    {
        $I->see('Example');
    }
}
```

Configure your acceptance tests `tests/Acceptance.suite.yml`:

```yml
actor: AcceptanceTester
modules:
  enabled:
    - PhpBrowser:
        url: https://example.com/
```

Run your tests:

```sh
vendor/bin/codecept run --steps
```

## Selenium

Install WebDriver:

```sh
composer require --dev codeception/module-webdriver
```

Install and launch Selenium using [selenium-standalone](https://www.npmjs.com/package/selenium-standalone):

```sh
npx selenium-standalone install && npx selenium-standalone start
```

Update configuration in `tests/Acceptance.suite.yml`:

```diff
 actor: AcceptanceTester
 modules:
   enabled:
-    - PhpBrowser:
+    - WebDriver:
         url: https://example.com/
+        browser: safari
```

When you run your tests:

```sh
vendor/bin/codecept run --steps
```

You may get the error:

> [Facebook\WebDriver\Exception\SessionNotCreatedException] Could not start a new session. Error while creating session with the driver service. Stopping driver service: Could not start a new session. Response code 500. Message: Could not create a session: You must enable the 'Allow Remote Automation' option in Safari's Develop menu to control Safari via WebDriver.

To enable the 'Allow Remote Automation' option in Safari's Develop menu to control Safari via WebDriver, follow the [instructions](https://github.com/remarkablemark/codeception-selenium-safari-demo/wiki/Safari-WebDriver).

If you run the test again, it should pass:

```
Tests.Acceptance Tests (1) ---------------------------------
FirstCest: Try to test
Signature: Tests\Acceptance\FirstCest:tryToTest
Test: tests/Acceptance/FirstCest.php:tryToTest
Scenario --
 I am on page "/"
 I see "Example"
 PASSED
```

## GitHub Actions

The workflow to run the acceptance tests on Safari browser in GitHub Actions:

{% raw %}

```yml
# .github/workflows/test.yml
name: test
on: push

jobs:
  test:
    runs-on: macos-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Setup PHP
        uses: shivammathur/setup-php@v2

      - name: Install dependencies
        run: composer install

      - name: Start Selenium
        run: npx selenium-standalone install && npx selenium-standalone start &

      - name: Run tests
        run: vendor/bin/codecept run --steps
```

{% endraw %}

## Demo

See the [repository](https://github.com/remarkablemark/codeception-selenium-safari-demo).
