---
layout: post
title: Install private npm GitHub Package in CI
date: 2026-04-24 20:21:05
excerpt: How to install a private npm GitHub Package in GitHub Actions CI.
categories: github package npm
---

This post goes over how to install a private npm GitHub Package in GitHub Actions CI.

## Problem

You get an error when installing a private npm GitHub Package in GitHub Actions CI:

```
Forbidden - 403
```

## Package settings

Go to your package settings (repository > **Packages** > **Package settings**).

If the package is owned by your organization:

```
https://github.com/orgs/<my-user>/packages/npm/<my-package>/settings
```

Or by your personal user account:

```
https://github.com/users/<my-user>/packages/npm/<my-package>/settings
```

**Manage Actions access** > **Add Repository**:

- Pick the repositories that can access this package using GitHub Actions.

## .npmrc

Add the following to your `.npmrc`:

```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@my-org:registry=https://npm.pkg.github.com
```

## GitHub Actions

Set the permission in your `.github/workflows/my-workflow.yml`:

```yml
permissions:
  packages: read
```

{% raw %}

Now you can install the package with `${{ github.token }}` or `${{ secrets.GITHUB_TOKEN }}`:

```yml
- name: Install dependencies
  shell: bash
  run: npm install
  env:
    GITHUB_TOKEN: ${{ github.token }}
```

Or configure the auth token before install:

```yml
- name: Configure auth token
  shell: bash
  run: |
    sed -i '/\/\/npm\.pkg\.github\.com\/:_authToken/d' .npmrc
    npm config set '//npm.pkg.github.com/:_authToken' '${{ github.token }}'
```

{% endraw %}

## Classic PAT

Alternatively, you can create a [personal access token (classic)](https://github.com/settings/tokens/new) with the scopes:

- [x] `repo` (Full control of private repositories)
- [x] `read:packages` (Download packages from GitHub Package Registry)

Check if your token works:

```sh
GITHUB_TOKEN=ghp_*** pnpm view @my-org/my-package version
```

If you get the error:

```
403 Forbidden - GET https://npm.pkg.github.com/@my-org%2fmy-package - Permission permission_denied: `my-org` forbids access via a personal access token (classic). Please use a GitHub App, OAuth App, or a personal access token with fine-grained permissions.
```

Then create a [fine-grained PAT](https://github.com/settings/personal-access-tokens/new) or app.
