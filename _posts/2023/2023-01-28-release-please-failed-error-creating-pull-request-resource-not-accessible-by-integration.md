---
layout: post
title: 'release-please failed: Error creating Pull Request'
date: 2023-01-28 17:12:27
updated: 2023-04-03 00:52:08
excerpt: "How to fix error 'release-please failed: Error creating Pull Request: Resource not accessible by integration'."
categories: release-please github-actions ci
---

## Problem

This post goes over how to fix the GitHub Actions error:

```
release-please failed: Error creating Pull Request: Resource not accessible by integration
```

Or:

```
Error: release-please failed: GitHub Actions is not permitted to create or approve pull requests.
```

## Solution

The root cause is that GitHub's default repository workflow permissions changed from _write_ to _read_ in 2022.

The fix is to go to repository **Settings** > **Code and automation** > **Actions** > **General** > **Workflow permissions** and check:

- Read and write permissions
- Allow GitHub Actions to create and approve pull requests

![GitHub Actions Workflow Permissions]({{ "/images/2023/2023-01-28-github-actions-workflow-permissions.png" | prepend: site.assets_path }})

You may also need to update your workflow permissions `.github/workflow/release-please.yml`:

```yml
permissions:
  contents: write
  pull-requests: write
```

See [issue](https://github.com/google-github-actions/release-please-action/issues/709#issuecomment-1407490618) for more information.
