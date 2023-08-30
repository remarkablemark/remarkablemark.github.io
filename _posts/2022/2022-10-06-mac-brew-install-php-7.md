---
layout: post
title: How to install PHP 7 with Homebrew on macOS
date: 2022-10-06 14:00:02
updated: 2023-08-30 11:56:40
excerpt: How to install PHP 7 with Homebrew on macOS.
categories: mac php brew
---

Install PHP 7 with [Homebrew](https://brew.sh/):

```sh
brew install php@7.4
```

If you get the error:

```
Error: php@7.4 has been disabled because it is a versioned formula!
```

Then run:

```sh
brew tap shivammathur/php && brew install shivammathur/php/php@7.4
```

Symlink the formula:

```sh
brew link --force --overwrite php@7.4
```

Start the service:

```sh
brew services start php@7.4
```

Export the path if you're using [Zsh](https://wikipedia.org/wiki/Z_shell):

```bash
echo 'export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="/opt/homebrew/opt/php@7.4/sbin:$PATH"' >> ~/.zshrc
```

Or export the path if you're using [Bash](<https://wikipedia.org/wiki/Bash_(Unix_shell)>):

```bash
echo 'export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"' >> ~/.bashrc
echo 'export PATH="/opt/homebrew/opt/php@7.4/sbin:$PATH"' >> ~/.bashrc
```

See [Gist](https://gist.github.com/remarkablemark/69d385a039cd8258c642b377f6e55eb4):

{% gist 69d385a039cd8258c642b377f6e55eb4 %}
