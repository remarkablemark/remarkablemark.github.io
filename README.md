# [remarkablemark.org](https://b.remarkabl.org/mark)

[Site](https://b.remarkabl.org/mark) of [@remarkablemark](https://b.remarkabl.org/github). Built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/).

If you found the site helpful, please consider [**supporting**](#support) it!

## Requirements

[Ruby](https://www.ruby-lang.org/en/downloads/) 2+:

```sh
$ ruby --version
```

[Bundler](http://bundler.io/):

```sh
# gem install bundler
$ bundler --version
```

## Installation

Clone the repository:

```sh
$ git clone https://github.com/remarkablemark/remarkablemark.github.io.git
$ cd remarkablemark.github.io
```

Install dependencies:

```sh
$ bundle install
```

## Update

To update the gem dependencies:

```sh
# git checkout master
$ git pull
$ bundle update
```

## Run

### Development server

```sh
$ bundle exec jekyll serve --livereload # --incremental --limit_posts 1
```

The server will be running at http://127.0.0.1:4000/:

```sh
$ open http://127.0.0.1:4000/
```

Press `CTRL-C` to stop the server.

### Production build

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

Donations are welcome:

- [Patreon](https://b.remarkabl.org/patreon)
- [Ko-fi](https://b.remarkabl.org/ko-fi)
- [Liberapay](https://b.remarkabl.org/liberapay)

We also have merch:

- [Teepsring](https://b.remarkabl.org/teespring)

## License

Copyright © Menglin "Mark" Xu.
