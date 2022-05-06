---
layout: post
title: How to send logs from Heroku to Datadog
date: 2022-05-06 18:36:44
excerpt: How to send logs from Heroku Logplex to Datadog over HTTP.
categories: heroku datadog log
---

This article goes over how to send logs from Heroku Logplex to Datadog over HTTP.

## Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Datadog account](https://www.datadoghq.com/)

## Datadog

Copy your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys). It should look something like:

```
67890abcedf01234567890abcdef0123
```

Add an [HTTPS log drain](https://devcenter.heroku.com/articles/log-drains#https-drains) so [Heroku Logplex](https://devcenter.heroku.com/articles/logplex) sends a POST request to [Datadog](https://docs.datadoghq.com/api/latest/logs/#send-logs):

```sh
heroku drains:add --app=<HEROKU_APP_NAME> 'https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=heroku&env=production&service=<HEROKU_APP_NAME>&host=<HEROKU_APP_NAME>.herokuapp.com'
```

> Replace `<HEROKU_APP_NAME>` with your Heroku app name and `<DATADOG_API_KEY>` with your Datadog API key.

If you're still using the deprecated v1 endpoint:

```sh
heroku drains:add --app=<HEROKU_APP_NAME> 'https://http-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>?ddsource=heroku&service=<HEROKU_APP_NAME>&host=<HEROKU_APP_NAME>.herokuapp.com'
```

To see your log drain:

```sh
heroku drains --app=<HEROKU_APP_NAME> # --json
```

## Resources

See Datadog's [Log Collection and Integrations](https://docs.datadoghq.com/logs/log_collection/?tab=host).
