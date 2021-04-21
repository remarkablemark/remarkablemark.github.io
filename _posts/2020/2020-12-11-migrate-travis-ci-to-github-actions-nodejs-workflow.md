---
layout: post
title: Migrate Travis CI to GitHub Actions for Node.js
date: 2020-12-11 20:51:00
updated: 2020-12-28 15:10:43
excerpt: How to migrate from Travis CI to GitHub Actions for a Node.js project.
categories: travis ci github nodejs npm
---

<!--email_off-->

This article goes over how to migrate from [Travis CI](https://b.remarkabl.org/travis-ci) to [GitHub Actions](https://b.remarkabl.org/github-actions) for a [Node.js](https://b.remarkabl.org/nodejs-site) project on [GitHub](https://b.remarkabl.org/github-site).

## Travis CI

Given the `.travis.yml`:

```yml
# .travis.yml
language: node_js
node_js:
  - stable
install:
  - npm install
script:
  - npm run lint
  - npm run build
  - npm test
after_success:
  - cat coverage/lcov.info | npx coveralls
```

## GitHub Actions

First make the directory `.github/workflows/`:

```sh
$ mkdir -p .github/workflows/
```

Create `.github/workflows/build.yml`:

```sh
$ touch .github/workflows/build.yml
```

Add the Node.js workflow:

{% raw %}

```yml
# .github/workflows/build.yml
name: build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: npm install
      - name: Lint files
        run: npm run lint
      - name: Build bundle
        run: npm run build
      - name: Run tests
        run: npm test
      - name: Coveralls
        uses: coverallsapp/github-action@master
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

The workflow is inspired by the [template](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-nodejs#starting-with-the-nodejs-workflow-template).

## Workflow

Here's a breakdown of what each YAML field does.

### name

[`name`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#name) is the workflow name. It's optional and you can name it whatever you like:

```yml
name: CI build
```

### on

[`on`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#on) is the event that triggers the workflow. In our example, git `push` triggers our workflow.

To add the `pull_request` event:

```yml
on: [push, pull_request]
```

Which is the same thing as:

```yml
on:
  push:
    branches: [$default-branch]
  pull_request:
    branches: [$default-branch]
```

### jobs

[`jobs`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobs) are the jobs that the workflow runs. In our example, we have a single job named `build`:

```yml
jobs:
  build:
    # ...
```

### runs-on

[`runs-on`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on) is the environment that the workflow runs on. To specify an OS version:

```yml
runs-on: ubuntu-18.04
```

### strategy.matrix

[`strategy.matrix`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) is the build matrix. In our example, we're running a job for a single node version. To define jobs for multiple node versions:

```yml
strategy:
  matrix:
    node-version: [12.19.0, 14.x, 15]
```

### steps

[`steps`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idsteps) are the tasks of a job. In our example, we're using the GitHub Actions:

- [Checkout](https://github.com/marketplace/actions/checkout)
- [Setup Node.js](https://github.com/marketplace/actions/setup-node-js-environment)
- [Coveralls GitHub Action](https://github.com/marketplace/actions/coveralls-github-action)

`actions/checkout` checks out the repository and `actions/setup-node` sets up the Node.js environment:

{% raw %}

```yml
steps:
  - name: Checkout repository
    uses: actions/checkout@v2
  - name: Use Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v2
    with:
      node-version: ${{ matrix.node-version }}
```

{% endraw %}

`coverallsapp/github-action` sends the coverage report to [Coveralls](https://coveralls.io/):

{% raw %}

```yml
- name: Coveralls
  uses: coverallsapp/github-action@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

### steps.run

[`steps.run`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun) runs the commands. The commands can be [npm scripts](https://docs.npmjs.com/cli/v6/commands/npm-run-script/) from `package.json` or other bash commands.

```yml
steps:
  - run: npm run build --if-present
```

`actions/setup-node@v2` installs `npm`, `npx`, and `yarn`. The `--if-present` option runs the script only if it exists:

### env

[`env`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idenv) sets the environment variables for the entire workflow or an individual step. See [`env`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#env) and [`jobs.<job_id>.steps.env`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv).

Although [Travis CI sets default environment variables](https://docs.travis-ci.com/user/environment-variables/#default-environment-variables), we don't have to set `CI=true` for our job since `actions/checkout@v2` does it for us:

```yml
jobs:
  build:
    env:
      CI: true
```

## Resources

- [Migrating from Travis CI to GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/migrating-from-travis-ci-to-github-actions)
- [Building and testing Node.js](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-nodejs)

<!--/email_off-->
