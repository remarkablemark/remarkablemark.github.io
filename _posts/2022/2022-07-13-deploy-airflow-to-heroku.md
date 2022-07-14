---
layout: post
title: How to deploy Airflow to Heroku
date: 2022-07-13 21:07:45
excerpt: How to deploy Apache Airflow to Heroku.
categories: airflow python heroku
---

This post goes over how to deploy [Apache Airflow](https://airflow.apache.org/) to [Heroku](https://www.heroku.com/). See the [repository](https://github.com/remarkablemark/heroku-airflow).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/remarkablemark/heroku-airflow)

## Stack

- [Celery](https://docs.celeryq.dev/)
- [Mailgun](https://elements.heroku.com/addons/mailgun)
- [PostgreSQL](https://elements.heroku.com/addons/heroku-postgresql)
- [Redis](https://elements.heroku.com/addons/rediscloud)

## Env

Ensure the config vars from [app.json](https://github.com/remarkablemark/heroku-airflow/blob/master/app.json) are set in your Heroku app:

```bash
AIRFLOW__CELERY__WORKER_CONCURRENCY=2
AIRFLOW__CORE__FERNET_KEY=
AIRFLOW_HOME=/app
AIRFLOW__WEBSERVER__BASE_URL=
AIRFLOW__WEBSERVER__COOKIE_SAMESITE=Strict
AIRFLOW__WEBSERVER__COOKIE_SECURE=True
AIRFLOW__WEBSERVER__SECRET_KEY=
AIRFLOW__WEBSERVER__WORKERS=2
```

Install [cryptography](https://pypi.org/project/cryptography/):

```sh
pip3 install cryptography
```

Generate a `AIRFLOW__CORE__FERNET_KEY`:

```sh
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

Set `AIRFLOW__CORE__FERNET_KEY` in your Heroku app:

```sh
heroku config:set AIRFLOW__CORE__FERNET_KEY=$(python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")
```

Generate a `AIRFLOW__WEBSERVER__SECRET_KEY`:

```sh
openssl rand -base64 32 # head -c 32 /dev/random | base64
```

Set `AIRFLOW__WEBSERVER__SECRET_KEY` in your Heroku app:

```sh
heroku config:set AIRFLOW__WEBSERVER__SECRET_KEY=$(openssl rand -base64 32)
```

## Database

If you're seeing the error in your Heroku logs:

```
ERROR: You need to initialize the database. Please run `airflow db init`.
```

Then verify your Airflow config looks good before initializing the database in your Heroku app:

```sh
heroku run bash
```

```sh
airflow info
```

```sh
airflow db init
```

## User

Create a user in your Heroku app:

```sh
heroku run bash
```

```sh
airflow users create -e EMAIL -f FIRSTNAME -l LASTNAME [-p PASSWORD] -r ROLE [--use-random-password] -u USERNAME
```

Here's an example of how to create an admin user:

```sh
airflow users create \
  --username admin \
  --firstname FIRST_NAME \
  --lastname LAST_NAME \
  --role Admin \
  --email admin@example.org
```

## Resources

- [remarkablemark/heroku-airflow](https://github.com/remarkablemark/heroku-airflow)
- [heroku/heroku-airflow](https://github.com/heroku/heroku-airflow)
- [slyapustin/airflow-on-heroku](https://github.com/slyapustin/airflow-on-heroku)
- [jsoyland/heroku_airflow](https://github.com/jsoyland/heroku_airflow)
- [Running Airflow on Heroku](https://medium.com/@damesavram/running-airflow-on-heroku-ed1d28f8013d)
