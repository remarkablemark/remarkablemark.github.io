---
layout: post
title: GitHub Actions zip directory
date: 2025-12-29 19:44:23
excerpt: How to zip and archive a directory with GitHub Actions.
categories: zip github actions
---

This post goes over how to zip a directory with GitHub Actions:

- [POSIX](#posix)
- [Windows](#windows)
- [All](#all)

## POSIX

To archive a folder `build` in GitHub Actions for Ubuntu/macOS:

```yml
- run: cd build && zip -r my_archive.zip .
```

> Changing the directory removes the extra folder when zipping the contents.

Alternatively, you can replace `cd` with [`working-directory`](https://docs.github.com/actions/how-tos/write-workflows/choose-what-workflows-do/set-default-values-for-jobs#setting-default-shell-and-working-directory):

```yml
- run: zip -r my_archive.zip .
  working-directory: build
```

## Windows

On Windows, the `zip` command is unavailable, but [7-Zip](https://www.7-zip.org/) is available:

```yml
- run: 7z a -r my_archive.zip ./*
  working-directory: build
```

## All

A step that works on all runners (Linux, macOS, and Windows):

```yml
- working-directory: build
  shell: bash
  run: |
    if [[ $RUNNER_OS == 'Windows' ]]; then
      7z a -r my_archive.zip ./*
    else
      zip -r my_archive.zip .
    fi
```

See [example](https://github.com/remarkablemark/github-actions-workflows/blob/master/.github/workflows/zip.yml).
