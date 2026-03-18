---
layout: post
title: Unignore Dependabot dependency with GitHub comment
date: 2026-03-18 19:45:39
excerpt: How to unignore a Dependabot dependency with a GitHub comment.
categories: dependabot dependency github
---

This post goes over how to unignore a Dependabot dependency with a GitHub comment.

## Ignore Dependency

If you've ignored a Dependabot dependency before:

```
@dependabot ignore this dependency
```

Or:

```
@dependabot ignore this major version
```

## Unignore Dependency

You can unignore it with:

```
@dependabot unignore <dependency name> dependency
```

Or:

```
@dependabot unignore <dependency name> <ignore condition>
```

See [example](https://github.com/remarkablemark/paccurate/pull/646#issuecomment-4086345609).

## Ignore Conditions

Show all of the ignore conditions of the specified dependency:

```
@dependabot show <dependency name> ignore conditions
```
