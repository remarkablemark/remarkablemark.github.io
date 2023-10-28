---
layout: post
title: How to set up Lerna with Yarn workspaces
date: 2021-09-18 13:14:12
excerpt: How to set up a Lerna monorepo with Yarn workspaces.
categories: lerna yarn
---

This post goes over how to set up a [Lerna](https://lerna.js.org/) monorepo with [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

## Lerna

Create a new Lerna monorepo with [`lerna init`](https://github.com/lerna/lerna/tree/v6/libs/commands/init#readme):

```sh
npx lerna init
```

Initialized Lerna files should look like:

```sh
tree
.
├── lerna.json
├── package.json
└── packages

1 directory, 2 files
```

_Optional_: To enable independent versioning mode in `lerna.json`:

```diff
 {
   "packages": ["packages/*"],
-  "version": "0.0.0"
+  "version": "independent"
 }
```

## Yarn

Enable Yarn workspaces in [`package.json`](https://classic.yarnpkg.com/en/docs/workspaces/#toc-how-to-use-it):

```diff
 {
   "name": "root",
   "private": true,
+  "workspaces": ["packages/*"],
   "devDependencies": {
     "lerna": "^4.0.0"
   }
 }
```

Then add `npmClient` and `useWorkspaces` to `lerna.json`:

```diff
 {
+  "npmClient": "yarn",
+  "useWorkspaces": true,
   "packages": ["packages/*"],
   "version": "independent"
 }
```

Now when you run `yarn install`, Lerna [bootstraps](https://github.com/lerna/lerna/tree/v6/libs/commands/bootstrap#readme) and [hoists](https://github.com/lerna/lerna/blob/v6/doc/hoist.md) node modules to the project root directory:

```sh
yarn
```

This means that `devDependencies` shared across packages can be saved to the project root `package.json`:

```sh
yarn add --dev eslint -W
```

## Resources

Check out the example repository [lerna-template](https://github.com/remarkablemark/lerna-template).
