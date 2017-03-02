---
layout: post
title: Installing an older homebrew package
date: 2017-02-04 03:53:00 -4000
excerpt: How to install an older or specific version of a homebrew package.
categories: homebrew package
---

When installing a package with [homebrew](http://brew.sh), you'll most likely get the latest version.

Usually that's okay, but what if you need an _older_ version of that package?

In such a scenario, you can install from an older formula url:

```sh
$ brew install <formula_url>
```

### Example

Let's say you want to install `chromedriver` version **2.22**.

First, uninstall `chromedriver` if it's already installed:

```sh
$ brew rm chromedriver
```

Now find the [formula](https://github.com/Homebrew/homebrew-core/tree/master/Formula) in [homebrew-core](https://github.com/Homebrew/homebrew-core):

![Find chromedriver formula]({{ "/images/2017/2017-02-03-brew-chromedriver-formula.png" | prepend: site.assets_path }})

The formula filename should be `chromedriver.rb`.

Open the [file](https://github.com/Homebrew/homebrew-core/blob/master/Formula/chromedriver.rb) in GitHub and click **History**.

Use the _commit message_ as a reference to find the version that you desire:

![Browse chromedriver history]({{ "/images/2017/2017-02-03-brew-chromedriver-history.png" | prepend: site.assets_path }})

Open the [file](https://github.com/Homebrew/homebrew-core/blob/14c7f7415bd2feaf49def7ad53fe5f6eb32f9265/Formula/chromedriver.rb) at that point in history.

Finally, click on **Raw** to get the url of the raw file.

Copy it and paste it after `brew install`:

```sh
$ brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/14c7f7415bd2feaf49def7ad53fe5f6eb32f9265/Formula/chromedriver.rb
```

Voila, you have an older version of `chromedriver` installed with brew!
