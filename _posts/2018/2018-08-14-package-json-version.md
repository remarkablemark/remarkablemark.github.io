---
layout: post
title: How to access package.json fields
date: 2018-08-14 19:25:22
updated: 2020-03-08 20:22:00
excerpt: package.json fields like "version" can be accessed via package.json vars (npm environment variables), jq, node, and awk.
categories: package json npm environment variable jq node awk bash cli
---

Here are the ways to get "version" from `package.json`:

- [package.json vars](#packagejson-vars)
- [jq](#jq)
- [node](#node)
- [awk](#awk)

## package.json vars

There are [npm environment variables](https://docs.npmjs.com/misc/scripts#packagejson-vars) for each `package.json` field:

```sh
$ npm run env | grep npm_package_
```

This means you can access `version` in a [run-script](https://docs.npmjs.com/cli/run-script):

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "echo $npm_package_version"
  }
}
```

```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> echo $npm_package_version

1.2.3
```

If you ever need to access npm environment variables outside the scope of run-scripts, you can parse the variables with bash:

```sh
$ npm run env | grep npm_package_version | cut -d '=' -f 2
```

## jq

[jq](https://stedolan.github.io/jq/) is a powerful tool for filtering [JSON](https://www.json.org/):

```sh
$ jq -r .version package.json
```

The `-r` option outputs the _raw string_ (so it's `1.2.3` instead of `"1.2.3"`).

This means you can add a script like so:

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "jq -r .version package.json"
  }
}
```

```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> jq -r .version package.json

1.2.3
```

## node

With [Node.js](https://nodejs.org/), you can evaluate a script with the [`-e`](https://nodejs.org/api/cli.html#cli_e_eval_script) option:

```sh
$ node -e "console.log(require('./package.json').version)"
```

Furthermore, you can simplify the script by using the [`-p`](https://nodejs.org/api/cli.html#cli_p_print_script) option to print the evaluation:

```sh
$ node -p "require('./package').version"
```

Thus, your script will look like so:

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "node -p \"require('./package').version\""
  }
}
```

```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> node -p "require('./package').version"

1.2.3
```

## awk

You can always use [awk](https://www.gnu.org/software/gawk/manual/gawk.html#Getting-Started) to process text:

```sh
$ awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json
```

We're matching `package.json` against the regex pattern `/"version": ".+"/` and printing the 4th field of the first result.

The script will be as follows:

```js
// package.json
{
  "version": "1.2.3",
  "scripts": {
    "get-version": "awk -F'\"' '/\"version\": \".+\"/{ print $4; exit; }' package.json"
  }
}
```

```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json

1.2.3
```

## Conclusion

Which approach worked for you? Tell us in the comments below!
