---
layout: post
title: Run headless test with GitHub Actions
date: 2020-12-12 20:11:39
excerpt: How to set up and run headless browser tests with GitHub Actions.
categories: headless test xvfb github nodejs
---

## Problem

In the past, I ran headless browser tests with [Travis CI](https://docs.travis-ci.com/user/gui-and-headless-browsers/#using-xvfb-to-run-tests-that-require-a-gui):

```yml
# .travis.yml
addons:
  chrome: stable
services:
  - xvfb
language: node_js
node_js:
  - stable
install:
  - npm install
before_script:
  - export DISPLAY=:99.0
script:
  - npm test
```

After moving to [GitHub Actions](https://github.com/features/actions):

```yml
# .github/workflows/build.yml
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 14
      - run: npm install
      - run: npm test
```

I found that I still needed to add [`xvfb`](https://en.wikipedia.org/wiki/Xvfb) due to the errors:

```
Cannot start Chrome
Chrome stderr: [ERROR:browser_main_loop.cc(1434)] Unable to open X display.
```

## Solution

I replaced `- run: npm test` with the [solution](https://github.com/juliangruber/browser-run/issues/147#issuecomment-564553618):

```yml
- run: sudo apt-get install xvfb
- run: xvfb-run --auto-servernum npm test
```

Which was replaced with the [XVFB GitHub Action](https://github.com/marketplace/actions/gabrielbb-xvfb-action):

```yml
- name: Run headless test
  uses: GabrielBB/xvfb-action@v1
  with:
    run: npm test
```
