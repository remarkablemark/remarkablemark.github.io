---
layout: post
title: AI text-to-image generation with diffused CLI
date: 2025-03-30 14:53:29
excerpt: How to perform AI text-to-image generation with diffused CLI.
categories: ai text-to-image cli diffused diffusion huggingface
---

This post goes over how to perform AI text-to-image generation with [diffused](https://github.com/ai-action/diffused) CLI.

## Prerequisites

Install [Python](https://www.python.org/):

```sh
brew install python
```

Install [pipx](https://pipx.pypa.io/):

```sh
brew install pipx
```

## CLI

Install the [CLI](https://pypi.org/project/diffused/):

```sh
pipx install diffused
```

Generate an image with [model](https://huggingface.co/segmind/tiny-sd) and prompt:

```sh
diffused segmind/tiny-sd "portrait of a cat"
```

Generate an image with [model](https://huggingface.co/OFA-Sys/small-stable-diffusion-v0), prompt, and filename:

```sh
diffused OFA-Sys/small-stable-diffusion-v0 "cartoon of a cat" --output cat.jpg
```

See help for more info:

```sh
diffused --help
```

## Script

Create a virtual environment:

```sh
python3 -m venv .venv
```

Activate the virtual environment:

```sh
source .venv/bin/activate
```

Install the [package](https://pypi.org/project/diffused/):

```sh
pip install diffused
```

Generate an image with [model](https://huggingface.co/segmind/tiny-sd) and prompt:

```py
# script.py
from diffused import generate

image = generate(model="segmind/tiny-sd", prompt="apple")
image.save("apple.png")
```

Run the script:

```sh
python script.py
```

## Resources

- For more models, see [Hugging Face](https://huggingface.co/models?pipeline_tag=text-to-image).
- The package is open source and on [GitHub](https://github.com/ai-action/diffused).
