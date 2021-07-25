---
layout: post
title: npm environment variables
date: 2020-06-07 15:37:37
excerpt: How to load npm environment variables in a Node.js module with dotenv.
categories: npm environment variables dotenv nodejs javascript
---

You can access npm environment variables from [package.json vars]({% post_url 2018/2018-08-14-package-json-version %}):

```sh
npm run env | grep npm_package_
```

But to load them in your Node.js module, you'll need [`dotenv`](https://github.com/motdotla/dotenv) and [`dotenv-expand`](https://github.com/motdotla/dotenv-expand).

## dotenv

Make sure you have a `package.json`. If you don't have one, create one:

```sh
npm init --yes
```

Install both [`dotenv`](https://www.npmjs.com/package/dotenv) and [`dotenv-expand`](https://www.npmjs.com/package/dotenv-expand):

```sh
npm install dotenv dotenv-expand
```

Create a `.env` file with your expanded environment variables:

```bash
# .env
NAME=$npm_package_name
VERSION=${npm_package_version}
```

Load the environment variables in your module `index.js`:

```js
// index.js
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand(dotenv.config());

console.log(process.env.NAME, process.env.VERSION);
```

If you run the command:

```sh
node index.js
```

You won't see anything logged to the console.

That's because npm environment variables are only available via npm.

So create an [npm script](https://docs.npmjs.com/cli/run-script) in your `package.json`:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

Then when you run the script:

```sh
npm start
```

You will see the package name and version logged to the console.

## Gist

See example [gist](https://gist.github.com/remarkablemark/57a43183decf58b6213e22f166b040f1) below:

{% gist 57a43183decf58b6213e22f166b040f1 %}
