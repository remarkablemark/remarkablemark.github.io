---
layout: post
title: Package macOS apps with GitHub Actions
date: 2026-10-16 20:44:46
excerpt: How to package a prebuilt binary into an unsigned macOS app bundle with GitHub Actions.
categories: package macos app github actions
---

This post goes over how to package a prebuilt binary into an unsigned macOS app bundle with GitHub Actions.

## Prerequisites

You have a prebuilt macOS binary that's already compiled. For example:

```sh
echo "hello" > my-app && chmod +x my-app
```

## Package macOS app

Use [`remarkablemark/package-macos-app`](https://github.com/remarkablemark/package-macos-app) to wrap the binary in a `.app` bundle:

{% raw %}

```yml
# .github/workflows/build.yml
on: push

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Build binary
        run: echo "hello" > my-app && chmod +x my-app

      - name: Package macOS app
        id: package
        uses: remarkablemark/package-macos-app@v1
        with:
          binary: ./my-app
          version: 1.0.0

      - name: Zip app bundle
        run: ditto -c -k --keepParent "$APP_PATH" my-app.zip
        env:
          APP_PATH: ${{ steps.package.outputs.app-path }}

      - name: Upload app bundle
        uses: actions/upload-artifact@v7
        with:
          name: my-app
          path: my-app.zip
```

{% endraw %}

> Zip the bundle before uploading to preserve the executable bit. On non-macOS runners, use `tar czf` instead of `ditto`.

## Bundle structure

If you download and unzip the artifact, you'll see the following:

```
my-app.app/
└── Contents
    ├── Info.plist
    ├── MacOS
    │   └── my-app
    └── Resources
```

The action generates the `Info.plist` with your app name, bundle identifier, and version.

## Configuration

You can configure the action by passing [inputs](https://github.com/remarkablemark/package-macos-app#inputs). For example:

{% raw %}

```yml
- name: Package macOS app
  id: package
  uses: remarkablemark/package-macos-app@v1
  with:
    binary: ./my-app
    name: My App
    bundle-id: com.example.my-app
    version: ${{ github.ref_name }}
    icon: ./assets/AppIcon.icns
    output: dist
```

{% endraw %}

## Outputs

The action outputs the path to the created bundle. Reference the packaging step by its `id:` and use the `app-path` output:

{% raw %}

```yml
- name: Package macOS app
  id: package
  uses: remarkablemark/package-macos-app@v1
  with:
    binary: ./my-app
    version: 1.0.0

- run: ditto -c -k --keepParent "$APP_PATH" my-app.zip
  env:
    APP_PATH: ${{ steps.package.outputs.app-path }}
```

{% endraw %}

## Signing

The bundle is **unsigned**. Sign it with `codesign` before distribution:

```sh
codesign --force --deep --sign - my-app.app
```

Check out the [repository](https://github.com/remarkablemark/package-macos-app) for more details.
