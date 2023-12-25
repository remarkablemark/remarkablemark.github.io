---
layout: post
title: How to count issues with Jira REST API
date: 2023-12-25 16:37:40
excerpt: How to count issues with Jira REST API.
categories: jira rest api nodejs javascript
---

This post goes over how to count issues with [Jira REST API](https://developer.atlassian.com/server/jira/platform/rest-apis/).

## Create an API token

[Create an API token from your Atlassian account](https://id.atlassian.com/manage-profile/security/api-tokens).

See ["Manage API tokens for your Atlassian account"](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) for more details.

## Search for issues using JQL

[Search for issues using JQL (POST)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-post):

```js
// index.js
fetch(`${process.env.JIRA_DOMAIN}/rest/api/3/search`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`
    ).toString('base64')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // update JQL
    jql: `project = "My Jira Project" AND issuetype in (Story, Bug, Task) AND resolution = Done`,
    maxResults: 0,
  }),
})
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    return response.json();
  })
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

Set the environment variables:

| Environment Variable | Example                            |
| -------------------- | ---------------------------------- |
| `JIRA_DOMAIN`        | `https://my-domain.atlassian.net`  |
| `JIRA_EMAIL`         | `my.email@domain.com`              |
| `JIRA_TOKEN`         | `ABCDEFGHIJKLMNOPQRSTUVWXYZabc123` |

Update the `jql` to include `resolved` date and `assignee`:

```
project = "My Jira Project" AND issuetype in (Story, Bug, Task) AND resolution = Done AND resolved >= 2023-01-01 AND resolved < 2024-01-01 AND assignee = abcdef1234567890abcdef12
```

Run the Node.js script with your environment variables:

```sh
node index.js
```

The response will look like:

```json
{ "startAt": 0, "maxResults": 0, "total": 42, "issues": [] }
```
