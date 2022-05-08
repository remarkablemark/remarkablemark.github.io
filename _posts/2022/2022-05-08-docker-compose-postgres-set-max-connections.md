---
layout: post
title: Set Postgres max_connections in Docker Compose
date: 2022-05-08 18:07:56
excerpt: How to set PostgreSQL max_connections in Docker Compose.
categories: docker compose postgres
---

This article goes over how to set PostgreSQL `max_connections` in Docker Compose.

## Prerequisites

- [Docker Compose](https://docs.docker.com/compose/)

## Docker Compose

In `docker-compose.yml`, add a command to set `max_connections` to 250:

```yml
services:
  database:
    image: postgres:latest
    command: postgres -c 'max_connections=250'
```

The command does the same thing as running the SQL query:

```sql
ALTER SYSTEM SET max_connections = 250;
```

Start your database container:

```sh
docker compose up database
```

Run the SQL query to verify `max_connections` is set:

```sql
SHOW max_connections;
```
