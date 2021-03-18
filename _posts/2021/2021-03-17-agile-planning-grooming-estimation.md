---
layout: post
title: Agile planning, grooming, and estimation
date: 2021-03-17 20:32:01
excerpt: The difference between planning, grooming, and estimation in agile methodology.
categories: agile planning grooming estimation
---

This article describes the difference between planning, grooming, and estimation in [agile methodology](https://wikipedia.org/wiki/Agile_software_development).

## Planning

Based on the company goals and user research, the [Product Manager (PM)](https://wikipedia.org/wiki/Product_manager) comes up with the business case.

The [Designer](https://wikipedia.org/wiki/Designer) comes up with prototypes and conducts user testing. This happens during [design sprints](https://wikipedia.org/wiki/Design_sprint), which engineers can participate in the discussion and activity.

Once the business case is approved, the PM creates an [initiative with an epic](https://www.atlassian.com/agile/project-management/epics-stories-themes) for [spikes](<https://wikipedia.org/wiki/Spike_(software_development)>) and [tech designs](<https://wikipedia.org/wiki/Specification_(technical_standard)>). (See [guide](https://stackoverflow.blog/2020/04/06/a-practical-guide-to-writing-technical-specs/) for writing technical specs.)

The [Tech Lead (lead engineer)](https://wikipedia.org/wiki/Lead_programmer) works on the tech design, which is reviewed by the team.

Once the tech design is approved, the Lead and PM perform story breakdown:

- Tickets are created, which consist of [user stories](https://wikipedia.org/wiki/User_story) and technical tasks
- Tickets are organized under [epics](https://www.atlassian.com/agile/project-management/epics)
- A [SWAG](https://wikipedia.org/wiki/Scientific_wild-ass_guess) estimate is provided to business

The initiative is then prioritized by the PM in the [product roadmap](https://www.atlassian.com/agile/product-management/product-roadmaps).

## Grooming

The iron triangle (PM, Designer, and Lead) [grooms](<https://wikipedia.org/wiki/Scrum_(software_development)#Backlog_refinement>) the tickets by:

- Removing tickets out of scope
- Moving foundational work up
- Consolidating tickets to minimize context switching
- Splitting out tickets to maximize parallelization of work

Each member is responsible for the following:

- PM writes the user stories and fills out the acceptance criteria and [requirements](https://www.atlassian.com/agile/product-management/requirements)
- Design specs the UI/UX (if applicable) and attaches the mock
- Engineers add the technical requirements
- [Quality Assurance (QA)](https://wikipedia.org/wiki/Quality_assurance) outlines the test plan

Once tickets are groomed, they are marked as `Ready for Estimation`

## Estimation

The team points the tickets using [planning poker](https://wikipedia.org/wiki/Planning_poker). The goal of [estimation](https://www.atlassian.com/agile/project-management/estimation) is to generate a discussion and the points themselves shouldn't be held sacred. Estimation occurs periodically but can happen ad-hoc.

Tickets are then marked as `Ready for Dev` and are ready to be picked up.
