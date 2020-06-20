---
layout: post
title: Deploy CRA to GitHub Pages and Netlify
date: 2020-06-19 21:33:40
excerpt: How to build and deploy a Create React App to GitHub Pages and Netlify.
categories: cra deploy github pages netlify
---

Let's say you want to deploy a [Create React App (CRA)](https://github.com/facebook/create-react-app) to [GitHub Pages](https://pages.github.com/) and [Netlify](https://www.netlify.com/).

If your GitHub Page is a _project site_, then the site will be deployed to a _subfolder_:

```
https://<username>.github.io/<project>/
```

But on Netlify, the site will be deployed to the _root_:

```
https://<project>.netlify.app/
```

Initially, I thought I needed to add a [redirect or rewrite rule on Netlify](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file).

But it turns out the solution is simpler than expected.

Instead of storing the site URL in `package.json` `"homepage"`, I was able to store it in the [environment variable](https://create-react-app.dev/docs/adding-custom-environment-variables/) `PUBLIC_URL`.

So delete `"homepage"` from `package.json`:

```diff
-"homepage": "https://username.github.io/project/",
```

And set `PUBLIC_URL` in `.env`:

```diff
+PUBLIC_URL=/project/
```

Both steps can be done by running the commands:

```sh
sed -i '' '/"homepage"/d' package.json
echo PUBLIC_URL=/project/ >> .env
```

Now when you build for GitHub Pages, everything should still work as expected.

When you build for Netlify, you'll need to [set the environment variable](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) `PUBLIC_URL` to `""` for it to work.

See [textventure/play](https://github.com/textventure/play), which is deployed to [GitHub Pages](https://textventure.github.io/play/) and [Netlify](https://textventure.netlify.app/).
