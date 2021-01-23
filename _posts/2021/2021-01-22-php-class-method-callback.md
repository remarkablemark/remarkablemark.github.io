---
layout: post
title: PHP class method callback
date: 2021-01-22 20:34:30
excerpt: How to create a callback method in a PHP class.
categories: php class callback callable
---

Given class `MyClass`:

```php
class MyClass {}
```

To create a [`callback`](https://www.php.net/manual/en/language.types.callable.php) function that takes a [`callable`](https://www.php.net/manual/en/language.types.callable.php) argument:

```php
class MyClass
{
    public function callback(callable $func): void
    {
        $func();
    }
}
```

To create a `method` that calls the `callback` function:

```php
class MyClass
{
    public function callback(callable $func): void
    {
        $func();
    }

    public function method(): void
    {
        $this->callback(function () {
            echo 'Hello, World!';
        });
    }
}
```

Instantiate the class and call `method` and `callback`:

```php
$myClass = new MyClass();
$myClass->method(); // Hello, World!
$myClass->callback(function () { echo 42; }); // 42
```
