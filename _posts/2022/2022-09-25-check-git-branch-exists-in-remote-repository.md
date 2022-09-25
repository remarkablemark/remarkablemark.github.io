---
layout: post
title: Check if a Git branch exists in remote
date: 2022-09-25 15:38:55
excerpt: How to check if a Git branch exists in the remote repository.
categories: git branch remote bash
---

Use [`git ls-remote`](https://git-scm.com/docs/git-ls-remote.html) to list references in a remote repository:

```sh
git ls-remote
```

Check if `$BRANCH` exists in origin remote:

```sh
git ls-remote origin $BRANCH
```

Use `--heads` to limit to only `refs/heads`:

```sh
git ls-remote --heads origin $BRANCH
```

Use `--exit-code` to exit with status `2` when no matching refs are found in the remote repository:

```sh
git ls-remote --exit-code --heads origin $BRANCH
echo $?
```

Thus, to check if variable `$BRANCH` exists in the remote repository:

```bash
#!/bin/bash

BRANCH='my-branch-name'
git ls-remote --exit-code --heads origin $BRANCH >/dev/null 2>&1
EXIT_CODE=$?

if [[ $EXIT_CODE == '0' ]]; then
  echo "Git branch '$BRANCH' exists in the remote repository"
elif [[ $EXIT_CODE == '2' ]]; then
  echo "Git branch '$BRANCH' does not exist in the remote repository"
fi
```
