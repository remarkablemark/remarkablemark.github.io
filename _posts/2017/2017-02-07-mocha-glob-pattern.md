---
layout: post
title: Mocha glob pattern
date: 2017-02-07 21:09:00
excerpt: How to specify a glob pattern for Mocha tests.
categories: mocha glob test
---

By default, [mocha](https://mochajs.org) looks for files in the `test` directory:

```sh
tree
.
0 directories, 0 files
```

```sh
mocha
Error: cannot resolve path (or pattern) 'test'
```

If you have files in subdirectories of `test`, you'll need to pass the **recursive** flag:

```sh
mocha --recursive
```

What if you want to specify tests in a different directory?

You can pass the directory as a CLI argument:

```sh
mocha another/directory
```

## Glob

Now what if you want to match files like `test/foo.spec.js` and `test/bar.spec.js`?

Easy! Use a glob expression:

```sh
mocha 'test/*.spec.js'
```

And if you need to recurse through all nested directories:

```sh
mocha 'test/**/*.spec.js'
```

But what if you want to match all files in `test` except for `exclude.js`?

You'll need to negate the filename in the pattern:

```sh
mocha 'test/**/!(exclude).js'
```

Finally, if you need to ignore `node_modules` and match files like `baz.spec.js` and `qux.spec.js` in the project root:

```sh
mocha '{,!(node_modules)/**/}*.spec.js'
```

For more information on globs, check out [glob-primer](https://github.com/isaacs/node-glob#glob-primer).
