---
layout: post
title: TypeScript speed up build with incremental
date: 2024-01-29 19:32:59
excerpt: How to speed up TypeScript build with the incremental flag.
categories: typescript build
---

[TypeScript 3](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) introduced an [`incremental`](https://www.typescriptlang.org/tsconfig#incremental) option that speeds up builds.

To enable it, set the flag in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "incremental": true
  }
}
```

Don't forget to add [`.tsbuildinfo`](https://www.typescriptlang.org/tsconfig#tsBuildInfoFile) to `.gitignore`:

```sh
echo '.tsbuildinfo' >> .gitignore
```
