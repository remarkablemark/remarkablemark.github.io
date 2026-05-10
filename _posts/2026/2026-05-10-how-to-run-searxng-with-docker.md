---
layout: post
title: How to run SearXNG with Docker
date: 2026-05-10 15:22:16
excerpt: How to install and run SearXNG with Docker.
categories: searxng docker bash
---

This post goes over how to install and run [SearXNG](https://github.com/searxng/searxng) with [Docker](https://www.docker.com/).

## Install

Install [Docker](https://docs.docker.com/engine/install/):

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

Open in your browser:

```sh
open http://localhost:8080
```

When requesting JSON, you will receive `403 Forbidden` error:

```sh
curl 'http://localhost:8080/search?q=test&format=json'
```

This is because you need to enable it in settings:

```bash
SECRET_KEY=$(openssl rand -hex 32)

cat > settings.yml <<EOF
use_default_settings: true

server:
  secret_key: "$SECRET_KEY"
  bind_address: "0.0.0.0"
  port: 8080

search:
  formats:
    - html
    - json
EOF
```

Copy `settings.yml` into the container:

```sh
docker cp settings.yml searxng:/etc/searxng/settings.yml
```

Then restart the container:

```sh
docker restart searxng
```

Check the logs that it worked:

```sh
docker logs searxng --tail=100
```

## Stop

Stop and remove the container:

```sh
docker rm -f searxng
```
