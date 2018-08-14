---
layout: post
title: How to get package.json version
date: 2018-08-14 19:25:22 -4000
excerpt: How to get the version from a package.json using package.json vars, jq, node script, and awk.
categories: package.json npm jq node awk
---

## [package.json vars](https://docs.npmjs.com/misc/scripts#packagejson-vars)

In [package scripts](https://docs.npmjs.com/cli/run-script), you can reference the environment variable `$npm_package_version`:
```json
{
  "scripts": {
    "get-version": "echo $npm_package_version"
  },
  "version": "1.2.3"
}
```

Run the script to get the version:
```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> echo $npm_package_version

1.2.3
```

## [jq](https://stedolan.github.io/jq/)

`jq` is a powerful program for filtering [JSON](https://www.json.org/) (if you have it installed):
```json
{
  "scripts": {
    "get-version": "jq -r '.version' package.json"
  },
  "version": "1.2.3"
}
```

The option `-r` outputs the **raw string** (`1.2.3` instead of `"1.2.3"`).

Run the script to get the version:
```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> jq -r '.version' package.json

1.2.3
```

## node script

With [Node.js](https://nodejs.org/) installed, you can eval a script with the option [`-e`](https://nodejs.org/dist/latest-v8.x/docs/api/cli.html#cli_e_eval_script):
```json
{
  "scripts": {
    "get-version": "node -e \"console.log(require('./package.json').version)\""
  },
  "version": "1.2.3"
}
```

Run the script to get the version:
```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> node -e "console.log(require('./package.json').version)"

1.2.3
```

To shorten the script, you can pass the option [`-p`](https://nodejs.org/dist/latest-v8.x/docs/api/cli.html#cli_p_print_script) to print the evaluation:
```json
{
  "scripts": {
    "get-version": "node -p \"require('./package').version\""
  }
}
```

## [awk](https://www.gnu.org/software/gawk/manual/gawk.html)

And you can always process text with [awk](https://www.gnu.org/software/gawk/manual/gawk.html#Getting-Started):
```json
{
  "scripts": {
    "get-version": "awk -F'\"' '/\"version\": \".+\"/{ print $4; exit; }' package.json"
  },
  "version": "1.2.3"
}
```

Here we're matching `package.json` against the regex pattern `/"version": ".+"/` and printing the 4th field of the first result.

Run the script to get the version:
```sh
$ npm run get-version

> @1.2.3 get-version path/to/package
> awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json

1.2.3
```

What approach do you use to retrieve the package version? Let me know in the comments below.
