---
layout: post
title: Python venv
date: 2020-09-25 20:31:19
excerpt: How to create a virtual environment with Python 3 venv.
categories: python pip venv virtual environment
---

## Create

Create Python 3 [virtual environment](https://docs.python.org/3/library/venv.html):

```sh
$ python3 -m venv <myenv>
```

For example, you can create a virtual environment directory named `venv`:

```sh
$ python3 -m venv venv
```

## Activate

Activate your virtual environment:

```sh
$ source <myenv>/bin/activate
```

Verify your python and pip binaries:

```sh
$ which python
path/to/venv/bin/python
$ which pip
path/to/venv/bin/pip
```

## Install

Install from `requirements.txt`:

```sh
$ pip install -r requirements.txt
```

Install package `black`:

```sh
$ pip install black
```

Save dependencies to `requirements.txt`:

```sh
$ pip freeze > requirements.txt
```

## Deactivate

Deactivate your virtual environment:

```sh
$ deactivate
```

## Git

Append your virtual environment directory to `.gitignore`:

```sh
$ echo <myenv> >> .gitignore
```
