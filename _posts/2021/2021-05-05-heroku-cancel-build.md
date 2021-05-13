---
layout: post
title: How to cancel a Heroku build
date: 2021-05-05 20:14:21
updated: 2021-05-13 01:24:47
excerpt: How to cancel or stop a Heroku build that's stuck or in progress.
categories: heroku cli
---

> **TL;DR**: cancel the latest Heroku build:
>
> ```sh
> heroku builds:cancel -a $APP_NAME
> ```

## Prerequisite

Install the [Heroku Builds](https://github.com/heroku/heroku-builds) plugin:

```sh
heroku plugins:install heroku-builds
```

## List Builds

List the builds for `$APP_NAME`:

```sh
heroku builds -a $APP_NAME
```

See more builds:

```sh
heroku builds -a $APP_NAME -n 50
```

Get the latest build id:

```sh
heroku builds -a $APP_NAME | awk 'NR==4{print $1}'
```

## Cancel Build

Cancel build given `$APP_NAME` and `$BUILD_ID`:

```sh
heroku builds:cancel $BUILD_ID -a $APP_NAME
```

Cancel the latest build:

```sh
heroku builds:cancel -a $APP_NAME
```

Which is the same thing as:

```sh
heroku builds:cancel $(heroku builds -a $APP_NAME | awk 'NR==4{print $1}') -a $APP_NAME
```

## Help

View the help documentation:

```sh
heroku builds:cancel --help
```

```
cancel a running build

USAGE
  $ heroku builds:cancel [BUILD]

OPTIONS
  -a, --app=app        (required) app to run command against
  -r, --remote=remote  git remote of app to use

DESCRIPTION
  Stops executing a running build. Omit BUILD to cancel the latest build.
```
