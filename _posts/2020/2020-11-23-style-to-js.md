---
layout: post
title: Parse CSS inline style to JS object
date: 2020-11-23 19:50:43
excerpt: Parse a CSS inline style to a JavaScript object that's camelCased with npm package `style-to-js`.
categories: npm package javascript nodejs css style
---

Use [`style-to-js`](https://b.remarkabl.org/style-to-js) to parse a CSS inline style to a JavaScript object that's camelCased.

## Install

```sh
npm install style-to-js
```

## Usage

Parse:

```js
const styleToJS = require('style-to-js').default;

styleToJS('background-color: #BADA55');
```

Output:

```json
{ "backgroundColor": "#BADA55" }
```

To support React, enable the option [`reactCompat`](https://github.com/remarkablemark/style-to-js#reactcompat):

```js
styleToJS('-webkit-transition: all 4s ease', { reactCompat: true });
```

Output:

```json
{ "WebkitTransition": "all 4s ease" }
```

See [README](https://github.com/remarkablemark/style-to-js#readme).

## Demo

[Repl.it](https://repl.it/@remarkablemark/style-to-js):

<iframe height="600px" width="100%" src="https://repl.it/@remarkablemark/style-to-js?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Misc

Use [`style-to-object`](https://b.remarkabl.org/style-to-object) to parse a CSS inline style to a JavaScript object that's kebab-cased.

```sh
npm install style-to-object
```

Parse:

```js
const styleToObject = require('style-to-object');

styleToObject('background-color: #BADA55');
```

Output:

```json
{ "background-color": "#BADA55" }
```

See [README](https://github.com/remarkablemark/style-to-object#readme).
