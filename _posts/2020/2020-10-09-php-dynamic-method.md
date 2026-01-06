---
layout: post
title: PHP dynamic method
date: 2020-10-09 19:25:57
excerpt: How to dynamically create PHP methods using the magic method `__call()`.
categories: php method overloading
---

You can dynamically create [PHP](https://www.php.net/) methods using what they call ["overloading"](https://www.php.net/manual/en/language.oop5.overloading.php).

The magic class method [`__call()`](https://www.php.net/manual/en/language.oop5.overloading.php#object.call) allows undeclared methods to be invoked in the object context.

## Example

Given a class with the magic method `__call()`:

```php
class MyClass
{
    public function __call(string $method, array $arguments)
    {
        return call_user_func_array($this->$method, $arguments);
    }
}
```

And the class is instantiated:

```php
$instance = new MyClass();
```

You can dynamically set and call a method on the object:

```php
$instance->sayHello = function ($name) {
    return "Hello, $name!";
};
$instance->sayHello('world'); // 'Hello, world!'
```

## Demo

[Repl.it](https://replit.com/@remarkablemark/PHP-dynamic-method):

<iframe height="750px" width="100%" src="https://replit.com/@remarkablemark/PHP-dynamic-method?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
