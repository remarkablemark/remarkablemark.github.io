---
layout: post
title: Deploy Git branch to Heroku
date: 2022-04-18 22:09:52
excerpt: How to deploy a Git branch to Heroku using the CLI.
categories: git heroku cli
---

This article goes over how to deploy a Git branch to Heroku using the CLI.

## Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Heroku

Go to your Heroku dashboard and create a new app. Let's say your Heroku app is named `my-app`.

## CLI

Add the Git remote for your Heroku app `my-app`:

```sh
heroku git:remote --app my-app
```

By default, the Heroku remote is named `heroku`:

```sh
git remote -v
```

```
heroku  https://git.heroku.com/my-app.git (fetch)
heroku  https://git.heroku.com/my-app.git (push)
```

Rename the Git remote to `heroku-my-app`:

```sh
git remote rename heroku heroku-my-app
```

Copy environment variables from another Heroku app to `my-app`:

```sh
heroku config -s -a $APP_NAME > .env # replace $APP_NAME
```

```sh
cat .env | tr '\n' ' ' | xargs heroku config:set -a my-app
```

Deploy by pushing your feature branch `my-feature` to the Heroku remote:

```sh
git push heroku-my-app my-feature:master
```

Alternatively, you can deploy to [`main`](https://devcenter.heroku.com/articles/git#deploy-your-code):

```sh
git push heroku-my-app my-feature:main
```

After you're done, you can delete the Heroku app from the dashboard and remove the remote:

```sh
git remote rm heroku-my-app
```
