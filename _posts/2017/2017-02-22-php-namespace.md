---
layout: post
title: Namespacing in PHP
date: 2017-02-22 23:55:00 -4000
excerpt: PHP namespaces allows you to prevent name collisions.
categories: php namespace
---

Let's say you have file `foo.php` with a single function:

```php
<?php
// foo.php

function hello() {
    return 'hello from foo';
}
```

And `hello()` is called inside `index.php`:

```php
<?php
// index.php

include 'foo.php';

echo hello();
```

When you run `index.php` in your command-line:

```sh
php index.php
hello from foo
```

But what if there's a file `bar.php` that has a function with the same name?

```php
<?php
// bar.php

function hello() {
    return 'hello from bar';
}
```

If you include the file in `index.php`:

```php
<?php
// index.php

include 'foo.php';
include 'bar.php';

echo hello();
```

You will get an error when running `index.php` in the command-line:

```sh
php index.php
Fatal error: Cannot redeclare hello()
```

So how do we resolve this? With [PHP namespaces](http://php.net/manual/en/language.namespaces.rationale.php).

So let's namespace `foo`:

```php
<?php
// foo.php

namespace foo;

function hello() {
    return 'hello from foo';
}
```

Then namespace `bar`:

```php
<?php
// bar.php

namespace bar;

function hello() {
    return 'hello from bar';
}
```

And update `index.php`:

```php
<?php
// index.php

include 'foo.php';
include 'bar.php';

echo foo\hello();
echo "\n"; // newline
echo bar\hello();
```

You should notice that the namespace name and function name are joined by a backslash.

Now when you run `index.php`, you should get the expected output:

```sh
php index.php
hello from foo
hello from bar
```
