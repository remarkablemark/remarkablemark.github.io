---
layout: post
title: Fix Jest snapshot tests for React 19
date: 2025-04-09 19:05:55
updated: 2025-04-15 16:08:34
excerpt: How to fix Jest snapshot tests when upgrading React from 18 to 19.
categories: jest snapshot test react
---

> **TL;DR**: add overrides to `package.json`:
>
> ```json
> "overrides": {
>   "pretty-format": {
>     "react-is": "$react"
>   }
> }
> ```

## Problem

When upgrading to React 19, Jest snapshot tests fail with the error:

```diff
Error: expect(received).toMatchSnapshot()

Snapshot name: `domToReact converts single DOM node to React 1`

- Snapshot  -  3
+ Received  + 10

- <p>
-   foo
- </p>
+ {
+   "$$typeof": Symbol(react.transitional.element),
+   "_owner": null,
+   "_store": {},
+   "key": null,
+   "props": {
+     "children": "foo",
+   },
+   "type": "p",
+ }

    at Object.<anonymous> (__tests__/dom-to-react.test.tsx:24:26)
```

This happens because React changed `Symbol.for('react.element')` to `Symbol.for('react.transitional.element')`.

## Solution

Follow this [comment](https://github.com/jestjs/jest/issues/15402#issuecomment-2575408173) and set [overrides](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#overrides) for `react-is` in `package.json`:

```json
{
  "overrides": {
    "pretty-format": {
      "react-is": "19"
    }
  }
}
```

See [example](https://github.com/remarkablemark/html-react-parser/pull/1746).

If the `react` version is specified in dependencies, you can reference the value with `$react`:

```json
{
  "dependencies": {
    "react": "19"
  },
  "overrides": {
    "pretty-format": {
      "react-is": "$react"
    }
  }
}
```

See [example](https://github.com/lilboards/lilboards/pull/2467).

If you're using Yarn, set [resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/):

```json
{
  "resolutions": {
    "react-is": "$react"
  }
}
```
