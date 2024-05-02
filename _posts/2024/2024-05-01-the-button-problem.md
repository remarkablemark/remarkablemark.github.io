---
layout: post
title: '"The Button Problem"'
date: 2024-05-01 20:55:40
excerpt: So what does a UI developer do? Do you implement design mocks? Do you work with HTML/CSS/JavaScript? Or no, wait, you program in React?
categories: programming frontend ui
---

Inspired by "[The Door Problem](https://lizengland.com/blog/2014/04/the-door-problem/)".

## The Button Problem

Premise: You are building a website.

- Are there buttons on your site or app?
- Can the user click/focus/hover on the button?
- Are you using native buttons or custom buttons?
- Does the button render the same on every device?
- Is the button responsive? Does the button adapt to different screen sizes?
- Does the button get larger or smaller?
- If the button changes size or shape, does it cause a layout shift?
- Are there button links? (Buttons that take the user to another page.)
- Are there link buttons? (Links that are styled like buttons.)
- Is the button accessible? Can the button be interacted with a keyboard/screenreader?
- Can the button be disabled? Can the button be reenabled?
- What does clicking the button do? Does it open a modal, change the page, or send an API request?
- If triggering the button performs an asynchronous operation, does it show a loading state?
- If the button manages state, does it optimistically update? What if the update fails?
- What if the user presses on the button multiple times really quickly? Will the same operation be called multiple times?
- Can the button be hidden?
- Can everyone see the button?

It's a pretty classic frontend problem. SOMEONE has to solve "The Button Problem", and that someone is the UI team.

## The Other Button Problems

To help people understand the role breakdowns at a tech company, let's go into how other people deal with buttons.

- **Design Director**: "Let's add themeable buttons to the design system and style guide."
- **Designer**: "Here's a Figma file that showcases how buttons works."
- **Product Manager**: "I added buttons to the Sprint backlog."
- **Scrum Master**: "We estimate buttons will take 13 story points for a single developer."
- **Tech Lead**: "I wrote a technical design on buttons."
- **Architect**: "Here's a UML diagram on scalable button architecture."
- **Senior Developer**: "I built the button on top of 30 dependencies."
- **Junior Developer**: "I need to pair with a Senior Developer to understand buttons."
- **Engineering Manager**: "We will resource 10 developers so buttons can be done in 4 weeks."
- **QA Tester**: "I clicked the button, double-clicked the button, right-clicked the button, and loaded the button on iPhone, Android, Chromebook, and Internet Explorer."
- **DevOps**: "CI has been set up so we can continuously release buttons"
- **Hiring Recruiter**: "We need to source 100 candidates who have at least 15 years working with buttons."
- **A/B Tester**: "We set up experiments so that buttons are rendered in multiple sizes and colors to test user engagement."
- **Data Analytics**: "When a button is clicked, it sends a track event to our analytics service."
- **Sales**: "Can we add microtransactions on top of buttons?"
- **UX / Usability Researcher**: "I found some people to do user testing with buttons to understand what issues could come up."
- **Localization**: "We translated buttons to every language."
- **Legal**: "Buttons must be accessible or else we will get sued."
- **Customer Support**: "A customer opened a ticket about buttons. I sent them our documentation on how to use them."
- **Marketing**: "We promoted buttons via social media."
- **Finance**: "How much do buttons cost to make?"
- **Technology**: "We need to scale our Agile processes so we can build more buttons efficiently."
- **CEO**: "Buttons will be the core differentiator of our business."
- **Investor**: "I'm willing to invest $10 million for 1% equity in your button company."
- **User**: "I wasn't aware there was a button on the screen."
