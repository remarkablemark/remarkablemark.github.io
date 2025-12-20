---
layout: post
title: How to set up trusted publishing for npm
date: 2025-12-19 19:28:20
excerpt: How to set up trusted publishing for npm packages on GitHub Actions.
categories: npm publish oidc github actions
---

This post goes over how to set up [trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers) on GitHub Actions.

## Login

Login to [npmjs.com](https://www.npmjs.com/) and go to your npm package. For example, my package is [html-react-parser](https://www.npmjs.com/package/html-react-parser).

Click **Settings** and under **Trusted Publisher**, click **GitHub Actions**.

## Trusted Publisher

Fill out the fields:

- Organization or user
- Repository
- Workflow filename

For [example](https://github.com/remarkablemark/html-react-parser):

| Field                | Value                |
| -------------------- | -------------------- |
| Organization or user | [remarkablemark]     |
| Repository           | [html-react-parser]  |
| Workflow filename    | [release-please.yml] |

[remarkablemark]: https://github.com/remarkablemark
[html-react-parser]: https://github.com/remarkablemark/html-react-parser
[release-please.yml]: https://github.com/remarkablemark/html-react-parser/blob/master/.github/workflows/release-please.yml

Click **Set up connection**.

_Optional:_ enable **Require two-factor authentication and disallow tokens (recommended)** for additional security.

## Workflow

Set the permission `id-token`, which is required for OIDC:

```yml
permissions:
  id-token: write
```

You can also remove the classic token from your workflow and actions secrets:

{% raw %}

```diff
 - name: Publish
   run: npm publish --provenance --access public
-  env:
-    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

{% endraw %}

Check your workflow to make sure you're using npm >=11.5.1:

```yml
- name: Install npm
  run: npm install -g npm@latest
```

Or Node.js version >=24:

```yml
- name: Use Node.js
  uses: actions/setup-node@v6
  with:
    node-version: 24
```

Otherwise, you'll get the error when publishing:

```
npm notice Access token expired or revoked. Please try logging in again.
npm error code E404
npm error 404 Not Found - PUT https://registry.npmjs.org/html-react-parser - Not found
```

Now you can publish your npm package with [OpenID Connect (OIDC)](https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/)!
