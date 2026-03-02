---
layout: post
title: How to publish a private Python package to GitHub Releases
date: 2026-03-02 14:44:14
excerpt: How to publish a private Python package to GitHub Releases.
categories: github releases python package publish
---

This post goes over how to publish a private Python package to GitHub Releases.

## Motivation

Normally, you want to publish your public Python package to PyPI. But for private packages, [GitHub Packages does not support Python](https://github.com/github/roadmap/issues/94).

I didn't want to publish my package to an external private registry, so I wanted to see if I could publish it to [GitHub Releases](https://docs.github.com/repositories/releasing-projects-on-github/about-releases).

## Publish

Publish your Python package with GitHub Actions:

{% raw %}

```yml
# .github/workflows/release.yml
# ...
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Install uv
        uses: astral-sh/setup-uv@v7

      - name: Build package
        run: uv build

      - name: Upload to GitHub Release
        run: gh release upload v${{ needs.release.outputs.version }} dist/*.whl --clobber
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

See [example workflow](https://github.com/remarkablemark/python-package-github-release-test/blob/master/.github/workflows/release-please.yml).

Check the latest release:

```sh
gh release view --repo <USER>/<REPO> --json assets -q '.assets[] | select(.name | endswith(".whl")) | .url'
```

> Replace `<USER>/<REPO>` with your username/organization and repository name.

The URL should look like:

```sh
https://github.com/user/repo/releases/download/v1.2.3/python_package-1.2.3-py3-none-any.whl
```

## Install

Use [GitHub CLI](https://cli.github.com/) to download the wheel:

```sh
gh release download <TAG> -R <USER>/<REPO> -p '*.whl' -D ./vendor/ --clobber
```

> Replace `<TAG>` with your release tag (e.g., `v1.2.3`) and `<USER>/<REPO>` with your username/organization and repository name.

Install your package with [uv](https://docs.astral.sh/uv/):

```sh
uv add ./vendor/*.whl
```

Or pip:

```sh
pip install ./vendor/*.whl
```

See [example repo](https://github.com/remarkablemark/python-package-github-release-test).
