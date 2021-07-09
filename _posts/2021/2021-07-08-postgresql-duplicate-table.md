---
layout: post
title: Duplicate PostgreSQL table
date: 2021-07-08 20:33:30
excerpt: How to duplicate a PostgreSQL table in terms of data and structure.
categories: postgresql postgres sql
---

Use [CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html) to duplicate a PostgreSQL table with data:

```sql
CREATE TABLE duplicate_tablename
AS TABLE original_tablename;
```

> However, this doesn't copy the table structure.

To copy a table with structure:

```sql
CREATE TABLE duplicate_tablename (
  LIKE original_tablename
  INCLUDING DEFAULTS
  INCLUDING CONSTRAINTS
  INCLUDING INDEXES
);
```

Then insert the data:

```sql
INSERT INTO duplicate_tablename
SELECT *
FROM original_tablename;
```
