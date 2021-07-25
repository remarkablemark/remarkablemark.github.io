---
layout: post
title: Migrate Travis CI to GitHub Actions for Ruby
date: 2021-02-20 23:40:23
updated: 2021-02-21 13:30:17
excerpt: How to migrate from Travis CI to GitHub Actions for a Ruby project.
categories: travis ci github ruby
---

<!--email_off-->

This article goes over how to migrate from [Travis CI](https://b.remarkabl.org/travis-ci) to [GitHub Actions](https://b.remarkabl.org/github-actions) for a [Ruby](https://b.remarkabl.org/ruby) project on [GitHub](https://b.remarkabl.org/github-site).

Watch the [YouTube video](https://youtu.be/QE9mk9Ww7oM?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ):

<iframe width="100%" height="720" src="https://www.youtube.com/embed/QE9mk9Ww7oM?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Travis CI

Given the `.travis.yml`:

```yml
# .travis.yml
language: ruby
cache: bundler
env:
  global:
    - NOKOGIRI_USE_SYSTEM_LIBRARIES=true # speeds up the installation of `html-proofer`
script:
  - bundle exec jekyll build --safe
  - bundle exec htmlproofer _site
```

## GitHub Actions

First make the directory `.github/workflows/`:

```sh
mkdir -p .github/workflows/
```

Create `.github/workflows/build.yml`:

```sh
touch .github/workflows/build.yml
```

Add the workflow that runs a single job:

```yml
# .github/workflows/build.yml
name: build
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NOKOGIRI_USE_SYSTEM_LIBRARIES: true # speeds up the installation of `html-proofer`
    steps:
      - uses: actions/checkout@v2
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.6 # not needed if `.ruby-version` exists
          bundler-cache: true # runs `bundle install` and caches installed gems automatically
      - run: bundle exec jekyll build --safe
      - run: bundle exec htmlproofer _site
```

To test multiple versions of Ruby, update the workflow:

{% raw %}

```yml
# .github/workflows/build.yml
name: build
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NOKOGIRI_USE_SYSTEM_LIBRARIES: true # speeds up the installation of `html-proofer`
    strategy:
      matrix:
        ruby-version: [2.6, 3.0]
    steps:
      - uses: actions/checkout@v2
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: ${{ matrix.ruby-version }}
          bundler-cache: true # runs `bundle install` and caches installed gems automatically
      - run: bundle exec jekyll build --safe
      - run: bundle exec htmlproofer _site
```

{% endraw %}

The Ruby workflow is inspired by the [template](https://github.com/actions/starter-workflows/blob/master/ci/ruby.yml).

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

[`strategy.matrix`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) is the build matrix. In our example, we're running a job for a single ruby version. To define jobs for multiple ruby versions:

```yml
strategy:
  matrix:
    ruby-version: [2.6.0, '3.0', jruby]
```

### steps

[`steps`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idsteps) are the tasks of a job. In our example, we're using the GitHub Actions:

- [Checkout](https://github.com/marketplace/actions/checkout)
- [Setup Ruby](https://github.com/marketplace/actions/setup-ruby-jruby-and-truffleruby)

`actions/checkout` checks out the repository and `ruby/setup-ruby` sets up the Ruby environment:

```yml
steps:
  - uses: actions/checkout@v2
  - uses: ruby/setup-ruby@v1
    with:
      ruby-version: 2.6 # not needed if `.ruby-version` exists
      bundler-cache: true # runs `bundle install` and caches installed gems automatically
```

### steps.run

[`steps.run`](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun) runs the commands. Since [setup-ruby](https://github.com/ruby/setup-ruby) installs [bundler](https://bundler.io/), it can be used to execute commands:

```yml
steps:
  - run: bundle install
```

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
- [Building and testing Ruby](https://docs.github.com/en/actions/guides/building-and-testing-ruby)
- [Pull Request (PR) example](https://github.com/remarkablegames/remarkablegames.github.io/pull/2)

<!--/email_off-->
