---
layout: post
title: How to disable Firebase Hosting
date: 2021-06-13 21:52:46
excerpt: How to disable Firebase Hosting for a site.
categories: firebase hosting cli
---

This post goes over how to disable Firebase Hosting for a site.

## Prerequisites

Install Firebase CLI:

```sh
npm install firebase-tools
```

Login to your Firebase account:

```sh
npx firebase login
```

## Disable Hosting

Disable Firebase Hosting for `<projectId>` and `<siteName>`

```sh
npx firebase hosting:disable --project <projectId> --site <siteName>
```

Disabling hosting will make your site inaccessible.

## Delete Site

Delete site `<siteId>`:

```sh
npx firebase hosting:sites:delete <siteId>
```

## Resources

- [Firebase CLI reference](https://firebase.google.com/docs/cli/#hosting-commands)
