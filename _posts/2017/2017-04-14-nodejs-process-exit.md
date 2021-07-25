---
layout: post
title: Node.js process exit
date: 2017-04-14 04:18:00 -4000
excerpt: To perform an action right before a Node.js script exits, you can listen to the process exit event.
categories: nodejs process
---

To perform an action right before a Node.js script exits, you can listen to [process exit](https://nodejs.org/api/process.html#process_event_exit):

```js
// script.js

process.on('exit', function() {
    console.log('exit');
});
```

Now when you run the script, `exit` is logged out:

```sh
node script
exit
```
