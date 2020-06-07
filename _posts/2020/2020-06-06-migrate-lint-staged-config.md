---
layout: post
title: Migrate to lint-staged +10
date: 2020-06-06 20:29:35
excerpt: Migrate .lintstagedrc config to lint-staged version 10 or greater.
categories: lint-staged config migrate json
---

Since [lint-staged v10](https://github.com/okonet/lint-staged#v10), the `git add` step is no longer necessary in the `lint-staged` commands.

So if your `.lintstagedrc` looks something like this:

```json
{
  "*.js": ["eslint --fix", "prettier --write", "git add"],
  "*.{css,html,json,md,yml}": ["prettier --write", "git add"]
}
```

Then it can be updated to:

```json
{
  "*.js": ["eslint --fix", "prettier --write"],
  "*.{css,html,json,md,yml}": "prettier --write"
}
```

## Script

I wrote a [script](https://gist.github.com/remarkablemark/7732ca7f192550c8851419eec2aad7ea) that migrates the `lint-staged` config in:

- `.lintstagedrc`
- `.lintstagedrc.json`
- `package.json`

To run the script:

```sh
npx https://gist.github.com/remarkablemark/7732ca7f192550c8851419eec2aad7ea
```

### Gist

{% gist 7732ca7f192550c8851419eec2aad7ea %}
