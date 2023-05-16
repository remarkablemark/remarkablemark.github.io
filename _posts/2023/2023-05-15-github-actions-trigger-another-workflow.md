---
layout: post
title: GitHub Actions trigger another workflow
date: 2023-05-15 20:06:56
excerpt: Use a Personal Access Token (PAT) so your GitHub Actions workflow can trigger other workflows.
categories: github actions workflow ci
---

## Problem

Do you need a workflow to trigger another GitHub Actions workflow?

This may be necessary if there's an action that [creates a pull request (PR)](https://cli.github.com/manual/gh_pr_create) but the branch is protected by a required [status check](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks):

{% raw %}

```yml
# .github/workflows/create-pr.yml
name: Create PR
on:
  push:
    branches:
      - develop
jobs:
  create-pr:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Create PR
        run: gh pr create --base master --fill
        continue-on-error: true
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

{% endraw %}

## Solution

If you want an action to trigger another action, then you must use a [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) instead of the default `secrets.GITHUB_TOKEN` or `github.token`:

{% raw %}

```diff
 # .github/workflows/create-pr.yml
 name: Create PR
 on:
   push:
     branches:
       - develop
 jobs:
   create-pr:
     runs-on: ubuntu-latest
     steps:
       - name: Checkout
         uses: actions/checkout@v3
         with:
           fetch-depth: 0
       - name: Create PR
         run: gh pr create --base master --fill
         continue-on-error: true
         env:
-          GITHUB_TOKEN: ${{ github.token }}
+          GITHUB_TOKEN: ${{ secrets.PAT }}
```

{% endraw %}

Now the PR will be opened by a user rather than a bot.

See this [discussion](https://github.com/orgs/community/discussions/25602) for more information.
