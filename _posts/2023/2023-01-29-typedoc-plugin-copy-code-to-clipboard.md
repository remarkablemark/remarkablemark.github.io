---
layout: post
title: TypeDoc plugin copy code to clipboard
date: 2023-01-29 14:04:07
excerpt: TypeDoc plugin that adds a button to copy code to clipboard.
categories: typedoc plugin npm
---

This post goes over how to add a TypeDoc plugin to copy code to clipboard.

## Install

Install [`typedoc`](https://www.npmjs.com/package/typedoc) and the [plugin](https://www.npmjs.com/package/typedoc-plugin-copy-code-to-clipboard):

```sh
npm install --save-dev typedoc typedoc-plugin-copy-code-to-clipboard
```

## Configure

To build TypeDoc docs with the plugin, you can specify the plugin when running the CLI command:

```sh
npx typedoc src --plugin typedoc-plugin-copy-code-to-clipboard
```

Or add the plugin to [`typedoc.json`](https://typedoc.org/options/):

```json
{
  "entryPoints": ["src"],
  "plugin": ["typedoc-plugin-copy-code-to-clipboard"]
}
```

Then build the docs:

```sh
npx typedoc
```

View the docs in your browser:

```sh
open docs/index.html
```

## Links

- [Demo](https://b.remarkabl.org/typedoc-plugin-copy-code-to-clipboard)
- [Prototype](https://replit.com/@remarkablemark/Copy-code-to-clipboard)
