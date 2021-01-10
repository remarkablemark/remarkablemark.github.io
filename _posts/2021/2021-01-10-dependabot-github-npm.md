---
layout: post
title: Add Dependabot to GitHub for npm
date: 2021-01-10 15:21:12
excerpt: How to add Dependabot to automate dependency update for npm project on GitHub.
categories: dependabot github npm
---

[Dependabot](https://dependabot.com/) automates dependency updates for projects on [GitHub](https://github.com/). We'll go over how to automate dependency updates for npm or Node.js projects.

## Configuration

Create `.github/dependabot.yml`:

```sh
$ mkdir -p .github/
$ touch .github/dependabot.yml
```

Add the minimum (required) configuration:

```yml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'daily'
```

Given the configuration, Dependabot will check on a daily interval for `npm` updates using the package manifest (`package.json`) located at the repository root (`/`).

For more options, check out ["Configuration options for dependency updates"](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/configuration-options-for-dependency-updates).

## Example

Let's say `webpack` recently published version `5.0.0` and you're on `4.0.0`.

At 5am UTC, Dependabot will scan your `package.json` and open a pull request (PR) to merge branch `dependabot/npm_and_yarn/webpack-5.0.0` to `master`.

The commit message will look like:

```
build(deps-dev): bump webpack from 4.0.0 to 5.0.0
```

The PR description will contain webpack's release notes and commits.
