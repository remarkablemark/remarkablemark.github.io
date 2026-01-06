---
layout: post
title: PHP date format
date: 2020-06-25 21:26:30
excerpt: How to get the current date in PHP using `date`, `strtotime`, and `DateTime`.
categories: php date
---

## Date

To get the current date in the format of `YYYY-MM-DD` using [`date`](https://www.php.net/manual/en/function.date.php):

```php
echo date('Y-m-d', strtotime('today')); // 2020-06-26
```

The same result can be achieved with [`DateTime`](https://www.php.net/manual/en/class.datetime.php):

```php
$date = new DateTime('today');
echo $date->format('Y-m-d'); // 2020-06-26
```

And the time can also be included:

```php
echo date('Y-m-d H:i:s'); // 2020-06-26 01:23:45
```

## Parse

To parse an English textual description of the date, use [`strtotime`](https://www.php.net/manual/en/function.strtotime.php) or [`DateTime::format`](https://www.php.net/manual/en/datetime.format.php).

Parsing with [`strtotime`](https://www.php.net/manual/en/function.strtotime.php):

```php
echo date('Y-m-d', strtotime('yesterday')); // 2020-06-25
echo date('Y-m-d', strtotime('-1 days')); // 2020-06-25
```

Parsing with [`DateTime::format`](https://www.php.net/manual/en/datetime.format.php):

```php
echo (new DateTime('tomorrow'))->format('Y-m-d'); // 2020-06-27
echo (new DateTime('+1 days'))->format('Y-m-d'); // 2020-06-27
```

## Constants

There are [predefined date constants](https://www.php.net/manual/en/class.datetimeinterface.php#datetime.constants.types):

- `DATE_ATOM`
- `DATE_COOKIE`
- `DATE_ISO8601`
- `DATE_RFC822`
- `DATE_RFC850`
- `DATE_RFC1036`
- `DATE_RFC1123`
- `DATE_RFC7231`
- `DATE_RFC2822`
- `DATE_RFC3339`
- `DATE_RFC3339_EXTENDED`
- `DATE_RSS`
- `DATE_W3C`

```php
echo date(DATE_ATOM); // 2020-06-26T01:23:45+00:00
echo date(DATE_COOKIE); // Friday, 26-Jun-2020 01:23:45 UTC
echo date(DATE_ISO8601); // 2020-06-26T01:23:45+0000
echo date(DATE_RFC822); // Fri, 26 Jun 20 01:23:45 +0000
echo date(DATE_RFC850); // Friday, 26-Jun-20 01:23:45 UTC
echo date(DATE_RFC1036); // Fri, 26 Jun 20 01:23:45 +0000
echo date(DATE_RFC1123); // Fri, 26 Jun 2020 01:23:45 +0000
echo date(DATE_RFC7231); // Fri, 26 Jun 2020 01:23:45 GMT
echo date(DATE_RFC2822); // Fri, 26 Jun 2020 01:23:45 +0000
echo date(DATE_RFC3339); // 2020-06-26T01:23:45+00:00
echo date(DATE_RFC3339_EXTENDED); // 2020-06-26T01:23:45.000+00:00
echo date(DATE_RSS); // Fri, 26 Jun 2020 01:23:45 +0000
echo date(DATE_W3C); // 2020-06-26T01:23:45+00:00
```

Here are some examples of using shorthand constants:

```php
echo date('c', strtotime('now')); // ISO8601
echo (new DateTime())->format('r'); // RFC2822
```

## Demo

Check out the following [Repl.it](https://replit.com/@remarkablemark/PHP-date):

<iframe height="800px" width="100%" src="https://replit.com/@remarkablemark/PHP-date?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
