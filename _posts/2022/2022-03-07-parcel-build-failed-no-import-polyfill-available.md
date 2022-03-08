---
layout: post
title: 'Parcel build failed: No import() polyfill available'
date: 2022-03-07 20:44:36
excerpt: How to fix Parcel build failed error "No import() polyfill available for context 'node'".
categories: parcel
---

This article goes over how to fix the [Parcel](https://parceljs.org/) build error:

```
No import() polyfill available for context 'node'
```

## Problem

If you got the Parcel build error:

```sh
parcel build
🚨 Build failed.

@parcel/runtime-js: No import() polyfill available for context 'node'

  Error: No import() polyfill available for context 'node'
  at nullthrows
```

This might mean you're missing a [browserslist](https://github.com/browserslist/browserslist) config.

## Solution

Add [browserslist](https://parceljs.org/features/targets/#package.json%23browserslist) field to `package.json`:

```json
{
  "browserslist": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

Or add it to `.browserslistrc`:

```sh
touch .browserslistrc
```

```
last 1 chrome version
last 1 firefox version
last 1 safari version
```
