---
layout: post
title: How to write a great README
date: 2021-01-03 18:32:20
excerpt: How to write a great README for your project.
categories: readme writing documentation
---

Sections of a great README:

- [Introduction](#introduction)
- [Badges](#badges)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Usage](#usage)
- [Release](#release)
- [Security](#security)
- [License](#license)
- [Addendum](#addendum)

## Introduction

The introduction should explain in 1-2 sentences what your project does and why the user should care.

Provide a quickstart example since there's a direct correlation between how easy it is to use the project and how many people using it. Demos can be created using:

- [Repl.it](https://repl.it/)
- [CodeSandbox](https://codesandbox.io/)
- [JSFiddle](https://jsfiddle.net/)

## Badges

Badges provide metadata (and signals) that can help the user decide whether to use your project or not. Include information like:

- [Build](https://shields.io/category/build)
- [Code coverage](https://shields.io/category/coverage)
- [Dependencies](https://shields.io/category/dependencies)
- [Size](https://shields.io/category/size)
- [Downloads](https://shields.io/category/downloads)
- [Social](https://shields.io/category/social) (e.g., GitHub stars)
- [Version](https://shields.io/category/version)
- [Activity](https://shields.io/category/activity) (e.g., last commit)

For more examples, see [Shields.io](https://shields.io/) and [Naereen/badges](https://naereen.github.io/badges/).

## Prerequisites

Bring up any prerequisites before the user installs the project. You don't necessary how to detail the steps to install a common binary, but you can provide a link to the binary's download page.

## Install

Describe how to install your project. If your project can be installed using a package manager, add a code block with the install command. If your project has additional build steps, cover them and explain any nuances (e.g., different platforms or operating systems).

## Usage

Explain how to run and use the project. This is a good place to describe what each script, class, function, or option does. Further examples can also beneficial.

## Release

Provide instructions on how to release/publish/deploy the project. Note whether the process is manual or [automatic](https://wikipedia.org/wiki/Continuous_deployment) and how [versioning](https://wikipedia.org/wiki/Software_versioning) works.

## Security

Provide instructions on how to contact the project maintainers if a security vulnerability is found. This is critical because if your project is open sourced, [creating an issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/creating-an-issue) will bring awareness to the bug, which puts more pressure in getting a fix out. See [adding a security policy to your repository](https://docs.github.com/en/free-pro-team@latest/github/managing-security-vulnerabilities/adding-a-security-policy-to-your-repository).

## License

Even if there's a separate `LICENSE` file, it's good practice to state the project license in the README.

## Addendum

- `CONTRIBUTING.md` helps users understand how to contribute and make changes to your project (see [template](https://gist.github.com/PurpleBooth/b24679402957c63ec426)).
- [`CODE_OF_CONDUCT.md`] helps users understand how to conduct interactions with the project (see [GitHub Docs](https://docs.github.com/en/free-pro-team@latest/github/building-a-strong-community/adding-a-code-of-conduct-to-your-project)).
- If there are a lot of headings, include a table of contents at the beginning.
- ["3 tips to be a better writer"]({% post_url 2020/2020-12-16-tips-to-be-a-better-writer %})
