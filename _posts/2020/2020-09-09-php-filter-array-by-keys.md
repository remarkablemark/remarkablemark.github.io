---
layout: post
title: PHP filter array by keys
date: 2020-09-09 19:55:07
excerpt: How to filter an associative array by a list of keys in PHP.
categories: php filter array
---

Given an associative array:

```php
$array = [
    '1' => 'One',
    '2' => 'Two',
    '3' => 'Three',
    '4' => 'Four',
];
```

If you want to filter the array by the keys:

```php
$keys = [1, 3];
```

You can use the methods:

- [Filter](#filter)
- [Intersect](#intersect)

## Filter

Using [`array_filter`](https://www.php.net/manual/en/function.array-filter.php):

```php
array_filter($array, function ($key) use ($keys) {
    return in_array($key, $keys);
}, ARRAY_FILTER_USE_KEY);
```

Here's the function:

```php
function filterArrayByKeys(array $array, array $keys): array
{
    return array_filter($array, function ($key) use ($keys) {
        return in_array($key, $keys);
    }, ARRAY_FILTER_USE_KEY);
}
```

## Intersect

Using [`array_intersect_keys`](https://www.php.net/manual/en/function.array-intersect-key.php):

```php
array_intersect_key($array, array_flip($keys));
```

Here's the function:

```php
function filterArrayByKeys(array $array, array $keys): array
{
    return array_intersect_key($array, array_flip($keys));
}
```

## Demo

[Replit](https://replit.com/@remarkablemark/PHP-filter-array-by-keys):

<iframe height="800px" width="100%" src="https://replit.com/@remarkablemark/PHP-filter-array-by-keys?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
