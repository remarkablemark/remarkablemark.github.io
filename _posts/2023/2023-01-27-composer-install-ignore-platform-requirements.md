---
layout: post
title: Composer install ignore requirements
date: 2023-01-27 13:52:27
excerpt: Install Composer dependencies while ignoring all platform requirements.
categories: composer php
---

This post goes over how to install Composer dependencies while ignoring platform requirements.

## Problem

I recently changed my PHP version and tried to reinstall my Composer depedendencies:

```sh
composer install
```

But I got the error:

```
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Your lock file does not contain a compatible set of packages. Please run composer update.

  Problem 1
    - phpspec/phpspec is locked to version 5.1.2 and an update of this package was not requested.
    - phpspec/phpspec 5.1.2 requires php ^7.1, <7.4 -> your php version (7.4.33) does not satisfy that requirement.
```

## Solution

To ignore all platform requirements while installing, pass the option `--ignore-platform-reqs`:

```sh
composer install --ignore-platform-reqs
```

Composer install completed successfully without any errors.
