---
layout: post
title: GitHub Actions escape inputs
date: 2025-12-30 18:29:48
excerpt: How to escape inputs with GitHub Actions to prevent script injections.
categories: github actions inputs
---

This post goes over how to escape inputs with GitHub Actions to prevent [script injections](https://docs.github.com/actions/concepts/security/script-injections):

- [Workflow](#workflow)
- [toJSON](#tojson)
- [env](#env)

## Workflow

Let's say you have the workflow:

{% raw %}

```yml
# .github/workflows/message.yml
on:
  workflow_dispatch:
    inputs:
      message:
        required: true
jobs:
  message:
    runs-on: ubuntu-latest
    steps:
      - run: echo ${{ inputs.message }}
```

{% endraw %}

## toJSON

To escape the input with [toJSON](https://docs.github.com/actions/reference/workflows-and-actions/expressions#tojson):

{% raw %}

```yml
- run: echo ${{ toJSON(inputs.message) }}
```

{% endraw %}

> Note that `toJSON` will stringify your input so make sure your quotes are valid.

## env

To escape the input with [env](https://docs.github.com/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables):

{% raw %}

```yml
- run: echo $MESSAGE
  env:
    MESSAGE: ${{ inputs.message }}
```

{% endraw %}

To preserve newlines, wrap your environment variable in double quotes:

{% raw %}

```yml
- run: echo "$MESSAGE"
  env:
    MESSAGE: ${{ inputs.message }}
```

{% endraw %}
