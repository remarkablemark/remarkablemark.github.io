---
layout: post
title: How to disable React Developer Tools
date: 2017-01-25 19:00:00 -4000
excerpt: How to disable React Developer Tools.
categories: react devtools javascript
---

[React Developer Tools](https://b.remarkabl.org/2ive9aF) can be opened with any _React_ app.

This makes sense for **development**, but what about **production**? I ask this because any user can technically use devtools to poke around your app.

Luckily, there's a way to disable it. All you need to do is override the devtools global hook _before React is loaded_:

```html
<!-- index.html -->
<script>
    // before React is loaded
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
    }
</script>
```

You can find more information by checking out the [issue](https://github.com/facebook/react-devtools/issues/191).
