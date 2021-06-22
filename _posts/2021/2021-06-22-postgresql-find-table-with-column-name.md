---
layout: post
title: Find PostgreSQL tables with column name
date: 2021-06-22 19:37:22
excerpt: How to find PostgreSQL tables with a column name.
categories: postgres sql
---

This post goes over how to find PostgreSQL tables with a column name.

## INFORMATION_SCHEMA

Find all PostgreSQL tables with the column name `foo`:

```sql
SELECT TABLE_NAME, COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'foo';
```

> See ["Find MySQL tables with column name"]({% post_url 2020/2020-08-25-mysql-find-table-with-column-name %}).

## pg_class

Find all PostgreSQL tables with the column name `foo`:

```sql
SELECT pg_class.relname
FROM pg_class
JOIN pg_attribute ON pg_attribute.attrelid = pg_class.oid
WHERE pg_attribute.attname = 'foo'
AND pg_class.relkind = 'r';
```
