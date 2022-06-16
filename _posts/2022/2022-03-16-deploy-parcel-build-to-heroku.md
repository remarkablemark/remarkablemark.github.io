---
layout: post
title: How to deploy a Parcel build to Heroku
date: 2022-03-16 20:59:00
updated: 2022-06-15 21:26:25
excerpt: How to deploy a Parcel build to Heroku.
categories: parcel heroku
---

This article goes over how to deploy a [Parcel](https://parceljs.org/) build to [Heroku](https://www.heroku.com/).

## Parcel

Given you have a Parcel app:

- [parcel-example](https://github.com/remarkablemark/parcel-example)
- [parcel-typescript-example](https://github.com/remarkablemark/parcel-typescript-example)
- [react-typescript-parcel-template](https://github.com/remarkablemark/react-typescript-parcel-template)

In your [package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json), make sure there's a `build` script:

```json
{
  "scripts": {
    "build": "parcel build"
  }
}
```

> Heroku runs the [`build`](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process) script if it exists during deploy.

## Serve

Install [serve](https://www.npmjs.com/package/serve) to serve the static site:

```sh
npm install serve
```

Create a [start script](https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script) in `package.json`:

```json
{
  "scripts": {
    "build": "parcel build",
    "start": "serve dist"
  },
  "dependencies": {
    "serve": "latest"
  }
}
```

Or create a [Procfile](https://devcenter.heroku.com/articles/procfile) to serve your project directory:

```sh
echo 'web: npx serve dist' > Procfile
```

> Heroku determines how to start your app by looking for a Procfile or start script.

Commit and push your repository.

## Deprecated

Add the [Heroku buildpacks](https://devcenter.heroku.com/articles/buildpacks) in order:

1. [heroku/nodejs](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
2. [heroku-buildpack-static](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-static) ([deprecated](https://github.com/heroku/heroku-buildpack-static#warning-heroku-buildpack-static-is-deprecated))

> The Node.js buildpack must come before the static buildpack since the site has to be built before it can be served.

The buildpacks can be added via the Heroku CLI:

```bash
heroku buildpacks:set heroku/nodejs --app <MY_APP_NAME>
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git --app <MY_APP_NAME>
```

> Replace `<MY_APP_NAME>` with your Heroku app name.

Or they can be added with [`app.json`](https://devcenter.heroku.com/articles/app-json-schema#buildpacks):

```json
{
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    },
    {
      "url": "https://github.com/heroku/heroku-buildpack-static"
    }
  ]
}
```

Create a [`static.json`](https://github.com/heroku/heroku-buildpack-static#deploying):

```sh
touch static.json
```

And [configure](https://github.com/heroku/heroku-buildpack-static#configuration) the options for your static application:

```json
{
  "root": "dist/",
  "routes": {
    "**": "index.html"
  },
  "https_only": true,
  "error_page": "index.html",
  "headers": {
    "/**": {
      "Cache-Control": "public, max-age=0, must-revalidate"
    },
    "/**.css": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/**.ico": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/**.jpg": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/**.jpeg": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/**.js": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/**.png": {
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  }
}
```

Push and deploy the Heroku app. The build log should look like:

```
-----> Building on the Heroku-20 stack
-----> Using buildpacks:
       1. heroku/nodejs
       2. https://github.com/heroku/heroku-buildpack-static
-----> Node.js app detected
-----> Creating runtime environment
-----> Installing binaries
-----> Restoring cache
-----> Installing dependencies
-----> Build
-----> Pruning devDependencies
-----> Caching build
-----> Build succeeded!
-----> Static HTML app detected
-----> Installed nginx 1.19.0 to /app/bin
-----> Discovering process types
       Procfile declares types     -> (none)
       Default types for buildpack -> web
-----> Compressing...
-----> Launching...
       Released v1
       https://myappname.herokuapp.com/ deployed to Heroku
```

There's no need for a [Procfile](https://devcenter.heroku.com/articles/procfile) since Heroku automatically creates a dyno for your static app:

```
web bin/boot
```
