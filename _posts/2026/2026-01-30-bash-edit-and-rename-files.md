---
layout: post
title: Bash edit and rename files
date: 2026-01-30 12:50:55
excerpt: How to edit and rename files with Bash.
categories: bash
---

This post goes over how to edit and rename files with Bash.

## Edit files

Replace strings in files in a directory:

```sh
find <DIRECTORY> -type f -exec perl -i -pe 's/<MATCH>/<REPLACE>/g' {} +
```

For example, to replace files with the string `.d.ts` with `.d.mts` in the `./esm/` directory:

```sh
find ./esm/ -type f -exec perl -i -pe 's/\.d\.ts/\.d\.mts/g' {} +
```

> The backslash `\` escapes the period `.`.

## Rename files

Replace strings in files in a directory:

```sh
find <DIRECTORY> -type f -name '<MATCH>' -exec bash -c 'mv "$1" "<REPLACE>"' _ {} \;
```

For example, to rename files that end with `.d.ts` to `.d.mts` in the `./esm/` directory:

```sh
find ./esm/ -type f -name '*.d.ts' -exec bash -c 'mv "$1" "${1%.d.ts}.d.mts"' _ {} \;
```
