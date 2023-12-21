---
layout: post
title: Google Apps Script environment variables
date: 2023-12-21 18:42:06
excerpt: How to store environment variables with Google Apps Script.
categories: google apps script environment variables javascript
---

This post goes over how to store environment variables with [Google Apps Script](https://www.google.com/script/start/).

## Prerequisites

Create a Google Apps Script in one of two ways:

1. Google Drive > New > More > Google Apps Script
2. Google Sheets > Extensions > Apps Scripts

## Script Properties

Add a [script property](https://developers.google.com/apps-script/reference/properties):

1. Apps Script > Project Settings > Script Properties > Add script property

## Google Apps Script

Get all properties:

```js
function getEnv() {
  return PropertiesService.getScriptProperties().getProperties();
}

console.log(getEnv());
```

Get property value by name:

```js
function getEnv(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

console.log(getEnv('MY_SECRET_KEY'));
```
