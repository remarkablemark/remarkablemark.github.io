---
layout: post
title: How to touch a file in Node.js
date: 2017-12-17 16:44:13
updated: 2019-07-20 23:08:43
excerpt: How to touch a file in Node.js using synchronous and asynchronous `fs` methods.
categories: touch file nodejs javascript
---

## Create file

To create an empty file in [Node.js](https://nodejs.org/):

```js
const fs = require('fs');
const filename = 'file.txt';
fs.closeSync(fs.openSync(filename, 'w'));
```

Here, a (blank) file is written with [fs.openSync](https://nodejs.org/api/fs.html#fs_fs_opensync_path_flags_mode) and then closed with [fs.closeSync](https://nodejs.org/api/fs.html#fs_fs_closesync_fd).

## touch file

To `touch` a file, however, requires a bit more work (_credit [boutell](https://disq.us/p/21rurrt)_):

```js
const fs = require('fs');
const filename = 'file.txt';
const time = new Date();

try {
  fs.utimesSync(filename, time, time);
} catch (err) {
  fs.closeSync(fs.openSync(filename, 'w'));
}
```

[fs.utimesSync](https://nodejs.org/api/fs.html#fs_fs_utimessync_path_atime_mtime) is used here to prevent existing file contents from being overwritten.

It also updates the last modification timestamp of the file, which is consistent with what POSIX `touch` does.

### Callback

To do this asynchronously, we can use the non-blocking methods [fs.close](https://nodejs.org/api/fs.html#fs_fs_close_fd_callback), [fs.open](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback), [fs.utimes](https://nodejs.org/api/fs.html#fs_fs_utimes_path_atime_mtime_callback):

```js
const fs = require('fs');
const filename = 'file.txt';
const time = new Date();

fs.utimes(filename, time, time, err => {
  if (err) {
    fs.open(filename, 'w', (err, fd) => {
      if (err) throw err;
      fs.close(fd, err => {
        if (err) throw err;
      });
    });
  }
});
```

## Examples

You can find a list of approaches in the [Gist](https://gist.github.com/remarkablemark/17c9c6a22a41510b2edfa3041ccca95a) below:

{% gist 17c9c6a22a41510b2edfa3041ccca95a %}
