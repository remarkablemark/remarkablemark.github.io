---
layout: post
title: Deploy Git branch to Heroku
date: 2022-04-18 22:09:52
updated: 2022-04-20 00:22:59
excerpt: How to create and deploy a Git branch to Heroku via the CLI.
categories: git heroku cli
---

This article goes over how to create and deploy a Git branch to Heroku via the CLI.

## Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Create

Let's say you want to create a Heroku app named `my-app`.

Create it in Heroku dashboard or via the CLI:

```sh
heroku apps:create my-app # --team my-team
```

Optionally, you can add it to an existing pipeline:

```sh
heroku pipelines:add my-pipeline --app my-app # --stage development
```

## Remote

Set the Git remote for your app:

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

If you're adding multiple remotes, it's good practice to rename the remote:

```sh
git remote rename heroku heroku-my-app
```

## Config Vars

Save the config vars or environment variables from another Heroku app `other-app`:

```sh
heroku config --shell --app other-app > .env.heroku
```

Set the config vars to `my-app`:

```sh
cat .env.heroku | tr '\n' ' ' | xargs heroku config:set --app my-app
```

## Deploy

Deploy by pushing your branch to the Heroku remote:

```sh
git push <remote> <branch>:master
```

For example:

```sh
git push heroku-my-app my-branch:master
```

Alternatively, you can replace `master` with [`main`](https://devcenter.heroku.com/articles/git#deploy-your-code):

```sh
git push heroku-my-app my-branch:main
```

## Destroy

After you're done, delete the app from the dashboard or via the CLI:

```sh
heroku apps:destroy my-app
```

Then remove the remote:

```sh
git remote rm heroku-my-app
```
