---
layout: post
title: Find and split GitHub Action
date: 2025-02-15 22:37:54
excerpt: GitHub Action to find and split files.
categories: github actions find split bash composite
---

[`remarkablemark/find-and-split`](https://github.com/marketplace/actions/find-and-split) is a GitHub Action that finds and splits files:

{% raw %}

```yml
- uses: remarkablemark/find-and-split@v1
  id: my-files
  with:
    pattern: '*.txt'
    chunk: 1/2

- name: Print files
  run: echo ${{ steps.my-files.outputs.files }}
```

{% endraw %}

It's useful for test sharding, or splitting tests that can be run in parallel jobs. For example:

{% raw %}

```yml
# .github/workflows/test.yml
name: test
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/2, 1/2]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Find and split files
        uses: remarkablemark/find-and-split@v1.0.4
        id: tests
        with:
          chunk: ${{ matrix.shard }}
          directory: tests
          pattern: '*Test.php'

      - name: Run tests
        run: |
          composer install
          vendor/bin/phpunit ${{ steps.tests.outputs.files }}
```

{% endraw %}

See the [documentation](https://github.com/remarkablemark/find-and-split#readme) and [examples](https://github.com/remarkablemark/find-and-split#examples).
