---
layout: post
title: How to deprecate an npm package version
date: 2026-08-05 15:10:54
excerpt: How to deprecate or unpublish a version of an npm package.
categories: npm package version deprecate unpublish
---

This post covers how to deprecate or unpublish a version of an npm package.

## Deprecate version

Deprecate a version of your package with [`npm deprecate`](https://docs.npmjs.com/cli/commands/npm-deprecate):

```
npm deprecate <package>@<version> <message>
```

For example:

```sh
npm deprecate my-package@1.2.3 "Yanked: no longer valid"
```

This marks the version as deprecated so npm will warn users when it's installed without deleting it from the registry.

## Unpublish version

If you want to take the nuclear option, you can remove the tarball from the registry with [`npm unpublish`](https://docs.npmjs.com/cli/commands/npm-unpublish):

```
npm unpublish <package>@<version>
```

For example:

```sh
npm unpublish my-package@1.2.3
```

However, this may be blocked depending on npm's deletion rules (e.g., if the version is too old or has dependents).
