---
layout: post
title: Dangerously set innerHTML alternative
date: 2016-10-07 13:36:00
excerpt: An alternative to React's dangerouslySetInnerHTML is html-react-parser, which converts an HTML string to React elements.
categories: react javascript babel html npm
---

There may be an occasion that you need to render an HTML string when using [React](https://facebook.github.io/react/).

In most situations, [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) should suffice:

{% raw %}

```js
<div
  dangerouslySetInnerHTML={{
    __html: '<em>foo</em>',
  }}
/>
```

{% endraw %}

But are there any other alternatives?

There are, and one of them is called [html-react-parser](https://github.com/remarkablemark/html-react-parser).

### Usage

First install the [package](https://www.npmjs.com/package/html-react-parser) and its dependencies:

```sh
npm install html-react-parser react react-dom
```

Now you can do something like this:

```js
<div>{require('html-react-parser')('<em>foo</em>')}</div>
```

When parsing the HTML string, you can even replace HTML elements with your own custom React elements:

```js
import Parser from 'html-react-parser';

<div>
  {Parser('<em>foo</em>', {
    replace: (domNode) => {
      if (domNode.name === 'em') {
        return <strong>bar</strong>;
      }
    },
  })}
</div>;
```

Want to play with it some more? Check out the [repository](https://github.com/remarkablemark/html-react-parser) and this [fiddle](https://jsfiddle.net/remarkablemark/7v86d800/):

<script async src="https://jsfiddle.net/remarkablemark/7v86d800/embed/js,html,result/dark/"></script>
