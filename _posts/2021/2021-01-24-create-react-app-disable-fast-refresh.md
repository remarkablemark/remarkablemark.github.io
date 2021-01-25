---
layout: post
title: Disable fast refresh for Create React App
date: 2021-01-24 21:40:54
excerpt: How to disable fast refresh for Create React App (CRA), which will allow changes to `index.js` to trigger an automatic page reload.
categories: cra create-react-app react env
---

In [Create React App 4.0](https://github.com/facebook/create-react-app/releases/tag/v4.0.0), [`react-refresh`](https://github.com/facebook/create-react-app/pull/8582) was added.

However, this experimental feature causes the page to no longer hot reload when files like `index.js` are edited and saved (see [#9984](https://github.com/facebook/create-react-app/issues/9984)).

The fix is to disable the environment variable `FAST_REFRESH`:

```sh
# .env
FAST_REFRESH=false
```

This can be done using bash in the command-line:

```sh
echo 'FAST_REFRESH=false' >> .env
```

Once you restart your development server, edits to `index.js` should trigger an automatic page refresh!
