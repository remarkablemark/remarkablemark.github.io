---
layout: post
title: Create Heroku app on GitHub Pull Request
date: 2022-04-23 13:59:17
excerpt: How to create a Heroku app on GitHub pull request (PR) with GitHub Actions.
categories: github heroku ci
---

This article goes over how to create a Heroku app when a GitHub pull request (PR) is opened:

- [Problem](#problem)
- [Solution](#solution)
- [Workflow](#workflow)

## Problem

Due to an [incident](https://status.heroku.com/incidents/2413) that caused Heroku to revoke their GitHub integration, I needed an alternative way to create [review apps](https://devcenter.heroku.com/articles/github-integration-review-apps) without having to manually [deploy them via the CLI]({% post_url 2022/2022-04-18-heroku-git-deploy-branch %}).

## Solution

I created a [GitHub Actions](https://github.com/features/actions) workflow that creates a Heroku app when a PR is opened.

First, create the workflow file:

```sh
mkdir -p .github/workflows/ && touch .github/workflows/heroku-pull-request.yml
```

The workflow will be triggered on [pull request](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request):

```yml
name: Heroku Pull Request
on: pull_request
```

By default, the `pull_request` event is triggered by the activity types:

- opened
- synchronize
- reopened

To also trigger the workflow with a type like `closed`, you'll need to add it:

```yml
name: Heroku Pull Request
on:
  pull_request:
    types: [opened, synchronize, reopened, closed]
```

Create a job and set the Heroku app name as an [environment variable](https://docs.github.com/en/actions/learn-github-actions/environment-variables):

{% raw %}

```yml
jobs:
  heroku-pull-request:
    runs-on: ubuntu-latest
    env:
      HEROKU_APP_NAME: my-app-pr-${{ github.event.number }}
    steps:
      # ...
```

> `github.event.number` is the PR number.

{% endraw %}

For the first job step, [checkout](https://github.com/actions/checkout) the full repository at the source (PR) branch:

{% raw %}

```yml
- name: Checkout repository
  uses: actions/checkout@v3
  with:
    fetch-depth: 0
    ref: ${{ github.head_ref }}
```

{% endraw %}

Login to [Heroku](https://github.com/marketplace/actions/deploy-to-heroku) so you can perform actions with the CLI:

{% raw %}

```yml
- name: Login to Heroku
  uses: akhileshns/heroku-deploy@v3.12.12
  with:
    heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
    heroku_email: user@example.com
    heroku_app_name: ${{ env.HEROKU_APP_NAME }}
    justlogin: true
```

{% endraw %}

> Set the [Heroku API key]({% post_url 2021/2021-06-21-heroku-api-key %}) in your repository secrets.

Create a Heroku app if the PR is opened:

{% raw %}

```yml
- name: Create Heroku app
  if: github.event.action == 'opened'
  run: heroku apps:create ${{ env.HEROKU_APP_NAME }}
```

{% endraw %}

> To create a Heroku app under a team, set the `--team` argument.

Optionally, you can add the app to an existing Heroku pipeline:

{% raw %}

```yml
- name: Add Heroku app to pipeline
  if: github.event.action == 'opened'
  run: heroku pipelines:add my-pipeline --app=${{ env.HEROKU_APP_NAME }} --stage=development
```

{% endraw %}

> Replace `my-pipeline` with your pipeline name.

Optionally, you can copy environment variables (config vars) from another Heroku app:

{% raw %}

```yml
- name: Copy environment variables to Heroku app
  if: github.event.action == 'opened'
  run: |
    heroku config --shell --app=my-development-app > .env
    cat .env | tr '\n' ' ' | xargs heroku config:set --app=${{ env.HEROKU_APP_NAME }}
```

{% endraw %}

> Replace `my-development-app` with your other Heroku app name.

Add the [Heroku remote](https://devcenter.heroku.com/articles/git#for-an-existing-app) to the repository:

{% raw %}

```yml
- name: Add Heroku remote
  run: heroku git:remote --app=${{ env.HEROKU_APP_NAME }}
```

> This creates a Git remote named `heroku`.

{% endraw %}

Push the local repository branch to the Heroku remote to deploy the app:

{% raw %}

```yml
- name: Push to Heroku
  run: git push heroku ${{ github.head_ref }}:master --force
```

> Alternatively, you can replace `master` with [`main`](https://devcenter.heroku.com/changelog-items/1829).

{% endraw %}

Optionally, you can add a PR comment after the app is deployed:

{% raw %}

```yml
- name: Add comment to PR
  if: github.event.action == 'opened'
  run: gh pr comment ${{ github.event.number }} --body "[Heroku app dashboard](https://dashboard.heroku.com/apps/${{ env.HEROKU_APP_NAME }})\n\nhttps://${{ env.HEROKU_APP_NAME }}.herokuapp.com"
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

If your PR is closed, then destroy the Heroku app:

{% raw %}

```yml
- name: Destroy Heroku app
  if: github.event.action == 'closed'
  run: heroku apps:destroy --app=${{ env.HEROKU_APP_NAME }} --confirm=${{ env.HEROKU_APP_NAME }}
```

{% endraw %}

## Workflow

Here's the full GitHub Actions workflow:

{% raw %}

```yml
# .github/workflows/heroku-pull-request.yml
name: Heroku Pull Request
on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

jobs:
  heroku-pull-request:
    runs-on: ubuntu-latest
    env:
      HEROKU_APP_NAME: my-app-pr-${{ github.event.number }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          ref: ${{ github.head_ref }}

      - name: Login to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_email: user@example.com
          heroku_app_name: ${{ env.HEROKU_APP_NAME }}
          justlogin: true

      - name: Create Heroku app
        if: github.event.action == 'opened'
        run: heroku apps:create ${{ env.HEROKU_APP_NAME }} # --team=my-team

      - name: Add Heroku app to pipeline
        if: github.event.action == 'opened'
        run: heroku pipelines:add my-pipeline --app=${{ env.HEROKU_APP_NAME }} --stage=development

      - name: Copy environment variables to Heroku app
        if: github.event.action == 'opened'
        run: |
          heroku config --shell --app=my-development-app > .env
          cat .env | tr '\n' ' ' | xargs heroku config:set --app=${{ env.HEROKU_APP_NAME }}

      - name: Add Heroku remote
        run: heroku git:remote --app=${{ env.HEROKU_APP_NAME }}

      - name: Push to Heroku
        run: git push heroku ${{ github.head_ref }}:master --force

      - name: Add comment to PR
        if: github.event.action == 'opened'
        run: gh pr comment ${{ github.event.number }} --body "[Heroku app dashboard](https://dashboard.heroku.com/apps/${{ env.HEROKU_APP_NAME }})\n\nhttps://${{ env.HEROKU_APP_NAME }}.herokuapp.com"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Destroy Heroku app
        if: github.event.action == 'closed'
        run: heroku apps:destroy --app=${{ env.HEROKU_APP_NAME }} --confirm=${{ env.HEROKU_APP_NAME }}
```

{% endraw %}
