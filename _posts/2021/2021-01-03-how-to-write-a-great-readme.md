---
layout: post
title: How to write a great README
date: 2021-01-03 18:32:20
updated: 2025-11-16 12:17:58
excerpt: How to write a great README for your project.
categories: readme writing documentation docs
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

Explain in 1-2 sentences _what_ your project does and _why_ someone should care.

There's a direct correlation between how easy it is to use the project and how many people are using it, so provide a quickstart demo:

- [StackBlitz](https://stackblitz.com/)
- [JSFiddle](https://jsfiddle.net/)

## Badges

Badges provide metadata and signals that can help someone decide whether to use your project or not. Include info like:

- Build
- Code coverage
- Dependencies
- Size
- Downloads
- Social (e.g., GitHub stars)
- Version
- Activity (e.g., last commit)

See [Shields.io](https://shields.io/) and [Naereen/badges](https://naereen.github.io/badges/).

## Prerequisites

Bring up prerequisites before a user installs the project. If a CLI or binary is required, provide a link to the download page.

## Install

Describe the steps to install your project. If your project can be installed with a package manager, add a code block with the install command. If your project has additional build steps, cover them and explain edge cases for specific platforms or operating systems.

## Usage

Explain how to run the project. This is a good place to describe what each script, class, function, or option does. Additional examples may be beneficial.

## Release

Provide instructions on how to release, publish, and deploy the project. Note whether the process is manual or [automated](https://wikipedia.org/wiki/Continuous_deployment) and how [versioning](https://wikipedia.org/wiki/Software_versioning) works.

## Security

Provide instructions on how to contact the project maintainer if a security vulnerability is found. This is important because if your project is open sourced, [creating an issue](https://docs.github.com/issues/tracking-your-work-with-issues/creating-an-issue) will bring awareness to the bug, which puts more pressure on getting a fix out. See [adding a security policy to your repository](https://docs.github.com/code-security/getting-started/adding-a-security-policy-to-your-repository).

## License

It's good practice to state the project license in the README.

## Addendum

- `CONTRIBUTING.md` helps users understand how to contribute and make changes to your project (see [template](https://gist.github.com/PurpleBooth/b24679402957c63ec426)).
- [`CODE_OF_CONDUCT.md`] helps users understand how to conduct interactions with the project (see [GitHub Docs](https://docs.github.com/communities/setting-up-your-project-for-healthy-contributions/adding-a-code-of-conduct-to-your-project)).
- If there are a lot of headings, include a table of contents at the beginning.
- ["3 tips to be a better writer"]({% post_url 2020/2020-12-16-tips-to-be-a-better-writer %})
