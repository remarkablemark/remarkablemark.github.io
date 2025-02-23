---
layout: post
title: How to run Ollama LLM on GitHub Actions
date: 2025-02-23 14:00:53
excerpt: How to run Ollama large language models (LLM) on GitHub Actions for free.
categories: github actions ollama llm ai ci
---

This post goes over how to run [Ollama](https://ollama.com/) large language models (LLM) on [GitHub Actions](https://github.com/features/actions) for free.

## Ollama

Ollama is a CLI that runs [LLMs](https://ollama.com/library).

To run it on Linux, copy the [install command](https://ollama.com/download/linux) and follow the [example](https://github.com/ollama/ollama#quickstart):

```yml
# .github/workflows/ollama.yml
name: ollama
on: push

jobs:
  ollama:
    runs-on: ubuntu-latest

    steps:
      - name: Install ollama
        run: curl -fsSL https://ollama.com/install.sh | bash

      - name: Run LLM
        run: ollama run llama3.2 'What is a large language model?'
```

## ollama-action

To run Ollama on macOS or Windows, use [`ollama-action`](https://github.com/ai-action/ollama-action):

{% raw %}

```yml
# .github/workflows/ollama.yml
name: ollama
on: push

jobs:
  ollama:
    runs-on: macos-latest

    steps:
      - name: Run LLM
        uses: ai-action/ollama-action@v1
        id: llm
        with:
          model: llama3.2
          prompt: What is a large language model?

      - name: Print response
        env:
          response: ${{ steps.llm.outputs.response }}
        run: echo "$response"
```

{% endraw %}

## setup-ollama

To use the Ollama CLI on macOS or Windows, use [`setup-ollama`](https://github.com/ai-action/setup-ollama):

{% raw %}

```yml
# .github/workflows/ollama.yml
name: ollama
on: push

jobs:
  ollama:
    runs-on: windows-latest

    steps:
      - name: Setup ollama
        uses: ai-action/setup-ollama@v1

      - name: Print response
        run: ollama run llama3.2 'What is a large language model?'
```

{% endraw %}

## Code Review Example

Here's an example of using Ollama to add a code review comment to a pull request:

{% raw %}

```yml
# .github/workflows/code-review.yml
name: Code Review
on: pull_request

permissions:
  contents: read
  pull-requests: write

jobs:
  code-review:
    runs-on: ubuntu-latest
    steps:
      - name: Setup ollama
        uses: ai-action/setup-ollama@v1

      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Code review comment
        run: |
          PROMPT='Code review the changes below:'
          RESPONSE=$(ollama run codellama "$PROMPT\n$(gh pr diff $PR_NUMBER)")
          gh pr comment $PR_NUMBER --body "$RESPONSE"
        env:
          GITHUB_TOKEN: ${{ github.token }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
```

{% endraw %}

See the [example](https://github.com/ai-action/ollama-github-action-demo/pull/1) for more details.
