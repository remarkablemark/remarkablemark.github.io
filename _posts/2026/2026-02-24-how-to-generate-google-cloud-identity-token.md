---
layout: post
title: How to generate Google Cloud identity token
date: 2026-02-24 18:48:38
excerpt: How to generate a Google Cloud identity token with the CLI and Node.js.
categories: google cloud token cli nodejs javascript
---

This post goes over how to generate a Google Cloud [ID token](https://docs.cloud.google.com/docs/authentication/get-id-token) (OIDC):

- [CLI](#cli)
- [Node.js](#nodejs)

## CLI

Assuming you're logged in to Google Cloud:

```sh
gcloud auth login
```

[Print identity token](https://docs.cloud.google.com/sdk/gcloud/reference/auth/print-access-token):

```sh
gcloud auth print-identity-token
```

The output should look like:

```
eyJhbGciOiJSUzI1NiIsImtpZCI6ImQyNzU0MDdjMzllODAzNmFhNzM1ZWIyYzE3YzU0ODc2MWNlZDZhN...
```

## Node.js

Install [`google-auth-library`](https://www.npmjs.com/package/google-auth-library):

```sh
npm install google-auth-library
```

Create the script:

```js
// token.mjs
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth();
const client = await auth.getIdTokenClient();
const headers = await client.getRequestHeaders();
console.log(headers);
```

Run the script:

```sh
node token.mjs
```

The output should look like:

```json
{
  "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQyNzU0MDdjMzllODAzNmFhN..."
}
```

To get just ID token from the headers:

```js
console.log(headers.Authorization.split(' ')[1]);
```

Or simply fetch the token:

```js
const token = await client.idTokenProvider.fetchIdToken(targetAudience);
console.log(token);
```
