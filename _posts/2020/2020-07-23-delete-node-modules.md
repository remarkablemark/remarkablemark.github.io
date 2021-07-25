---
layout: post
title: Free space by deleting node_modules
date: 2020-07-23 21:05:36
excerpt: How to free up disk space by deleting node_modules.
categories: node_modules bash
---

Did you know you can free disk space by deleting `node_modules`?

To check the disk usage of your current working directory:

```sh
du -sh .
```

To find all directories (in your working directory) that matches the name `node_modules`:

```sh
find . -type d -name 'node_modules'
```

Execute recursive remove on all matches:

```sh
find . -type d -name 'node_modules' -exec rm -rf {} \;
```

Display the disk usage of your current working directory:

```sh
du -sh .
```

## Example

Here's an example of how to delete `node_modules` of a project bootstrapped by [Create React App](https://github.com/facebook/create-react-app).

Create app:

```sh
npx create-react-app my-react-app
```

Check disk usage:

```sh
du -sh
248M  .
```

Delete `node_modules`:

```sh
find . -type d -name node_modules -exec rm -rf {} \;
```

Check disk usage:

```sh
du -sh
924K  .
```
