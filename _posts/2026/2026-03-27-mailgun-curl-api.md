---
layout: post
title: Mailgun cURL API
date: 2026-03-27 18:16:39
excerpt: How to cURL Mailgun API.
categories: mailgun curl api
---

This post goes over how to cURL Mailgun API:

- [Prerequisites](#prerequisites)
- [Stats](#stats)
- [Events](#events)
- [Script](#script)

## Prerequisites

Save your Mailgun API key and domain to a variable:

```bash
export API_KEY="..."
export DOMAIN="mailgun.example.com"
```

## Stats

See general [stats](https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/stats):

```bash
curl -s --user "api:$API_KEY" \
 "https://api.mailgun.net/v3/$DOMAIN/stats/total?event=accepted&event=delivered&event=failed"
```

See time-based stats:

```bash
curl -s --user "api:$API_KEY" \
  "https://api.mailgun.net/v3/$DOMAIN/stats?event=delivered&duration=1d"
```

## Events

Use [events](https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/events) to see emails:

> Mailgun keeps track of every inbound and outbound message event and stores this data for at least 3 days.

See yesterday's failed emails:

```bash
BEGIN=$(date -u -v-1d -v0H -v0M -v0S +%s)
END=$(date -u -v-1d -v23H -v59M -v59S +%s)

curl -s --user "api:$API_KEY" \
  "https://api.mailgun.net/v3/$DOMAIN/events?event=failed&begin=$BEGIN&end=$END"
```

Filter yesterday emails by recipient:

```bash
BEGIN=$(date -u -v-1d -v0H -v0M -v0S +%s)
END=$(date -u -v-1d -v23H -v59M -v59S +%s)

curl -s --user "api:$API_KEY" \
  "https://api.mailgun.net/v3/$DOMAIN/events?recipient=$RECIPIENT&begin=$BEGIN&end=$END"
```

## Script

See full script:

```bash
#!/usr/bin/env bash

API_KEY="..."
DOMAIN="..."

curl -s --user "api:$API_KEY" \
  "https://api.mailgun.net/v3/$DOMAIN/stats/total?event=accepted&event=delivered&event=failed"

BEGIN=$(date -u -v-1d -v0H -v0M -v0S +%s)
END=$(date -u -v-1d -v23H -v59M -v59S +%s)

curl -s --user "api:$API_KEY" \
  "https://api.mailgun.net/v3/$DOMAIN/events?event=failed&begin=$BEGIN&end=$END"

RECIPIENT="user@example.com"

curl -s --user "api:$API_KEY" \
  "https://api.mailgun.net/v3/$DOMAIN/events?recipient=$RECIPIENT&begin=$BEGIN&end=$END"
```
