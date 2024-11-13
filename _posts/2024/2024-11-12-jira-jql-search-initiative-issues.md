---
layout: post
title: Jira JQL search initiative issues
date: 2024-11-12 19:57:59
excerpt: How to search for all initiative issues using Jira JQL.
categories: jira jql
---

[Search](https://support.atlassian.com/jira-service-management-cloud/docs/use-advanced-search-with-jira-query-language-jql/) for issues under [initiative](https://www.atlassian.com/agile/project-management/epics-stories-themes) `JIRA-123`:

```
issuekey in portfolioChildIssuesOf(JIRA-123)
```

Filter by [issue type](https://support.atlassian.com/jira-cloud-administration/docs/what-are-issue-types/) `Story`, `Task`, and `Bug`:

```
issuekey in portfolioChildIssuesOf(JIRA-123)
and issueType in (Story, Task, Bug)
```

Check the [issue status](https://support.atlassian.com/jira-cloud-administration/docs/what-are-issue-statuses-priorities-and-resolutions/) is not `Done` or `Closed`:

```
issuekey in portfolioChildIssuesOf(JIRA-123)
and issueType in (Story, Task, Bug)
and status not in (Done, Closed)
```
