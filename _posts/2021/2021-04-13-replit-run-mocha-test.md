---
layout: post
title: How to run Mocha tests on Replit
date: 2021-04-13 21:55:29
excerpt: How to run Mocha tests on Replit.
categories: replit mocha nodejs
---

Did you know you can run [Mocha](https://mochajs.org/) tests in [Replit](https://replit.com/)?

Create a Node.js repl with a `.replit` file that contains:

```
language = "nodejs"
run = "npx mocha"
```

Click `Run` to run your Mocha tests!

## Demo

[Replit](https://replit.com/@remarkablemark/Mocha#package.json):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Mocha?lite=true#package.json" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
