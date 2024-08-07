---
layout: post
title: Jest CLI disable coverageThreshold
date: 2024-08-07 19:36:10
excerpt: How to disable coverageThreshold with Jest CLI.
categories: jest cli
---

Pass `--coverageThreshold='{}'` to Jest CLI to disable [coverageThreshold](https://jestjs.io/docs/configuration#coveragethreshold-object):

```sh
jest --coverageThreshold='{}'
```
