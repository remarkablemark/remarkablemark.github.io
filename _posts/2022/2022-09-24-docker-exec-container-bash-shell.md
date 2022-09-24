---
layout: post
title: How to enter a Docker container shell
date: 2022-09-24 17:30:11
excerpt: How to enter a Docker container shell with docker exec.
categories: docker ssh container
---

Execute an interactive `bash` shell on the container name or id with [`docker exec`](https://docs.docker.com/engine/reference/commandline/exec/):

```sh
docker exec -it <container> bash
```

Exit the Bash session in the container with Ctrl+D or `exit`.
