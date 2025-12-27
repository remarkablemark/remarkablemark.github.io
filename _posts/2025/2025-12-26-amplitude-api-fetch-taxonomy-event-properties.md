---
layout: post
title: Fetch Amplitude taxonomy event properties with JS
date: 2025-12-26 20:39:37
excerpt: How to fetch Amplitude taxonomy event properties with JavaScript.
categories: amplitude javascript fetch
---

This post goes over how to fetch [Amplitude taxonomy](https://amplitude.com/docs/apis/analytics/taxonomy#get-event-properties) event properties with JavaScript.

## Keys

Find your [keys](https://amplitude.com/docs/apis/authentication) in [**Organization settings**](https://analytics.amplitude.com/amp-dev-docs/settings/projects) > **Projects**:

- API Key
- Secret Key

## Credentails

Create a script:

```sh
touch fetch-amplitude.js
```

Encode your credentials with base64:

```js
// fetch-amplitude.js
const apiKey = '1234567890abcdef1234567890abcdef';
const secretKey = 'abcdef1234567890abcdef1234567890';

const credentials = Buffer.from(`${apiKey}:${secretKey}`, 'utf8').toString(
  'base64',
);
```

## Authentication

Make a GET request with your credentials:

```js
// fetch-amplitude.js
// ...
const url = 'https://amplitude.com/api/2/taxonomy/event-property';

const response = fetch(url, {
  headers: {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

response.then((body) => body.json()).then((data) => console.log(data));
```

Verify that the response is successful:

```sh
node fetch-amplitude.js
```

If a key is invalid, you'll get the error:

```json
{
  "error": {
    "http_code": 403,
    "type": "unspecified",
    "message": "Unspecified Error",
    "metadata": { "details": "Invalid API Key" }
  }
}
```

## Params

Pass the `event_type` as a query string parameter:

```js
// fetch-amplitude.js
// ...
const params = new URLSearchParams({
  event_type: '[Amplitude] Page Viewed',
});

const response = fetch(url + '?' + params.toString(), {
  headers: {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
// ...
```

> Note that the url will look like:
>
> ```
> https://amplitude.com/api/2/taxonomy/event-property?event_type=%5BAmplitude%5D+Page+Viewed
> ```

If it worked, then you should see the following:

```json
{ "success": true, "data": [] }
```

If your event has properties, you'll see something like:

```json
{
  "success": true,
  "data": [
    {
      "event_property": "label",
      "event_type": "[Amplitude] Page Viewed",
      "description": "Some description",
      "type": "string",
      "regex": null,
      "enum_values": null,
      "is_array_type": false,
      "is_required": true
    }
  ]
}
```

## Script

Here's the full script:

```js
// fetch-amplitude.js
const apiKey = '1234567890abcdef1234567890abcdef';
const secretKey = 'abcdef1234567890abcdef1234567890';

const credentials = Buffer.from(`${apiKey}:${secretKey}`, 'utf8').toString(
  'base64',
);

const url = new URL('https://amplitude.com/api/2/taxonomy/event-property');
url.searchParams.append('event_type', '[Amplitude] Page Viewed');

const response = fetch(url.toString(), {
  headers: {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

response.then((body) => body.json()).then((data) => console.log(data));
```
