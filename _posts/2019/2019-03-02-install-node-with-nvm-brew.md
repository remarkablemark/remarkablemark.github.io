---
layout: post
title: Install node with nvm then brew
date: 2019-03-02 20:33:46
excerpt: Install Node.js binary with nvm and then homebrew.
categories: nodejs node nvm homebrew brew bash
---

Install [Node.js](https://nodejs.org/) first with [nvm](https://github.com/creationix/nvm) (a _node version manager_ like [n](https://github.com/tj/n)):

```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
$ source ~/.zshrc # ~/.bashrc
$ nvm install node@8
```

The node binary can be found at:

```sh
$ which node # command -v node
$NVM_DIR/versions/node/v8.15.0/bin/node
```

Now install Node.js with [homebrew](https://brew.sh/):

```sh
$ brew install node@8
$ brew link node@8 --overwrite --force
```

However, the default node binary is still coming from nvm:

```sh
$ nvm ls
-> v8.15.0
    system
```

To use the node binary installed by brew, you'll need to pass the `--no-use` option to the nvm startup script:

```diff
# edit line in your shell configuration (e.g., ~/.zshrc or ~/.bashrc)
-[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
+[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use  # This loads nvm
```

To verify that you're using the brew installed node binary:

```sh
$ nvm ls
   v8.15.0
->  system
```

```sh
$ which node
/usr/local/bin/node
```

A nice benefit is that this speeds up the time for [shell session creation](https://github.com/creationix/nvm/issues/539#issuecomment-236826475).
