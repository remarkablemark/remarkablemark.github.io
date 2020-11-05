---
layout: post
title: How to install an older homebrew package
date: 2017-02-03 23:53:00
updated: 2020-11-04 20:04:20
excerpt: How to install an older homebrew package or formula.
categories: homebrew composer
---

Did you know it's possible to install an older version of a [homebrew](https://brew.sh/) package or formula?

Previously, you would do this by installing an older formula URL:

```sh
brew install <FORMULA_URL>
```

However, this no longer works:

```
Error: Calling Installation of <FORMULA> from a GitHub commit URL is disabled! Use 'brew extract <FORMULA>' to stable tap on GitHub instead.
```

Now, you need to replace the [core](https://github.com/Homebrew/homebrew-core/find/master) or [cask](https://github.com/Homebrew/homebrew-cask) formula before installing:

```sh
# copy formula code
pbpaste > $(find $(brew --repository) -name <FORMULA>.rb)
brew install <FORMULA>
```

## Example

The following steps outline how to install [composer](https://getcomposer.org/) version `1.10.15`.

### Prerequisites

Uninstall composer:

```sh
brew uninstall composer
```

Update brew:

```sh
brew update
```

### Find the Formula

Find the formula in [homebrew-core](https://github.com/Homebrew/homebrew-core/find/master) or [homebrew-cask](https://github.com/Homebrew/homebrew-cask/find/master):

![Find formula]({{ "/images/2020/2020-11-04-homebrew-core-find-composer.png" | prepend: site.assets_path }})

The formula filename should be `composer.rb`.

Open the [file](https://github.com/Homebrew/homebrew-core/blob/master/Formula/composer.rb) and click [History](https://github.com/Homebrew/homebrew-core/commits/eb56ac0aba935d203d0e5833e50f75360f3bf5be/Formula/composer.rb):

![Click History]({{ "/images/2020/2020-11-04-homebrew-core-composer-history.png" | prepend: site.assets_path }})

Browse through the history and find the commit you want:

![Browse commit history]({{ "/images/2020/2020-11-04-homebrew-core-composer-commit.png" | prepend: site.assets_path }})

Go to the [commit](https://github.com/Homebrew/homebrew-core/commit/9e6e6a1ca8551901bff69d329c7fbb9007064134#diff-ced640e69fef80e26244a11c06d6b5f6a8a2bc478643ffcf7697cb3c370786fd), click the ellipsis next to the file, and click [View file](https://github.com/Homebrew/homebrew-core/blob/9e6e6a1ca8551901bff69d329c7fbb9007064134/Formula/composer.rb):

![View file]({{ "/images/2020/2020-11-04-homebrew-core-composer-view-file.png" | prepend: site.assets_path }})

Click [Raw](https://raw.githubusercontent.com/Homebrew/homebrew-core/9e6e6a1ca8551901bff69d329c7fbb9007064134/Formula/composer.rb) to open the raw file:

![Click Raw]({{ "/images/2020/2020-11-04-homebrew-core-composer-raw.png" | prepend: site.assets_path }})

### Replace the Formula

Select and copy the raw formula:

![Copy code]({{ "/images/2020/2020-11-04-homebrew-core-composer-raw-select.png" | prepend: site.assets_path }})

Open the local formula on your machine:

```sh
find $(brew --repository) -name composer.rb
```

Paste the copied formula so it replaces the local formula:

```sh
pbpaste > $(find $(brew --repository) -name composer.rb)
```

Install the formula:

```sh
brew install composer
```

Once that's done, undo the changes to the formula:

```sh
cd $(find $(brew --repository) -name composer.rb -exec dirname {} \;)
git checkout .
```

Pin the formula to prevent accidental upgrade:

```sh
brew pin composer
```

## Resources

Homebrew documentation:

- [Homebrew Core](https://github.com/Homebrew/homebrew-core)
- [Homebrew Cask](https://github.com/Homebrew/homebrew-cask)
- [Formula Cookbook](https://docs.brew.sh/Formula-Cookbook)
