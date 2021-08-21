---
layout: post
title: How to edit a Homebrew formulae
date: 2021-08-21 13:41:29
excerpt: How to edit a Homebrew formulae.
categories: brew
---

This post goes over how to edit a [Homebrew](https://brew.sh/) [formulae](https://formulae.brew.sh/).

## Upgrade

Upgrade formulae `<formulae>` to get the latest upstream:

```sh
brew upgrade <formulae>
```

If the formulae is up-to-date, you'll get the output:

```
Warning: <formulae> already installed
```

## Edit

Edit the formulae:

```sh
brew edit <formulae>
```

To edit the formulae with a different `EDITOR` like nano:

```sh
EDITOR=nano brew edit <formulae>
```

Then install the edited formulae:

```sh
brew upgrade <formulae>
```
