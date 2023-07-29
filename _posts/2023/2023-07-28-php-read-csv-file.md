---
layout: post
title: PHP read CSV file
date: 2023-07-28 20:11:22
excerpt: How to read a CSV file with PHP.
categories: php csv
---

This post goes over how to read a CSV file with PHP without external dependencies.

## Prerequisites

Given a CSV file `file.csv`:

```
id,name
1,John
2,Mary
```

## Get CSV

PHP function that opens and gets the CSV file:

```php
// main.php
function readCSV(string $csv): array
{
    $file = fopen($csv, 'r');
    $rows = [];

    while (!feof($file)) {
        $rows[] = fgetcsv($file);
    }

    fclose($file);
    $rows = array_filter($rows);

    return $rows;
}

print_r(readCSV('file.csv'));
```

Running the script in a command-line:

```sh
php main.php
```

Output:

```php
Array
(
    [0] => Array
        (
            [0] => id
            [1] => name
        )

    [1] => Array
        (
            [0] => 1
            [1] => John
        )

    [2] => Array
        (
            [0] => 2
            [1] => Mary
        )

)
```

## Transform CSV

PHP function that opens, gets, and transforms the CSV file:

```php
// main.php
function readCSV(string $csv): array
{
    $file = fopen($csv, 'r');
    $rows = [];

    while (!feof($file)) {
        $rows[] = fgetcsv($file);
    }

    fclose($file);
    $rows = array_filter($rows);

    $output = [];
    $headers = array_shift($rows);

    foreach ($rows as $row) {
        $transform = [];

        foreach ($headers as $index => $header) {
            $transform[$header] = $row[$index];
        }

        $output[] = $transform;
    }

    return $output;
}

print_r(readCSV('file.csv'));
```

Running the script in a command-line:

```sh
php main.php
```

Output:

```php
Array
(
    [0] => Array
        (
            [id] => 1
            [name] => John
        )

    [1] => Array
        (
            [id] => 2
            [name] => Mary
        )

)
```

## Demo

[Replit](https://replit.com/@remarkablemark/PHP-read-CSV#main.php):

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/PHP-read-CSV?lite=true#main.php" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
