---
layout: post
title: Express template engine based on React
date: 2017-02-02 23:36:00 -4000
excerpt: Developing an Express template engine based on React.
categories: express template react
---

Since [Express](https://b.remarkabl.org/express-js) allows you to [build your own templating engine](https://expressjs.com/advanced/developing-template-engines.html), I was curious if one could be developed with vanilla [React](https://b.remarkabl.org/react-site).

Here are the steps that I took to build one.

### Steps

Set up a [minimal Express server]({% post_url 2017/2017-01-17-minimal-express-server %}).

Install [React](https://www.npmjs.com/package/react) and [ReactDOM](https://www.npmjs.com/package/react-dom):

```sh
npm install react react-dom
```

Create the templating engine:

```js
// engine.js

var createElement = require('react').createElement;
var renderToString = require('react-dom/server').renderToString;

/**
 * Templating engine for Express.
 *
 * @param {String} filepath
 * @param {Object} props
 * @param {Function} callback
 */
function engine(filepath, props, callback) {
    try {
        var Component = require(filepath);

        // first argument is the error
        // second argument is the rendered view (html)
        callback(null, renderToString(createElement(Component, props)));
    } catch (error) {
        callback(error);
    }
}

module.exports = engine;
```

Set the templating engine for the Express app:

```js
// server.js

// right after `app` is initialized...

app.engine('js', require('./engine'));

// the view files are JavaScript files, hence the extension
app.set('view engine', 'js');

// the directory containing the view files
app.set('views', './views');
```

Create a view:

```js
// views/App.js

var React = require('react');
var App = React.createClass({
    render: function() {
        return React.createElement('h1', {}, 'Hello, ' + this.props.name + '!');
    }
});
module.exports = App;
```

Update the index route to render the view:

```js
// server.js

app.get('/', function(request, response, next) {
    response.render('App', { name: 'world' });
});
```

Run the server to see it working at <a href="http://localhost:3000" target="_blank" data-proofer-ignore>http://localhost:3000</a>:

```sh
node server.js
```


Success!

Lastly, if you're looking for a more fleshed out Express templating engine using React, then check out [express-react-views](https://github.com/reactjs/express-react-views) and [react-engine](https://github.com/paypal/react-engine).
