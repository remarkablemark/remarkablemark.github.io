---
layout: post
title: Deploy to Heroku with GitHub Actions
date: 2021-03-12 22:29:42
excerpt: How to deploy to Heroku using the GitHub Actions workflow.
categories: heroku github actions deploy
---

<!--email_off-->

This article goes over how to deploy to [Heroku](https://www.heroku.com/) using the [GitHub Actions](https://github.com/features/actions) workflow.

## Prerequisites

### Heroku

Create a Heroku app and save the app's name and email associated with your account. Then go to [Account settings](https://dashboard.heroku.com/account) and copy your `API Key`.

### GitHub

Go to your GitHub repository's `Settings` > `Secrets` and set the [secrets](https://docs.github.com/en/actions/reference/encrypted-secrets):

- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`
- `HEROKU_EMAIL`

## GitHub Action

Workflow to deploy using [Deploy to Heroku](https://github.com/marketplace/actions/deploy-to-heroku) action:

{% raw %}

```yml
# .github/workflows/heroku-deploy.yml
jobs:
  heroku-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

{% endraw %}

The action pushes to the [`main` branch](https://devcenter.heroku.com/articles/git-branches).

Check out the additional [options](https://github.com/marketplace/actions/deploy-to-heroku#options).

## Custom Workflow

Workflow to deploy using a custom job:

{% raw %}

```yml
# .github/workflows/custom-deploy.yml
jobs:
  custom-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Heroku login credentials
        run: |
          cat > ~/.netrc <<EOF
            machine api.heroku.com
              login $HEROKU_EMAIL
              password $HEROKU_API_KEY
            machine git.heroku.com
              login $HEROKU_EMAIL
              password $HEROKU_API_KEY
          EOF
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
          HEROKU_EMAIL: ${{ secrets.HEROKU_EMAIL }}
      - name: Add Heroku remote
        run: heroku git:remote --app $HEROKU_APP_NAME
        env:
          HEROKU_APP_NAME: ${{ secrets.HEROKU_APP_NAME }}
      - name: Push to Heroku
        run: git push heroku master
```

{% endraw %}

The differences between the 2 workflows are explained below.

### GitHub Action Checkout

The [Checkout](https://github.com/marketplace/actions/checkout) action must [fetch the entire Git history](https://github.com/marketplace/actions/checkout#fetch-all-history-for-all-tags-and-branches) or else the build will fail with the error:

```sh
Run git push heroku master
  git push heroku master
  shell: /usr/bin/bash -e {0}
remote:
remote: !	Push rejected, source repository is a shallow clone. Unshallow it with `git fetch --all --unshallow` and try pushing again.
remote:
To https://git.heroku.com/***.git
 ! [remote rejected] master -> master (shallow update not allowed)
error: failed to push some refs to 'https://git.heroku.com/***.git'
Error: Process completed with exit code 1.
```

### Heroku Login

The [`~/.netrc`](https://devcenter.heroku.com/articles/authentication#api-token-storage) contains the Heroku login credentials:

{% raw %}

```yml
- name: Heroku login credentials
  run: |
    cat > ~/.netrc <<EOF
      machine api.heroku.com
        login $HEROKU_EMAIL
        password $HEROKU_API_KEY
      machine git.heroku.com
        login $HEROKU_EMAIL
        password $HEROKU_API_KEY
    EOF
  env:
    HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
    HEROKU_EMAIL: ${{ secrets.HEROKU_EMAIL }}
```

{% endraw %}

## Deploy with Git

Then the [Git remote is set](https://devcenter.heroku.com/articles/git#for-an-existing-heroku-app) and [pushed](https://devcenter.heroku.com/articles/git#deploying-code):

{% raw %}

```yml
- name: Add Heroku remote
  run: heroku git:remote --app $HEROKU_APP_NAME
  env:
    HEROKU_APP_NAME: ${{ secrets.HEROKU_APP_NAME }}
- name: Push to Heroku
  run: git push heroku master
```

{% endraw %}

We are pushing to the `master` branch here, but we can push to `main` as well.

## Example

The [repository](https://github.com/remarkablemark/github-actions-heroku-deploy) contains the code examples.

<p>
<details markdown="1">
<summary>Here's how a successful deploy looks like.</summary>

```sh
Created and wrote to ~/.netrc
Successfully logged into heroku
 ›   Warning: Our terms of service have changed:
Added git remote heroku
 ›   https://dashboard.heroku.com/terms-of-service
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Building on the Heroku-20 stack
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:
remote:        Resolving node version 14.x...
remote:        Downloading and installing node 14.16.0...
remote:        Using default npm version: 6.14.11
remote:
remote: -----> Restoring cache
remote:        - node_modules
remote:
remote: -----> Installing dependencies
remote:        Installing node modules (package.json)
remote:        audited 50 packages in 0.733s
remote:        found 0 vulnerabilities
remote:
remote:
remote: -----> Build
remote:
remote: -----> Caching build
remote:        - node_modules
remote:
remote: -----> Pruning devDependencies
remote:        audited 50 packages in 0.735s
remote:        found 0 vulnerabilities
remote:
remote:
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 32.6M
remote: -----> Launching...
remote:        Released v6
remote:        https://***.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/***.git
   88f00ab..1a1a302  HEAD -> main
```

</details>
</p>

<!--/email_off-->
