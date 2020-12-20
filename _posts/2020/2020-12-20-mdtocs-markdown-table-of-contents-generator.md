---
layout: post
title: 'mdtocs: Markdown to Table of Contents'
date: 2020-12-20 16:33:26
excerpt: mdtocs is a Markdown table of contents generator.
categories: markdown javascript npm nodejs site
---

[mdtocs](https://remarkablemark.org/mdtocs/) is a [Markdown](https://wikipedia.org/wiki/Markdown) table of contents generator.

<iframe height="550px" width="100%" src="https://remarkablemark.org/mdtocs/" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

This project was inspired by the blog post ["Markdown Table of Contents Generator"]({% post_url 2020/2020-12-06-markdown-table-of-contents-generator %}).

## Install

[npm](https://www.npmjs.com/package/mdtocs):

```sh
$ npm install mdtocs
```

[Yarn](https://yarnpkg.com/package/mdtocs):

```sh
$ yarn add mdtocs
```

[UNPKG](https://unpkg.com/mdtocs/):

```html
<script src="https://unpkg.com/mdtocs@latest/umd/mdtocs.min.js"></script>
<script>
  window.mdtocs.mdtocs(/* string */);
</script>
```

## Usage

```js
const { mdtocs } = require('mdtocs');
mdtocs('# Hello, World!');
```

Output:

```md
- [Hello, World!](#hello-world)
```

See [README](https://github.com/remarkablemark/mdtocs#readme) for more details.
