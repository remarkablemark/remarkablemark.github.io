---
layout: post
title: Git integration branch workflow
date: 2021-03-08 19:37:05
excerpt: The Git integration branch workflow is useful when a ticket has many subtasks.
categories: git process
---

## Problem

If a ticket has many subtasks, how can we ensure PR's (pull requests) don't get large and hard to review?

## Solution

Use the Git integration branch workflow.

Given parent ticket `JIRA-123`, the developer would create an integration branch from latest `master`:

```sh
git checkout master && git pull
git checkout -b integration/JIRA-123
```

For each subtask, the developer would branch off the integration branch:

```sh
git checkout integration/JIRA-123
git checkout -b JIRA-456
```

When the subtask is ready for code review, the developer would open a PR to merge the subtask branch into the integration branch.

Merging the subtask PR is effectively doing:

```sh
git checkout integration/JIRA-123
git merge JIRA-456
```

When all subtasks are done, the developer opens a PR to merge the integration branch into `master` branch.

Merging the integration PR is effectively doing:

```sh
git checkout master
git merge integration/JIRA-123
```

## Key Points

- The integration branch workflow is useful when a ticket has many subtasks
- The integration branch workflow encourages atomic PR's
- One should not commit directly to the integration branch
- It's good practice to re-review the integration branch PR
- QA and other expensive workflows can be skipped for subtask branches (except for story bugs)
