---
layout: post
title: How to minify JSON with jq
date: 2021-09-30 23:05:09
excerpt: How to minify a JSON string or file with jq.
categories: jq json
---

## String

Minify JSON string with [jq](https://stedolan.github.io/jq/):

```sh
echo '{ "foo": "bar" }' | jq -r tostring
```

Save the minified JSON string:

```sh
echo '{ "foo": "bar" }' | jq -r tostring > minified.json
```

## File

Minify JSON file with jq:

```sh
jq -r tostring file.json
```

Save the minified JSON file:

```sh
jq -r tostring file.json > minified.json
```
