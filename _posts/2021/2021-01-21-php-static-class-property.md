---
layout: post
title: PHP static class property
date: 2021-01-21 20:46:15
excerpt: How to access static class property in PHP.
categories: php class static
---

Given class `MyClass` with static property `$var`:

```php
class MyClass
{
    public static $var = 42;
}
```

To access `MyClass::$var` in class method `method()`:

```php
class MyClass
{
    public static $var = 42;

    public function method()
    {
        self::$var;
    }
}
```

> Notice how the syntax is `self::$var`.

To access a class property when it's not static:

```php
class MyClass
{
    public $var = 42;

    public function method()
    {
        $this->var;
    }
}
```

> Notice how the syntax is `$this->var`.

See [static properties](https://www.php.net/manual/en/language.oop5.static.php#language.oop5.static.properties) for more details.
