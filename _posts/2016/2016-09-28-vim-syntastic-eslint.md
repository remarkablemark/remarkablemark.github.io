---
layout: post
title: Using Vim with Syntastic and ESLint
date: 2016-09-28 21:31:00 -4000
excerpt: How to setup your Vim editor with ESLint as your JavaScript linter using the Syntastic plugin.
categories: vim syntastic eslint javascript
---

As a [Vim](http://www.vim.org) user, I find it important&mdash;if not _necessary_&mdash;to have my JavaScript linted.

With [Syntastic](http://vimawesome.com/plugin/syntastic), a syntax checking plugin for Vim, and [ESLint](http://eslint.org), a pluggable JavaScript linter, you can do just that.

### Installation

Install [Syntastic](https://github.com/scrooloose/syntastic#installation) if you haven't already. I personally use [Vundle](https://github.com/VundleVim/Vundle.vim) as my Vim plugin manager.

Afterwards, you'll want to install [eslint](https://www.npmjs.com/package/eslint) globally:

```sh
$ npm install eslint --global
```

And add it as a Syntastic JavaScript checker in your `.vimrc`:

```vim
" .vimrc
let g:syntastic_javascript_checkers=['eslint']
```

Reload your `.vimrc` after saving the changes:

```vim
:source $MYVIMRC
```

Now you're set for any project that uses [ECMAScript 5](https://wikipedia.org/wiki/ECMAScript).

### Advanced

But what if you have the following [.eslintrc](http://eslint.org/docs/user-guide/configuring):

```json
{
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ["react"]
}
```

The **config**, **parser**, and **plugins** do not come with ESLint by default.

You'll need to install them in order for your linter to work.

#### Option 1

One approach is to install them globally:

```sh
$ npm install -g eslint-config-airbnb \
                 babel-eslint \
                 eslint-plugin-react
```

But this can get tiresome real fast when different projects have different ESLint dependencies.

#### Option 2

If you don't want to keep polluting global `node_modules`, the alternative is to have Syntastic use the project-specific binary of `eslint`:

```vim
" .vimrc
let g:syntastic_javascript_eslint_exe='$(npm bin)/eslint'
```

This means that `eslint` and its parser and plugin dependencies must be installed locally in your project:

```sh
$ npm install eslint # and related dependencies
```
