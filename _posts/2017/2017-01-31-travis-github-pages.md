---
layout: post
title: Test GitHub Pages for broken links
date: 2017-02-01 01:43:00 -4000
excerpt: Set up Travis CI for your site hosted by GitHub Pages.
categories: travis github-pages html-proofer
---

Wouldn't it be nice to run a test that checks for broken links for your site hosted by [GitHub Pages](https://pages.github.com)?

With [Travis CI](https://travis-ci.org), you can certainly do that!

First, login to [Travis](https://travis-ci.org) and _turn on the switch_ for your GitHub Pages repository.

Then add the [html-proofer](https://github.com/gjtorikian/html-proofer) gem to your `Gemfile`:

```sh
$ echo "gem 'html-proofer'" >> Gemfile
```

Create your [Travis configuration](https://docs.travis-ci.com/user/customizing-the-build):

```sh
$ touch .travis.yml
```

And add the following:

```yml
language: ruby
rvm:
    - 2.2
cache: bundler
env:
    global:
        # speeds up installation of html-proofer
        - NOKOGIRI_USE_SYSTEM_LIBRARIES=true
script:
    # replace `.` with the directory path of your site
    - bundle exec htmlproofer .
```

Finally, commit and push your changes to trigger the build on Travis.

If you have a [Jekyll](https://jekyllrb.com) site, then I recommend checking out the docs on [continuous integration](https://jekyllrb.com/docs/continuous-integration/). Feel free to use my [personal site](https://github.com/remarkablemark/remarkablemark.github.io) as a reference.

Also, Travis has a guide on [building a ruby project](https://docs.travis-ci.com/user/languages/ruby/).
