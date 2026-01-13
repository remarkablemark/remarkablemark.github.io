---
layout: post
title: GitHub Actions mask dynamic secrets
date: 2026-01-13 15:02:39
excerpt: How to mask dynamic secrets in GitHub Actions workflows.
categories: secrets github actions
---

This post goes over how to mask dynamic secrets in [GitHub Actions](https://github.com/features/actions).

## Problem

Let's say you have the steps in your workflow:

{% raw %}

```yml
- name: Get secret
  run: |
    SECRET=$(cat password.txt)
    echo "secret=$SECRET" >> $GITHUB_OUTPUT
  id: secret

- name: Use secret
  run: echo "do something with $SECRET"
  env:
    SECRET: ${{ steps.secret.outputs.secret }}
```

{% endraw %}

How do you prevent your secret from being logged?

## Solution

The answer is to mask your secret with `::add-mask::`:

```diff
 - name: Get secret
   run: |
     SECRET=$(cat password.txt)
+    echo "::add-mask::$SECRET"
     echo "secret=$SECRET" >> $GITHUB_OUTPUT
   id: secret
```

Now when you check your logs, the secret will be replaced with `***`.
