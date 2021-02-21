---
layout: post
title: GitHub Actions checkout submodules
date: 2021-02-21 14:41:36
excerpt: How to checkout submodules with GitHub Actions.
categories: github actions git submodules
---

<!--email_off-->

## Approach 1

Use [GitHub Action Checkout](https://github.com/marketplace/actions/checkout) with `submodules: recursive`:

```yml
steps:
  - uses: actions/checkout@v2
    with:
      submodules: recursive
```

## Approach 2

Use checkout action and run `git submodule update --init --recursive`:

```yml
steps:
  - uses: actions/checkout@v2
  - run: git submodule update --init --recursive
```

<!--/email_off-->
