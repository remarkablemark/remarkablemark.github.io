---
layout: post
title: Lodash Prototype Pollution
date: 2020-05-29 19:20:36
excerpt: How to fix Lodash Prototype Pollution vulnerability for v4 and v3.
categories: lodash npm security vulnerability javascript nodejs
---

> TL;DR:
>
> ```sh
> # lodash >=4
> $ npm i lodash@latest
>
> # lodash 3
> $ npm i remarkablemark/lodash#3.10.2
> ```

## Background

[Prototype Pollution](https://codeburst.io/what-is-prototype-pollution-49482fc4b638) is a security vulnerability that allows attackers to inject data in a JavaScript object (see [report 1](https://snyk.io/vuln/SNYK-JS-LODASH-73638), [report 2](https://snyk.io/vuln/SNYK-JS-LODASH-450202), and [paper](https://github.com/HoLyVieR/prototype-pollution-nsec18/blob/master/paper/JavaScript_prototype_pollution_attack_in_NodeJS.pdf)).

### Frontend

On the frontend (browser), Prototype Pollution can lead to vulnerabilities like:

- [XSS](https://security.stackexchange.com/questions/215651/is-prototype-pollution-only-exploitable-on-the-back-end#answer-218340)

### Backend

On the backend ([Node.js](https://nodejs.org/en/)), Prototype Pollution can lead to:

- [Denial of Service](https://en.wikipedia.org/wiki/Denial-of-service_attack) (DoS)
- [Remote Code Execution](https://en.wikipedia.org/wiki/Arbitrary_code_execution) (RCE)

## Methods

The vulnerable [Lodash](https://lodash.com/) methods are:

- `defaultsDeep`
- `merge`
- `mergeWith`
- `set`
- `setWith`
- `zipObjectDeep`

## Fix

### lodash 4

The fix for lodash version 4 is to upgrade to `>=4.17.15`:

[npm](https://www.npmjs.com/package/lodash):

```sh
$ npm install lodash@latest
```

[Yarn](https://classic.yarnpkg.com/en/package/lodash):

```sh
$ yarn add lodash@latest
```

### lodash 3

Although there's a [fix](https://github.com/lodash/lodash/pull/4627) for lodash version 3, it hasn't been published to [npm](https://www.npmjs.com/package/lodash).

Given that lodash hasn't published version `3.x.x` since 2015, I created a [repository](https://github.com/remarkablemark/lodash) that has the fix:

```sh
$ npm install remarkablemark/lodash#3.10.2
```
