---
layout: post
title: Inject Google Analytics in GitHub Actions
date: 2026-10-01 19:53:28
excerpt: How to inject Google Analytics gtag.js into an HTML file with GitHub Actions.
categories: github actions google analytics gtag
---

This post shows how to inject [Google Analytics](https://support.google.com/analytics/answer/9304153) tracking (`gtag.js`) into an HTML file with [GitHub Actions](https://b.remarkabl.org/github-actions).

## Problem

You want to add Google Analytics to a generated HTML file in CI without touching the source code.

## Solution

Use the [google-analytics-action](https://github.com/remarkablemark/google-analytics-action) to inject the `gtag.js` script in your GitHub Action workflow.

### Usage

Add the action after your build step:

{% raw %}

```yml
# .github/workflows/build.yml
name: Build
on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Build static site
        run: npm run build

      - name: Inject Google Analytics
        uses: remarkablemark/google-analytics-action@v1
        with:
          html-path: dist/index.html
          measurement-id: ${{ secrets.GOOGLE_ANALYTICS_ID }}
```

{% endraw %}

### Inputs

- **`html-path`** (_required_): The HTML file to modify.
- **`measurement-id`** (_required_): The Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`).

### Behavior

The action:

- Injects the [gtag.js](https://support.google.com/analytics/answer/9304153) script before the closing `</head>` tag.
- Falls back to inserting before `</body>` if `</head>` is not present.
- Skips injection if the snippet for the same measurement ID is already present (idempotent).
- Fails if the file does not exist or if neither `</head>` nor `</body>` is found.

## Example

Before:

```html
<!doctype html>
<html>
  <head>
    <title>My Site</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

After:

```html
<!doctype html>
<html>
  <head>
    <title>My Site</title>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

See the action [source code](https://github.com/remarkablemark/google-analytics-action).
