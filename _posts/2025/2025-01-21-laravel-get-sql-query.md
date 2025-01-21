---
layout: post
title: Laravel get SQL query
date: 2025-01-21 18:01:25
excerpt: How to get Laravel SQL query.
categories: laravel sql query
---

This post goes over how to get [Laravel](https://laravel.com/) SQL query.

## Prerequisites

Let's say you have a query:

```php
use Illuminate\Support\Facades\DB;

DB::table('users')->where('id', 1)->get();
```

## toSQL

Call `toSql()` to get the SQL:

```php
DB::table('users')->where('id', 1)->toSql();
// "select * from `users` where `id` = ?"
```

Call `getBindings()` to get the bindings:

```php
DB::table('users')->where('id', 1)->getBindings();
// = [1]
```

## enableQueryLog

Get query log:

```php
DB::enableQueryLog();
DB::table('users')->where('id', 1)->get();
DB::getQueryLog();
```

Log output:

```php
[
  [
    "query" => "select * from `users` where `id` = ?",
    "bindings" => [
      1,
    ],
    "time" => 13.37,
  ],
]
```
