---
layout: post
title: Babel runtime error
date: 2018-09-18 19:33:45 -4000
excerpt: How to resolve the error "Cannot find module '@babel/runtime/helpers/builtin/interopRequireDefault' from 'index.js'".
categories: babel npm
---

After upgrading the dependencies of a project, this error showed up:
```
Cannot find module '@babel/runtime/helpers/builtin/interopRequireDefault' from 'index.js'
```

The solution was to install a specific version of babel runtime:
```sh
$ npm install --save-dev --exact @babel/runtime@7.0.0-beta.55
```
