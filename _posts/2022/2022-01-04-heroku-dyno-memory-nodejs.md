---
layout: post
title: Heroku dyno memory for Node.js
date: 2022-01-04 18:47:40
excerpt: How to take maximize Heroku dyno memory for Node.js apps.
categories: heroku nodejs dyno memory
---

This post goes over how to optimize Heroku dyno memory for Node.js apps.

## Problem

If your Node.js app is crashing with the error:

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

Or your Heroku memory usage looks like this:

![Heroku memory usage metrics for a Node.js app]({{ "/images/2022/2022-01-04-heroku-metrics-memory-usage.png" | prepend: site.assets_path }})

Then you need to check your app for memory leaks or upgrade to a larger dyno size.

## max-old-space-size

If your dyno has more than `512` MB RAM, then you're not making use of all the available memory since the default memory limit for Node.js is `512` MB.

To increase the Node.js memory limit, set [`--max-old-space-size`](https://nodejs.org/api/cli.html#cli_max_old_space_size_size_in_megabytes) in the CLI:

```sh
node --max-old-space-size=1024 app.js
```

Or set it as an environment variable with key `NODE_OPTIONS` and value `--max-old-space-size=1024`.

`1024` MB is equivalent to 1 GB. To set the size to 2 GB, double the number.

For more details, see [Stackoverflow](https://stackoverflow.com/questions/48387040/how-do-i-determine-the-correct-max-old-space-size-for-node-js).
