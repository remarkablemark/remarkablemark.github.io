---
layout: post
title: Vagrant bundle error
date: 2017-02-01 22:23:00 -4000
excerpt: How to deal with the vagrant bundle error on Mac.
categories: vagrant bundle error
---

Recently, I had to downgrade <a href="https://www.vagrantup.com" target="_blank" data-proofer-ignore>vagrant</a> due to a project requirement.

However, when I reinstalled vagrant on Mac, I received a very strange error:

```
Bundler, the underlying system used to manage Vagrant plugins,
is reporting that a plugin or its dependency can't be found.
This is usually caused by manual tampering with the 'plugins.json'
file in the Vagrant home directory. To fix this error, please
remove that file and reinstall all your plugins using `vagrant
plugin install`.
```

I tried installing with [cask](https://caskroom.github.io) and the <a href="https://www.vagrantup.com/downloads.html" target="_blank" data-proofer-ignore>official installer</a>, but to no avail.

Later, I learned that not all vagrant directories were removed.

So the first thing I did was to remove `/opt/vagrant/`:

```sh
sudo rm -rf /opt/vagrant/
```

Unfortunately, that didn't resolve the issue.

Hence, I continued to remove `~/.vagrant.d/`:

```sh
rm -rf ~/.vagrant.d/
```

And that fixed the problem.

I was able to finish my reinstall of vagrant with no more hiccups.
