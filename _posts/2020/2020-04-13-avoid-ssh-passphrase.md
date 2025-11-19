---
layout: post
title: Avoid SSH passphrase for Git
date: 2020-04-13 20:27:17
updated: 2025-11-18 19:41:07
excerpt: How to avoid entering a passphrase when performing an SSH operation with Git on macOS.
categories: ssh mac passphrase keychain git
---

- [Problem](#problem)
- [Check SSH key](#check-ssh-key)
- [Generate SSH key](#generate-ssh-key)
- [Add SSH key to agent](#add-ssh-key-to-agent)
- [SSH config](#ssh-config)
- [Check SSH connection](#check-ssh-connection)

<!--email_off-->

## Problem

I was denied access after running the Git command on a repository I owned:

```sh
git pull
```

```
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

This turned out to be an SSH issue so I took the following steps to fix it.

## Check SSH key

First, I checked if I had a valid SSH key pair:

```sh
ls -a ~/.ssh/
```

I didn't see the following:

```
id_ed25519
id_ed25519.pub
```

So I had to generate a new SSH key.

## Generate SSH key

To [generate an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key):

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

## Add SSH key to agent

Start the `ssh-agent` if it's not running already:

```sh
eval $(ssh-agent -s)
```

```
Agent pid 5451
```

The `ssh-agent` manages your keys so check if it's there:

```sh
ssh-add -l
```

```
The agent has no identities.
```

Since there are no keys, [add your key to the `ssh-agent`](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent) (hit **Enter** when asked to enter a passphrase):

```sh
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

```
Identity added: /Users/remarkablemark/.ssh/id_ed25519 (your_email@example.com)
```

Then [add your new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

Now you should be able to perform SSH operations without being asked for a passphrase:

```sh
git pull
```

```
Already up to date.
```

## SSH config

To prevent having to enter a passphrase after restart, add the following to your SSH config file `~/.ssh/config`:

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

Or run this command:

```bash
cat > ~/.ssh/config << EOF
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
EOF
```

## Check SSH connection

Check your SSH connection with GitHub:

```sh
ssh -vT git@github.com
```

You should see:

```
Hi remarkablemark! You've successfully authenticated, but GitHub does not provide shell access.
```

<!--/email_off-->
