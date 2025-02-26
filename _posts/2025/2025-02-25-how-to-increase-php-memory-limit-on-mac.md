---
layout: post
title: How to increase PHP memory limit on Mac
date: 2025-02-25 22:41:39
excerpt: How to increase PHP memory limit on macOS.
categories: php memory limit mac
---

## Problem

If you're getting the error when running a PHP command:

```
Fatal error: Allowed memory size of 123456789 bytes exhausted (tried to allocate 4096 bytes)
```

Then that means your PHP memory limit is too low:

```sh
php -i | grep memory_limit
```

```
memory_limit => 128M => 128M
```

To increase your PHP memory limit, you need to update the configuration file.

## Solution

Find your `php.ini` path:

```sh
php -r 'phpinfo();' | grep php.ini
```

It should look like:

```
Configuration File (php.ini) Path => /opt/homebrew/etc/php/8.3
Loaded Configuration File => /opt/homebrew/etc/php/8.3/php.ini
```

Open `php.ini` with your text editor:

```sh
nano /opt/homebrew/etc/php/8.3/php.ini
```

Increase the `memory_limit` (e.g., 2GB):

```diff
-memory_limit = 128M
+memory_limit = 2048M
```

Save the file and open a new Terminal window. Verify your PHP memory limit has increased:

```sh
php -i | grep memory_limit
```

```
memory_limit => 2048M => 2048M
```
