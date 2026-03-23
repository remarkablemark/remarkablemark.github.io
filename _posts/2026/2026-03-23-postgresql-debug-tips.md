---
layout: post
title: PostgreSQL Debug Tips
date: 2026-03-23 17:15:04
excerpt: Tips on how to debug PostgreSQL database.
categories: postgresql debug database
---

Tips on how to debug Postgres:

- [Explain Analyze](#explain-analyze)
- [Slow Statements](#slow-statements)
- [Session Activity](#session-activity)

## Explain Analyze

Check if the planner chose a bad plan for your query:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT ...
```

`EXPLAIN ANALYZE` runs the statement and shows actual timings and `BUFFERS` helps identify heavy reads/hits.

## Slow Statements

Find slow statements:

```sql
SELECT
  query,
  calls,
  total_exec_time,
  mean_exec_time,
  rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;
```

Depending on the queries, you can improve the query-plan, index, and/or infrastructure.

## Session Activity

Check what sessions are waiting on:

```sql
SELECT
  pid,
  usename,
  state,
  wait_event_type,
  wait_event,
  query
FROM pg_stat_activity
WHERE state <> 'idle';
```

- `Lock` (for `wait_event_type`) means there's a blocking/locking problem.
- `IO` or buffer-related waits means there's a storage/cache issue.
- Little waiting time but high runtime means there could be an expensive execution plan or CPU-heavy work.
