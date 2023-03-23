---
layout: post
title: Coveralls leave comments on PR
date: 2020-12-02 19:41:18
excerpt: How to configure Coveralls bot to leave comments on pull requests.
categories: coveralls
---

## Problem

I noticed that Coveralls bot was not leaving comments on pull requests for my new repository.

I found this [issue](https://github.com/lemurheavy/coveralls-public/issues/1313) but it describes [how to add the bot to private repos](https://docs.coveralls.io/app-notifications).

## Solution

Going to my Coveralls repo settings, I noticed `Leave Comments?` was disabled:

![Coveralls "Leave Comments?" Disabled]({{ "/images/2020/2020-12-02-coveralls-leave-comments-disabled.png" | prepend: site.assets_path }})

Once I enabled `Leave Comments?` and saved changes:

![Coveralls "Leave Comments?" Enabled]({{ "/images/2020/2020-12-02-coveralls-leave-comments-enabled.png" | prepend: site.assets_path }})

Coveralls bot started adding comments to my GitHub PR's:

![Coveralls comment]({{ "/images/2020/2020-12-02-coveralls-comment.png" | prepend: site.assets_path }})
