---
layout: post
title: Including files in npm publish
date: 2017-09-23 20:36:38 -4000
excerpt: How to include and exclude files during npm publish.
categories: npm publish
---

npm looks at [`.gitignore`](https://git-scm.com/docs/gitignore) to figure out what files/directories to blacklist when a [package is being published](https://docs.npmjs.com/getting-started/publishing-npm-packages) to the registry.

But what if there are files/directories specified in `.gitignore` that you want to include in the publish?

```
# .gitignore
dist/
build/
```

You can whitelist the directories (as well as any other files) in `package.json`:

```json
{
  "files": [
    "dist/",
    "build/"
  ]
}
```

Alternatively, you can create an empty [`.npmignore`](https://docs.npmjs.com/misc/developers) because it takes precedence over `.gitignore`:

```sh
$ touch .npmignore
```
