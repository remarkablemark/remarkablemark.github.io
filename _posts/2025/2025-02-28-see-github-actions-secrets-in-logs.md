---
layout: post
title: How to see GitHub Actions secrets in logs
date: 2025-02-28 13:19:18
excerpt: How to see GitHub Actions secrets in workflow logs.
categories: github actions secrets ci bash logs
---

## Problem

If you print a [GitHub Action secret](https://docs.github.com/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions):

{% raw %}

```yml
- run: echo ${{ secrets.MY_SECRET_TOKEN }}'
```

{% endraw %}

You'll see in the logs:

```
***
```

This is because GitHub Actions redacts the contents of GitHub secrets in workflow logs.

## Solution

To see your secret, transform the string so it's not redacted in the logs:

{% raw %}

```yml
- run: echo ${{ secrets.MY_SECRET_TOKEN }} | sed 's/./& /g'
```

{% endraw %}

The step above prints the secret with a space between each character.

So you'll see something like:

```
g h p _ A B C D E F G h i j k l m n o p q r s t u v w x y z 4 1 2 3 4 5 6 7 8 9
```
