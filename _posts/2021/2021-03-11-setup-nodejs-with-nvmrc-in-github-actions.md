---
layout: post
title: Set up Node.js with .nvmrc in GitHub Actions
date: 2021-03-11 19:30:49
excerpt: How to set up Node.js environment with the .nvmrc version for a GitHub Actions workflow.
categories: nvm nodejs github actions workflow
---

<!--email_off-->

[Set an output parameter](https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-an-output-parameter) for [`.nvmrc`](https://github.com/nvm-sh/nvm):

```yml
steps:
  - run: echo ::set-output name=NODE_VERSION::$(cat .nvmrc)
    id: nvm
```

Evaluate the [expression](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#about-contexts-and-expressions) in [`setup-node`](https://github.com/actions/setup-node):

{% raw %}

```yml
steps:
  # ...
  - uses: actions/setup-node@v2
    with:
      node-version: ${{ steps.nvm.outputs.NODE_VERSION }}
```

{% endraw %}

Here's the full example of setting up Node.js with the `.nvmrc` version in a GitHub Actions workflow:

{% raw %}

```yml
# .github/workflows/nodejs.yml
on: push
jobs:
  nodejs:
    runs-on: ubuntu-latest
    steps:
      - name: Read .nvmrc
        run: echo ::set-output name=NODE_VERSION::$(cat .nvmrc)
        id: nvm
      - name: Use Node.js ${{ steps.nvm.outputs.NODE_VERSION }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ steps.nvm.outputs.NODE_VERSION }}
```

{% endraw %}

The original solution is from [@damccorm](https://github.com/damccorm)'s [comment](https://github.com/actions/setup-node/issues/32#issuecomment-525791142). The updated solution is from [@peaceiris](https://github.com/peaceiris)'s [comment](https://github.com/actions/setup-node/issues/32#issuecomment-539794249). Credit goes to them.

<!--/email_off-->
