---
layout: post
title: How to shard Jest tests in GitHub Actions
date: 2022-05-13 19:23:28
updated: 2024-02-09 15:15:04
excerpt: How to shard Jest tests in GitHub Actions.
categories: jest test github actions ci
---

This article goes over how to shard [Jest](https://jestjs.io/) tests in [GitHub Actions](https://github.com/features/actions).

## Workflow

[Shard](https://jestjs.io/docs/cli#--shard) Jest test suite using GitHub Actions [matrix](https://docs.github.com/actions/using-jobs/using-a-matrix-for-your-jobs):

{% raw %}

```yml
# .github/workflows/test.yml
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/2, 2/2]
    steps:
      - npx jest --shard=${{ matrix.shard }}
```

{% endraw %}

Increase to 3 shards:

{% raw %}

```yml
# .github/workflows/test.yml
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/3, 2/3, 3/3]
    steps:
      - npx jest --shard=${{ matrix.shard }}
```

{% endraw %}

Sharding will speed up the time it takes for tests to run since they run in parallel, but it will also increase the total duration, which will increase the billable time.

## Code Climate

Upload the coverage to [Code Climate](https://docs.codeclimate.com/docs/configuring-test-coverage):

{% raw %}

```yml
# .github/workflows/test.yml
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2]
    steps:
      - npx jest --shard=${{ matrix.shard }}/${{ strategy.job-total }}
      - uses: remarkablemark/setup-codeclimate@v2
      - run: cc-test-reporter format-coverage -t lcov -o coverage/climate.${{ matrix.shard }}.json
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-${{ matrix.shard }}
          path: coverage/climate.*.json
          retention-days: 1

  coverage:
    runs-on: ubuntu-latest
    needs: [test]
    steps:
      - uses: actions/download-artifact@v4
        with:
          path: coverage
          pattern: coverage-*
          merge-multiple: true
      - uses: remarkablemark/setup-codeclimate@v2
      - run: |
          cc-test-reporter sum-coverage coverage/*
          cc-test-reporter upload-coverage
        env:
          CC_TEST_REPORTER_ID: ${{ secrets.CC_TEST_REPORTER_ID }}
```

{% endraw %}
