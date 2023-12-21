---
layout: post
title: Release Please manifest config
date: 2023-12-20 19:31:26
excerpt: How to migrate to the Release Please manifest config.
categories: release please manifest config github actions
---

This post goes over how to migrate to the [Release Please](https://github.com/googleapis/release-please) manifest config.

## Problem

In [Release Please Action](https://github.com/google-github-actions/release-please-action) v3 and below, advanced options can be configured via GitHub Actions inputs in the workflow:

```yml
# .github/workflows/release-please.yml
name: release-please
on:
  push:
    branches:
      - master

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v3
        with:
          release-type: node
          pull-request-title-pattern: 'build${scope}: release${component} ${version}'
          extra-files: |
            README.md
```

But in [v4](https://github.com/google-github-actions/release-please-action#upgrading-from-v3-to-v4), the GitHub Actions inputs were deprecated and moved to the config file.

## Solution

Create a [`.release-please-manifest.json`](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md):

```sh
touch .release-please-manifest.json
```

Add the version if your repository contains a single package:

```json
{
  ".": "1.2.3"
}
```

Or add the versions if your repository contains multiple packages:

```json
{
  "my-package-a": "1.2.3",
  "my-package-b": "2.3.4"
}
```

Then create `release-please-config.json`:

```sh
touch release-please-config.json
```

Add the [`$schema`](https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json) and configure the options:

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "release-type": "node",
  "pull-request-title-pattern": "build${scope}: release${component} ${version}",
  "extra-files": ["README.md"],
  "packages": {
    ".": {}
  }
}
```

> If your monorepo has different configurations for each package, then update the `packages` field. See the [documentation](https://github.com/google-github-actions/release-please-action#package-options) for more details.

Upgrade the action to v4 and remove the options from the GitHub Actions workflow:

```yml
# .github/workflows/release-please.yml
name: release-please
on:
  push:
    branches:
      - master

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v4
```

## Example

See [`remarkablemark/release-please-extra-files-demo`](https://github.com/remarkablemark/release-please-extra-files-demo).
