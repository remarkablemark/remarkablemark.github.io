---
layout: post
title: Managing Git remotes
date: 2020-10-25 16:14:23
excerpt: How to manage multiple git remote repositories.
categories: git remote repository cli
---

This post goes over how to manage [Git](https://git-scm.com/) remotes using [Bitbucket](https://bitbucket.org/) as an example.

<!--email_off-->

## Add remote

To track a local repository to a [remote repository](https://docs.github.com/en/free-pro-team@latest/github/using-git/about-remote-repositories):

```sh
git remote add origin git@bitbucket.org:user/repo.git
```

> Here, the username is `user`, the repository name is `repo`, the remote repository is `bitbucket.org`, and the remote name is `origin`.

Set `master` as the upstream branch:

```sh
git push -u origin master
```

## Show remote

To show the remote name and URL:

```sh
git remote -v
```

```
origin  git@bitbucket.org:user/repo.git (fetch)
origin  git@bitbucket.org:user/repo.git (push)
```

What if you want to add a new remote and replace it as `origin`? You can rename the current remote and add a new remote.

## Rename remote

To [rename the remote](https://docs.github.com/en/free-pro-team@latest/github/using-git/renaming-a-remote):

```sh
git remote rename origin bitbucket
```

> Here, we renamed `origin` to `bitbucket`.

Then add remote `origin` again and point it to [GitHub](https://github.com/):

```sh
git remote add origin git@github.com:user/repo.git
```

```sh
git push -u
```

Now when you show remote:

```sh
git remote -v
```

```
bitbucket git@bitbucket.org:user/repo.git (fetch)
bitbucket git@bitbucket.org:user/repo.git (push)
origin  git@github.com:user/repo.git (fetch)
origin  git@github.com:user/repo.git (push)
```

You see there's `bitbucket` and `origin`.

## Fetch, pull, push

When you `fetch`, `pull`, and `push`, you're doing it against the default, which is `origin`:

```sh
git fetch # git fetch origin
```

```sh
git pull # git pull origin
```

```sh
git push # git push origin
```

To `fetch`, `pull`, and `push` to Bitbucket, you can specify the `bitbucket` remote:

```sh
git fetch bitbucket
```

```sh
git pull bitbucket
```

```sh
git push bitbucket
```

## Remove remote

To [remove](https://docs.github.com/en/free-pro-team@latest/github/using-git/removing-a-remote) the `bitbucket` remote:

```sh
git remote rm bitbucket
```

## Change remote URL

To [change the remote's URL](https://docs.github.com/en/free-pro-team@latest/github/using-git/changing-a-remotes-url):

```sh
git remote set-url origin git@bitbucket.org:user/repo.git
```

> Here, we're setting the URL of `origin` back to Bitbucket.

<!--/email_off-->
