---
layout: post
title: How to add Flow header to JavaScript files
date: 2022-03-05 14:28:01
excerpt: How to add Flow header (// @flow) to JavaScript files
categories: flow javascript bash
---

> **TL;DR**: Add Flow header to all JavaScript files:
>
> ```sh
> git grep -L '// @flow' -- **/*.js | xargs sed -i '' '1s|^|// @flow\n\n|'
> ```

This article goes over how to add [Flow](https://flow.org/) header `// @flow` to JavaScript files.

## Find files

Find files without `// @flow` in a Git repository:

```sh
git grep -L '// @flow' -- **/*.js
```

To search in the `src` directory:

```sh
git grep -L '// @flow' -- src/**/*.js
```

## Insert header

Prepend `// @flow` to `file.js`:

```sh
sed -i '' '1s|^|// @flow\n\n|' file.js
```

Prepend `// @flow` to files without Flow header:

```sh
git grep -L '// @flow' -- src/**/*.js | xargs sed -i '' '1s|^|// @flow\n\n|'
```
