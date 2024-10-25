---
layout: post
title: Fix npm error ERESOLVE could not resolve
date: 2024-10-24 23:06:44
excerpt: How to fix npm error ERESOLVE could not resolve
categories: npm
---

This post goes over how to fix npm error `ERESOLVE could not resolve`.

## Problem

If there's an npm dependency conflict, `npm install` will throw an error:

```sh
npm install
```

```
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error
npm error While resolving: firebaseui@6.1.0
npm error Found: firebase@11.0.1
npm error node_modules/firebase
npm error   firebase@"11.0.1" from the root project
npm error
npm error Could not resolve dependency:
npm error peer firebase@"^9.1.3 || ^10.0.0" from firebaseui@6.1.0
npm error node_modules/firebaseui
npm error   firebaseui@"6.1.0" from the root project
npm error
npm error Conflicting peer dependency: firebase@10.14.1
npm error node_modules/firebase
npm error   peer firebase@"^9.1.3 || ^10.0.0" from firebaseui@6.1.0
npm error   node_modules/firebaseui
npm error     firebaseui@"6.1.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
```

## Solution

A temporary workaround is to install with `--force`:

```sh
npm install --force
```

Or with `--legacy-peer-deps`:

```sh
npm install --legacy-peer-deps
```

However, a better solution is to use [overrides](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides):

```json
{
  "overrides": {
    "your-dependency": "1.0.0"
  }
}
```

For example, `firebaseui` depends on a different version of `firebase` so to specify it in overrides:

```json
{
  "dependencies": {
    "firebase": "11.0.1",
    "firebaseui": "6.1.0"
  },
  "overrides": {
    "firebase": "11.0.1"
  }
}
```

Alternatively, you can use the version from `dependencies`:

```json
{
  "dependencies": {
    "firebase": "11.0.1",
    "firebaseui": "6.1.0"
  },
  "overrides": {
    "firebase": "$firebase"
  }
}
```
