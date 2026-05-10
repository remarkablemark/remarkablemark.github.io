---
layout: post
title: How to run SearXNG with Docker
date: 2026-05-10 14:46:44
excerpt: How to install and run SearXNG with Docker.
categories: searxng docker
---

This post goes over how to install and run [SearXNG](https://github.com/searxng/searxng) with [Docker](https://www.docker.com/).

## Install

[Install Docker](https://docs.docker.com/engine/install/):

```sh
brew install --cask docker
```

Download the [image](https://hub.docker.com/r/searxng/searxng):

```sh
docker pull searxng/searxng
```

## Run

Start a new container:

```sh
docker run -d --name searxng -p 8080:8080 searxng/searxng
```

Then open in your browser:

```sh
open http://localhost:8080
```

## Stop

To stop and remove the container:

```sh
docker rm -f searxng
```
