---
layout: post
title: Python dotenv
date: 2020-11-11 19:39:08
excerpt: How to load a .env file using python-dotenv.
categories: python dotenv
---

Install [python-dotenv](https://pypi.org/project/python-dotenv/) with [pip](https://pypi.org/project/pip/):

```sh
$ pip install python-dotenv
```

Set environment variable in `.env` file:

```sh
$ echo 'KEY=VALUE' > .env
```

Create `script.py`:

```sh
$ touch script.py
```

Find and load `.env`:

```py
# script.py
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())
```

Get the the environment variable value using [`os.environ`](https://docs.python.org/3/library/os.html#os.environ):

```py
# script.py
from os import environ

print(environ.get("KEY"))
```

> The environment variable value is type `str`.

Run Python script:

```sh
$ python script.py
VALUE
```

## Script

The full Python script:

```py
# script.py
from os import environ
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

print(environ.get("KEY"))
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/Python-dotenv):

<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/Python-dotenv?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
