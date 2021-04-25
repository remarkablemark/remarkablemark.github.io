---
layout: post
title: 'How to to use the "java" command-line tool on Mac'
date: 2021-04-25 18:18:18
excerpt: How to use the "java" command-line tool on macOS.
categories: java jdk mac brew
---

This post goes over how to use the "java" command-line tool on macOS.

## Problem

Apple's Java is a legacy version:

```sh
which java # /usr/bin/java
```

When you try to use `java` in the CLI:

```sh
$ java -version
```

You will get the pop-up:

```
To use the "java" command-line tool you need to install a JDK.
```

## Solution

Install [Java](https://support.apple.com/en-us/HT204036) with [Homebrew](https://brew.sh/):

```sh
brew install java
```

Once it's installed, look at `Caveats`:

```
==> Caveats
For the system Java wrappers to find this JDK, symlink it with
  sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk

openjdk is keg-only, which means it was not symlinked into /usr/local,
because macOS provides similar software and installing this software in
parallel can cause all kinds of trouble.

If you need to have openjdk first in your PATH, run:
  echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' >> ~/.zshrc

For compilers to find openjdk you may need to set:
  export CPPFLAGS="-I/usr/local/opt/openjdk/include"
```

You can either symlink the JDK with:

```sh
sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
```

Or export the openjdk first in your PATH:

```sh
echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' >> ~/.zshrc
```

> If you're not using ZSH, make sure to replace `~/.zshrc` with your shell configuration file.

Reload your shell profile:

```sh
source ~/.zshrc
```

Check the `java` binary and version:

```sh
which java # /usr/local/opt/openjdk/bin/java
java -version
```
