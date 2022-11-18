---
layout: post
title: Auto-merge Dependabot PR
date: 2022-11-18 17:47:07
excerpt: How to auto-merge Dependabot PR
categories: github actions dependabot
---

This post goes over how to auto-merge [Dependabot](https://github.com/dependabot) PR.

## Prerequisite

Create a workflow that runs on [`pull_request_target`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_target) and has the following [permissions](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs):

```yml
# .github/workflows/auto-merge-dependabot-pr.yml
on: pull_request_target
permissions:
  contents: write
  pull-requests: write
```

## Auto-Merge

Create a job that checks if the user is Dependabot and auto-merges the pull request with [GitHub CLI](https://cli.github.com/manual/gh_pr_merge):

{% raw %}

```yml
jobs:
  auto-merge-dependabot-pr:
    if: github.actor == 'dependabot[bot]'
    runs-on: ubuntu-latest
    steps:
      - name: Auto-merge Dependabot PR
        run: gh pr merge --auto --merge ${{ github.event.pull_request.html_url }}
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

{% endraw %}

> Make sure to allow auto-merge in your GitHub repository settings or else you will get an error.

You can restrict merging to only pull requests that has `deps-dev` in the title:

{% raw %}

```diff
 - name: Auto-merge Dependabot PR
+  if: contains(github.event.pull_request.title, 'deps-dev')
   run: gh pr merge --auto --merge ${{ github.event.pull_request.html_url }}
```

{% endraw %}

## Approve

If you enabled the branch protection that requires at least 1 approval before merging, then make the bot approve the PR:

{% raw %}

```yml
- name: Approve Dependabot PR
  run: gh pr review --approve ${{ github.event.pull_request.html_url }}
  env:
    GITHUB_TOKEN: ${{ github.token }}
```

{% endraw %}

## Workflow

See the [final workflow](https://github.com/remarkablemark/github-actions-workflows/blob/master/.github/workflows/dependabot.yml):

{% raw %}

```yml
# .github/workflows/auto-merge-dependabot-pr.yml
name: Auto-merge Dependabot PR
on: pull_request_target

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-merge-dependabot-pr:
    if: github.actor == 'dependabot[bot]'
    runs-on: ubuntu-latest
    env:
      PR_URL: ${{ github.event.pull_request.html_url }}
      GITHUB_TOKEN: ${{ github.token }}

    steps:
      - name: Approve Dependabot PR
        run: gh pr review --approve $PR_URL

      - name: Auto-merge Dependabot PR
        if: contains(github.event.pull_request.title, 'deps-dev')
        run: gh pr merge --auto --merge $PR_URL
```

{% endraw %}
