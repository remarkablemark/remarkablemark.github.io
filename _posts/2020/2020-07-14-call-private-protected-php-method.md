---
layout: post
title: Calling private/protected PHP methods
date: 2020-07-14 21:52:50
excerpt: How to call private or protected PHP methods using Reflection.
categories: php private protected class method
---

Generally, [private or protected](https://www.php.net/manual/en/language.oop5.visibility.php) methods **_should not_** be accessible outside the [class](https://www.php.net/manual/en/language.oop5.php). But if you're writing a unit test, you can break this rule.

Given PHP class with private method:

```php
class Foo
{
    private function bar(): string
    {
        return 'baz';
    }
}
```

## Reflection

Use [Reflection](https://www.php.net/manual/en/book.reflection.php) to call the method outside the class:

```php
$reflectionClass = new ReflectionClass(Foo::class);
$reflectionMethod = $reflectionClass->getMethod('bar');
$reflectionMethod->setAccessible(true);
$reflectionMethod->invoke(new Foo()); // 'baz'
```

> Reflection works for both **private** and **protected** methods.

Alternatively, this can be refactored and simplified to `ReflectionMethod`:

```php
$reflectionMethod = new ReflectionMethod(Foo::class, 'bar');
$reflectionMethod->setAccessible(true);
$reflectionMethod->invoke(new Foo()); // 'baz'
```

To pass method arguments, use [ReflectionMethod::invokeArgs](https://www.php.net/manual/en/reflectionmethod.invokeargs.php):

```php
$args = [1, 2, 3];
$reflectionMethod->invokeArgs(new Foo(), $args);
```

Here's a reusable function that calls a class instance method:

```php
/**
 * Calls object method with arguments.
 *
 * @param object $object
 * @param string $method
 * @param array $args
 * @return mixed
 */
function callObjectMethod(object $object, string $method, array $args = [])
{
    $reflectionMethod = new ReflectionMethod(get_class($object), $method);
    $reflectionMethod->setAccessible(true);
    return $reflectionMethod->invokeArgs($object, $args);
}
```

This means you can call `Foo::bar`:

```php
callObjectMethod(new Foo(), 'bar'); // 'baz'
```

## Demo

See [Repl.it](https://repl.it/@remarkablemark/PHP-call-private-method):

<iframe height="800px" width="100%" src="https://repl.it/@remarkablemark/PHP-call-private-method?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
