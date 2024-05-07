---
layout: post
title: My experience developing a Jira Forge app
date: 2024-05-07 17:40:12
excerpt: My experience developing a Jira Forge app on Atlassian Marketplace.
categories: jira forge app
---

This post goes over my experience developing a Jira Forge app "[Issue Formula](https://marketplace.atlassian.com/apps/1233729/issue-formula)".

## App

See the app on:

- [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1233729/issue-formula)
- [GitHub](https://github.com/remarkablemark/jira-dashboard-gadget-issue-formula)

## Motivation

I wanted a Jira dashboard gadget that could display mathematical formula calculations for Jira issues.

## Planning

I initially thought I had to build a [Jira app with Java](https://developer.atlassian.com/server/jira/platform/getting-started/). Luckily, I discovered [Jira Forge](https://developer.atlassian.com/platform/forge/), which allows developers to build a Jira app using [React](https://react.dev/).

After watching several YouTube videos and following the ["Hello World!" tutorial](https://developer.atlassian.com/platform/forge/build-a-hello-world-app-in-jira/), I created a [Jira dashboard gadget template](https://github.com/remarkablemark/jira-dashboard-gadget). Then I prototyped in [StackBlitz](https://stackblitz.com/edit/issue-formula) using [Atlaskit](https://atlassian.design/components) and created the [repository](https://github.com/remarkablemark/jira-dashboard-gadget-issue-formula).

## Implementation

I ported the [proof-of-concept](https://stackblitz.com/edit/issue-formula) to the [repository](https://github.com/remarkablemark/jira-dashboard-gadget-issue-formula) and integrated the code with [Jira's API]({% post_url 2023/2023-12-25-jira-rest-api-count-issues %}).

I had issues testing my changes locally because I wasn't able to proxy local invocations with `forge tunnel`. As a result, I had to run `forge deploy` to test every change.

The feedback loop got so painful that I set up [Storybook](https://storybook.js.org/) to verify UI changes. When I needed to integrate with the Jira backend, I would deploy and QA my changes on a Jira development server.

## Submission

Once I felt the app was ready, I released it via [GitHub Actions](https://github.com/remarkablemark/jira-dashboard-gadget-issue-formula/blob/master/.github/workflows/release-please.yml) and created an [Atlassian Marketplace](https://marketplace.atlassian.com/) account.

After reading the documentation and filling out the fields, I submitted my app and crossed my fingers. I immediately received an automated response that my app was rejected:

> Specifically, **your listing lacks details**. Basic listings can be great as a starting point for apps to get onto the Marketplace quickly. However, your customers still require an outline of what your app does. We ask that you fill out the 'more details' section, shown below, with quick start instructions to help your customers understand your app.

I added screenshots to the app details and resubmitted it. I got a comment from a reviewer that I needed to add a Privacy Policy link so I scoured the internet for a free template and put one quickly together. Since it needed to be hosted somewhere, I put it on my [GitHub wiki](https://github.com/remarkablemark/jira-dashboard-gadget-issue-formula/wiki).

I submitted the app again and got an automated comment with a link to "[Atlassian Marketplace New Partner Checklist](https://ecosystem.atlassian.net/wiki/spaces/~547327020/pages/839648177/Atlassian+Marketplace+New+Partner+Resources)". As I read it, I saw something that worried me:

> Approval times vary depending on current volume and the Marketplace team's availability, submissions fall into an internal queue which the Marketplace team works through chronologically as they come in.
> **Typical wait times average around 10 business days before we start your review.**
> We will not update the ticket until after the review has started.

So I waited a week but then forgot about it. About a month later, I was curious why I didn't get a notification so I checked the ticket and saw they left a comment. Because I didn't respond in time, my app submission got timed out so I had to do it all over again.

I added a guide that explained how my app worked. I added an EULA. I updated my Partner Profile. It started to feel like it was never going to end.

I resubmitted the app again and felt positive this time. They asked me to update my EULA so I did it and it was finally [approved](https://marketplace.atlassian.com/apps/1233729/issue-formula) about a week later.

## Conclusion

What did I think this experience? It was interesting but I wish things were simpler since I'm a developer and not a business person.

I spent about a week developing the app but it took more than a month to get it approved. Since my app was free, the amount of work I had to do made the ROI not worth it. But if it was a paid app, then things might be different.

Here are a some ways to improve the Jira app development process:

- Fix and enhance the developer experience.
- Require certain form fields during submission.
- Allow the app to be edited after submission.
- Provide templates for people to use (e.g., legal documents).
- Speed up the app review time.
- Provide timely notifications of the submission status.
