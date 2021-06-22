---
layout: post
title: Heroku API Key
date: 2021-06-21 20:11:00
excerpt: How to generate a Heroku API key or authorization token.
categories: heroku api key
---

This post goes over how to generate a Heroku API key or authorization token.

## Prerequisites

[Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli):

```sh
brew tap heroku/brew && brew install heroku
```

Login to your Heroku account:

```sh
heroku login
```

## Heroku API Key

You can view your Heroku API key by going to [`Account settings`](https://dashboard.heroku.com/account) > `API Key` > `Reveal`.

### auth:token

To get your current CLI authentication token:

```sh
heroku auth:token
```

Output:

```
 ›   Warning: token will expire 07/18/2021
 ›   Use heroku authorizations:create to generate a long-term token
d5540a95-474a-4feb-b695-464ce054c449
```

> This token should be used for **development**.

### authorizations:create

To generate a long-term token for **production**:

```sh
heroku authorizations:create
```

Output:

```
Creating OAuth Authorization... done
Client:      <none>
ID:          219bcaef-1385-4b17-aec9-50c3cb3b281a
Description: Long-lived user authorization
Scope:       global
Token:       ef54bc85-b47a-46cf-bdb8-abb4eb280c5e
Updated at:  Mon Jun 21 2021 20:11:00 GMT-0400 (Eastern Daylight Time) (less than a minute ago)
```

### authorizations

To see your Heroku authorizations:

```sh
heroku authorizations
```

Output:

```
Heroku CLI                     8cd0710b-be7d-4802-a3d0-825b77a4b111  global
Heroku CLI login from 0.0.0.0  fb7c3fe5-bed6-4ee3-8c29-52274c2c0d22  global
Long-lived user authorization  219bcaef-1385-4b17-aec9-50c3cb3b281a  global
```

### authorizations:revoke

To revoke an authorization:

```sh
heroku authorizations:revoke 219bcaef-1385-4b17-aec9-50c3cb3b281a
```

Output:

```
Revoking OAuth Authorization...
done, revoked authorization from Long-lived user authorization
```

> Make sure to revoke the ID and not the token.

## Usage

To use the API key in a cURL request:

```sh
curl https://api.heroku.com/pipelines \
  --header 'Accept: application/vnd.heroku+json; version=3' \
  --header 'Authorization: Bearer ef54bc85-b47a-46cf-bdb8-abb4eb280c5e'
```

> Make sure to pass the token and not the ID in `Authorization: Bearer $TOKEN` header.

## Resources

- [How should I generate an API key that allows me to use the Heroku Platform API?](https://help.heroku.com/PBGP6IDE/how-should-i-generate-an-api-key-that-allows-me-to-use-the-heroku-platform-api)
