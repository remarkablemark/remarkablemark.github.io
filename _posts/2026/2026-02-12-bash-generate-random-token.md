---
layout: post
title: How to generate a random token
date: 2026-02-12 18:48:33
excerpt: How to generate a random token with bash.
categories: bash nodejs python sha openssl uuidgen token hash uuid
---

This post goes over how to generate a random token with bash:

- [Node.js](#nodejs)
- [Python](#python)
- [SHA](#sha)
- [openssl](#openssl)
- [uuidgen](#uuidgen)

## Node.js

Generate UUID:

```sh
node -p 'require("crypto").randomUUID()'
```

Output:

```
9396db12-8449-41d6-871d-3237f9635fe3
```

## Python

Generate URL-safe Base64 (no `+` and `/`):

```sh
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

Output:

```
7qwVk5Khe484EboUj_qI8pGcD-M-63Er1jK3qZS0R68
```

## SHA

Generate hash::

```sh
date | md5
```

Output:

```
332690933cc2bebed106ca4e1c13e278
```

For a longer hash, replace `md5` with an algorithm below:

- `sha1`
- `sha224`
- `sha256`
- `sha384`
- `sha512`

## openssl

Generate 64 hex characters:

```sh
openssl rand -hex 32
```

Output:

```
f48c74486edad3a4c1d1018dcd2f60443e38d43348e14a5be60e46f16cee0fc4
```

Generate Base64:

```sh
openssl rand -base64 32
```

Output:

```
RzFILO5Z8S8VMJDoP7RniyjD8WR6N9ES+y665N8/nC8=
```

## uuidgen

Generate a random-based UUID (UUIDv4):

```sh
uuidgen
```

Output:

```
A004F406-00AF-4C39-9830-32668C49744B
```
