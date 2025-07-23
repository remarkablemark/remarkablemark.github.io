---
layout: post
title: Set up Code Climate with GitHub Actions
date: 2023-10-14 12:23:37
updated: 2025-07-23 11:50:09
excerpt: How to set up Code Climate test reporter with GitHub Actions.
categories: github action codeclimate
---

<!--email_off-->

> The Code Climate API has been disabled on `July 18th, 2025`.
>
> Any attempts to upload coverage to the Code Climate API (via the `cc-test-reporter`) will result in failed CI builds.
>
> To avoid disruption, you must remove (or comment out) any remaining references to the old `cc-test-reporter` within your CI scripts.
>
> See the [migration guide](https://docs.qlty.sh/migration/guide).

This post goes over how to set up [Code Climate test reporter](https://github.com/codeclimate/test-reporter) with [GitHub Actions](https://github.com/features/actions).

## Prerequisites

Given you have a workflow `.github/workflows/test.yml`:

```yml
# .github/workflows/test.yml
name: test
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # ...
```

## Setup

Use [remarkablemark/setup-codeclimate](https://github.com/marketplace/actions/setup-codeclimate):

```yml
steps:
  - uses: remarkablemark/setup-codeclimate@v2
```

Assuming your test command is `npm test`:

{% raw %}

```yml
steps:
  - uses: remarkablemark/setup-codeclimate@v2
  - run: |
      cc-test-reporter before-build
      npm test
      cc-test-reporter after-build --exit-code $?
    env:
      CC_TEST_REPORTER_ID: ${{ secrets.CC_TEST_REPORTER_ID }}
```

{% endraw %}

## Example

Full example of `.github/workflows/test.yml`:

{% raw %}

```yml
# .github/workflows/test.yml
name: test
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: remarkablemark/setup-codeclimate@v2
      - run: |
          cc-test-reporter before-build
          npm test
          cc-test-reporter after-build --exit-code $?
        env:
          CC_TEST_REPORTER_ID: ${{ secrets.CC_TEST_REPORTER_ID }}
```

{% endraw %}

For more options, check out the [readme](https://github.com/remarkablemark/setup-codeclimate#inputs) or [examples](https://github.com/remarkablemark/codeclimate-github-actions-examples).

<!--/email_off-->
