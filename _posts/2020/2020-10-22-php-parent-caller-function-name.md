---
layout: post
title: PHP parent caller function name
date: 2020-10-22 20:03:47
excerpt: How to get the parent caller function name in PHP.
categories: php debug
---

> **TL;DR**: Get the parent caller function name in PHP with:
>
> ```php
> debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2)[1]['function']
> ```

To get the current function name, use the [magic constant](https://www.php.net/manual/en/language.constants.predefined.php) `__METHOD__` or `__FUNCTION__`:

```php
function foo() {
   echo __METHOD__;
}

foo(); // 'foo'
```

To get the parent caller function name, use [`debug_backtrace()`](https://www.php.net/manual/en/function.debug-backtrace.php):

```php
function parent() {
    child();
}

function child() {
    echo debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2)[1]['function'];
}

child(); // 'parent'
```

The option `DEBUG_BACKTRACE_IGNORE_ARGS` and limit `2` stack frames were passed to save memory.
