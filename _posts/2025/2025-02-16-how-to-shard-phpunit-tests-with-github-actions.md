---
layout: post
title: How to shard PHPUnit tests with GitHub Actions
date: 2025-02-16 14:21:39
excerpt: How to shard PHPUnit tests with GitHub Actions using find-and-split and the matrix strategy.
categories: github actions phpunit test ci
---

This post goes over how to shard [PHPUnit](https://phpunit.de/) tests with [GitHub Actions](https://github.com/features/actions).

## Motivation

If you run your PHPUnit tests sequentially in GitHub Actions, it can take a long time if you have a lot of tests.

With test sharding, you divide your tests to speed up test runtime. As a result, this means your tests run in parallel for faster build times.

Although you can write a Bash script to do this, there's already a GitHub Action called [find-and-split]({% post_url 2025/2025-02-15-find-and-split-github-action %}) that automates this for you.

## Test Sharding

Let's say you have a GitHub Actions workflow that runs PHPUnit tests sequentially:

{% raw %}

```yml
# .github/workflows/test.yml
name: test
on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Install dependencies
        run: composer install

      - name: Run tests
        run: vendor/bin/phpunit tests
```

{% endraw %}

With [find-and-split](https://github.com/marketplace/actions/find-and-split) and the [matrix strategy](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow), you can split your tests into 2 jobs based on the number of test files:

{% raw %}

```diff
 # .github/workflows/test.yml
 name: test
 on: push

 jobs:
   test:
     runs-on: ubuntu-latest
+    strategy:
+      matrix:
+        shard: [1/2, 1/2]

     steps:
       - name: Checkout repository
         uses: actions/checkout@v5

       - name: Install dependencies
         run: composer install

+      - name: Find and split files
+        uses: remarkablemark/find-and-split@v1
+        id: tests
+        with:
+          chunk: ${{ matrix.shard }}
+          directory: tests
+          pattern: '*Test.php'

       - name: Run tests
-        run: vendor/bin/phpunit tests
+        run: vendor/bin/phpunit ${{ steps.tests.outputs.files }}
```

{% endraw %}

## Resources

For more details, check out the [test repository](https://github.com/remarkablemark/phpunit-test-sharding).
