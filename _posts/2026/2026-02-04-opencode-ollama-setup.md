---
layout: post
title: How to use OpenCode with Ollama
date: 2026-02-04 14:22:24
updated: 2026-05-02 19:41:41
excerpt: How to set up OpenCode IDE with an Ollama coding model.
categories: opencode ollama ai
---

This post goes over how to set up [OpenCode](https://opencode.ai/) with [Ollama](https://ollama.com/).

## Install

[Ollama](https://ollama.com/):

```sh
brew install ollama
```

[OpenCode](https://opencode.ai/):

```sh
brew install opencode
```

## Ollama

Start the server in a separate terminal:

```sh
ollama serve
```

Install [gemma4](https://ollama.com/library/gemma4):

```sh
ollama pull gemma4
```

Confirm it's downloaded:

```sh
ollama ls gemma4
```

You should see:

```sh
NAME             ID              SIZE      MODIFIED
gemma4:latest    c6eb396dbd59    9.6 GB    5 seconds ago
```

Check the model's context length:

```sh
ollama show gemma4
```

You should see:

```
  Model
    architecture        gemma4
    parameters          8.0B
    context length      131072
    embedding length    2560
    quantization        Q4_K_M
    requires            0.20.0
```

Restart the server with the context length (to maximize memory):

```sh
OLLAMA_CONTEXT_LENGTH=131072 ollama serve
```

Check the performance of the model:

```sh
ollama run gemma4 "ping" && ollama ps
```

## OpenCode

Launch opencode with [gemma4](https://ollama.com/library/gemma4):

```sh
ollama launch opencode --model gemma4
```
