---
layout: post
title: How to migrate from husky 8 to 9
date: 2024-02-04 18:38:59
excerpt: How to migrate from husky 8 to 9.
categories: husky migration
---

This post goes over how to migrate from [husky](https://typicode.github.io/husky/) 8 to 9.

## husky install

Upgrade husky to 9 in `package.json`:

```sh
npm install --save-dev husky@9
```

After running install, you might see the warning:

```
install command is deprecated
```

The fix is to replace `postinstall` with `prepare`:

```diff
-    "postinstall": "husky install",
+    "prepare": "husky",
```

## pinst

If you're using [pinst](https://www.npmjs.com/package/pinst), remove it from your scripts and devDependencies:

```diff
-    "postpublish": "pinst --enable",
-    "prepublishOnly": "pinst --disable && npm run build",
+    "prepublishOnly": "npm run build",
```

```diff
-    "pinst": "3.0.0",
```

Then run `npm install` so `hasInstallScript` is removed from your `package-lock.json`:

```sh
npm install
```

## .husky

Remove `.husky/.gitignore` if it's present:

```sh
rm .husky/.gitignore
```

Remove the shebang and husky script at the top of your hooks:

```diff
-#!/usr/bin/env sh
-. "$(dirname -- "$0")/_/husky.sh"
```

Commit your changes and verify your hooks are still working:

```sh
git add . && git commit -v
```

Check out [husky's v9 release notes](https://github.com/typicode/husky/releases/tag/v9.0.1) for more information.
