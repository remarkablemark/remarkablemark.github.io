---
layout: post
title: How to update a Composer package
date: 2022-09-28 22:21:09
updated: 2022-09-30 13:11:04
excerpt: How to update a Composer package dependency.
categories: composer php
---

To update a [Composer](https://getcomposer.org/) package to the latest version:

```sh
composer update <package>
```

For example, to update `phpunit/phpunit` to the latest version:

```sh
composer update phpunit/phpunit
```

To install `phpunit/phpunit` version `8.5`:

```sh
composer require phpunit/phpunit:8.5
```

To install the new dependency without updating `composer.lock`, pass option `--no-update`:

```sh
composer require phpunit/phpunit:8.5 --no-update
```

To update all dependencies to the latest version according to `composer.json`:

```sh
composer update
```

> This also updates `composer.lock`.

Rerun the command with debug verbosity to see more output:

```sh
composer update -vvv
```

> Composer can take a while since it downloads entire package lists.

To see more information about a Composer command:

```sh
composer --help
```

```sh
composer update --help
```

```sh
composer require --help
```
