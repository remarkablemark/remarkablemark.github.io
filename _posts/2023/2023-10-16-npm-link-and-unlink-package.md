---
layout: post
title: npm link and unlink package
date: 2023-10-16 20:12:45
excerpt: How to link and unlink package with npm.
categories: npm package link unlink
---

This post goes over how to [link](https://docs.npmjs.com/cli/v10/commands/npm-link) and unlink npm packages.

## Prerequisites

Assuming you have 2 packages:

1. `pkg-a`
2. `pkg-b`

## npm link

Go to your package directory that contains `package.json`:

```sh
cd path/to/pkg-a
```

Create a global symlink:

```sh
npm link
```

Verify that the global link is created:

```sh
npm ls --global --depth=0
```

You should see something like:

```sh
/Users/remarkablemark/.nvm/versions/node/v18.18.1/lib
├── pkg-a@1.0.0 -> ./../../../../../pkg-a
└── npm@9.8.1
```

## npm link <package>

Go to another package directory:

```sh
cd path/to/pkg-b
```

Link install package `pkg-a`:

```sh
npm link pkg-a
```

Verify the package is installed:

```sh
npm ls pkg-a
```

You should see something like:

```sh
pkg-b@ /path/to/pkg-b
└── pkg-a@1.0.0 -> ./../pkg-a
```

## npm unlink

Given you're still in package `pkg-b` directory:

```sh
cd path/to/pkg-b
```

Unlink package `pkg-a`:

```sh
npm unlink pkg-a
```

Go to package `pkg-a` directory:

```sh
cd path/to/pkg-a
```

Unlink the package globally:

```sh
npm unlink --global
```

Verify the global package is unlinked:

```sh
npm ls -g pkg-a
```

You should see the following:

```
/Users/remarkablemark/.nvm/versions/node/v18.18.1/lib
└── (empty)
```
