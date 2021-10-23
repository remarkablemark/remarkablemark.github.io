---
layout: post
title: How to search Datadog logs with cURL
date: 2021-10-23 19:22:00
excerpt: How to search Datadog logs programmatically with cURL.
categories: datadog logs curl
---

This post goes over how to search [Datadog logs](https://docs.datadoghq.com/logs/guide/access-your-log-data-programmatically/) programmatically with [cURL](https://wikipedia.org/wiki/CURL).

## Prerequisites

### Datadog

[Datadog API key](https://app.datadoghq.com/organization-settings/api-keys):

```bash
# example
DATADOG_API_KEY=a1b2c3d4f5abcdef123456789abcdef1
```

[Datadog application key](https://app.datadoghq.com/organization-settings/application-keys):

```bash
# example
DATADOG_APP_KEY=a1b2c3d4f5abcdef123456789abcdef123456789
```

### jq

[jq](https://stedolan.github.io/jq/) to parse JSON data:

```sh
brew install jq
```

### Script

Create script `search.sh`:

```sh
touch search.sh && chmod +x search.sh
```

Set the variables:

```bash
#!/bin/bash
DATADOG_API_KEY=<DATADOG_API_KEY>
DATADOG_APP_KEY=<DATADOG_APP_KEY>
```

Run the script:

```sh
./search.sh
```

## API

### Search

[Basic search](https://docs.datadoghq.com/logs/guide/access-your-log-data-programmatically/#basic-search) between 8PM - 10PM Eastern:

```bash
data='{
  "filter": {
    "from": "2021-10-23T20:00:00-04:00",
    "to": "2021-10-23T22:00:00-04:00",
    "query": "*"
  }
}'

response=$(curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: $DATADOG_API_KEY" \
  -H "DD-APPLICATION-KEY: $DATADOG_APP_KEY" --data-raw "$data")

echo $response | jq .
```

### Time

Query for 500 errors in the [past hour](https://docs.datadoghq.com/logs/guide/access-your-log-data-programmatically/#time-settings):

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: $DATADOG_API_KEY" \
  -H "DD-APPLICATION-KEY: $DATADOG_APP_KEY" --data-raw '{
  "filter": {
    "from": "now",
    "to": "now-1h",
    "query": "@http.status_code:500"
  }
}'
```

### Limit

Retrieve the maximum [log limit](https://docs.datadoghq.com/logs/guide/access-your-log-data-programmatically/#pagination) of 1000 with `page.limit`:

```bash
response=$(curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: $DATADOG_API_KEY" \
  -H "DD-APPLICATION-KEY: $DATADOG_APP_KEY" --data-raw '{
  "filter": {
    "from": "now",
    "to": "now-2d",
    "query": "*"
  },
  "page": {
    "limit": 1000
  }
}')

echo $response | jq .
```

Resend with `page.cursor` to see the next page of logs:

{% raw %}

```bash
cursor=$(echo $response | jq -r .meta.page.after)
data='{
  "filter": {
    "from": "now",
    "to": "now-2d",
    "query": "*"
  },
  "page": {
    "cursor": "{{cursor}}",
    "limit": 1000
  }
}'
data=$(echo $data | sed "s/{{cursor}}/$cursor/")

curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: $DATADOG_API_KEY" \
  -H "DD-APPLICATION-KEY: $DATADOG_APP_KEY" \
  --data-raw "$data")
```

{% endraw %}
