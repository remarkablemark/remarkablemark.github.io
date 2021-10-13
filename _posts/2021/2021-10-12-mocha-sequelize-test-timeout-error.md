---
layout: post
title: Mocha timeout errors for Sequelize
date: 2021-10-12 21:55:00
excerpt: How to fix Mocha timeout errors for Sequelize integration tests.
categories: mocha sequelize test postgres sql
---

This post goes over how to fix [Mocha](https://mochajs.org/) timeout errors for [Sequelize](https://sequelize.org/) integration tests.

## Problem

My Sequelize integration tests were failing with the error:

```
1) "after all" hook in "{root}"

Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.
```

## Solution

I found that this was related to the [connection pool](https://sequelize.org/master/manual/connection-pool.html) (it was too low in my Sequelize config).

I checked the maximum database connection pool size:

```sql
SHOW max_connections;
```

The PostgreSQL database I was using has a maximum connection pool of 100.

Since my integration tests run on 3 processes, I set the max pool size to 30 so the total number (90) is below the max connection pool limit (100).

After updating the [Sequelize options](https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database):

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(/* ... */, {
  // ...
  pool: {
    max: 30,
  },
});
```

I reran the tests:

```sh
npx mocha
```

While monitoring the realtime activity:

```sql
SELECT COUNT(*)
FROM pg_stat_activity;
```

And my integration tests passed without a timeout error. Success!
