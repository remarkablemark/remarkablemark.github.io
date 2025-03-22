---
layout: post
title: How to run Hugging Face stable-diffusion on Mac
date: 2025-03-21 20:02:56
excerpt: How to run Hugging Face stable-diffusion AI model on macOS.
categories: hugging face ai stable diffusion model mac python
---

This post goes over how to run [Hugging Face](https://huggingface.co/) stable-diffusion AI model on macOS.

## Prerequisites

Install [Python](https://www.python.org/):

```sh
brew install python
```

Create the [virtualenv](https://docs.python.org/library/venv.html):

```sh
python3 -m venv .venv
```

Activate the virtualenv:

```sh
source .venv/bin/activate
```

Install the dependencies:

```sh
pip3 install accelerate diffusers torch transformers
```

## Text-to-Image

Create a script to generate [text-to-image](https://huggingface.co/docs/diffusers/main/tutorials/autopipeline?autopipeline=text-to-image):

```sh
touch text_to_image.py
```

Import the `diffusers` module:

```py
from diffusers import AutoPipelineForText2Image
```

Create a pipeline using the [dreamlike-art/dreamlike-photoreal-2.0](https://hf.co/dreamlike-art/dreamlike-photoreal-2.0) checkpoint:

```py
model = "dreamlike-art/dreamlike-photoreal-2.0"
pipeline = AutoPipelineForText2Image.from_pretrained(model)
```

Pass the prompt to the pipeline and generate the image:

```py
prompt = "cinematic photo of Godzilla eating sushi with a cat in a izakaya, 35mm photograph, film, professional, 4k, highly detailed"
image = pipeline(prompt).images[0]
```

[Save the image](https://pillow.readthedocs.io/en/stable/reference/Image.html#PIL.Image.Image.save):

```py
image.save("my_image.png")
```

Run the script:

```sh
python3 text_to_image.py
```

## Code

Here's the full script:

```py
from diffusers import AutoPipelineForText2Image

model = "dreamlike-art/dreamlike-photoreal-2.0"
pipeline = AutoPipelineForText2Image.from_pretrained(model)

prompt = "cinematic photo of Godzilla eating sushi with a cat in a izakaya, 35mm photograph, film, professional, 4k, highly detailed"
image = pipeline(prompt).images[0]

image.save("my_image.png")
```

See the [GitHub demo](https://github.com/ai-action/hugging-face-diffusers-demo).
