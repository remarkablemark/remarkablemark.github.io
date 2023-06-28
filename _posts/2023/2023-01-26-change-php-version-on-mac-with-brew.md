---
layout: post
title: Change PHP version on Mac with Brew
date: 2023-01-26 16:59:29
updated: 2023-06-27 21:40:33
excerpt: How to change PHP version on macOS with Homebrew.
categories: php mac brew
---

This post goes over how to change PHP version on macOS with Homebrew:

- [Prerequisites](#prerequisites)
- [Latest](#latest)
- [Version](#version)
- [Revert](#revert)

## Prerequisites

- [Homebrew](https://brew.sh/)

## Latest

Install the latest PHP version:

```sh
brew install php
```

Check the version:

```sh
php -v
```

```
PHP 8.2.1 (cli) (built: Jan 12 2023 02:29:10) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.1, Copyright (c) Zend Technologies
    with Zend OPcache v8.2.1, Copyright (c), by Zend Technologies
```

## Version

Install PHP 7.4:

```sh
brew install php@7.4
```

If you get the error:

```
Error: php@7.4 has been disabled because it is a versioned formula!
```

Then find an unsupported version of PHP from `shivammathur/php`:

```sh
brew search php
```

And install the version:

```sh
brew install shivammathur/php/php@7.4
```

Link the version:

```sh
brew link php@7.4
```

If you get a symlink error, then unlink `php`:

```sh
brew unlink php
```

And link the version:

```sh
brew link php@7.4
```

Update your `PATH` in `~/.zshrc`:

```bash
echo 'export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="/opt/homebrew/opt/php@7.4/sbin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Or `~/.bashrc`:

```bash
echo 'export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"' >> ~/.bashrc
echo 'export PATH="/opt/homebrew/opt/php@7.4/sbin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Check the version:

```sh
php -v
```

```
PHP 7.4.33 (cli) (built: Jan 21 2023 06:43:54) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.33, Copyright (c), by Zend Technologies
```

## Revert

Change back to the latest PHP version:

```sh
brew unlink php@7.4 && brew link php
```

Update your `~/.zshrc` or `~/.bashrc`:

```diff
-export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"
-export PATH="/opt/homebrew/opt/php@7.4/sbin:$PATH"
+export PATH="/opt/homebrew/opt/php/bin:$PATH"
+export PATH="/opt/homebrew/opt/php/sbin:$PATH"
```
