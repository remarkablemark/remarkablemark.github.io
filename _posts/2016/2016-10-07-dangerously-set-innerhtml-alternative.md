---
layout: post
title: Dangerously set innerHTML alternative
date: 2016-10-07 13:36:00 -4000
excerpt: An alternative to React's dangerouslySetInnerHTML is html-react-parser, which converts an HTML string to React elements.
categories: react javascript babel html npm
---

There may be occasions when you're using [React](https://facebook.github.io/react/) that you need to render an HTML string.

In such a situation, the recommended approach is to use [dangerously set innerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html):

{% raw %}
```js
<div dangerouslySetInnerHTML={{
    __html: '<em>foo</em>'
}} />
```
{% endraw %}

But what about other alternatives?

[html-react-parser](https://github.com/remarkablemark/html-react-parser) is one and it converts a string of HTML into [React Elements](https://facebook.gitnub.io/react/blog/2015/12/18/react-components-elements-and-instances.html#elements-describe-the-tree).

Let's go over the basics of how to use it.

#### Usage

First install the [npm package](https://www.npmjs.com/package/html-react-parser):

```sh
$ npm install html-react-parser # `react` is a peer dependency
```

Now you can do something like this:

```js
<div>
    {require('html-react-parser')(
        '<em>foo</em>'
    )}
</div>
```

When parsing the string, you can even replace HTML elements with your own custom React elements:

```js
import Parser from 'html-react-parser';

<div>
    {Parser('<em>foo</em>', {
        replace: (domNode) => {
            if (domNode.name === 'em') {
                return <strong>bar</strong>;
            }
        }
    })}
</div>
```

Want to play with it some more? Check out this [fiddle](https://jsfiddle.net/remarkablemark/7v86d800/):

<script async src="//jsfiddle.net/remarkablemark/7v86d800/embed/js,html,result/dark/"></script>
