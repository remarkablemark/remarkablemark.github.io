---
layout: post
title: Modularizing gulpfile
date: 2016-06-17 19:49:00 -4000
excerpt: A gulpfile can be modularized by splitting each task into its own file.
categories: gulp
---

Modularizing `gulpfile.js` is as easy as separating each gulp task into its own file.

Imagine you have the following:

```js
// gulpfile.js

var gulp = require('gulp');

gulp.task('task1', function() {
    return console.log('running task1');
});

gulp.task('task2', function() {
    return console.log('running task2');
});
```

You can modularize the file like so:

```js
// task1.js

var gulp = require('gulp');

gulp.task('task1', function() {
    return console.log('running task1');
});
```

```js
// task2.js

var gulp = require('gulp');

gulp.task('task2', function() {
    return console.log('running task2');
});
```

```js
// gulpfile.js

require('./task1');
require('./task2');

// make sure you have gulp installed globally and locally:
// `npm i -g gulp & npm i gulp`

// to see all tasks, run `gulp -T`
```

You can even organize them in a directory. Because the gulp working directory is determined by where `gulpfile.js` is located, `gulp.src` and `gulp.dest` still works as expected.

See [example](https://gist.github.com/remarkablemark/3b0ba33f50deda729e9b82d2e6fa0d6c):

{% gist 3b0ba33f50deda729e9b82d2e6fa0d6c %}
