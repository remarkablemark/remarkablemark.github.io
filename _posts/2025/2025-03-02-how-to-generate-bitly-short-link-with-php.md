---
layout: post
title: Generate a Bitly short link with PHP
date: 2025-03-02 20:18:24
excerpt: How to generate Bitly short link with PHP.
categories: bitly php composer
---

This post goes over how to generate a [Bitly](https://bitly.com/) short link with [PHP](https://www.php.net/).

## Prerequisites

You should be using PHP 8+:

```sh
php --version
```

Generate a Bitly [access token](https://app.bitly.com/settings/api/).

## Composer

Install with [Composer](https://getcomposer.org/):

```sh
composer require bitly-api/sdk php-http/guzzle7-adapter
```

## SDK

Create the script:

```sh
touch script.php
```

Instantiate the SDK:

```php
<?php

require_once 'vendor/autoload.php';

$bitly = new Bitly\Bitly('YOUR_API_KEY'); // replace access token
```

Convert a long URL to a Bitlink:

```php
$shorten = new Bitly\Model\Shorten();
$shorten->setLongUrl('https://example.com/my-long-url'); // replace url
$response = $bitly->client->createBitLink($shorten);
echo $response->link;
```

See the full script:

```php
<?php

require_once 'vendor/autoload.php';

$bitly = new Bitly\Bitly('YOUR_API_KEY'); // replace access token

$shorten = new Bitly\Model\Shorten();
$shorten->setLongUrl('https://example.com/my-long-url'); // replace url
$response = $bitly->client->createBitLink($shorten);
echo $response->link;
```

## Resources

- [Bitly PHP SDK](https://github.com/bitly-community/bitly-php)
