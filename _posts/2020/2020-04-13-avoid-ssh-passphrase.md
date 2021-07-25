---
layout: post
title: Avoid SSH passphrase
date: 2020-04-13 20:27:17
updated: 2020-06-28 17:59:25
excerpt: How to avoid entering a passphrase when performing an SSH operation.
categories: ssh mac passphrase keychain git
---

<!--email_off-->

I recently upgraded my macOS but when I tried to perform an SSH operation, I was asked to enter a passphrase:

```sh
git pull
```

```
Enter passphrase for key '/Users/remarkablemark/.ssh/id_rsa':
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

I took the following steps to resolve this issue.

## Check SSH key

First, check if you have a key pair:

```sh
ls -a ~/.ssh/
```

If you don't see the following files:

```
id_rsa
id_rsa.pub
```

Then you'll need to generate a new SSH key.

## Generate SSH key

To [generate an SSH key](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key):

```sh
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
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

Since there are no keys, [add your key to the `ssh-agent`](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent) (hit _Enter_ when asked to enter a passphrase):

```sh
ssh-add -K ~/.ssh/id_rsa
```

```
Enter passphrase for /Users/remarkablemark/.ssh/id_rsa:
Identity added: /Users/remarkablemark/.ssh/id_rsa (/Users/remarkablemark/.ssh/id_rsa)
```

> The `-K` stores the passphrase in your keychain.

Now you should be able to perform SSH operations without being asked for a passphrase:

```sh
git pull
```

```
Already up to date.
```

## SSH config

To prevent having to enter a passphrase even after a restart, add the following to your SSH config file `~/.ssh/config`:

```
Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa
```

<!--/email_off-->
