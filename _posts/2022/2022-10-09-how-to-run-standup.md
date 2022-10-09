---
layout: post
title: How to run standup
date: 2022-10-09 16:45:14
excerpt: How to run the daily standup, which is a recurring Agile meeting.
categories: standup meeting agile
---

This post goes over how to run [standup](https://wikipedia.org/wiki/Stand-up_meeting)—a recurring Agile meeting.

- [Before Standup](#before-standup)
- [Standup](#standup)
- [After Standup](#after-standup)
  - [Parking Lot](#parking-lot)
  - [Estimation](#estimation)
  - [Kickoff](#kickoff)
  - [Desk Check](#desk-check)
- [Standup Moderator](#standup-moderator)
- [FAQ](#faq)

## Before Standup

If you're doing [Scrum](<https://wikipedia.org/wiki/Scrum_(software_development)>) or [Kanban](<https://wikipedia.org/wiki/Kanban_(development)>) in [Jira](https://www.atlassian.com/software/jira), then it may be useful to create a board filter that:

- includes high priority tickets (e.g., P0, P1, P2)
- includes tickets being worked on by your team
- excludes tickets that are not worked on (untriaged and unestimated)
- excludes tickets that are done or closed (for a clean board)

Creating separate swimlanes (by theme or epic) to group the tickets for clarity. The standup board should be clear and focused so items that stay out of sight should stay out of mind.

Schedule a calendar event or Slack reminder for standup and give your team a grace period of 1-2 minutes before starting.

> Check who's out of office before pinging anyone who hasn't joined yet.

## Standup

Select the standup filter and go over the board from:

- top to bottom (swimlanes)
- right to left (columns)

For each ticket, ask the assignee:

1. What did you do yesterday?
2. What are you doing today?
3. Do you have any blockers?

> For example, "In swimlane X, we have ticket Y in progress. Assignee, do you have an update?"

Once everything has been gone over, ask other members for updates:

- Does QA have an update?
- Does PM have an update?
- Does Design have an update?
- Does anyone else have an update?

> Wait a few seconds before proceeding to ensure everyone has a chance to speak up.

Finally, end standup with a chant like "Go team!" This creates a signal that the meeting is over.

## After Standup

### Parking Lot

If an update gets off-topic or long-winded, move the discussion offline or to a [parking lot](https://project-management.fandom.com/wiki/Parking_lot). The parking lot begins after standup has ended. This keeps the standup on track and focused and respects people's time since not everyone needs to be part of the parking lot.

### Estimation

If a member wants to [estimate or point](https://wikipedia.org/wiki/Planning_poker) a ticket, he or she can do it after standup. This is useful when there are no more tickets to pick up or there's a new, high priority interrupt.

### Kickoff

If a member wants to kick off a ticket, he or she can discuss the details with stakeholders after standup. The benefit of doing a synchronous kickoff is that there's a quicker feedback loop due to the collaboration.

### Desk Check

If a member wants to demo his or her work, he or she can do a desk check with stakeholders after standup. This is usually for UI (user interface) changes and the benefit is a faster feedback loop that comes from the interaction.

## Standup Moderator

The standup moderator is responsible for:

- Calling out anything that looks off.
- Identifying blockers and proposing solutions.
- Keeping a holistic view of the team’s work.
- Ensuring the agenda is focused and standup starts and finishes on time.

## FAQ

<details markdown="1">
<summary>Why do we go from "top to bottom" and "right to left"?</summary>

Because we want to go in order of priority and focus on moving tickets forward to done.

</details>

<details markdown="1">
<summary>What makes a good standup?</summary>

- Meeting starts on time.
- Agenda is focused.
- Team collaborates, engages, and shares a collective sense of ownership.
  - It's encouraged to ask probing questions about tickets.
  - Team has a holistic view of the work and is willing to help others.
  - Team values finishing over starting.
  - Discussions are action-oriented.
- Risks and blockers are called out.

</details>

<details markdown="1">
<summary>What makes a bad standup?</summary>

- Meeting starts late.
- Conversations go off-topic.
- People start to monologue.
- Board is too complicated.
- People go into detailed problem solving. (This can be moved to the parking lot.)

</details>
