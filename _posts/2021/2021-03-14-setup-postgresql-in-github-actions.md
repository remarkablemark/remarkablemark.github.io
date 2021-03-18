---
layout: post
title: Set up Postgres in GitHub Actions
date: 2021-03-14 21:26:38
excerpt: How to set up PostgreSQL in a GitHub Actions workflow.
categories: postgres github actions workflow
---

<!--email_off-->

[GitHub Actions](https://b.remarkabl.org/github-actions) workflow that sets up [PostgreSQL](https://b.remarkabl.org/postgresql) in a [Node.js](https://b.remarkabl.org/nodejs-site) container:

```yml
# .github/workflows/postgres.yml
on: push
jobs:
  # label of the container job
  postgres-job:
    # containers must run in Linux based operating systems
    runs-on: ubuntu-latest
    # Docker Hub image that `postgres-job` executes in
    container: node:latest

    # service containers to run with `postgres-job`
    services:
      # label used to access the service container
      postgres:
        # Docker Hub image
        image: postgres:latest
        # service environment variables
        # `POSTGRES_HOST` is `postgres`
        env:
          # optional (defaults to `postgres`)
          POSTGRES_DB: postgres_db
          # required
          POSTGRES_PASSWORD: postgres_password
          # optional (defaults to `5432`)
          POSTGRES_PORT: 5432
          # optional (defaults to `postgres`)
          POSTGRES_USER: postgres_user
        ports:
          # maps tcp port 5432 on service container to the host
          - 5432:5432
        # set health checks to wait until postgres has started
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Install PostgreSQL client
        run: |
          apt-get update
          apt-get install --yes postgresql-client

      # queries database with postgres client
      - name: Query database
        run: psql -h postgres -d postgres_db -U postgres_user -c 'SELECT 1;'
        env:
          # postgress password is required; alternatively, you can run:
          # `PGPASSWORD=postgres_password psql ...`
          PGPASSWORD: postgres_password
```

The database connection string is:

```
postgres://postgres_user:postgres_password@postgres:5432/postgres_db
```

If `POSTGRES_DB` is not set in the service `env`, the database can be created manually:

```yml
steps:
  - name: Install PostgreSQL client
    # ...
  - name: Setup database
    run: psql -h postgres -U postgres_user -c 'CREATE DATABASE "postgres_db";'
    env:
      PGPASSWORD: postgres
```

## Resources

The example source code can be found [here](https://github.com/remarkablemark/github-actions-postgres-example).

The article is inspired by "[Creating PostgreSQL service containers](https://docs.github.com/en/actions/guides/creating-postgresql-service-containers)".

[Workflow](https://github.com/actions/example-services/blob/master/.github/workflows/postgres-service.yml) that shows difference between setting up Postgres in a container versus a virtual machine (VM).

<!--/email_off-->
