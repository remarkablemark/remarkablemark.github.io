---
layout: post
title: npm publish error
date: 2019-09-04 21:00:51
excerpt: How I handled an npm publish error and updated my process.
categories: npm publish package error
---

Recently I tried to publish an [npm](https://www.npmjs.com/) package, but I received the error:

```
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! Package name too similar to existing packages
```

The name was available on [npm package name checker](https://remarkablemark.org/npm-package-name-checker/) so why did this fail?

After some research, I learned that [new package moniker rules](https://blog.npmjs.org/post/168978377570/new-package-moniker-rules) were added to prevent [typosquatting on the npm registry](https://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry).

This made sense from a security point of view so I reassessed my publish process.

## Process

While working on a package, use a _placeholder_ name that's unique and greppable:

```json
{
  "name": "placeholder"
}
```

When it's ready to be published, create a test directory:

```sh
mkdir test && cd test
```

Initialize `package.json` in the test directory:

```sh
npm init -y
```

Remove all fields except for `name` and `version`:

```json
{
  "name": "test",
  "version": "0.0.0"
}
```

Then follow the steps outlined below.

## Steps

1\. Change the name to what you want the package to be called (e.g., `my-package`):

```sh
sed -i '' 's/test/my-package/' package.json
```

> Learn more about [sed]({% post_url 2017/2017-09-18-sed-replace-text %}).

2\. Try publishing the package:

```sh
npm publish
```

- If it succeeds, you're now the owner of the name and proceed to step **3**.
- If it fails, repeat steps **1**-**2** until it succeeds.

3\. Return to your package:

```sh
cd .. && rm -rf test
```

4\. Replace your package name with the published one:

```sh
git grep -l 'placeholder' | xargs sed -i '' -e 's/placeholder/my-package/g'
```

> Learn more about [git grep replace]({% post_url 2020/2020-07-12-git-grep-replace %}).

5\. Commit the change:

```sh
git commit
```

6\. Bump the package version:

```sh
npm version
```

7\. Publish:

```sh
npm publish
```

Success!
