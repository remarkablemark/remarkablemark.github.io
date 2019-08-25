---
layout: post
title: 'npm publish: include or exclude files'
date: 2017-09-23 20:36:38
updated: 2019-08-25 14:16:02
excerpt: How to include (whitelist) or exclude (blacklist) files/directories during npm publish.
categories: npm publish git
---

## .gitignore

By default, [`.gitignore`](https://git-scm.com/docs/gitignore) is used to determine what gets _blacklisted_ during [npm publish](https://docs.npmjs.com/cli/publish).

```
# .gitignore
dist/
.env*
```

## .npmignore

But if [`.npmignore`](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package) exists, then it takes _precedence_ over `.gitignore`:

```
# .npmignore
dist/
```

> **Note**: Do make sure all ignored files are included. Otherwise, you may [accidentally publish things you did not intend](https://medium.com/@jdxcode/for-the-love-of-god-dont-use-npmignore-f93c08909d8d).

In the example above, `.env*` is in `.gitignore` but not in `.npmignore`. This means files matching the `.env*` pattern _will_ get published.

## files

Ultimately, it's better to _whitelist_ what gets published with `package.json`'s [files](https://docs.npmjs.com/files/package.json#files):

```json
{
  "files": ["index.js", "/lib"]
}
```

## test

To check what gets published, a local [tarball can be generated](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package#testing-whether-your-npmignore-or-files-config-works):

```sh
$ npm pack
```
