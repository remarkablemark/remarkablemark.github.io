---
layout: post
title: How to lint your commit messages
date: 2019-05-29 20:01:42
excerpt: How to automate linting of your Git commit message with husky and commitlint.
categories: git lint commit hook husky commitlint npm
---

First install [husky](https://github.com/typicode/husky), which sets up your [Git hooks](https://git-scm.com/docs/githooks):

```sh
$ npm install husky
```

Then install [commitlint](https://github.com/conventional-changelog/commitlint) with a config, which will be used to lint your commit message:

```sh
$ npm install @commitlint/{cli,config-conventional}
```

_**Note:**_ The command above installs both [`@commitlint/cli`](https://www.npmjs.com/package/@commitlint/cli) and [`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional).

Since we're using [config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional), it means we're following a [standard](https://www.conventionalcommits.org/) based on the Angular commit convention.

Create `.huskyrc`, which runs `commitlint` during the Git commit hook:

```json
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

Or add the following to `package.json` (it accomplishes the same thing as above):

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "devDependencies": {
    "@commitlint/cli": "latest",
    "@commitlint/config-conventional": "latest",
    "husky": "latest"
  }
}
```

Now create `.commitlintrc.json`, which extends the rules from [config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional):

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

Or export the rules in `commitlint.config.js`:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

You can now commit and verify that the message is following the [Conventional Commits](https://www.conventionalcommits.org/) format:

```sh
$ git commit -m "add commitlint feature" # fail
$ git commit -m "feat: add commitlint"   # success
```
