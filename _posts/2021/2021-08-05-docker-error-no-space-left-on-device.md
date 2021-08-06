---
layout: post
title: 'Docker error: no space left on device'
date: 2021-08-05 21:20:59
excerpt: How to fix Docker error "no space left on device".
categories: docker
---

This post goes over how to resolve Docker error "no space left on device".

## Problem

If Docker throws one of the following errors:

```
Error response from daemon: failed to mkdir /var/lib/docker/volumes/...: mkdir /var/lib/docker/volumes/...: no space left on device
```

```
Error response from daemon: failed to copy files: failed to open target /var/lib/docker/volumes/...: open /var/lib/docker/volumes/...: no space left on device
```

```
failed to solve: rpc error: code = Unknown desc = failed to mkdir /var/lib/docker/...: mkdir /var/lib/docker/...: no space left on device
```

It means your Docker has run out of space.

## Solution

Run [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/) to remove all unused data:

```sh
docker system prune
```

To prune without prompting for confirmation:

```sh
docker system prune --force
```

It will return the freed space at the end:

```
Total reclaimed space: 4.20GB
```

Alternatively, increase disk space in [Docker Desktop](https://www.docker.com/products/docker-desktop) > **Settings** > **Resources** > **Advanced** > **Disk image size**:

![Docker Resources]({{ "/images/2021/2021-07-20-docker-resources.png" | prepend: site.assets_path }})
