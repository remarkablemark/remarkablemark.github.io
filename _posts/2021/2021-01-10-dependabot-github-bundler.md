---
layout: post
title: Add Dependabot to bundler projects
date: 2021-01-10 17:25:55
excerpt: How to add Dependabot to automate dependency updates for bundler or Ruby projects on GitHub.
categories: dependabot github bundler ruby
---

[Dependabot](https://dependabot.com/) automates dependency updates for projects on [GitHub](https://github.com/). We'll go over how to automate dependency updates for bundler or Ruby projects.

## Configuration

Create `.github/dependabot.yml`:

```sh
$ mkdir -p .github/
$ touch .github/dependabot.yml
```

Add the minimum (_required_) configuration:

```yml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'bundler'
    directory: '/'
    schedule:
      interval: 'daily'
```

Given the configuration, Dependabot will check on a daily interval for `bundler` updates using the package manifest (`Gemfile`) located at the repository root (`/`).

For more options, check out ["Configuration options for dependency updates"](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/configuration-options-for-dependency-updates).

## Example

Let's say `rubyzip` recently published version `2.0.0` and you're on `1.2.3`.

At 5am UTC, Dependabot will scan your `Gemfile` and open a pull request (PR) to merge branch `dependabot/bundler/rubyzip-2.0.0` to `master`.

The commit message will look like:

```
build(deps): bump rubyzip from 1.2.3 to 2.0.0
```

The PR description will contain rubyzip's release notes and commits.

See example [PR](https://github.com/remarkablemark/remarkablemark.github.io/pull/2).
