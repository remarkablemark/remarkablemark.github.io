---
layout: post
title: Run Tauri in GitHub Actions
date: 2026-04-08 15:57:29
excerpt: How to bundle web apps into desktop native apps with Tauri using GitHub Actions.
categories: tauri github actions
---

This post goes over how to bundle web apps into desktop native apps with [Tauri](https://tauri.app/) using [GitHub Actions](https://github.com/features/actions).

## Prerequisites

Let's say you have a web app:

```sh
echo "<h1>Hello App</h1>" > dist/index.html
```

## Action

Use [`remarkablemark/tauri-action`](https://github.com/remarkablemark/tauri-action) to bundle your web app into a desktop app.

### macOS

Build a macOS app with Tauri:

{% raw %}

```yml
# .github/workflows/build.yml
on: push

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Build app
        uses: remarkablemark/tauri-action@v1
        id: tauri
        with:
          app-name: My App
        env:
          APPLE_SIGNING_IDENTITY: '-'

      - name: Upload app
        uses: actions/upload-artifact@v6
        with:
          name: macOS
          path: ${{ steps.tauri.outputs.bundle-path }}
```

{% endraw %}

If you download and unzip the bundle, you'll see the following:

```
├── dmg
│   ├── bundle_dmg.sh
│   ├── icon.icns
│   └── My App_0.1.0_aarch64.dmg
├── macos
│   └── My App.app
│       └── Contents
│           ├── Info.plist
│           ├── MacOS
│           │   └── app
│           └── Resources
│               └── icon.icns
└── share
    └── create-dmg
        └── support
            ├── eula-resources-template.xml
            └── template.applescript
```

### All

Build a desktop app on all platforms with Tauri:

{% raw %}

```yml
# .github/workflows/build.yml
on: push

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]

    steps:
      - name: Build app
        uses: remarkablemark/tauri-action@v1
        id: tauri
        with:
          app-name: My App

      - name: Upload app
        uses: actions/upload-artifact@v6
        with:
          name: ${{ runner.os }}
          path: ${{ steps.tauri.outputs.bundle-path }}
```

{% endraw %}

This creates unique binaries/executables for Linux, macOS, and Windows.

### Inputs

You can configure the Tauri action by passing [inputs](https://github.com/remarkablemark/tauri-action#inputs). For example:

{% raw %}

```yml
- name: Build app
  uses: remarkablemark/tauri-action@v1
  id: tauri
  with:
    app-name: My App
    app-version: 1.2.3
    window-width: 800
    window-height: 600
    frontend-dist: ../dist
    before-build-command: npm run build
    icon-path: app-icon.png
```

{% endraw %}
