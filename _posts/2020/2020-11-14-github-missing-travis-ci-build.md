---
layout: post
title: Fix missing Travis CI build on GitHub
date: 2020-11-14 20:03:16
excerpt: How to fix Travis CI build not showing up in GitHub by resetting the Travis CI application access to the GitHub account.
categories: travis ci github
image: /images/2020/2020-11-14-authorize-travis-ci-for-open-source.png
---

## Background

[Travis CI](https://www.travis-ci.com/) was no longer showing up in my [GitHub](https://github.com/) PR's (pull requests). What I did to make the build show up again was to reset the Travis CI application access to my GitHub account.

## Revoke Access

Open [**Settings**](https://github.com/settings/profile):

![GitHub settings]({{ "/images/2020/2020-11-14-github-settings.png" | prepend: site.assets_path }})

Then go to [**Applications**](https://github.com/settings/applications) > **Authorized OAuth Apps**:

![GitHub applications]({{ "/images/2020/2020-11-14-github-applications.png" | prepend: site.assets_path }})

Click **Revoke** from the **Travis CI for Open Source** dropdown:

![Revoke Travis CI for Open Source]({{ "/images/2020/2020-11-14-revoke-travis-ci.png" | prepend: site.assets_path }})

## Reauthorize Application

Sign out of [Travis CI](https://www.travis-ci.com/), log back in, and reauthorize the application's access to the GitHub account:

![Authorize Travis CI for Open Source]({{ "/images/2020/2020-11-14-authorize-travis-ci.png" | prepend: site.assets_path }})

After opening a new PR, I was able to see the Travis CI build next to the **Merge pull request** button.
