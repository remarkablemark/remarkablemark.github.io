---
layout: post
title: Python subprocess
date: 2020-09-29 21:14:48
excerpt: How to execute a script written in another language using Python subprocess.
categories: python subprocess
---

How do you call a script written in another language in [Python](https://www.python.org/)?

You can use the [`subprocess`](https://docs.python.org/3/library/subprocess.html) module.

## Run

Let's say you have the bash script `hello_world.sh`:

```sh
echo Hello, world!
```

In your Python script, use [`subprocess.run`](https://docs.python.org/3/library/subprocess.html#subprocess.run):

```py
import subprocess

subprocess.run(["bash", "hello_world.sh"])
```

If `subprocess.run` isn't available (Python <3.5), use [`subprocess.call`](https://docs.python.org/3/library/subprocess.html#subprocess.call) instead:

```py
subprocess.call(["bash", "hello_world.sh"])
```

When you run your Python script in your command-line:

```sh
python main.py # Hello, world!
```

## Output

To get the output of the script, use [`subprocess.Popen`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen) to get the process:

```py
import subprocess

proc = subprocess.Popen("bash hello_world.sh", shell=True, stdout=subprocess.PIPE)
```

Then read stdout with [`Popen.communicate`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen.communicate):

```py
outs, errs = proc.communicate()
```

Alternatively, you can use [`stdout.read`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen.stdout):

```py
outs = proc.stdout.read()
```

Decode the binary and print the string:

```py
print(outs.decode("ascii"))
```

## Demo

[Repl.it](https://replit.com/@remarkablemark/Python-subprocess):

<iframe height="500px" width="100%" src="https://replit.com/@remarkablemark/Python-subprocess?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
