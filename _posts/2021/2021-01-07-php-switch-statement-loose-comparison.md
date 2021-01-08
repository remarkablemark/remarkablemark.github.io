---
layout: post
title: PHP switch statement loose comparison
date: 2021-01-07 22:13:10
excerpt: Be careful of PHP switch statement loose comparison.
categories: php switch
---

This article goes over a gotcha of [PHP switch statements](https://www.php.net/manual/en/control-structures.switch.php).

## Quiz

### Question 1

What does the following output?

```php
switch (null) {
  case '':
    var_dump('');
    break;
  case null:
    var_dump(null);
    break;
}
```

The answer is `string(0) ""`.

### Question 2

What does the following output?

```php
switch ('') {
  case null:
    var_dump(null);
    break;
  case '':
    var_dump('');
    break;
}
```

The answer is `NULL`.

### Question 3

What does the following output?

```php
switch ('0') {
  case 0:
    var_dump(0);
    break;
  case '0':
    var_dump('0');
    break;
}
```

The answer is `int(0)`.

## Loose comparison

Because PHP switch/case does [loose comparison](https://www.php.net/manual/en/types.comparisons.php#types.comparisions-loose), it can evaluate incorrectly for the cases:

- `true`
- `false`
- `1`
- `0`
- `-1`
- `'1'`
- `'0'`
- `'-1'`
- `null`
- `[]`
- `''`

This is due to PHP's implicit casting or [type juggling](https://www.php.net/manual/en/language.types.type-juggling.php).

See [Repl.it](https://repl.it/@remarkablemark/PHP-switch-statement-loose-comparison):

<iframe height="600px" width="100%" src="https://repl.it/@remarkablemark/PHP-switch-statement-loose-comparison?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
