---
layout: post
title: Install 2 versions of the same npm package
date: 2020-06-17 20:47:59
excerpt: How to install multiple versions of the same npm package in a Node.js project.
categories: npm package git github
---

This article goes over how to install two or more versions of the same [npm](https://www.npmjs.com/) package.

Let's say you want to install [`react-dom`](https://www.npmjs.com/package/react-dom) v15 and [`react-dom`](https://www.npmjs.com/package/react-dom) v16 in the same project:

```sh
$ npm install react-dom@15 react-dom@16 --save
```

However, `package.json` saves only 1 version:

```json
{
  "name": "my-project",
  "dependencies": {
    "react-dom": "^16.13.1"
  }
}
```

This is because package names must be _unique_.

To go around this, you can do the following.

1. In a new directory, [initialize an npm package](https://docs.npmjs.com/cli/init) with a different name:
   ```sh
   $ mkdir ~/react-dom-core && cd ~/react-dom-core
   $ npm init --yes
   ```
2. Install the dependency at the version you want:
   ```sh
   $ npm install react-dom@15 --save --exact
   ```
3. Create a Git repository and push it to [GitHub](https://github.com/):
   ```sh
   $ git init
   $ git push
   ```
4. Return to your original project and [save the repository]({% post_url 2016/2016-09-19-npm-install-from-github %}) as a dependency:
   ```sh
   $ cd ~/my-project/
   $ npm install https://github.com/remarkablemark/react-dom-core --save
   ```
   > **Note**: You can also install from a specific [branch, tag, or commit]({% post_url 2016/2016-09-19-npm-install-from-github %}#commit).

Now your `package.json` will look like this:

```json
{
  "name": "my-project",
  "dependencies": {
    "react-dom": "16",
    "react-dom-core": "git+https://github.com/remarkablemark/react-dom-core.git"
  }
}
```

This means you can import both dependencies in your [Node.js module](https://nodejs.org/api/modules.html):

```js
// index.js
const ReactDOM16 = require('react-dom');
const ReactDOM15 = require('react-dom-core');
```

You can even [publish](https://docs.npmjs.com/cli/publish) the package if the [name isn't taken](https://b.remarkabl.org/npm-package-name-checker).

See [`react-dom-core`](https://www.npmjs.com/package/react-dom-core) as an example.
