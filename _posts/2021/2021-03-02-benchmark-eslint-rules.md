---
layout: post
title: How to benchmark ESLint rules
date: 2021-03-02 20:14:12
excerpt: The performance of ESLint rules can be benchmarked by setting the environment variable `TIMING=1`.
categories: eslint benchmark performance npx npm yarn
---

Sometimes [ESLint](https://eslint.org/) can take a while a run, especially if you have a lot of rules and files. So how do you benchmark how long each rule takes?

With the environment variable [`TIMING`](https://eslint.org/docs/1.0.0/developer-guide/working-with-rules#per-rule-performance), ESLint tracks the performance of individual rules.

So instead of running ESLint like:

```sh
$ npx eslint ./lib/
```

Prepend the command with `TIMING=1`:

```sh
$ TIMING=1 npx eslint ./lib/
Rule                    | Time (ms) | Relative
:-----------------------|----------:|--------:
prettier/prettier       |   136.659 |    92.4%
no-unused-vars          |     2.139 |     1.4%
no-redeclare            |     1.780 |     1.2%
no-unexpected-multiline |     0.789 |     0.5%
no-global-assign        |     0.630 |     0.4%
constructor-super       |     0.369 |     0.2%
no-unsafe-finally       |     0.323 |     0.2%
no-unreachable          |     0.319 |     0.2%
no-self-assign          |     0.311 |     0.2%
no-dupe-else-if         |     0.291 |     0.2%
```

With [Yarn](https://yarnpkg.com/), you can get the total time elapsed:

```sh
$ TIMING=1 yarn eslint ./lib/
yarn run v1.22.10
$ /Users/mark/html-react-parser/node_modules/.bin/eslint ./lib/
Rule                    | Time (ms) | Relative
:-----------------------|----------:|--------:
prettier/prettier       |   140.710 |    92.2%
no-unused-vars          |     2.573 |     1.7%
no-redeclare            |     1.748 |     1.1%
no-unexpected-multiline |     0.845 |     0.6%
no-global-assign        |     0.769 |     0.5%
constructor-super       |     0.377 |     0.2%
no-unreachable          |     0.333 |     0.2%
no-unsafe-finally       |     0.329 |     0.2%
no-dupe-else-if         |     0.287 |     0.2%
no-this-before-super    |     0.283 |     0.2%
✨  Done in 0.81s.
```
