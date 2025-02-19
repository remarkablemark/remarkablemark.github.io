---
layout: post
title: GitHub Actions strategy matrix objects
date: 2025-02-18 19:49:49
excerpt: How to pass objects to GitHub Actions strategy matrix.
categories: github actions
---

This post goes over how to pass objects to [GitHub Actions strategy matrix](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow).

## Strings

You can pass primitive values to matrix strategies:

{% raw %}

```yml
jobs:
  example_matrix:
    strategy:
      matrix:
        version: [10, 12]
        os: ['ubuntu-latest', 'windows-latest']

    runs-on: ${{ matrix.os }}
    steps:
      - run: echo ${{ matrix.version }}
```

{% endraw %}

## Objects

To pass objects to matrix strategies:

{% raw %}

```yml
jobs:
  example_matrix:
    strategy:
      matrix:
        object:
          [
            { version: 10, os: 'ubuntu-latest' },
            { version: 10, os: 'windows-latest' },
            { version: 12, os: 'ubuntu-latest' },
            { version: 12, os: 'windows-latest' },
          ]

    runs-on: ${{ matrix.os }}
    steps:
      - run: echo ${{ matrix.version }}
```

{% endraw %}
Alternatively:

{% raw %}

```yml
jobs:
  example_matrix:
    strategy:
      matrix:
        object:
          - version: 10
            os: 'ubuntu-latest'
          - version: 10
            os: 'windows-latest'
          - version: 12
            os: 'ubuntu-latest'
          - version: 12
            os: 'windows-latest'

    runs-on: ${{ matrix.os }}
    steps:
      - run: echo ${{ matrix.version }}
```

{% endraw %}

See [example](https://github.com/remarkablemark/github-actions-workflows/blob/master/.github/workflows/matrix.yml).
