---
layout: post
title: Set PostgreSQL max_connections in GitHub Actions
date: 2022-05-12 22:21:35
excerpt: How to increase PostgreSQL max_connections and shared_buffers in GitHub Actions workflow.
categories: docker compose postgres
---

This article goes over how to increase [PostgreSQL](https://www.postgresql.org/) [`max_connections`](https://www.postgresql.org/docs/current/runtime-config-connection.html#GUC-MAX-CONNECTIONS) and [`shared_buffers`](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-SHARED-BUFFERS) in a [GitHub Actions](https://github.com/features/actions) workflow.

## Prerequisites

[Set up Postgres in GitHub Actions]({% post_url 2021/2021-03-14-setup-postgresql-in-github-actions %}) so your workflow looks like:

```yml
# .github/workflows/postgres.yml
on: push
jobs:
  postgres:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
          --name my_postgres_container
        ports:
          - 5432:5432
    env:
      PGHOST: localhost
      PGUSER: postgres
      PGDATABASE: postgres
      PGPASSWORD: postgres
  steps:
    - name: Install psql
      run: |
        sudo apt-get update
        sudo apt-get install --yes postgresql-client
```

## Steps

SSH into the Docker container and edit the PostgreSQL config file:

```yml
- name: Increase max_connections and shared_buffers
  run: |
    docker exec -i my_postgres_container bash << EOF
      sed -i -e 's/max_connections = 100/max_connections = 1000/' /var/lib/postgresql/data/postgresql.conf
      sed -i -e 's/shared_buffers = 128MB/shared_buffers = 2GB/' /var/lib/postgresql/data/postgresql.conf
    EOF
```

`max_connections` was increased from 100 to 1000 and `shared_buffers` was increased from 128MB to 2GB.

To find the PostgreSQL config file, run:

```yml
- name: Show PostgreSQL config file
  run: psql -c 'SHOW config_file;'
```

Restart the container so the changes can take effect:

```yml
- run: docker restart --time 0 my_postgres_container
```

If you need to connect to the database immediately, add a timeout to wait until it's up again:

```yml
- run: sleep 5
```

Verify database's `max_connnections` has increased to 1000:

```yml
- run: psql -c 'SHOW max_connections;'
```

See [example workflow](https://github.com/remarkablemark/github-actions-workflows/blob/master/.github/workflows/postgres.yml).
