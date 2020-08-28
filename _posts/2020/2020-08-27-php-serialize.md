---
layout: post
title: PHP serialize
date: 2020-08-27 20:35:16
excerpt: Examples of converting PHP values into strings with serialize.
categories: php serialize
---

## Function

[`serialize`](https://www.php.net/manual/en/function.serialize.php) transforms a PHP value into a string:

```php
serialize($value)
```

[`unserialize`](https://www.php.net/manual/en/function.unserialize.php) transforms a string back to a PHP value:

```php
unserialize($string)
```

## PHP values

### null

```php
serialize(null); // N;
```

### string

```php
serialize('');      // s:0:"";
serialize('hello'); // s:5:"hello";
```

### bool

```php
serialize(true);  // b:1;
serialize(false); // b:0;
```

### int

```php
serialize(42); // i:42;
```

### float

```php
serialize(3.14); // d:3.14;
```

### array

```php
serialize([]);                         // a:0:{}
serialize(['key' => 'value']);         // a:1:{s:3:"key";s:5:"value";}
serialize(['key' => 'value', 1 => 1]); // a:2:{s:3:"key";s:5:"value";i:1;i:1;}
```

### object

```php
serialize((object) ['key' => 'value']);         // O:8:"stdClass":1:{s:3:"key";s:5:"value";}
serialize((object) ['key' => 'value', 1 => 1]); // O:8:"stdClass":2:{s:3:"key";s:5:"value";s:1:"1";i:2;}
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/PHP-serialize):

<iframe height="800px" width="100%" src="https://repl.it/@remarkablemark/PHP-serialize?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
