---
layout: post
title: Check if Git head is dirty
date: 2017-10-12 20:15:17 -4000
excerpt: How to check if Git index is dirty or has changed or new files.
categories: git diff status bash cli
---

## git diff

If you want to check that files in the working tree or index are modified (and don't care about untracked files):

```sh
$ git diff HEAD
```

Then to check programmatically:

```sh
#!/usr/bin/bash

git diff --quiet HEAD || echo 'dirty'

# or
if [[ $(git diff --quiet HEAD) ]]; then
  echo 'dirty'
else
  echo 'clean'
fi
```

## git status

But what if you want to check for the presence of untracked files as well?

```sh
$ git status --short
```

For example, if you modified `README` and created `LICENSE`:

```sh
$ git status -s
M  README
?? LICENSE
```

And to check programmatically:

```sh
#!/usr/bin/bash

# if index has modified/untracked files
# `-z` tests if the string is null or empty
[[ -z $(git status -s) ]] || echo 'modified/untracked'

# if index is clean
# `-n` tests if the string is not empty
[[ -n $(git status -s) ]] || echo 'clean'
```

FYI, there's also a `--porcelain` option which formats the output like `--short`, but it's a high level command that's been known to be slow for larger repositories.
