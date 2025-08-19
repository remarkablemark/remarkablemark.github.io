---
layout: post
title: How to set Cocoapods to a version
date: 2025-08-19 15:49:57
excerpt: How to install and uninstall Cocoapods so you set Cocoapods to a specific version on Mac.
categories: cocoapods
---

This post goes over how to set Cocoapods to a specific version:

- [List](#list)
- [Install](#install)
- [Uninstall](#uninstall)

## List

Display Cocoapods version:

```sh
pod --version
```

Check if you have multiple versions of Cocoapods installed:

```sh
gem list cocoapods
```

If you see something like:

```
*** LOCAL GEMS ***

cocoapods (1.16.2, 1.14.3, 1.11.3)
```

Then you might want to [delete](#uninstall) the other versions.

## Install

Install Cocoapods version `1.14.3`:

```sh
sudo gem install cocoapods -v 1.14.3
```

## Uninstall

Uninstall Cocoapods version:

```sh
sudo gem uninstall cocoapods
```
