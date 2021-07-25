---
layout: post
title: Jekyll build failure
date: 2016-12-04 22:36:00
excerpt: Jekyll build failure caused by Bundler installing different gem versions.
categories: github jekyll bundler gem ruby
---

Lately, I've been getting page build failures for my [Jekyll](https://jekyllrb.com) [site]({{ site.url }}) hosted on [GitHub Pages](https://pages.github.com):

![Page Build Failure]({{ "/images/2016/12-04-page-build-failure.png" | prepend: site.assets_path }})

But what's frustrating is that it doesn't say what went wrong&mdash;plus, my local site has no build issues.

So I started looking for differences. I have [Jekyll installed via Bundler](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#step-2-install-jekyll-using-bundler) so my `Gemfile` looks like this:

```rb
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
```

I update the gems and check the versions:

```sh
bundle update && bundle exec github-pages --version
github-pages 39
```

```sh
bundle exec jekyll --version
jekyll 2.4.0
```

But wait, the GitHub Pages [dependency versions](https://pages.github.com/versions/) are much different than what I have installed locally. What's going on?

It turns out that there's a [Bundler issue](https://github.com/bundler/bundler/issues/5154) that causes an _older version_ of the gem to be installed if the _version is unspecified_.

So the [current fix](https://github.com/github/pages-gem/tree/v105#usage) is to specify the version in `Gemfile` until Bundler resolves the issue:

```rb
gem 'github-pages', '104', group: :jekyll_plugins
```

Update your gems:

```sh
bundle update
```

Then build your site:

```sh
bundle exec jekyll build --safe
```

Now when I push my latest commit to my [repository]({{ site.repository | prepend: "https://github.com/" }}), my site builds successfully:

![Page Build Success]({{ "/images/2016/12-04-page-build-success.png" | prepend: site.assets_path }})
