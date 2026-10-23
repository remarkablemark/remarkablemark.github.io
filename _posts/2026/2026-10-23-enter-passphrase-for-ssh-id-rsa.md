---
layout: post
title: Enter passphrase for "/Users/user/.ssh/id_rsa"
date: 2026-10-23 18:55:04
excerpt: How to fix 'Enter passphrase for "/Users/user/.ssh/id_rsa"'.
categories: macos ssh apple keychain passphrase
---

If you're getting prompted:

```
Enter passphrase for "/Users/user/.ssh/id_rsa":
```

That means SSH is asking for the passphrase you set when creating the private key.

To avoid entering it every time, add the key to your agent and Keychain:

```sh
ssh-add --apple-use-keychain ~/.ssh/id_rsa
```

If you're still getting prompted, add this to your `~/.ssh/config`:

```
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_rsa
```
