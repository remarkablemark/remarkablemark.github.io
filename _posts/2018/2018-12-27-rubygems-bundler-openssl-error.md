---
layout: post
title: Fixing RubyGems/Bundler SSL error
date: 2018-12-27 19:25:05 -4000
excerpt: How I resolved a RubyGems/Bundler SSL/TSL error, which was caused by an outdated version of OpenSSL being used to compile Ruby.
categories: rubygems bundler openssl ruby gem rbenv brew ssl tsl troubleshooting
---

> TL;DR: Skip to the [solution](#solution).

## Background

Recently, I upgraded my [homebrew](https://brew.sh/) packages but I was still on **OS X El Capitan**.

Although I had installed `ruby` with brew, my global `ruby` showed up as:

```sh
$ which ruby
/usr/bin/ruby
$ ruby -v
ruby 2.0.0p645 (2015-04-13 revision 50299) [universal.x86_64-darwin15]
```

Accordingly, my `gem` version was:

```sh
$ gem env version
2.0.14
```

## Problem

When I tried to run the Jekyll server with [Bundler](https://bundler.io/), I received the error:

```sh
$ bundle exec jekyll serve
Traceback (most recent call last):
        2: from /usr/local/bin/bundle:22:in `<main>'
        1: from /usr/local/Cellar/ruby/2.6.0/lib/ruby/2.6.0/rubygems.rb:302:in `activate_bin_path'
/usr/local/Cellar/ruby/2.6.0/lib/ruby/2.6.0/rubygems.rb:283:in `find_spec_for_exe': Could not find 'bundler' (1.16.1) required by your path/to/project/Gemfile.lock. (Gem::GemNotFoundException)
To update to the latest version installed on your system, run `bundle update --bundler`.
To install the missing version, run `gem install bundler:1.16.1`
```

I followed the recommendation to update Bundler:

```sh
$ bundle update --bundler
Traceback (most recent call last):
        2: from /usr/local/bin/bundle:22:in `<main>'
        1: from /usr/local/Cellar/ruby/2.6.0/lib/ruby/2.6.0/rubygems.rb:302:in `activate_bin_path'
/usr/local/Cellar/ruby/2.6.0/lib/ruby/2.6.0/rubygems.rb:283:in `find_spec_for_exe': can't find gem bundler (>= 0.a) with executable bundle (Gem::GemNotFoundException)
```

But that didn't fix the problem. I tried installing Bundler as well:

```sh
$ gem install bundler
ERROR:  Could not find a valid gem 'bundler' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv2/v3 read server hello A: tlsv1 alert protocol version (https://rubygems.org/latest_specs.4.8.gz)
```

But also no dice.

## Troubleshooting

I ran the [SSL check](https://bundler.io/v1.16/guides/rubygems_tls_ssl_troubleshooting_guide.html#solutions-for-ssl-issues#automated-ssl-check) and got the following:

```sh
$ ruby -ropen-uri -e 'eval open("https://git.io/vQhWq").read'
Here's your Ruby and OpenSSL environment:

Ruby:           2.0.0p645 (2015-04-13 revision 50299) [universal.x86_64-darwin15]
RubyGems:       2.0.14
Compiled with:  OpenSSL 0.9.8zc 19 Mar 2015
Loaded version: OpenSSL 0.9.8zg 14 July 2015
SSL_CERT_FILE:  /System/Library/OpenSSL/cert.pem
SSL_CERT_DIR:   /System/Library/OpenSSL/certs

With that out of the way, let's see if you can connect to rubygems.org...

Bundler connection to rubygems.org:       failed  ❌  (uninitialized constant Bundler)
RubyGems connection to rubygems.org:      failed  ❌  (SSL/TLS protocol version mismatch)
Ruby net/http connection to rubygems.org: failed  ❌

Unfortunately, this Ruby can't connect to rubygems.org. 😡
Your Ruby can't connect to rubygems.org because your version of OpenSSL is too old. You'll need to upgrade your OpenSSL install and/or recompile Ruby to use a newer OpenSSL.
```

It seems that RubyGems version >=2 no longer works with OpenSSL version <1 as the SSL/TLS protocol has been updated.

I followed the official [troubleshooting guide](https://bundler.io/v1.16/guides/rubygems_tls_ssl_troubleshooting_guide.html) but I still encountered some difficulty. Ultimately, I was able to solve the issue with 3 steps.

## Solution

The steps that resolved the problem were:

1. [Uninstall Ruby from Homebrew](#uninstall-ruby-from-homebrew)
2. [Install or upgrade OpenSSL](#install-or-upgrade-openssl)
3. [Install Ruby with rbenv](#install-ruby-with-rbenv)

### Uninstall Ruby from Homebrew

```sh
$ brew uninstall ruby
```

If you get the following error:

```
Error: Refusing to uninstall /usr/local/Cellar/ruby/2.6.0
because it is required by vim, which is currently installed.
You can override this and force removal with:
  brew uninstall --ignore-dependencies ruby
```

I recommend you continue with the uninstallation because you'll reinstall ruby in the following step.

### Install or upgrade OpenSSL

```sh
$ brew install openssl # or brew upgrade openssl
```

If you get something like:

```sh
$ which openssl
/usr/bin/openssl
$ openssl version -a
OpenSSL 0.9.8zg 14 July 2015
built on: Jul 31 2015
platform: darwin64-x86_64-llvm
options:  bn(64,64) md2(int) rc4(ptr,char) des(idx,cisc,16,int) blowfish(idx)
compiler: -arch x86_64 -fmessage-length=0 -pipe -Wno-trigraphs -fpascal-strings -fasm-blocks -O3 -D_REENTRANT -DDSO_DLFCN -DHAVE_DLFCN_H -DL_ENDIAN -DMD32_REG_T=int -DOPENSSL_NO_IDEA -DOPENSSL_PIC -DOPENSSL_THREADS -DZLIB -mmacosx-version-min=10.6
OPENSSLDIR: "/System/Library/OpenSSL"
```

It means you're still not using the correct binary. Follow the installation instructions and add the path to your shell configuration file:

```sh
# if you're using bash
$ echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bashrc
$ source ~/.bashrc

# or if you're using zsh
$ echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
```

Confirm that the binary and version are correct now:

```sh
$ which openssl
/usr/local/opt/openssl/bin/openssl
$ openssl version -a
OpenSSL 1.0.2q  20 Nov 2018
built on: reproducible build, date unspecified
platform: darwin64-x86_64-cc
options:  bn(64,64) rc4(ptr,int) des(idx,cisc,16,int) idea(int) blowfish(idx)
compiler: clang -I. -I.. -I../include  -fPIC -fno-common -DOPENSSL_PIC -DOPENSSL_THREADS -D_REENTRANT -DDSO_DLFCN -DHAVE_DLFCN_H -arch x86_64 -O3 -DL_ENDIAN -Wall -DOPENSSL_IA32_SSE2 -DOPENSSL_BN_ASM_MONT -DOPENSSL_BN_ASM_MONT5 -DOPENSSL_BN_ASM_GF2m -DSHA1_ASM -DSHA256_ASM -DSHA512_ASM -DMD5_ASM -DAES_ASM -DVPAES_ASM -DBSAES_ASM -DWHIRLPOOL_ASM -DGHASH_ASM -DECP_NISTZ256_ASM
OPENSSLDIR: "/usr/local/etc/openssl"
```

Looking good!

### Install Ruby with rbenv

Now you can reinstall ruby with [rbenv](https://github.com/rbenv/rbenv) or [rvm](https://github.com/rvm/rvm) (they're both version managers):

```sh
$ brew install rbenv
$ rbenv init # follow the instructions
```

Make sure to reload your shell so `rbenv` is initialized correctly:

```sh
# if you're using bash
$ source ~/.bashrc

# or if you're using zsh
$ source ~/.zshrc
```

Now install `ruby`:

```sh
$ rbenv install 2.6.0
ruby-build: use openssl from homebrew
Downloading ruby-2.6.0.tar.bz2...
-> https://cache.ruby-lang.org/pub/ruby/2.6/ruby-2.6.0.tar.bz2
Installing ruby-2.6.0...
ruby-build: use readline from homebrew
Installed ruby-2.6.0 to ~/.rbenv/versions/2.6.0
```

And set it as the global:

```sh
$ rbenv global 2.6.0
```

You know your `ruby` compiled correctly when it's built off the `openssl` binary from homebrew.

I had to reinstall my project gems given the fresh ruby binary, but after that, I was able to get my Jekyll server running again:

```sh
$ bundle install
$ bundle exec jekyll serve
```

Success!
