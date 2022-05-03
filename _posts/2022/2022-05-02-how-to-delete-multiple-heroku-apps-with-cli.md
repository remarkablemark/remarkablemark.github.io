---
layout: post
title: How to delete multiple Heroku apps
date: 2022-05-02 22:11:24
excerpt: How to delete multiple Heroku apps with the CLI.
categories: heroku cli bash
---

> **TL;DR**: to delete all Heroku apps matching the `<PATTERN>`:
>
> ```sh
> heroku apps | grep <PATTERN> | xargs -n1 -I {} /bin/bash -c 'heroku apps:destroy {} --confirm={}'
> ```

This article goes over how to delete multiple Heroku apps with the CLI.

## Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## List Apps

List all Heroku apps:

```sh
heroku apps
```

List all Heroku apps in team `my-team`:

```sh
heroku apps --team=my-team
```

List all Heroku apps matching the pattern `my-app`:

```sh
heroku apps | grep my-app
```

List all Heroku apps matching the pattern `my-app` and excluding `production`:

```sh
heroku apps | grep my-app | grep -v production
```

## Delete Apps

Delete the first Heroku app matching the pattern `my-app`:

```sh
heroku apps | grep my-app | head -1 | xargs -n1 -I {} /bin/bash -c 'heroku apps:destroy {} --confirm={}'
```

Delete all Heroku apps matching the pattern `my-app`:

```sh
heroku apps | grep my-app | xargs -n1 -I {} /bin/bash -c 'heroku apps:destroy {} --confirm={}'
```
