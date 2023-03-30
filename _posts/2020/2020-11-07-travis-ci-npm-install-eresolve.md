---
layout: post
title: 'Travis CI: npm install ERESOLVE'
date: 2020-11-07 21:03:15
updated: 2020-11-28 15:18:12
excerpt: How to fix Travis CI build error when npm install fails due to "ERESOLVE unable to resolve dependency tree".
categories: travis ci build npm error
---

<!--email_off-->

## Travis CI

I received an npm install error for my Travis CI build after upgrading my dependencies:

```sh
npm install
```

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! Found: @rollup/plugin-typescript@2.1.0
npm ERR! node_modules/@rollup/plugin-typescript
npm ERR!   dev @rollup/plugin-typescript@"^6.1.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! dev @rollup/plugin-typescript@"^6.1.0" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: rollup@2.33.1
npm ERR! node_modules/rollup
npm ERR!   peer rollup@"^2.14.0" from @rollup/plugin-typescript@6.1.0
npm ERR!   node_modules/@rollup/plugin-typescript
npm ERR!     dev @rollup/plugin-typescript@"^6.1.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See /home/travis/.npm/eresolve-report.txt for a full report.
npm ERR! A complete log of this run can be found in:
npm ERR!     /home/travis/.npm/_logs/2020-11-08T01_13_40_933Z-debug.log
```

This started happening with [npm v7](https://blog.npmjs.org/post/628356819518210048/release-v700-beta9) and I realized it's related to build cache:

```
Setting up build cache

$ node --version
v15.1.0
$ npm --version
7.0.8
$ nvm --version
0.36.0
```

So I ended up [disabling npm cache](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/#caching-with-npm) in `.travis.yml` to get a [green build](https://www.travis-ci.com/github/remarkablemark/phonetic-alphabet-converter/builds/742166433):

```yml
# .travis.yml
cache:
  npm: false
```

## Local

To fix this error locally, delete `node_modules` and reinstall:

```sh
rm -rf node_modules && npm i
```

<!--/email_off-->
