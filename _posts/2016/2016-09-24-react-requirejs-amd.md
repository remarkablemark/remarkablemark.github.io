---
layout: post
title: Loading React with Require.js (AMD)
date: 2016-09-24 22:32:00 -4000
excerpt: How to load React with Require.js (AMD).
categories: react requirejs amd javascript html
---

Most tutorials show how to build [React](https://facebook.github.io/react/) apps with module bundlers like [webpack](https://webpack.github.io).

In this tutorial, I'll go over how to build a very simple React app with [Require.js](http://requirejs.org) (AMD).

We'll be using vanilla JavaScript instead of [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) so transpilation won't be necessary.

To get started, create `index.html` with the following:

```html
<!-- index.html -->
<html>
<body>
    <!-- container for rendered React element -->
    <div id="root"></div>

    <!-- Require.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js"></script>

    <!-- main -->
    <script src="main.js"></script>
</body>
</html>
```

In `main.js`, you'll need to load [React and ReactDOM](https://facebook.github.io/react/downloads.html) before rendering your element:

```js
// main.js
requirejs.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@15.3.2/dist/react',
        'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
    }
});

// load the modules defined above
requirejs(['react', 'react-dom'], function(React, ReactDOM) {
    // now you can render your React elements
    ReactDOM.render(
        React.createElement('p', {}, 'Hello, AMD!'),
        document.getElementById('root')
    );
});
```

Check out this [fiddle](https://jsfiddle.net/remarkablemark/mejyoLk6/) to see a working example:

<script async src="//jsfiddle.net/remarkablemark/mejyoLk6/embed/js,html,result/dark/"></script>
