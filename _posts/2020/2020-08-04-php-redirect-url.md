---
layout: post
title: PHP redirect URL
date: 2020-08-04 19:51:25
excerpt: How to redirect to another URL in PHP.
categories: php header redirect url
---

Use [`header`](https://www.php.net/manual/en/function.header.php) to redirect to another [URL](https://en.wikipedia.org/wiki/URL) in [PHP](https://www.php.net/):

```php
header('Location: https://remarkablemark.org/');
exit;
```

Here's a function that redirects to another URL:

```php
/**
 * Redirects to URL.
 */
function redirect(string $url): void
{
    header('Location: ' . $url);
    exit;
}
```

And here's an updated function that redirects to an absolute URL if the URL is valid:

```php
/**
 * Redirects to absolute URL if valid.
 */
function redirect(string $url): void
{
    if (filter_var($url, FILTER_VALIDATE_URL)) {
        header('Location: ' . $url);
        exit;
    }
}
```
