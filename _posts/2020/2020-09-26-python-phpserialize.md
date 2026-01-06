---
layout: post
title: Python unserialize PHP data
date: 2020-09-26 19:50:30
excerpt: How to unserialize PHP data in Python using phpserialize.
categories: python php phpserialize
---

Given a [serialized](https://www.php.net/manual/en/function.serialize.php) array:

```sh
php -r "echo serialize(['foo' => 'bar']);"
```

```
a:1:{s:3:"foo";s:3:"bar";}
```

And serialized object:

```sh
php -r "echo serialize((object) ['baz' => 'qux']);"
```

```
O:8:"stdClass":1:{s:3:"baz";s:3:"qux";}
```

You can [unserialize](https://www.php.net/manual/en/function.unserialize.php) the string data in Python using [phpserialize](https://pypi.org/project/phpserialize/).

## Unserialize Array

[phpserialize](https://pypi.org/project/phpserialize/) is a port of [`serialize`](https://www.php.net/manual/en/function.serialize.php) and [`unserialize`](https://www.php.net/manual/en/function.unserialize.php):

```py
from phpserialize import unserialize

data = b'a:1:{s:3:"foo";s:3:"bar";}'

output = unserialize(data)
print(output) # {b'foo': b'bar'}
print(output[b'foo']) # b'bar'
```

In Python 3, `phpserialize.unserialize` takes a binary argument instead of a string argument. This also means that the dictionary keys and string values are binaries as well.

To convert a string to binary, use [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes-objects) or string [`encode`](https://docs.python.org/3/library/stdtypes.html#str.encode):

```py
string_data = 'a:1:{s:3:"foo";s:3:"bar";}'

# bytes
binary_data = bytes(string_data, 'utf-8')

# string encode
binary_data = string_data.encode('utf-8')
```

To convert the dictionary keys and values from binary to its value:

```py
output = unserialize(binary_data)
output = {
    key.decode(): val.decode() if isinstance(val, bytes) else val
    for key, val in output.items()
}
print(output) # {'foo': 'bar'}
```

## Unserialize Object

If you want to unserialize a PHP object, you will need to pass an additional argument `object_hook` and set it to `phpserialize.phpobject`:

```py
from phpserialize import unserialize, phpobject

binary_data = b'O:8:"stdClass":1:{s:3:"baz";s:3:"qux";}'

print(unserialize(binary_data, object_hook=phpobject)) # {b'baz': b'qux'}
```

Afterwards, you'll want to convert the output to a dictionary and decode any binary values:

```py
output = output._asdict()
output = {
    key.decode(): val.decode() if isinstance(val, bytes) else val
    for key, val in output.items()
}
print(output) # {'baz': 'qux'}
```

## Demo

[Replit](https://replit.com/@remarkablemark/Python-phpserialize):

<iframe height="800px" width="100%" src="https://replit.com/@remarkablemark/Python-phpserialize?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
