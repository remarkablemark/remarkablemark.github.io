---
layout: post
title: Convert timestamp in MySQL
date: 2020-08-31 21:28:17
excerpt: How to convert between timestamp and date string in MySQL.
categories: mysql timestamp
---

## UNIX_TIMESTAMP

[`UNIX_TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_unix-timestamp) returns the seconds since `1970-01-01 00:00:00 UTC`:

```sql
UNIX_TIMESTAMP() /* 1598832000 */
```

You can pass a date argument to the function:

```sql
UNIX_TIMESTAMP('2020-08-31 00:00:00') /* 1598832000 */
```

## FROM_UNIXTIME

[`FROM_UNIXTIME`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_from-unixtime) returns the timestamp in `YYYY-MM-DD hh:mm:ss` format:

```sql
FROM_UNIXTIME('1598832000') /* 2020-08-31 00:00:00.000000 */
```
