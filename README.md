# [remarkablemark.org](https://remarkablemark.org)

[Site](https://remarkablemark.org) of [remarkablemark](https://github.com/remarkablemark). Built with [Jekyll](https://jekyllrb.com) and hosted on [GitHub Pages](https://pages.github.com).

## Requirements

You need [Ruby](https://www.ruby-lang.org/en/downloads/) 2.1.0 or higher:

```sh
$ ruby --version
```

And [Bundler](http://bundler.io):

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

Then install gem dependencies:

```sh
$ bundle install
```

## Update

You should update your gem dependencies from time-to-time:

```sh
# git checkout master
$ git pull
$ bundle update
```

## Run

### Development server:

```sh
$ bundle exec jekyll serve
```

The server will be running at [`http://127.0.0.1:4000/`](http://127.0.0.1:4000/).

Press `CTRL-C` to stop the server.

### Production build:

```sh
$ bundle exec jekyll build
```

Your site will be generated at `./_site/`.

## Testing

Use [HTMLProofer](https://github.com/gjtorikian/html-proofer) to validate HTML output (see [post](https://remarkablemark.org/blog/2017/01/31/travis-github-pages/)):

```sh
$ bundle exec jekyll build
$ bundle exec htmlproofer _site
```

## License

Copyright © Menglin "Mark" Xu.
