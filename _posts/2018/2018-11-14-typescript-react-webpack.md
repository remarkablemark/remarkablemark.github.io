---
layout: post
title: Using TypeScript with React and Webpack
date: 2018-11-14 19:55:51
excerpt: How to set up TypeScript with React and Webpack.
categories: typescript react webpack
---

I was following the _React & Webpack TypeScript_ [guide](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html) but found it to be outdated and broken.

Hence, I documented my own guide in wiring up [TypeScript](https://www.typescriptlang.org/) with [React](https://reactjs.org/) and [webpack](https://webpack.js.org/).

## Project Layout

First, create a directory for your project:

```sh
mkdir react-webpack && cd react-webpack
```

Install the dependencies (I'm using [`yarn`](https://yarnpkg.com/) but you can use [`npm`](https://www.npmjs.com/)):

```sh
yarn add webpack@4 \
           webpack-cli \
           react \
           react-dom \
           @types/react \
           @types/react-dom \
           typescript \
           awesome-typescript-loader@5
```

**Note**: If you're using `webpack@3` (and not `webpack@4` with `webpack-cli`), then you'll need to use `awesome-typescript-loader@4`.

The dependencies can be described as follows:

- [`webpack`](https://www.npmjs.com/package/webpack)/[`webpack-cli`](https://www.npmjs.com/package/webpack-cli) is the bundler
- [`react`](https://www.npmjs.com/package/react)/[`react-dom`](https://www.npmjs.com/package/react-dom) is the library we're using to build our app
- [`@types/react`](https://www.npmjs.com/package/@types/react)/[`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) provides the [type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [`typescript`](https://www.npmjs.com/package/typescript) is the compiler
- [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader) is the webpack loader

## TypeScript Configuration

Create a TypeScript [configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file:

```sh
touch tsconfig.json
```

And add the following:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "lib": ["dom", "es2015"],
    "module": "commonjs",
    "noImplicitAny": true,
    "outDir": "./dist/",
    "sourceMap": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

### Options

Let's go over each option:

- [`compilerOptions`](https://www.typescriptlang.org/docs/handbook/compiler-options.html): the compiler options
  - `jsx: react`: supports [JSX](https://reactjs.org/docs/introducing-jsx.html) in `.tsx` files
  - `lib`: includes a list of library files in the compilation (specifying `es2015` allows you to use ES6 syntax)
  - `module`: specifies the module code generation
  - `noImplicitAny`: raises errors on expressions and declarations with an implied `any` type (to enable all strict type checking options, use `strict` instead)
  - `outDir`: the output directory
  - `sourceMap`: generates `.map`, which is useful for debugging
  - `target`: the target ECMAScript version to transpile down to (pick the version that supports your browser requirements)
  - `include`: the files to be included (there's also `exclude`)

## First Component

Let's create our first component:

```sh
mkdir -p src/App/ && touch src/App/index.tsx
```

And add the code:

```tsx
// src/App/index.tsx
import * as React from 'react';

interface Props {
  name: string;
}

interface State {}

export default class App extends React.Component<Props, State> {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
```

Why are we using `import * as React from 'react'` instead of `import React from 'react'`?

Because `react` uses CommonJS syntax (`module.exports = ...`) and not ES Module syntax (`export default ...`).

If you use `import React from 'react'`, you'll receive the TypeScript compiler error:

```sh
yarn tsc
error TS1192: Module '"react"' has no default export.
```

**Note**: However, if you _really_ want to use `import React from 'react'`, you can enable `allowSyntheticDefaultImports` in the config:

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    // ...
  }
}
```

## Render App

Let's create our entry file:

```sh
touch src/index.tsx
```

And add the code:

```tsx
// src/index.tsx
import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App name="world" />, document.getElementById('app'));
```

Then create the HTML file:

```sh
mkdir public && touch public/index.html
```

And add the markup:

```html
<!-- public/index.html -->
<div id="app"></div>
<script src="../dist/bundle.js"></script>
```

## Configure Webpack

Let's create our webpack [configuration](https://webpack.js.org/configuration/) file:

```sh
touch webpack.config.js
```

And add the following:

```js
// webpack.config.js
const { resolve } = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist/'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
};
```

On a high-level, this configuration file tells webpack to start at the entry file, resolve every require/import, and then output a bundle.

When webpack sees a file with the extension `.ts` or `.tsx`, it transpiles the file contents using the typescript loader.

## Build Bundle

To build the bundle, run:

```sh
yarn webpack
```

## Open App

To open the app in a browser, run:

```sh
open public/index.html
```

## Conclusion

You can find the tutorial code [here](https://github.com/remarkablemark/typescript-examples/tree/master/react-webpack).
