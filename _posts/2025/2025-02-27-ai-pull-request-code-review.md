---
layout: post
title: AI pull request code review
date: 2025-02-27 21:17:18
excerpt: Tools that can perform AI pull request (PR) code reviews on GitHub.
categories: github ai code review pr
---

Tools that can perform AI pull request (PR) code reviews on GitHub:

- [Copilot](#copilot)
- [CodeRabbit](#coderabbit)
- [GitHub Actions](#github-actions)

## Copilot

[Copilot](https://docs.github.com/copilot/using-github-copilot/code-review/using-copilot-code-review) code review requires:

1. Copilot subscription from an organization ([1 business seat costs $19 per month](https://github.com/features/copilot/plans))
2. Copilot to be enabled in the organization

To requesting a pull request review from Copilot, open the **Reviewers** menu and select **Copilot**.

## CodeRabbit

[CodeRabbit](https://docs.coderabbit.ai/getting-started/quickstart) is a GitHub app that provides AI summaries and code reviews for pull requests.

If you have an open source project, CodeRabbit is free; otherwise, the [starting plan](https://www.coderabbit.ai/pricing) costs $15 per month per developer.

## GitHub Actions

To create your own GitHub Action that does code review with [open source LLMs](https://ollama.com/), you can use [pull-request-review](https://github.com/marketplace/actions/pull-request-review):

{% raw %}

```yml
# .github/workflows/pr-review.yml
on: pull_request
jobs:
  pr-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - name: PR review
        uses: ai-action/pull-request-review@v1
```

{% endraw %}

See [example](https://github.com/ai-action/ollama-github-action-demo).
