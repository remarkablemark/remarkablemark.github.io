---
layout: post
title: How to set up OpenCode with Ollama
date: 2026-02-04 14:22:24
excerpt: How to set up OpenCode IDE with an Ollama coding model.
categories: opencode ollama ai
---

This post goes over how to set up [OpenCode](https://opencode.ai/) with [Ollama](https://ollama.com/).

## Prerequisites

[OpenCode](https://opencode.ai/):

```sh
brew install opencode
```

[Ollama](https://ollama.com/):

```sh
brew install ollama
```

## Ollama

Start Ollama:

```sh
ollama serve
```

Ollama by default uses a [context window size](https://docs.ollama.com/context-length) of 4096 tokens. For tasks that require large context like web search, agents, and coding tools, set the [context window](https://docs.ollama.com/faq#how-can-i-specify-the-context-window-size) to at least 64000 tokens:

```sh
OLLAMA_CONTEXT_LENGTH=64000 ollama serve
```

Install [qwen2.5-coder](https://ollama.com/library/qwen2.5-coder):

```sh
ollama pull qwen2.5-coder:latest
```

## OpenCode

Open **OpenCode** > ⌘P > **Settings** (⌘,) > **Providers** > **Custom provider** > **+ Connect**.

Fill out the custom provider fields:

- Provider ID:
  ```
  ollama
  ```
- Display name:
  ```
  Ollama
  ```
- Base URL:
  ```
  http://localhost:11434/v1
  ```
- Model ID:
  ```
  qwen2.5-coder:latest
  ```
- Model Display Name:
  ```
  Qwen2.5 Coder
  ```

Click **Submit**.

> To delete a manually configured model, edit the global config `~/.config/opencode/opencode.jsonc`.

Ollama is connected and the model is ready for use!
