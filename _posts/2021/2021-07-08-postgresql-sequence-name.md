---
layout: post
title: PostgreSQL sequence name
date: 2021-07-08 20:38:18
excerpt: How to get a list of sequence names in PostgreSQL.
categories: postgresql postgres sql sequence
---

Get a list of `sequence_name` in PostgreSQL with [information_schema](https://www.postgresql.org/docs/current/information-schema.html):

```sql
SELECT sequence_name
FROM information_schema.sequences;
```

Alternatively, check [pg_class](https://www.postgresql.org/docs/current/catalog-pg-class.html) `relname`:

```sql
SELECT relname
FROM pg_class
WHERE relkind = 'S';
```
