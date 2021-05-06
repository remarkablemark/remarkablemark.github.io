---
layout: post
title: How to cancel a Heroku build
date: 2021-05-05 20:14:21
excerpt: How to cancel or stop a Heroku build that's stuck or in progress.
categories: heroku cli
---

> **TL;DR**: cancel most recent Heroku build:
>
> ```sh
> heroku builds:cancel $BUILD_ID $APP_NAME
> ```

## Prerequisite

Install the [Heroku Builds](https://github.com/heroku/heroku-builds) plugin:

```sh
heroku plugins:install heroku-builds
```

## Get Builds

Get a list of builds for `$APP_NAME`:

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
heroku builds:cancel $BUILD_ID $APP_NAME
```

Cancel latest build:

```sh
heroku builds:cancel $(heroku builds -a $APP_NAME | awk 'NR==4{print $1}') $APP_NAME
```
