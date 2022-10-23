---
layout: post
title: Docker container add SSH key
date: 2022-10-23 16:24:40
excerpt: How to add an SSH key to a Docker container.
categories: docker ssh bash
---

This post goes over how to add an SSH key to a Docker container.

## Prerequisite

[Set up an SSH key set up on your Mac.]({% post_url 2020/2020-04-13-avoid-ssh-passphrase %})

## Add SSH key to Docker container

Copy your SSH key to the Docker container with [`docker cp`](https://docs.docker.com/engine/reference/commandline/cp/):

```sh
docker cp ~/.ssh/id_rsa $CONTAINER_ID:$HOME_PATH/.ssh/id_rsa
```

> Replace `$CONTAINER_ID` with the Docker container id (or name) and `$HOME_PATH` with the Docker home path (`~`).

[Enter the Docker container shell]({% post_url 2022/2022-09-24-docker-exec-container-bash-shell %}):

```sh
docker exec -it $CONTAINER_ID bash
```

Start `ssh-agent` and add the key to it:

```sh
eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa
```

## Script

See the full script:

```bash
#!/bin/bash

# update variables below
CONTAINER_ID=
HOME_PATH=

docker cp ~/.ssh/id_rsa $CONTAINER_ID:$HOME_PATH/.ssh/id_rsa
docker exec web -c 'eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa'
```
