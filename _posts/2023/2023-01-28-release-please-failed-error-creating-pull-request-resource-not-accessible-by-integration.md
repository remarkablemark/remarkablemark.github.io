---
layout: post
title: 'release-please failed: Error creating Pull Request'
date: 2023-01-28 17:12:27
excerpt: "How to fix error 'release-please failed: Error creating Pull Request: Resource not accessible by integration'."
categories: release-please github-actions ci
---

## Problem

This post goes over how to fix the GitHub Actions error:

```
release-please failed: Error creating Pull Request: Resource not accessible by integration
```

## Solution

The root cause is that GitHub's default repository workflow permissions changed from _write_ to _read_ in 2022.

The fix is to go to repository **Settings** > **Code and automation** > **Actions** > **General** > **Workflow permissions** and check **Allow GitHub Actions to create and approve pull requests**.

You will also need to toggle **Read and write permissions** or update your workflow permissions:

```yml
# .github/workflows/release-please.yml
permissions:
  pull-requests: write
```

See [issue](https://github.com/google-github-actions/release-please-action/issues/709#issuecomment-1407490618) for more information.
