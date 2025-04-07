---
layout: post
title: AI image generation with diffused
date: 2025-03-30 14:53:29
updated: 2025-04-07 12:06:43
excerpt: How to perform AI image generation with diffused CLI.
categories: ai image cli diffused diffusion huggingface
---

This post goes over how to perform AI image generation with [diffused](https://github.com/ai-action/diffused) CLI.

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

[Text-to-image](https://huggingface.co/docs/diffusers/using-diffusers/conditional_image_generation):

```sh
diffused segmind/tiny-sd "red apple"
```

[Image-to-image](https://huggingface.co/docs/diffusers/using-diffusers/img2img):

```sh
diffused OFA-Sys/small-stable-diffusion-v0 "cat wizard" --image=https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/cat.png
```

[Inpainting](https://huggingface.co/docs/diffusers/en/using-diffusers/inpaint):

```sh
diffused kandinsky-community/kandinsky-2-2-decoder-inpaint "black cat" --image=https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/inpaint.png --mask-image=https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/inpaint_mask.png
```

Show the help message and exit:

```sh
diffused --help # diffused -h
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

images = generate(model="segmind/tiny-sd", prompt="red apple")
images[0].save("apple.png")
```

Run the script:

```sh
python script.py
```

Open the image:

```sh
open apple.png
```

See the [API documentation](https://ai-action.github.io/diffused/diffused/generate.html).

## Resources

- For more models, see [Hugging Face](https://huggingface.co/models).
- The package is open source and on [GitHub](https://github.com/ai-action/diffused).
