---
layout: post
title: Setting up Enzyme with Mocha
date: 2016-10-03 15:34:00 -4000
excerpt: How to set up Enzyme, a testing utility for React, with Mocha.
categories: enzyme mocha react test babel npm
---

How do we go about _testing_ our [React](https://facebook.github.io/react/) components?

A popular approach is to use [Enzyme](http://airbnb.io/enzyme/), which is a React testing utility. Let's use it with [Mocha](https://mochajs.org), a Node.js test runner.

You'll need the following installed:

```sh
# peer dependencies (if not already installed)
$ npm install react react-dom

# another dependency
$ npm install react-addons-test-utils

# for testing
$ npm install enzyme mocha
```

Add the following to your project's [.babelrc](https://babeljs.io/docs/usage/babelrc/):

```json
{ "presets": ["es2015", "react"] }
```

The above config will be used when you run [babel](https://babeljs.io).

Update `package.json` with the [npm script](https://docs.npmjs.com/misc/scripts) for `test`.

You can either follow [babel's recommendation](https://babeljs.io/docs/setup/#installation):

```json
{
  "scripts": {
    "test": "mocha --compilers js:babel-register"
  }
}
```

Or [mocha's recommendation](https://mochajs.org/#about-babel):

```json
{
  "scripts": {
    "test": "mocha --require babel-register"
  }
}
```

In either scenario, babel will compile the JavaScript files based on your `.babelrc`.

Now you can run your tests:

```sh
$ npm test
```

Check out [Enzyme's repository](https://github.com/airbnb/enzyme) for [basic usage](https://github.com/airbnb/enzyme#basic-usage) and [examples](https://github.com/airbnb/enzyme/blob/master/docs/guides/mocha.md).

### Advanced

You can also specify a different directory to run your tests:

```sh
# run tests that match `./lib/*.js`
$ mocha --require babel-register lib/
```

Or even subdirectories with a glob pattern:

```sh
$ mocha --require babel-register lib/**/*.spec.js
```

For Windows compatibility, wrap the glob in quotes:

```sh
$ mocha --require babel-register "lib/**/*.spec.js"
```
