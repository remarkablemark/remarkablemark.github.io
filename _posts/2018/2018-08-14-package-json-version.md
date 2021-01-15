---
layout: post
title: Get package.json fields
date: 2018-08-14 19:25:22
updated: 2021-01-14 20:49:58
excerpt: How to get package.json fields using package.json vars, jq, node, and awk.
categories: package.json jq node awk bash
---

Get `package.json` fields using:

- [package.json vars](#packagejson-vars)
- [jq](#jq)
- [node](#node)
- [awk](#awk)

## package.json vars

package.json vars are the [npm package environment variables](https://docs.npmjs.com/cli/v6/using-npm/scripts#packagejson-vars).

To print out all the package.json vars:

```sh
$ npm run env | grep npm_package_
```

To get the "version" using a [run-script](https://docs.npmjs.com/cli/v6/commands/npm-run-script):

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "echo $npm_package_version"
  }
}
```

To access an npm environment variable outside the scope of a run-script, parse the variable with bash:

```sh
$ npm run env | grep npm_package_version | cut -d '=' -f 2
```

## jq

[jq](https://stedolan.github.io/jq/) is a tool for filtering [JSON](https://www.json.org/).

To print the `package.json` version:

```sh
$ jq -r .version package.json
```

> The `-r` option outputs the **raw** string (so it's `1.2.3` instead of `"1.2.3"`).

To get the "version" using a [run-script](https://docs.npmjs.com/cli/v6/commands/npm-run-script):

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "jq -r .version package.json"
  }
}
```

## node

[Node.js](https://nodejs.org/) can evaluate a script with the [`-e`](https://nodejs.org/api/cli.html#cli_e_eval_script) option.

To print the `package.json` version:

```sh
$ node -e "console.log(require('./package.json').version)"
```

Pass the [`-p`](https://nodejs.org/api/cli.html#cli_p_print_script) option to print the evaluation:

```sh
$ node -p "require('./package').version"
```

To get the "version" using a [run-script](https://docs.npmjs.com/cli/v6/commands/npm-run-script):

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "node -p \"require('./package').version\""
  }
}
```

## awk

[awk](https://www.gnu.org/software/gawk/manual/gawk.html#Getting-Started) is a tool that processes text.

To match `package.json` against the regex pattern `/"version": ".+"/` and print the 4th field of the first result:

```sh
$ awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json
```

To get the "version" using a [run-script](https://docs.npmjs.com/cli/v6/commands/npm-run-script):

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "awk -F'\"' '/\"version\": \".+\"/{ print $4; exit; }' package.json"
  }
}
```
