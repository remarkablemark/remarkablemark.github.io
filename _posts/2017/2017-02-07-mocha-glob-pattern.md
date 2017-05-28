---
layout: post
title: Mocha glob pattern
date: 2017-02-07 21:09:00 -4000
excerpt: How to specify a glob pattern for Mocha tests.
categories: mocha glob test
---

[Mocha](https://mochajs.org) by default looks for test files in the `./test/` directory:

```sh
$ tree
.
0 directories, 0 files

$ mocha
Error: cannot resolve path (or pattern) 'test'
```

If you have test files in _subdirectories_, you'll need to pass the **recursive** flag:

```sh
$ mocha --recursive
```

So what if you want to specify tests in a different directory?

You can pass the directory as a CLI argument:

```sh
$ mocha another/directory
```

And what about running tests on all files similar to `test/foo.spec.js` and `test/bar.spec.js`?

Easy! Use a glob pattern:

```sh
$ mocha "./test/*.spec.js"

# recurse through all nested directories
$ mocha "./test/**/*.spec.js"
```

Now what if you want to run tests in all files in the default directory except for `exclude.js`?

You will need to use this glob pattern:

```sh
$ mocha "./test/**/!(exclude).js"
```

Finally, if you want to match all files in the current directory with the `*.spec.js` pattern but ignore `node_modules` directory, you can do this:

```sh
$ mocha "./{,!(node_modules)/**/}*.spec.js"
```

For more information on globs, check out [glob-primer](https://github.com/isaacs/node-glob#glob-primer).
