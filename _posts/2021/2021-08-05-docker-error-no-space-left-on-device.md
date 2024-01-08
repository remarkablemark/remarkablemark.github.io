---
layout: post
title: 'Docker error: no space left on device'
date: 2021-08-05 21:20:59
updated: 2024-01-08 17:46:58
excerpt: How to fix Docker error "no space left on device".
categories: docker
---

This post goes over how to resolve Docker error `no space left on device`.

- [Problem](#problem)
- [Solution](#solution)
  - [docker system prune](#docker-system-prune)
  - [docker volume prune](#docker-volume-prune)
  - [docker builder prune](#docker-builder-prune)
  - [docker image prune](#docker-image-prune)
  - [docker container prune](#docker-container-prune)
  - [Disk image size](#disk-image-size)

## Problem

If Docker throws one of the errors:

```
Error response from daemon: failed to mkdir /var/lib/docker/volumes/...: mkdir /var/lib/docker/volumes/...: no space left on device
```

```
Error response from daemon: failed to copy files: failed to open target /var/lib/docker/volumes/...: open /var/lib/docker/volumes/...: no space left on device
```

```
failed to solve: rpc error: code = Unknown desc = failed to mkdir /var/lib/docker/...: mkdir /var/lib/docker/...: no space left on device
```

```
failed to solve: write /var/lib/containerd-stargz-grpc/snapshotter/snapshots/64/fs/storage/logs/application-json.log: no space left on device
```

It means your Docker has run out of space:

```sh
docker system df
```

```
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          15        3         21.71GB   18.17GB (83%)
Containers      7         0         5.417kB   5.417kB (100%)
Local Volumes   3         0         90.72MB   90.72MB (100%)
Build Cache     295       0         20.77GB   20.77GB
```

## Solution

### docker system prune

Run [`docker system prune`](https://docs.docker.com/engine/reference/commandline/system_prune/) to remove all unused data:

```sh
docker system prune --all
```

To prune without prompting for confirmation:

```sh
docker system prune --all --force
```

It will return the freed space at the end:

```
Total reclaimed space: 4.20GB
```

### docker volume prune

Run [`docker volume prune`](https://docs.docker.com/engine/reference/commandline/volume_prune/) to remove all unused local volumes:

```sh
docker volume prune --all
```

> **WARNING**: Be careful since this can remove local database data.

### docker builder prune

Run [`docker builder prune`](https://docs.docker.com/engine/reference/commandline/builder_prune/) to remove build cache:

```sh
docker builder prune --all
```

### docker image prune

Run [`docker image prune`](https://docs.docker.com/engine/reference/commandline/image_prune/) to remove unused images:

```sh
docker image prune --all
```

### docker container prune

Run [`docker container prune`](https://docs.docker.com/engine/reference/commandline/container_prune/) to remove unused images:

```sh
docker container prune --all
```

### Disk image size

Increase disk space in [Docker Desktop](https://www.docker.com/products/docker-desktop) > **Settings** > **Resources** > **Advanced** > **Disk image size**:

![Docker Resources]({{ "/images/2021/2021-07-20-docker-resources.png" | prepend: site.assets_path }})
