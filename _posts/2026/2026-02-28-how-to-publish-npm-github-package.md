---
layout: post
title: How to publish an npm GitHub Package
date: 2026-02-28 18:24:21
excerpt: How to publish an npm GitHub Package.
categories: github packages npm publish
---

This post goes over how to publish an npm [GitHub Package](https://docs.github.com/packages).

## Publish

Publish your npm package with GitHub Actions:

{% raw %}

```yml
# .github/workflows/release.yml
# ...
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Use Node.js
        uses: actions/setup-node@v6
        with:
          registry-url: 'https://npm.pkg.github.com'
          scope: '@your-org' # <- update with your org or username

      - name: Install dependencies
        run: npm ci --prefer-offline

      - name: Publish package
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

See [example workflow](https://github.com/remarkablemark/github-package-test/blob/master/.github/workflows/release-please.yml).

## Install

To install the npm GitHub Package, update `.npmrc`:

```
@your-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> Replace `your-org` with your org or username.

Create auth [token](https://github.com/settings/tokens) with scope `read:packages` and add it to your shell config (e.g., `.zshrc`):

```bash
export GITHUB_TOKEN=ghp_xxx
```

Or do with with [GitHub CLI](https://cli.github.com/):

```sh
gh auth refresh -h github.com -s read:packages
```

```sh
echo 'export GITHUB_TOKEN=$(gh auth token)' >> ~/.zshrc
```

Now you can install the package!

See [example repo](https://github.com/remarkablemark/github-package-test).
