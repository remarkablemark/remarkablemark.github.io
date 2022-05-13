---
layout: post
title: How to shard Jest tests in GitHub Actions
date: 2022-05-13 19:23:28
excerpt: How to shard Jest tests in GitHub Actions.
categories: jest test github ci
---

This article goes over how to shard Jest tests in GitHub Actions.

## Workflow

[Shard](https://jestjs.io/docs/cli#--shard) Jest test suite using GitHub Actions [matrix](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs):

{% raw %}

```yml
# .github/workflows/jest-shard.yml
on: push
jobs:
  jest-shard:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/2, 2/2]
    steps:
      - npx jest --shard=${{ matrix.shard }}
```

{% endraw %}

To increase to 3 shards:

{% raw %}

```yml
# .github/workflows/jest-shard.yml
on: push
jobs:
  jest-shard:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/3, 2/3, 3/3]
    steps:
      - npx jest --shard=${{ matrix.shard }}
```

{% endraw %}

Sharding will speed up the time it takes for tests to run since they run in parallel, but it will also increase the total duration, which can increase the billable time.
