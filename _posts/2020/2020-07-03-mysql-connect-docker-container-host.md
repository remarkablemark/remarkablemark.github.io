---
layout: post
title: Connect to MySQL in Docker container from host
date: 2020-07-03 18:08:07
excerpt: How to connect to MySQL in Docker container from host.
categories: mysql docker container bash
---

Connect to MySQL in Docker container from host (without password):

```sh
mysql -h 127.0.0.1 -P 3306 -u root
```

Connect to MySQL in Docker container from host (with password):

```sh
mysql -h 127.0.0.1 -P 3306 -u root -p
```
