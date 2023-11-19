---
layout: post
title: How to upgrade PHP 7 to 8 without errors
date: 2023-11-18 21:22:57
excerpt: How to upgrade PHP from version 7 to 8 without errors.
categories: php upgrade
---

1. Enable [strict mode](https://www.php.net/manual/language.types.declarations.php#language.types.declarations.strict) for all PHP files:
   ```php
   declare(strict_types=1);
   ```
2. Enforce solid [test coverage](https://wikipedia.org/wiki/Code_coverage) (unit, integration, E2E)
3. Review PHP 8 [migration](https://www.php.net/manual/migration80.php) and [changelog](https://www.php.net/ChangeLog-8.php)
4. Set up monitors and observability (e.g., [Datadog](https://www.datadog.com/), [New Relic](https://newrelic.com/), etc.)
5. A/B test with [weighted load balancing](https://blog.cloudflare.com/load-balancing-with-weighted-pools/)
