---
layout: post
title: npm install a package from GitHub
date: 2016-09-19 19:58:00 -4000
excerpt: You can install Node.js packages not only from the npm registry but also from git providers like GitHub.
categories: npm node javascript github cli git
---

Did you know that you're not limited to installing Node.js packages from the [npm registry](https://docs.npmjs.com/misc/registry)?

You can also install packages from remote git providers like [GitHub](https://github.com).

Here's how you do it:

```sh
$ npm install https://github.com/remarkablemark/html-react-parser
# npm install https://github.com/<username>/<repository>
```

What [npm](https://docs.npmjs.com/cli/npm) will try to do is install the package via a [git clone](https://git-scm.com/docs/git-clone).

The default commit is **master**, but if you want to install a specific **commit** or **tag**, you can do the following:

```sh
$ npm install remarkablemark/html-react-parser#v0.0.5
# npm install <username>/<repository>#<commit>
```

And you can even install a package from a [gist](https://gist.github.com):

```sh
$ npm install gist:fd0837438d136e18c8e8eac559cd004a
# npm install gist:<commit>
```

Check out the [npm-install documentation](https://docs.npmjs.com/cli/install) for more information.
