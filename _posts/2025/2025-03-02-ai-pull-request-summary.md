---
layout: post
title: How to summarize pull requests with AI
date: 2025-03-02 13:53:53
excerpt: How to use AI (LLMs) to summarize pull requests (PRs) with GitHub Actions.
categories: github actions ai llm pull request
---

This post goes over how to use AI (LLMs) to summarize pull requests (PRs) with [GitHub Actions](https://github.com/features/actions).

## Action

The easiest method is to use the action [`pull-request-summary`](https://github.com/marketplace/actions/pull-request-summary):

{% raw %}

```yml
# .github/workflows/pull-request-summary.yml
on: pull_request
jobs:
  pull-request-summary:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: ai-action/pull-request-summary@v1
```

{% endraw %}

The action reviews the code changes with a large language model (LLM) and edits the pull request description with the response.

See [example](https://github.com/ai-action/ollama-github-action-demo/pull/10).

## Custom

To create a custom workflow, set up [Ollama](https://github.com/marketplace/actions/setup-ollama) and [checkout the repository](https://github.com/actions/checkout):

{% raw %}

```yml
- uses: ai-action/setup-ollama@v1
- uses: actions/checkout@v5
```

{% endraw %}

Then run a prompt with the PR diff against [codellama](https://ollama.com/library/codellama) and edit the PR description with the response:

{% raw %}

```yml
- run: |
    PROMPT=$(printf 'Summarize the following code diff:\n%s' $(gh pr diff $PR_NUMBER))
    LLM='codellama'
    PR_SUMMARY=$(ollama run $LLM "$PROMPT")
    gh pr edit $PR_NUMBER --body "$PR_SUMMARY"
  env:
    GITHUB_TOKEN: ${{ github.token }}
    PR_NUMBER: ${{ github.event.pull_request.number }}
```

{% endraw %}

Here's the full workflow:

{% raw %}

```yml
# .github/workflows/pull-request-summary.yml
on: pull_request

jobs:
  pull-request-summary:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write

    steps:
      - uses: ai-action/setup-ollama@v1
      - uses: actions/checkout@v5
      - run: |
          PROMPT=$(printf 'Summarize code diff below:\n%s' $(gh pr diff $PR_NUMBER))
          LLM='codellama'
          PR_SUMMARY=$(ollama run $LLM "$PROMPT")
          gh pr edit $PR_NUMBER --body "$PR_SUMMARY"
        env:
          GITHUB_TOKEN: ${{ github.token }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
```

{% endraw %}

See [example](https://github.com/ai-action/ollama-github-action-demo/pull/8).
