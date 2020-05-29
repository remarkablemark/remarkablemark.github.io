---
layout: post
title: npm install from GitHub repository
date: 2016-09-19 19:58:00
updated: 2020-05-29 19:30:24
excerpt: How to install an npm package from a git providers like GitHub or Bitbucket.
categories: npm package install git github bitbucket
---

Did you know that you're not limited to installing npm packages from the [npm registry](https://docs.npmjs.com/misc/registry)?

## GitHub

You can also install packages from remote git providers like [GitHub](https://github.com):

```
npm install https://github.com/<username>/<repository>
```

Here's an example:

```sh
npm install https://github.com/remarkablemark/html-react-parser
```

[npm](https://docs.npmjs.com/cli/npm) will try install the package via [git clone](https://git-scm.com/docs/git-clone).

If you save the dependency, your `package.json` will look something like:

```json
{
  "dependencies": {
    "html-react-parser": "git+https://github.com/remarkablemark/html-react-parser.git"
  }
}
```

### Commit

The default commit is `master`, but if you want to install a specific `commit`, `tag`, or `branch`, you can do the following:

```
npm install <username>/<repository>#<commit>
```

For example:

```sh
npm install remarkablemark/html-react-parser#v0.10.5
```

Your `package.json` will look something like this if the dependency is saved:

```json
{
  "dependencies": {
    "html-react-parser": "git+https://github.com/remarkablemark/html-react-parser.git#v0.10.5"
  }
}
```

## Gist

You can even install a package from a [gist](https://gist.github.com):

```
npm install gist:<commit>
```

See [example](https://gist.github.com/remarkablemark/fd0837438d136e18c8e8eac559cd004a):

```sh
npm install gist:fd0837438d136e18c8e8eac559cd004a
```

## Bitbucket

To install from another git provider like [Bitbucket](https://bitbucket.org/):

```
npm install <protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit>]
```

The install would look something like this:

```
npm install git+ssh://git@bitbucket.org/<user>/<repository>.git
```

## Addendum

Check out the [npm-install documentation](https://docs.npmjs.com/cli/install) for more information.
