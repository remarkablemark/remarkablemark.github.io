---
layout: post
title: Bash prompt
date: 2020-10-30 21:09:43
updated: 2020-10-30 21:15:04
excerpt: How to prompt user input and read it in Bash.
categories: bash
---

## Read

Prompt user in [Bash](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>):

```sh
echo -n 'Yes or no? [Y/n]: '
read input
```

## Control Flow

Print `no` when input begins with `n`:

```sh
if [[ $input =~ 'n' ]]; then
  echo 'no'
fi
```

Print `Yes` when input does not begin with `n`:

```sh
if ! [[ $input =~ 'n' ]]; then
  echo 'Yes'
fi
```

[Control flow](https://en.wikipedia.org/wiki/Control_flow) that handles both `Yes` and `no` cases:

```sh
if ! [[ $input =~ 'n' ]]; then
  echo 'Yes'
else
  echo 'no'
fi
```

## Script

Here's the full script:

```sh
echo -n 'Yes or no? [Y/n]: '
read input

if ! [[ $input =~ 'n' ]]; then
  echo 'Yes'
else
  echo 'no'
fi
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/Bash-prompt):

<iframe height="500px" width="100%" src="https://repl.it/@remarkablemark/Bash-prompt?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
