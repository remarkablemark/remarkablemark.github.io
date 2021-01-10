---
layout: post
title: PHP instantiate class string
date: 2020-10-28 20:46:06
excerpt: How to instantiate a PHP class given a fully-qualified class name.
categories: php
---

If you have a variable with a fully qualified [class name](https://www.php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.class):

```php
$className = MyClass::class;
```

You can use the variable to instantiate the class:

```php
$classInstance = new $className();
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/PHP-instantiate-class-string):

<iframe height="500px" width="100%" src="https://repl.it/@remarkablemark/PHP-instantiate-class-string?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
