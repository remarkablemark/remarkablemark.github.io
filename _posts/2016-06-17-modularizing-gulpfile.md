---
layout: post
title: Modularizing gulpfile
date: 2016-06-17 15:49:00
excerpt: To modularize your gulpfile, create a separate module for each gulp task.
categories: gulp task gulpfile javascript workflow automation
---

When you open `gulpfile.js`, do you feel overwhelmed by its size and complexity?

If so, then it's time to refactor the file. Luckily, modularizing our gulpfile shouldn't be difficult.

If you have the following file:

```js
// gulpfile.js
var gulp = require('gulp');

gulp.task('task1', function() {
    return console.log('task1');
});

gulp.task('task2', function() {
    return console.log('task2');
});
```

You can easily create separate modules and require them inside `gulpfile.js`:

```js
// task1.js
var gulp = require('gulp');

gulp.task('task1', function() {
    return console.log('task1');
});
```

```js
// task2.js
var gulp = require('gulp');

gulp.task('task2', function() {
    return console.log('task2');
});
```

```js
// gulpfile.js
require('./task1.js');
require('./task2.js');

// make sure you have gulp installed globally and locally: npm i -g gulp & npm i gulp
// run `gulp -T` to see your tasks
```

You can even organize your modules in a folder. Since the gulp working directory is dictated by where `gulpfile.js` is located, you don't have to update the path in `gulp.src` and `gulp.dest`. Isn't that awesome?

Check out my [example](https://gist.github.com/remarkablemark/3b0ba33f50deda729e9b82d2e6fa0d6c) below:

<script src="https://gist.github.com/remarkablemark/3b0ba33f50deda729e9b82d2e6fa0d6c.js"></script>


