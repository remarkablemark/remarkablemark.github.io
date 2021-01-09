# [remarkablemark.org](https://b.remarkabl.org/mark)

[![Discord](https://img.shields.io/discord/422421589582282752.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/zkS3QDV)

[Site](https://b.remarkabl.org/mark) of [@remarkablemark](https://b.remarkabl.org/github). Built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/). Please [support](#support) this site and join our [Discord](https://discord.gg/zkS3QDV)!

## Prerequisites

[Ruby](https://www.ruby-lang.org/en/downloads/) 2.6.0:

```sh
$ ruby --version
```

If your version is behind, you can install ruby with [rbenv](https://github.com/rbenv/rbenv) or [RVM](https://rvm.io/).

### rbenv

Install and set up rbenv on macOS:

```sh
$ brew install rbenv
$ rbenv init
```

Reload or open a new shell:

```sh
$ curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
$ rbenv install 2.6.0
$ rbenv local 2.6.0
```

[Bundler](http://bundler.io/):

```sh
$ gem install bundler
$ bundler --version
```

## Installation

Clone repository:

```sh
$ git clone --recursive https://github.com/remarkablemark/remarkablemark.github.io.git
$ cd remarkablemark.github.io
```

Install dependencies:

```sh
$ bundle install
```

## Update

Update dependencies:

```sh
$ git checkout master
$ git pull
$ bundle update
```

## Run

### Development Server

```sh
$ bundle exec jekyll serve --livereload # --incremental --limit_posts 1
```

The server will be running at http://127.0.0.1:4000/:

```sh
$ open http://127.0.0.1:4000/
```

To stop the server, press `CTRL-C`.

### Production Build

```sh
$ bundle exec jekyll build
```

The site will be generated at `./_site/`.

## Testing

Use [HTMLProofer](https://github.com/gjtorikian/html-proofer) to validate HTML output (see [post](https://remarkablemark.org/blog/2017/01/31/travis-github-pages/)):

```sh
$ bundle exec jekyll build
$ bundle exec htmlproofer _site
```

## Support

- [GitHub Sponsors](https://b.remarkabl.org/github-sponsors)
- [Patreon](https://b.remarkabl.org/patreon)
- [Ko-fi](https://b.remarkabl.org/ko-fi)
- [Liberapay](https://b.remarkabl.org/liberapay)
- [Teepsring](https://b.remarkabl.org/teespring)

## License

Copyright © Menglin "Mark" Xu.
