---
layout: post
title: Starting a simple HTTP server
date: 2016-09-08 18:48:00 -4000
excerpt: Quick and easy ways to start a static HTTP server using languages like Python, Node.js, Ruby, and PHP.
categories: http web server python node ruby php
---

Did you know you can start a web server using some of your favorite languages? It's easy!

Feel free to create a directory with a basic HTML file before diving in:

```sh
$ mkdir web
$ cd web
$ echo "Hello world" > index.html
```

### Python

```sh
$ python -m SimpleHTTPServer

# view your files
$ open http://localhost:8000
```

### Node.js

```sh
$ npm install -g http-server
$ http-server

# view your files
$ open http://localhost:8080
```

### Ruby

```sh
$ ruby -run -e httpd . -p 8000

# view your files
$ open http://localhost:8000
```

### PHP

```sh
$ php -S localhost:8000

# view your files
$ open http://localhost:8000
```
