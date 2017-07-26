---
layout: post
title: Using Vim with Syntastic and ESLint
date: 2016-09-28 21:31:00 -4000
excerpt: How to setup your Vim editor with ESLint as your JavaScript linter using the Syntastic plugin.
categories: vim syntastic eslint javascript
---

Wouldn't it be nice to set up automatic linting of JavaScript when using [Vim](http://www.vim.org)? Well, with [Syntastic](http://vimawesome.com/plugin/syntastic) and [ESLint](http://eslint.org), you can do just that.

## Installation

First you'll need to install [Syntastic](https://github.com/vim-syntastic/syntastic) and [ESLint](https://github.com/eslint/eslint) if you haven't already.

### Syntastic

Feel free to check out [Syntastic's installation steps](https://github.com/scrooloose/syntastic#installation). But personally, I recommend using [Vundle](https://github.com/VundleVim/Vundle.vim) to manage Vim plugins.

If you have [Vundle installed](https://github.com/VundleVim/Vundle.vim#quick-start), open your Vim config file:

```sh
$ vim ~/.vimrc
```

Then add the plugin:

```vim
" .vimrc
Plugin 'vim-syntastic/syntastic'
```

Finally save, reload, and install:

```vim
:write
:source %
:PluginInstall
```

### ESLint

Now install [eslint](https://www.npmjs.com/package/eslint) globally:

```sh
$ npm install eslint --global
```

Add it as a Syntastic JavaScript checker in your `.vimrc`:

```vim
" .vimrc
let g:syntastic_javascript_checkers=['eslint']
```

Reload your `.vimrc` after saving the changes:

```vim
:source $MYVIMRC
```

Now you're set for any project that uses [ECMAScript 5](https://wikipedia.org/wiki/ECMAScript).

## Advanced

But what if you have the following [.eslintrc](http://eslint.org/docs/user-guide/configuring):

```json
{
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ["react"]
}
```

The _config_, _parser_, and _plugins_ do not come with ESLint by default.

You'll need to install them in order for your linter to work.

### Option 1

One approach is to install them globally:

```sh
$ npm install -g eslint-config-airbnb \
                 babel-eslint \
                 eslint-plugin-react
```

But this can get tiresome when different projects have different ESLint dependencies. And you're also polluting the global `node_modules` directory.

### Option 2

An alternative is to have Syntastic use the [project-specific binary of eslint](https://github.com/vim-syntastic/syntastic/issues/1692#issuecomment-241672883):

```vim
" .vimrc
let g:syntastic_javascript_eslint_exe='$(npm bin)/eslint'
```

This means that `eslint` and its parser and plugin dependencies must be installed locally in your project:

```sh
$ npm install eslint # and its related dependencies
```
