---
layout: post
title: 'MySQL: convert between UUID and binary'
date: 2020-05-21 22:54:55
excerpt: How to convert between UUID string and binary in MySQL.
categories: mysql uuid binary function
---

## UUID string to binary

Find row that matches [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) with [`UUID_TO_BIN`](https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html#function_uuid-to-bin):

```sql
SELECT *
FROM my_table
WHERE uuid = UUID_TO_BIN('77dea2ad-3c8c-40c6-a278-7cf1a1ac9384');
```

> **Note**: `UUID_TO_BIN` is only supported in MySQL 8+.

If your version of MySQL does not support the function, you can use [`UNHEX`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_unhex):

```sql
SELECT *
FROM my_table
WHERE uuid = UNHEX(REPLACE('77dea2ad-3c8c-40c6-a278-7cf1a1ac9384', '-', ''));
```

## Binary to UUID string

Get a list of UUID's as strings using [`BIN_TO_UUID`](https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html#function_bin-to-uuid):

```sql
SELECT BIN_TO_UUID(uuid) AS uuid
FROM my_table;
```

> **Note**: `BIN_TO_UUID` is only supported in MySQL 8+.

If your version of MySQL does not support the function, you can use [`HEX`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_hex):

```sql
SELECT LOWER(CONCAT(
  LEFT(HEX(uuid), 8), '-',
  MID(HEX(uuid), 9, 4), '-',
  MID(HEX(uuid), 13, 4), '-',
  MID(HEX(uuid), 17, 4), '-',
  RIGHT(HEX(uuid), 12)
)) AS uuid
FROM my_table;
```

For the unformatted version (no hyphens and all uppercase):

```sql
SELECT HEX(uuid) AS uuid
FROM my_table;
```

## Functions

You can also polyfill the `BIN_TO_UUID` and `UUID_TO_BIN` [functions](https://dev.mysql.com/doc/refman/8.0/en/create-function.html).

### BIN_TO_UUID

```sql
DELIMITER //

CREATE FUNCTION BIN_TO_UUID(bin BINARY(16))
RETURNS CHAR(36) DETERMINISTIC
BEGIN
  DECLARE hex CHAR(32);
  SET hex = HEX(bin);
  RETURN LOWER(CONCAT(LEFT(hex, 8), '-', MID(hex, 9, 4), '-', MID(hex, 13, 4), '-', MID(hex, 17, 4), '-', RIGHT(hex, 12)));
END; //

DELIMITER ;
```

See [Gist](https://gist.github.com/remarkablemark/c85817dd98dcb7360f9229aab5537612):

{% gist 4fd35e940984440228e127210eb4fbd9 %}

### UUID_TO_BIN

```sql
DELIMITER //

CREATE FUNCTION UUID_TO_BIN(uuid CHAR(36))
RETURNS BINARY(16) DETERMINISTIC
BEGIN
  RETURN UNHEX(CONCAT(REPLACE(uuid, '-', '')));
END; //

DELIMITER ;
```

See [Gist](https://gist.github.com/remarkablemark/c85817dd98dcb7360f9229aab5537612):

{% gist 33635e6694ee90081c9451920547d04d %}
