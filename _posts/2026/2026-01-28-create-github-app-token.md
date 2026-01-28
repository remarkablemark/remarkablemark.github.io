---
layout: post
title: Create an app token in GitHub Actions
date: 2026-01-28 18:57:23
excerpt: How to generate an app token in GitHub Actions with Create GitHub App Token.
categories: github actions app token ci
---

This post goes over how to generate an app token in [GitHub Actions](https://github.com/features/actions) with [Create GitHub App Token](https://github.com/actions/create-github-app-token).

## Prerequisites

Follow the [steps](https://github.com/actions/create-github-app-token#usage):

1. Register a new GitHub App
2. Store your App ID in your repository secrets
3. Store your App private key in your repository secrets

## Create GitHub App Token

Use [`actions/create-github-app-token`](https://github.com/actions/create-github-app-token) with [`actions/checkout`](https://github.com/actions/checkout):

{% raw %}

```yml
- name: Create GitHub App token
  uses: actions/create-github-app-token@v2
  id: app-token
  with:
    app-id: ${{ secrets.GITHUB_APP_ID }}
    private-key: ${{ secrets.GITHUB_APP_PRIVATE_KEY }}

- name: Checkout repository
  uses: actions/checkout@v6
  with:
    token: ${{ steps.app-token.outputs.token }}
```

{% endraw %}

Set [owner](https://github.com/actions/create-github-app-token#owner) and/or [repositories](https://github.com/actions/create-github-app-token#repositories) to set the token access scope:

{% raw %}

```yml
# Create a token for a given repository in the current owner's installation
- name: Create GitHub App token
  uses: actions/create-github-app-token@v2
  id: app-token
  with:
    app-id: ${{ secrets.GITHUB_APP_ID }}
    private-key: ${{ secrets.GITHUB_APP_PRIVATE_KEY }}
    owner: ${{ github.repository_owner }}
    repositories: |
      my-private-repo

- name: Configure Git
  run: git config --global url."https://x-access-token:${{ steps.app-token.outputs.token }}@github.com/".insteadOf "git@github.com:"

- name: Run Git commands
  run: |
    git clone git@github.com:${{ github.repository_owner }}/my-private-repo.git
    # do some stuff...
    git push
```

{% endraw %}

If `owner` is set and `repositories` is empty, access will be scoped to all repositories in the provided repository owner's installation.

If `owner` and `repositories` are empty, access will be scoped to only the current repository.
