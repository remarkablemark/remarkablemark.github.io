---
layout: post
title: How to generate a random word or letter in Python
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

### Demo

[Replit](https://replit.com/@remarkablemark/random-word):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/random-word?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Random Letter

Get a random letter from the alphabet:

```py
from string import ascii_lowercase
from random import randrange

print(ascii_lowercase[randrange(len(ascii_lowercase))])
```

### Demo

[Replit](https://replit.com/@remarkablemark/random-alphabet-letter):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/random-alphabet-letter?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
