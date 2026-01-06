---
layout: post
title: PHP benchmark function
date: 2020-07-30 20:32:42
excerpt: How to write a benchmark function in PHP to measure the time elapsed.
categories: php benchmark performance time function
---

Let's say you want to measure how long `myFunction` takes:

```php
function myFunction(): void
{
    sleep(1); // 1 second
}
```

To write a quick benchmark, you can use [`microtime`](https://www.php.net/manual/en/function.microtime.php) and [`number_format`](https://www.php.net/manual/en/function.number-format.php):

```php
$time = microtime(true);
myFunction();
$elapsed = microtime(true) - $time;
echo number_format($elapsed, 3); // 1.000
```

## Basic Function

To create a basic function from the code above:

```php
function benchmark(): float
{
    static $time;
    if (is_null($time)) {
        $time = microtime(true);
        return 0;
    }
    return microtime(true) - $time;
}
```

This allows you to refactor the example to the following:

```php
echo number_format(benchmark(), 3); // 0.000
myFunction();
echo number_format(benchmark(), 3); // 1.000
```

## Advanced Function

For a more advanced function that allows multiple entries to be stored and reset:

```php
/**
 * Benchmarks elapsed time for a given entry.
 *
 * @param string $key
 * @param bool $reset
 * @return float
 */
function benchmark(string $key = '', bool $reset = false): float
{
    static $entries = [];
    if ($reset) {
        unset($entries[$key]);
    }
    if (empty($entries[$key])) {
        $currentTime = microtime(true);
        $entries[$key] = $currentTime;
        return 0;
    }
    $currentTime = microtime(true);
    $previousTime = $entries[$key];
    $elapsedTime = $currentTime - $previousTime;
    return $elapsedTime;
}
```

The function can be used like so:

```php
echo number_format(benchmark('myFunction'), 3); // 0.000
myFunction();
echo number_format(benchmark('myFunction'), 3); // 1.000
echo number_format(benchmark('myFunction', true), 3); // 0.000
```

## Demo

Check out the [Repl.it](https://replit.com/@remarkablemark/PHP-benchmark-function) of the advanced function:

<iframe height="800px" width="100%" src="https://replit.com/@remarkablemark/PHP-benchmark-function?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
