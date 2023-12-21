---
layout: post
title: Google Apps Script fetch JSON
date: 2023-12-21 15:51:48
excerpt: How to fetch JSON with Google Apps Script.
categories: google apps script fetch json javascript
---

This post goes over how to fetch JSON with [Google Apps Script](https://www.google.com/script/start/).

## Prerequisites

Create a Google Apps Script in one of two ways:

1. Google Drive > New > More > Google Apps Script
2. Google Sheets > Extensions > Apps Scripts

## Google Apps Script

Perform a GET request to [https://example.com/](https://example.com/):

```js
function getHTML() {
  const url = 'https://example.com/';
  const response = UrlFetchApp.fetch(url);
  const html = response.getContentText();
  console.log(html);
}
```

Perform a GET request to [https://httpbin.org/json](https://httpbin.org/json):

```js
function getJSON() {
  const url = 'https://httpbin.org/json';
  const response = UrlFetchApp.fetch(url);
  const json = JSON.parse(response.getContentText());
  console.log(json);
}
```

Perform a POST request to [https://httpbin.org/anything](https://httpbin.org/anything):

```js
function postJSON() {
  const url = 'https://httpbin.org/anything';
  const params = {
    method: 'post',
    payload: { foo: 'bar' },
  };
  const response = UrlFetchApp.fetch(url, params);
  const json = JSON.parse(response.getContentText());
  console.log(json);
}
```

Notice in the logs how the payload shows up in the `form` field because the `contentType` defaults to `'application/x-www-form-urlencoded'`.

To properly POST JSON:

```diff
 function postJSON() {
   const url = 'https://httpbin.org/anything';
   const params = {
     method: 'post',
+    contentType: 'application/json',
-    payload: { foo: 'bar' },
+    payload: JSON.stringify({ foo: 'bar' }),
   };
   const response = UrlFetchApp.fetch(url, params);
   const json = JSON.parse(response.getContentText());
   console.log(json);
 }
```

The payload now shows up in the `data` field in the logs.

Check out [`UrlFetchApp.fetch`](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app) for more details.
