---
layout: post
title: Test web pages for errors in GitHub Actions
date: 2026-08-01 21:21:58
excerpt: Test your web pages for errors in GitHub Actions.
categories: github actions testing ci test web
---

This post goes over how to test web pages for errors in [GitHub Actions](https://github.com/features/actions) using [`remarkablemark/page-test-action`](https://github.com/remarkablemark/page-test-action).

## Motivation

Static analysis and unit tests can miss problems that only appear when a real browser loads a page:

- broken scripts,
- failed network requests,
- uncaught exceptions, and
- runtime errors.

Manually opening every page in a browser after each deploy is tedious and easy to forget.

`page-test-action` automates this in GitHub Actions. It spins up Playwright, loads the page you specify, and fails the workflow if the browser encounters any page errors. It's a quick way to smoke test your site without setting up a full end-to-end testing infrastructure.

## Quick Start

Add the action to your workflow and pass the URL to test:

{% raw %}

```yml
# .github/workflows/page-test.yml
on: push

jobs:
  page-test:
    runs-on: ubuntu-latest

    steps:
      - name: Page Test
        uses: remarkablemark/page-test-action@v1
        with:
          url: https://example.com
```

{% endraw %}

The action loads the page in a headless browser using [Playwright](https://playwright.dev/) and fails the job if the page throws any errors.

## Test a Local Server

If your site needs to be built first, use the `start` and `wait-on` inputs to start a local server before the page check runs:

{% raw %}

```yml
# .github/workflows/page-test.yml
on: push

jobs:
  page-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v7

      - name: Install dependencies
        run: npm ci

      - name: Page Test
        uses: remarkablemark/page-test-action@v1
        with:
          url: http://localhost:3000
          start: npm start
          wait-on: http://localhost:3000
```

{% endraw %}

## Inputs

You can configure the action by passing inputs:

{% raw %}

```yml
- uses: remarkablemark/page-test-action@v1
  with:
    url: https://example.com
    browser: chromium
    timeout: 30000
    playwright-version: latest
    cache: true
```

{% endraw %}

| Input                | Required | Default    | Description                                                                      |
| -------------------- | -------- | ---------- | -------------------------------------------------------------------------------- |
| `url`                | ✅       |            | The URL of the page to test.                                                     |
| `browser`            | ❌       | `chromium` | The browser to use: `chromium`, `firefox`, or `webkit`.                          |
| `timeout`            | ❌       | `30000`    | Navigation timeout in milliseconds.                                              |
| `playwright-version` | ❌       | `latest`   | The Playwright npm version to install.                                           |
| `start`              | ❌       |            | The shell command to start a local server in the background.                     |
| `wait-on`            | ❌       |            | The URL to poll until available before running the page check. Use with `start`. |
| `cache`              | ❌       | `true`     | Whether to cache Playwright browser binaries to speed up subsequent runs.        |

For all inputs and the latest usage, see the [README](https://github.com/remarkablemark/page-test-action#readme) and [`action.yml`](https://github.com/remarkablemark/page-test-action/blob/master/action.yml).
