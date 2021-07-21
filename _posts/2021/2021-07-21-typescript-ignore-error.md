---
layout: post
title: TypeScript ignore error
date: 2021-07-21 19:18:44
excerpt: How to ignore a TypeScript error in a file.
categories: typescript error
---

To disable type checking for an entire file, add the comment to the top of the file:

```
// @ts-nocheck
```

To disable the compiler error for a single line, add the comment before the line:

```
// @ts-ignore
```

If you're getting the [lint](https://github.com/typescript-eslint/typescript-eslint) error:

```
error  Do not use "@ts-ignore" because it alters compilation errors  @typescript-eslint/ban-ts-comment
```

Add the comment above `// @ts-ignore`:

```
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
```
