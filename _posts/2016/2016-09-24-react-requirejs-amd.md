---
layout: post
title: Loading React with Require.js (AMD)
date: 2016-09-24 22:32:00
updated: 2021-10-02 20:31:05
excerpt: How to load React with Require.js (AMD).
categories: react requirejs amd javascript html
---

This tutorial goes over how to load a [React](https://reactjs.org/) app with [Require.js](https://requirejs.org/) (AMD).

> We'll be using vanilla JavaScript instead of [JSX](https://reactjs.org/docs/jsx-in-depth.html) so transpilation won't be necessary.

## Prerequisites

To get started, create `index.html`:

```html
<!-- index.html -->
<html>
  <body>
    <!-- container for rendered React element -->
    <div id="root"></div>

    <!-- Require.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>

    <!-- main script -->
    <script src="main.js"></script>
  </body>
</html>
```

## Load React with Require.js

In `main.js`, you'll need to load [React and ReactDOM](https://reactjs.org/docs/cdn-links.html) before rendering your element:

```js
// main.js
requirejs.config({
  // module name mapped to CDN URL
  paths: {
    // Require.js appends `.js` extension for you
    react: 'https://unpkg.com/react@17/umd/react.production.min',
    'react-dom': 'https://unpkg.com/react-dom@17/umd/react-dom.production.min',
  },
});

// load the modules defined above
requirejs(['react', 'react-dom'], function (React, ReactDOM) {
  // now you can render your React elements
  ReactDOM.render(
    React.createElement('p', {}, 'Hello, AMD!'),
    document.getElementById('root')
  );
});
```

## Demo

[JSFiddle](https://jsfiddle.net/remarkablemark/mejyoLk6/) example:

<script async src="https://jsfiddle.net/remarkablemark/mejyoLk6/embed/js,html,result/"></script>
