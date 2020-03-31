---
layout: post
title: Minikube HyperKit error
date: 2020-03-30 20:20:30
excerpt: How to resolve minikube error where "hyperkit" executable was not found.
categories: minikube hyperkit bash
---

Recently, I had trouble starting [`minikube`](https://minikube.sigs.k8s.io/). When I ran the start command:

```sh
$ minikube start
```

I got the error:

```
Starting minikube. This can take a long time.
* minikube v1.6.2 on Darwin 10.14.6
* Selecting 'hyperkit' driver from existing profile (alternates: [virtualbox])

! 'hyperkit' driver reported an issue: exec: "hyperkit": executable file not found in $PATH
* Suggestion: Run 'brew install hyperkit'
* Documentation: https://minikube.sigs.k8s.io/docs/reference/drivers/hyperkit/

X hyperkit does not appear to be installed, but is specified by an existing profile. Please run 'minikube delete' or install hyperkit
```

I verified that [`hyperkit`](https://github.com/moby/hyperkit) was installed with [brew](https://brew.sh/):

```sh
$ brew list hyperkit
/usr/local/Cellar/hyperkit/0.20200224/bin/hyperkit
/usr/local/Cellar/hyperkit/0.20200224/share/man/man1/hyperkit.1
```

So the issue was that the `hyperkit` binary wasn't available in `$PATH`:

```sh
$ which hyperkit
hyperkit not found
```

This means we have 2 ways of resolving this:

1. we can either [symlink the binary](#symlink-binary) so it's available in `/usr/local/bin/`
2. or [add the binary to `$PATH`](#add-to-path)

## Symlink binary

To symlink the `hyperkit` binary so it's available in `/usr/local/bin/`:

```sh
$ ln -sf $(brew --prefix hyperkit)/bin/hyperkit /usr/local/bin/hyperkit
```

The `hyperkit` binary should now be available:

```sh
$ which hyperkit
/usr/local/bin/hyperkit
```

## Add to \$PATH

To include the `hyperkit` binary in `$PATH`, you need to append the following line to your `.bashrc` or `.zshrc`:

```sh
$ echo 'export PATH=$(brew --prefix hyperkit)/bin:$PATH' >> .bashrc
```

This means the last line of your `.bashrc` or `.zshrc` is:

```sh
$ tail -1 ~/.bashrc
export PATH=$(brew --prefix hyperkit)/bin:$PATH
```

Reload your shell by sourcing `.bashrc` or `.zshrc`:

```sh
$ source ~/.bashrc
```

And verify that the `hyperkit` binary is there:

```sh
$ which hyperkit
/usr/local/opt/hyperkit/bin/hyperkit
```
