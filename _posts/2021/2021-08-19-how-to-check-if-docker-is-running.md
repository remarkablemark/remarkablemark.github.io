---
layout: post
title: How to check if Docker is running
date: 2021-08-19 20:18:50
excerpt: How to check if Docker is running using Bash.
categories: docker bash
---

To check if Docker is running:

```sh
docker info
```

To check using an if statement:

```bash
if docker info > /dev/null 2>&1; then
  echo 'Docker is running'
fi
```

To check using a one-line logical operator:

```bash
docker info > /dev/null 2>&1 && echo 'Docker is running'
```
