---
layout: post
title: Migrate Travis CI to GitHub Actions (Node.js)
date: 2020-12-11 20:51:00
excerpt: How to migrate from Travis CI to GitHub Actions for a Node.js workflow.
categories: travis ci github nodejs npm
---

Given a Node.js project on [GitHub](https://github.com/), we'll go over how to migrate the continuous integration from [Travis CI](https://travis-ci.org/) to [GitHub Actions](https://github.com/features/actions).

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

First, make the directory `.github/workflows`:

```sh
$ mkdir -p .github/workflows
```

Then create the workflow file `.github/workflows/nodejs.yml`:

```sh
$ touch .github/workflows/nodejs.yml
```

Add the Node.js workflow (inspired by the [template](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-nodejs#starting-with-the-nodejs-workflow-template)):

{% raw %}

```yml
# .github/workflows/nodejs.yml
name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
    env:
      CI: true
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm test
      - name: Coveralls
        uses: coverallsapp/github-action@master
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

## Workflow

Here's a breakdown of what each YAML field does.

### name

[`name`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#name) is the workflow name.

It's optional and you can name it whatever you like:

```yml
name: My Node.js Continuous Integration
```

### on

[`on`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#on) is the event that triggers the workflow.

In our example, git `push` triggers our workflow. Accordingly, to add the `pull_request` event:

```yml
on: [push, pull_request]
```

Which is equivalent to:

```yml
on:
  push:
    branches: [$default-branch]
  pull_request:
    branches: [$default-branch]
```

### jobs

[`jobs`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobs) are the jobs that the workflow runs.

In our example, we have a single job named `build`:

```yml
jobs:
  build:
    # ...
```

### runs-on

[`runs-on`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on) is the environment that the workflow runs on.

To specify a specific OS version:

```yml
runs-on: ubuntu-18.04
```

### strategy.matrix

[`strategy.matrix`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) is the build matrix.

In our example, we're running a job for a single node version. To run jobs for multiple node versions:

```yml
strategy:
  matrix:
    node-version: [12.19.0, 14.x, 15]
```

### env

[`env`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idenv) sets the environment variables for all steps in a job.

In our example, we set `CI=true` for the `build` job since that's the [default environment variable set in Travis CI](https://docs.travis-ci.com/user/environment-variables/#default-environment-variables):

```yml
jobs:
  build:
    env:
      CI: true
```

Here's an additional note from the [official docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idenv):

> You can also set environment variables for the entire workflow or an individual step. For more information, see [`env`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#env) and [`jobs.<job_id>.steps.env`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv).

### steps

[`steps`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idsteps) are the tasks of a job.

In our example, we're using the GitHub Actions:

- [Checkout](https://github.com/marketplace/actions/checkout)
- [Setup Node.js environment](https://github.com/marketplace/actions/setup-node-js-environment)
- [Coveralls GitHub Action](https://github.com/marketplace/actions/coveralls-github-action)

`actions/checkout` checks out the repository and `actions/setup-node` sets up the node environment:

{% raw %}

```yml
steps:
  - uses: actions/checkout@v2
  - name: Use Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v1
    with:
      node-version: ${{ matrix.node-version }}
```

{% endraw %}

`coverallsapp/github-action` sends the test coverage report to [Coveralls](https://coveralls.io/):

{% raw %}

```yml
- name: Coveralls
  uses: coverallsapp/github-action@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

### steps.run

[`steps.run`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun) runs the commands.

The commands can be [npm scripts](https://docs.npmjs.com/cli/v6/commands/npm-run-script/) from `package.json` or other bash commands.

> `npm`, `yarn`, and `npx` are available to use since we have Node.js set up.

The `--if-present` flag runs the script if it exists and skips it if it doesn't:

```yml
steps:
  - run: npm run build --if-present
```

## Resources

- [GitHub Actions](https://github.com/features/actions)
- [Building and testing Node.js](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-nodejs)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
