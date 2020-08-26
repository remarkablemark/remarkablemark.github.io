---
layout: post
title: Find MySQL tables with column name
date: 2020-08-25 22:04:38
excerpt: How to find MySQL tables with column name.
categories: mysql sql
---

Find all MySQL tables with column name `foo`:

```sql
SELECT TABLE_NAME, COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'foo';
```

Find all MySQL tables with column name `bar` or `baz`:

```sql
SELECT TABLE_NAME, COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME IN ('bar', 'baz');
```

Find all MySQL tables with column name containing `qux`:

```sql
SELECT TABLE_NAME, COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME LIKE '%qux%';
```
