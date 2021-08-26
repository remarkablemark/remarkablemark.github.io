---
layout: post
title: How to curl AB Connect (Bash)
date: 2020-10-13 22:17:48
excerpt: How to curl Certica's AB Connect v4.1 using Bash.
categories: curl abconnect bash
---

This post goes over how to curl Certica's Academic Benchmarks API. We're using [AB Connect 4.1](https://abconnect.docs.apiary.io/).

## Credentials

Set the partner ID and key:

```sh
PARTNER_ID=demo4
PARTNER_KEY=exMSobPnS7F0s/u/aKtakg
```

## Authentication

Generate your [auth signature](https://abconnect.docs.apiary.io/#introduction/authentication). The signature consists of:

- expires\*
- user id
- HTTP method
- resource

> \*The access expiration expressed in seconds since epoch. This is the only required field.

### Expires

On Linux, to get expires 1 hour from now:

```sh
AUTH_EXPIRES=$(date -d 'today 1 hour' +%s)
```

On Mac, to get expires 1 hour from now:

```sh
AUTH_EXPIRES=$(date -j -v +1H -f "%Y-%m-%d" $(date +%Y-%m-%d) +%s)
```

### Message

Generate your message by concatenating the fields with a [newline](https://en.wikipedia.org/wiki/Newline) character:

```sh
MESSAGE=$(echo -e "$AUTH_EXPIRES\n$USER_ID\n$HTTP_METHOD\n$RESOURCE")
```

### Signature

Hash the message with [HMAC](https://en.wikipedia.org/wiki/HMAC) SHA-256 and encode the binary output using [Base64](https://en.wikipedia.org/wiki/Base64):

```sh
AUTH_SIGNATURE=$(
  echo -n $MESSAGE | \
  openssl sha256 -hmac $PARTNER_KEY -binary | \
  base64
)
```

## cURL

The standards endpoint is [`https://api.abconnect.certicaconnect.com/rest/v4.1/standards/`](https://api.abconnect.certicaconnect.com/rest/v4.1/standards/):

```sh
STANDARDS_URL="https://api.abconnect.certicaconnect.com/rest/v4.1/standards/"
```

[URL-encode](https://en.wikipedia.org/wiki/Percent-encoding) the [query string](https://en.wikipedia.org/wiki/Query_string) fields before making the [curl](https://curl.haxx.se/) request:

```sh
curl --get \
  --data-urlencode "partner.id=$PARTNER_ID" \
  --data-urlencode "auth.signature=$AUTH_SIGNATURE" \
  --data-urlencode "auth.expires=$AUTH_EXPIRES" \
  $STANDARDS_URL
```

The required query string fields are:

- `partner.id`
- `auth.signature`
- `auth.expires`

To [pretty-print](https://en.wikipedia.org/wiki/Prettyprint) the [JSON](https://jsonapi.org/), you can parse the response output with [`jq`](https://stedolan.github.io/jq/):

```sh
curl --get --silent \
  --data-urlencode "partner.id=$PARTNER_ID" \
  --data-urlencode "auth.signature=$AUTH_SIGNATURE" \
  --data-urlencode "auth.expires=$AUTH_EXPIRES" \
  $STANDARDS_URL \
  | jq
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/AB-Connect-Bash):

<iframe height="800px" width="100%" src="https://repl.it/@remarkablemark/AB-Connect-Bash?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Resources

- [Documentation](https://abconnect.docs.apiary.io/)
- [Example](https://widgets.academicbenchmarks.com/ABConnect/v4/standards-browser-min/StandardsBrowser.html)
