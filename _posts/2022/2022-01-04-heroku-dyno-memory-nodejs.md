---
layout: post
title: Heroku dyno memory for Node.js
date: 2022-01-04 18:47:40
updated: 2022-01-05 21:07:12
excerpt: How to maximize Heroku dyno memory for Node.js applications.
categories: heroku nodejs dyno memory
image: /assets/images/2022/2022-01-04-heroku-metrics-memory-usage.png
---

This post goes over how to optimize Heroku dyno memory for Node.js applications.

## Problem

If your Node.js app is crashing with the error:

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

Or your Heroku memory usage looks like this:

![Heroku memory usage metrics for a Node.js app]({{ "/images/2022/2022-01-04-heroku-metrics-memory-usage.png" | prepend: site.assets_path }})

Then you need to check your app for [memory leaks](https://devcenter.heroku.com/articles/node-memory-use#what-is-a-memory-leak) or upgrade to a larger dyno size.

## max-old-space-size

If your dyno has more than `512` MB RAM, then you're not making use of all the available memory (depending on your Node.js version, the default memory limit can be `512` MB).

To increase the Node.js memory limit, set [`--max-old-space-size`](https://nodejs.org/api/cli.html#cli_max_old_space_size_size_in_megabytes) in the CLI:

```sh
node --max-old-space-size=1024 app.js
```

Or set it as an environment variable with key `NODE_OPTIONS` and value `--max-old-space-size=1024`:

```bash
NODE_OPTIONS='--max-old-space-size=1024'
```

`1024` MB is equivalent to 1 GB so to set the size to 2 GB, double the number.

See more information on [Heroku](https://devcenter.heroku.com/articles/node-memory-use#tuning-the-garbage-collector) and [Stackoverflow](https://stackoverflow.com/questions/48387040/how-do-i-determine-the-correct-max-old-space-size-for-node-js).

## Cluster

Fork multiple [clusters](https://nodejs.org/api/cluster.html#cluster) to take advantage of multiple cores to optimize [Node.js concurrency](https://devcenter.heroku.com/articles/node-concurrency).

Read more on [optimizing dyno usage](https://devcenter.heroku.com/articles/optimizing-dyno-usage#node-js).

## Metrics

Enable visibility into memory usage with Heroku Labs [log-runtime-metrics](https://devcenter.heroku.com/articles/log-runtime-metrics).

[Librato](https://elements.heroku.com/addons/librato) is an add-on for performance monitoring.
