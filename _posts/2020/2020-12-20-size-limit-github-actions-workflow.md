---
layout: post
title: Add Size Limit to GitHub Actions
date: 2020-12-20 18:47:33
excerpt: How to add Size Limit, a performance budget tool for JavaScript, to GitHub Actions.
categories: size-limit github ci nodejs performance
---

<!--email_off-->

This post goes over how to add [Size Limit](https://github.com/ai/size-limit), a performance budget tool for JavaScript, to [GitHub Actions](https://github.com/features/actions).

## Setup

Install [`size-limit`](https://www.npmjs.com/package/size-limit):

```sh
$ npm install --save-dev size-limit
```

Run the `size-limit` binary to get the message:

```sh
$ npx size-limit
Install Size Limit preset depends on type of the project

For application, where you send JS bundle directly to users
  npm install --save-dev @size-limit/preset-app

For frameworks, components and big libraries
  npm install --save-dev @size-limit/preset-big-lib

For small (< 10 KB) libraries
  npm install --save-dev @size-limit/preset-small-lib

Check out docs for more complicated cases
  https://github.com/ai/size-limit/
```

In our example, we're going to install the big library preset [`@size-limit/preset-big-lib`](https://www.npmjs.com/package/@size-limit/preset-big-lib):

```sh
$ npm install --save-dev @size-limit/preset-big-lib
```

Run `size-limit` again to get the error:

```sh
$ npx size-limit
 ERROR  Create Size Limit config in package.json

  "size-limit": [
    {
      "path": "dist/bundle.js",
      "limit": "10 KB"
    }
  ]
```

### Config

The [config](https://github.com/ai/size-limit#config) options are:

- `path`: **path** to your bundle
- `limit`: **size** (e.g., `42 B`, `1337 KB`) or **time limit** (e.g., `314 ms`, `1.618 s`) of your bundle

#### Example

If your bundle path is `build/my-bundle.js` and you don't want your bundle to go over `9000` bytes, add the following to your `package.json`:

```json
{
  "size-limit": [
    {
      "path": "build/my-bundle.js",
      "limit": "9000 B"
    }
  ]
}
```

### Success

A success message for `size-limit` looks like:

```sh
$ npx size-limit
✔ Adding to empty webpack project
✔ Running JS in headless Chrome

  Size limit:   8.79 KB
  Size:         8.69 KB with all dependencies, minified and gzipped
  Loading time: 50 ms   on slow 3G
  Running time: 60 ms   on Snapdragon 410
  Total time:   110 ms
```

### Failure

A failure message for `size-limit` looks like:

```sh
$ npx size-limit
✔ Adding to empty webpack project
✔ Running JS in headless Chrome

  Package size limit has exceeded by 1 KB
  Size limit:   8.79 KB
  Size:         9.79 KB with all dependencies, minified and gzipped
  Loading time: 50 ms   on slow 3G
  Running time: 70 ms   on Snapdragon 410
  Total time:   120 ms

  Try to reduce size or increase limit at .size-limit.json
```

## GitHub Action

Create `.github/workflows/size-limit.yml`, which uses the [size-limit-action](https://github.com/marketplace/actions/size-limit-action):

{% raw %}

```yml
# .github/workflows/size-limit.yml
name: size
on:
  pull_request:
    branches:
      - master
jobs:
  size:
    runs-on: ubuntu-latest
    env:
      CI_JOB_NUMBER: 1
    steps:
      - uses: actions/checkout@v2
      - uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

The initial PR (pull request) to add the workflow will fail because the action tries to compare against the base branch, which doesn't have `size-limit` added (see [#33](https://github.com/andresz1/size-limit-action/issues/33)).

Once `size-limit` is on `master`, all newly created PR's will measure the the bundle size/performance.

See [example PR](https://github.com/remarkablemark/html-react-parser/pull/197) that adds this workflow.

<!--/email_off-->
