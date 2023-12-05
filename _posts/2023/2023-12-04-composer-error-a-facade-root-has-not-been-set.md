---
layout: post
title: 'How to fix error "A facade root has not been set."'
date: 2023-12-04 22:45:15
excerpt: 'How to fix error "A facade root has not been set."'
categories: php composer laravel
---

I was upgrading Laravel and got the error:

```
Fatal error: Uncaught RuntimeException: A facade root has not been set. in /Users/remarkablemark/laravel-project/vendor/laravel/framework/src/Illuminate/Support/Facades/Facade.php:335
```

The fix was to run `composer update` with `--no-scripts`:

```sh
composer update --no-scripts
```
