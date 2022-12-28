---
layout: post
title: Mustache CLI
date: 2021-10-10 16:41:46
excerpt: How to use mustache as a command-line interface (CLI).
categories: mustache cli
---

This post goes over how to use [mustache](https://github.com/janl/mustache.js#command-line-tool) as a command-line interface (CLI).

## Install

Install [mustache](https://www.npmjs.com/package/mustache) globally:

```sh
npm i -g mustache
```

Or call the binary with npx:

```sh
npx mustache
```

## Usage

See usage syntax:

```sh
mustache
```

```
Syntax: mustache <view> <template> [output]
```

Given `view`:

```json
{
  "name": "world"
}
```

And `template`:

{% raw %}

```
Hello, {{ name }}!
```

{% endraw %}

Running the command:

```sh
mustache view template
```

Outputs:

```
Hello, world!
```

To save the output as a file, run the command with an `output` argument:

```sh
mustache view template output
```

Without a file extension, mustache expects the view file to be JSON.

Add a `.js` extension for mustache to read the view file as JavaScript:

```js
// view.js
module.exports = {
  name: 'world',
};
```

```sh
mustache view.js template
```

## Demo

[Replit](https://replit.com/@remarkablemark/mustache-cli#package.json) example:

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/mustache-cli?lite=true#package.json" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
