---
layout: post
title: Build Rollup UMD bundle for CommonJS
date: 2019-07-12 22:29:55
updated: 2020-11-03 20:01:00
excerpt: How to build a Rollup bundle in IIFE, CJS, and UMD formats for CommonJS modules.
categories: rollup bundle build commonjs umd amd iife javascript nodejs npm
---

Whereas [Webpack](https://webpack.js.org/) is great for building **apps**, [Rollup](https://rollupjs.org/) is great for building **libraries**.

Rollup supports _ES modules_ out of the box. However, to support _CommonJS_, the following plugins are required:

- [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)
- [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)

## Prerequisites

- [Node.js](https://nodejs.org/) and npm

## Setup

Install [rollup](https://www.npmjs.com/package/rollup):

```sh
$ npm install rollup
$ npx rollup --version
rollup v2.32.1
```

Create entry file `index.js`:

```sh
$ echo "export default 'Hello, world!'" > index.js
```

Initialize `package.json`:

```sh
$ npm init --yes
```

Add build script to `package.json`:

```json
{
  "scripts": {
    "build": "rollup index.js --file dist/bundle.js"
  }
}
```

> The script compiles `index.js` to `dist/bundle.js`.

Run the build script:

```sh
$ npm run build
```

To get the error:

```
Error: You must specify "output.format", which can be one of "amd", "cjs", "system", "esm", "iife" or "umd".
```

## Output Format

Rollup expects an [output format](https://rollupjs.org/guide/en#output-format). Here are the general guidelines:

- For browsers, use `iife` ([Immediately Invoked Function Expression](https://developer.mozilla.org/docs/Glossary/IIFE))
- For Node.js, use `cjs` ([CommonJS](https://wikipedia.org/wiki/CommonJS))
- For both browsers and Node.js, use `umd` ([Universal Module Definition](https://github.com/umdjs/umd))

See table for summary:

| Environment       | Output Format |
| ----------------- | ------------- |
| Browser           | `iife`        |
| Node.js           | `cjs`         |
| Browser + Node.js | `umd`         |

To generate a UMD bundle with `MyModuleName` as the export name:

```sh
rollup index.js --file dist/bundle.js --format umd --name 'MyModuleName'
```

### Load with script

The module can be loaded in the browser with a `<script>` tag:

```html
<!-- script.html -->
<script src="dist/bundle.js"></script>
<script>
  console.log(window.MyModuleName);
</script>
```

### Load with AMD

The module can be loaded in the browser using [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md#amd) (Asynchronous Module Definition):

```html
<!-- amd.html -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
<script>
  window.requirejs(['dist/bundle'], function(MyModuleName) {
    console.log(MyModuleName);
  });
</script>
```

### Load with CommonJS

The module can be loaded in Node.js using CommonJS:

```sh
$ node
> const MyModuleName = require('./dist/bundle');
> console.log(MyModuleName);
Hello, world!
```

## Config File

Instead of passing the options via the CLI (command-line interface), you can specify them in the configuration file `rollup.config.js`.

Create the file `rollup.config.js`:

```sh
$ touch rollup.config.js
```

And add the config:

```js
// rollup.config.js
const config = {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'MyModuleName',
  },
};

export default config;
```

Update the build script in `package.json` to use the config file:

```json
{
  "scripts": {
    "build": "rollup --config"
  }
}
```

To give the config file a name other than the default, you'll need to specify the custom file location:

```sh
rollup --config my.config.js
```

## CommonJS

To use CommonJS syntax, install [@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs):

```sh
$ npm install @rollup/plugin-commonjs
```

Add the plugin to the rollup config:

```diff
 // rollup.config.js
+import commonjs from '@rollup/plugin-commonjs';
 
 const config = {
   input: 'index.js',
   output: {
     file: 'dist/bundle.js',
     format: 'umd',
     name: 'MyModuleName',
   },
+  plugins: [commonjs()],
 };
 
 export default config;
```

Now you can refactor `index.js`:

```js
// index.js
module.exports = 'Hello, world!';
```

After building the bundle, loading it via script, AMD, or CommonJS should continue to work:

```sh
$ npm run build
$ open script.html
$ open amd.html
$ node -p "require('./dist/bundle')"
Hello, world!
```

## Node Resolve

Let's say we want to refactor `index.js` and use [lodash](https://www.npmjs.com/package/lodash):

```sh
$ npm install lodash
```

```js
// index.js
var template = require('lodash/template');
var compiled = template('Hello, <%= name %>!');
module.exports = compiled({ name: 'world' });
```

In order for rollup to locate 3rd party modules in `node_modules` using [Node's resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together), we need to install [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve):

```sh
$ npm install @rollup/plugin-node-resolve
```

Add the plugin to the rollup config:

```diff
 // rollup.config.js
 import commonjs from '@rollup/plugin-commonjs';
+import resolve from '@rollup/plugin-node-resolve';
 
 const config = {
   input: 'index.js',
   output: {
     file: 'dist/bundle.js',
     format: 'umd',
     name: 'MyModuleName',
   },
-  plugins: [commonjs()],
+  plugins: [commonjs(), resolve()],
 };
 
 export default config;
```

Building the bundle should still work as expected:

```sh
$ npm run build
$ node -p "require('./dist/bundle')"
Hello, world!
```

> If you want the module resolution to respect the ["browser" field](https://github.com/defunctzombie/package-browser-field-spec) in `package.json`, you can set the option `resolve({ browser: true })`.

## Terser

To minify your bundle with rollup v2, use [terser](https://github.com/terser/terser).

Install [rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser):

```sh
$ npm install rollup-plugin-terser
```

Add the plugin to the rollup config:

```diff
 // rollup.config.js
 import commonjs from '@rollup/plugin-commonjs';
 import import resolve from '@rollup/plugin-node-resolve';
+import { terser } from 'rollup-plugin-terser';
 
 const config = {
   input: 'index.js',
   output: {
     format: 'umd',
     name: 'MyModuleName',
   },
-  plugins: [commonjs(), resolve()],
+  plugins: [commonjs(), resolve(), terser()],
 };
 
 export default config;
```

Use an environment variable to build minified and unminified bundles:

```diff
 // rollup.config.js
 import commonjs from '@rollup/plugin-commonjs';
 import import resolve from '@rollup/plugin-node-resolve';
 import { terser } from 'rollup-plugin-terser';
 
 const config = {
   input: 'index.js',
   output: {
     format: 'umd',
     name: 'MyModuleName',
   },
-  plugins: [commonjs(), resolve(), terser()],
+  plugins: [commonjs(), resolve()],
 };
 
+if (process.env.NODE_ENV === 'production') {
+  config.plugins.push(terser());
+}
+
 export default config;
```

Then set the environment variable before running the build command:

```sh
NODE_ENV=production npm run build
```

Or set the environment variable in the `package.json` build script itself:

```json
{
  "scripts": {
    "build": "npm run build:min && npm run build:unmin",
    "build:min": "NODE_ENV=production rollup --config",
    "build:unmin": "NODE_ENV=production rollup --config --file dist/bundle.min.js"
  }
}
```

## Uglify

To minify your bundle with rollup v1, use [UglifyJS](https://github.com/mishoo/UglifyJS2).

Install [rollup-plugin-uglify](https://github.com/TrySound/rollup-plugin-uglify):

```sh
$ npm install rollup-plugin-uglify
```

Add the plugin to the rollup config:

```diff
 // rollup.config.js
 import commonjs from '@rollup/plugin-commonjs';
 import import resolve from '@rollup/plugin-node-resolve';
+import { uglify } from 'rollup-plugin-uglify';
 
 const config = {
   input: 'index.js',
   output: {
     format: 'umd',
     name: 'MyModuleName',
   },
-  plugins: [commonjs(), resolve()],
+  plugins: [commonjs(), resolve(), uglify()],
 };
 
 export default config;
```
