---
layout: post
title: Start a static HTTP web server
date: 2016-09-08 18:48:00
updated: 2020-12-31 19:27:28
excerpt: How to start a static HTTP web server using languages like Python, Node.js, Ruby, and PHP.
categories: http web static http server python node ruby php
---

Did you know it's easy to start an HTTP web server using some of your favorite programming languages?

- [Python](#python)
- [Node.js](#nodejs)
- [Ruby](#ruby)
- [PHP](#php)

## Prerequisites

Create a directory with an HTML file:

```sh
mkdir static
cd static
echo "<h1>Hello, world!</h1>" > index.html
```

## Python

Python 3:

```sh
python3 -m http.server
```

Python 2:

```sh
python -m SimpleHTTPServer
```

View your webpage at `localhost:8000`. To specify the port, pass the port number in the next argument:

```sh
python3 -m http.server 1337
python -m SimpleHTTPServer 1337
```

## Node.js

[`http-server`](https://www.npmjs.com/package/http-server):

```sh
npm install --global http-server
http-server
```

Or:

```sh
npx http-server
```

View your webpage at `localhost:8080`. To specify the port, use the `-p` flag:

```sh
http-server -p 1337
```

## Ruby

```sh
ruby -run -e httpd .
```

View your webpage at `localhost:8080`. To specify the port, use the `-p` flag:

```sh
ruby -run -e httpd . -p 1337
```

## PHP

```sh
php -S localhost:8000
```

View your webpage at `localhost:8000`. To specify the port, replace the port number in the command:

```sh
php -S localhost:1337
```
