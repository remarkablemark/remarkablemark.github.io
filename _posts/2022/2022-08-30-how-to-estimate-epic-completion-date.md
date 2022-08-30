---
layout: post
title: How to estimate an epic completion date
date: 2022-08-30 15:13:00
excerpt: How to estimate the completion date of an epic.
categories: management epic
---

This post goes over how to estimate when an epic will be completed:

- [T-Shirt](#t-shirt)
- [Ticket Count](#ticket-count)
- [Story Points](#story-points)
- [Monte Carlo](#monte-carlo)
- [Buffer](#buffer)

## T-Shirt

T-shirt size provides a rough estimate of how long it would take a delivery team to finish an epic.

| Size | Time       |
| ---- | ---------- |
| XS   | 0-1 weeks  |
| S    | 2-4 weeks  |
| M    | 5-8 weeks  |
| L    | 9-12 weeks |
| XL   | +13 weeks  |

Since the t-shirt size is a high-level estimate, it's usually given before a technical design or story breakdown (ticket creation) is done.

## Ticket Count

If you're doing Scrum/Kanban, you can check your Agile report to see how long it takes a developer to complete a ticket.

### Example

1 developer closes 1 ticket every 1 week and epic has 10 tickets:

- 10 tickets / 1 developer = 10 weeks
- 10 tickets / 2 developers = 5 weeks
- 10 tickets / 3 developers = 3.3 weeks

## Story Points

If you're doing Scrum/Kanban, you can check your Agile report to see how many story points a developer completes in a week.

### Example

1 developer does 3 points every 1 week and epic has 30 points (10 tickets × 3 points):

- 30 points / (1 developer × 3 points) = 10 weeks
- 30 tickets / (2 developers × 3 points) = 5 weeks
- 30 tickets / (3 developers × 3 points) = 3.3 weeks

## Monte Carlo

If you have existing data, you can run a [Monte Carlo](https://wikipedia.org/wiki/Monte_Carlo_method) simulation.

If you're using [Jira](https://www.atlassian.com/software/jira), you can use the [ActionableAgile plugin](https://marketplace.atlassian.com/apps/1216661/actionableagile-kanban-agile-flow-metrics-for-jira) charts:

- [Monte Carlo: How Many](https://support.55degrees.se/space/ActionableAgile/386138145/Monte+Carlo%3A+How+Many)
- [Monte Carlo: When](https://support.55degrees.se/space/ActionableAgile/386072616/Monte+Carlo%3A+When)

## Buffer

Once your epic has a time estimate, you should always add a buffer because it's rare for projects to complete in the ideal time since there will always be interrupts, unexpected changes, and/or bugs.

| Outlook      | Buffer |
| ------------ | ------ |
| Optimistic   | 1.25   |
| Conservative | 1.5    |
| Pessmistic   | 2      |

### Example

Given an epic is estimated to take 10 weeks to complete:

- Optimistic = 10 weeks × 1.25 = 12.5 weeks
- Conservative = 10 weeks × 1.5 = 15 weeks
- Pessimistic = 10 weeks × 2 = 20 weeks
