---
layout: post
title: Python generate a random word or letter
date: 2021-12-05 16:21:11
excerpt: How to generate a random word or letter in Python.
categories: python
---

This post goes over how to generate a [random word](https://pypi.org/project/Random-Word/) or letter in Python.

## Random Word

### Install

Install [random-word](https://pypi.org/project/Random-Word/) and [PyYaml](https://pypi.org/project/PyYAML/):

```sh
pip3 install random-word pyyaml
```

[PyYaml](https://pypi.org/project/PyYAML/) is required or else you'll get the error:

```
ModuleNotFoundError: No module named 'yaml'
```

### Usage

Generate a random word:

```py
from random_word import RandomWords

random_words = RandomWords()
print(random_words.get_random_word())
```

See the [package documentation](https://pypi.org/project/Random-Word/) for more information.

## Random Letter

Get a random letter from the alphabet:

```py
from string import ascii_lowercase
from random import randrange

print(ascii_lowercase[randrange(len(ascii_lowercase))])
```
