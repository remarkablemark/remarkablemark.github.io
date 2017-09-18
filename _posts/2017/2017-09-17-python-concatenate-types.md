---
layout: post
title: Concatenating different types in Python
date: 2017-09-17 21:17:38 -4000
excerpt: How to concatenate different types in Python.
categories: python concatenate types
---

When trying to concatenate a string and a number in [Python](https://www.python.org):

```py
answer = 42
print('The answer to life is ' + answer)
```

You'll receive one of the following errors:

```
# python2
TypeError: cannot concatenate 'str' and 'int' objects

# python3
TypeError: Can't convert 'int' object to str implicitly
```

Fortunately, there are several ways to concatenate different types.

### Cast to string

One approach is to convert the non-string to a string:

```py
answer = 42
print('The answer to life is ' + str(answer))
```

### Interpolation

Another approach is to use interpolation:

```py
answer = 42
print('The answer to life is %d' % (answer))
```

The `%d` in this example stands for digit.

### String format

The `format()` method is also useful:

```py
answer = 42
print('The answer to life is {}'.format(answer))
```

### f-string

If you're using Python 3.6 or greater, you can use [f-string](https://www.python.org/dev/peps/pep-0498/):

```py
answer = 42
print(f'The answer to life is {answer}')
```
