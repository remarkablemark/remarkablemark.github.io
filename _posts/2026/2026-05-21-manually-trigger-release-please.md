---
layout: post
title: How to manually trigger Release Please
date: 2026-05-21 16:14:38
excerpt: How to manually trigger Release Please on GitHub Actions.
categories: release-please bash github actions
---

This post explains how to manually trigger [Release Please](https://github.com/googleapis/release-please) on GitHub Actions when the normal automation doesn't create a release PR.

## Trigger with commit

If you need to manually trigger a release PR, you can add an empty commit with [Release-As](https://github.com/googleapis/release-please#how-do-i-change-the-version-number):

```bash
VERSION=1.2.3
git commit --allow-empty --no-verify -m "chore: release $VERSION" -m "Release-As: $VERSION"
```

Here's a script to create a PR if you can't push directly to the default branch:

```bash
git pull --ff-only
PATCH_VERSION=$(jq -r '.version' package.json | awk -F. '{print $1"."$2"."($3+1)}')
GIT_BRANCH="chore/$PATCH_VERSION"
git checkout -B "$GIT_BRANCH"
git commit --allow-empty --no-verify -m "chore: release $PATCH_VERSION" -m "Release-As: $PATCH_VERSION"
git push -u origin "$GIT_BRANCH"
gh pr create --fill
```

## Trigger with GitHub Action

You can also trigger a release PR with a manual GitHub Actions workflow:

{% raw %}

```yml
name: trigger-release

on:
  workflow_dispatch:

jobs:
  trigger-release:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      contents: write
      pull-requests: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Setup Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

      - name: Calculate patch version
        id: version
        run: |
          CURRENT_VERSION=$(jq -r '.version' package.json)
          PATCH_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{print $1"."$2"."($3+1)}')
          echo "patch_version=$PATCH_VERSION" >> "$GITHUB_OUTPUT"
          echo "Calculated patch version: $PATCH_VERSION"

      - name: Create branch and commit
        run: |
          PATCH_VERSION="${{ steps.version.outputs.patch_version }}"
          GIT_BRANCH="chore/$PATCH_VERSION"
          git checkout -b "$GIT_BRANCH"
          git commit --allow-empty --no-verify -m "chore: release $PATCH_VERSION" -m "Release-As: $PATCH_VERSION"
          git push origin "$GIT_BRANCH"

      - name: Create pull request
        run: gh pr create --fill
        env:
          GH_TOKEN: ${{ github.token }}
```

{% endraw %}
