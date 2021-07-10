---
layout: post
title: PostgreSQL alter column auto increment
date: 2021-07-09 21:51:26
excerpt: How to alter an existing PostgreSQL table column and set it to auto increment.
categories: postgresql postgres sql
---

## Create table

To create a PostgreSQL table column with auto increment, set type [SERIAL](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL):

```sql
CREATE TABLE tablename (
  columnname SERIAL
);
```

Here's an example that creates table `users` with auto increment column `id`:

```sql
CREATE TABLE users (
  id SERIAL
);
```

## Alter table

To alter a table column with auto increment, you'll need to create and set a [SEQUENCE](https://www.postgresql.org/docs/current/sql-createsequence.html):

```sql
CREATE SEQUENCE IF NOT EXISTS tablename_columnname_seq;

SELECT SETVAL('tablename_columnname_seq', (
  SELECT max(columnname) FROM tablename)
);

ALTER TABLE tablename
ALTER COLUMN columnname
SET DEFAULT nextval('tablename_columnname_seq'::regclass);

ALTER SEQUENCE tablename_columnname_seq
OWNED BY tablename.columnname;
```

Here's an example that alters table `users` with auto increment column `id`:

```sql
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

SELECT SETVAL('users_id_seq', (
  SELECT max(id) FROM users)
);

ALTER TABLE users
ALTER COLUMN id
SET DEFAULT nextval('users_id_seq'::regclass);

ALTER SEQUENCE users_id_seq
OWNED BY users.id;
```
