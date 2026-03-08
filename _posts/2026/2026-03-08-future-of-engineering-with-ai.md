---
layout: post
title: The Future of Engineering with AI
date: 2026-03-08 19:42:53
excerpt: AI won't replace engineers—but it will transform what they do.
categories: ai engineering philosophy management
---

AI will change engineering, but I don't think it will _replace_ strong engineers. Instead, it will _shift_ what engineers spend their time doing.

As AI continues to get better, engineers will have to rethink how they use AI and the changes to the software development lifecycle.

First, let's talk about AI agents.

## AI Agents

In the beginning, engineers used AI chatbots to answer questions. It wasn't very sophisticated and there was still a lot of manual work to integrate the answers to the codebase.

But when AI agents started to take actions on their own, that's when it rose to be more than just a **prompt machine**.

AI agents can be ranked similarly to engineers:

1. Junior (entry level)
2. Mid-level
3. Senior
4. Lead/staff
5. Architect

AI started off as an **intern** where you had to micromanage, guide, and correct its mistakes. Now, AI has reached **mid/senior level** where it can figure out and complete tasks on its own with minimal supervision.

So how does this change the software development lifecycle?

## Software Development Lifecycle

In the past, engineers wrote and reviewed code. In the future, engineers clarify the specification and test the result. Engineers will no longer need to code as we move towards spec-driven development.

The traditional lifecycle:

1. Planning
2. Requirements analysis
3. System design
4. Development/implementation
5. Testing/QA
6. Deployment
7. Maintenance

With AI, the lifecycle is shortened:

1. Agent writes plan and engineer reviews plan
2. Agent analyzes requirements
3. Agent designs system
4. Agent implements feature
5. Agent tests feature and engineer approves
6. Agent/engineer deploys
7. Agent/engineer maintains

As you can see, the agent has taken over more than half of the engineer's responsibilities. The engineer now reviews and approves whatever the agent has generated (documentation, code, artifacts, etc.). This changes the **bottleneck** because writing the code is no longer the most costly and time-consuming step.

So what will the engineer become? The role will turn into a **product-architect-manager hybrid**. Here's an example of how that interaction might go:

1. Engineer writes a prompt for the agent to build a feature
2. Agent writes a spec
3. Engineer/agent reviews and clarifies the spec
4. Agent does research and comes up with a plan
5. Engineer/agent reviews and clarifies the plan
6. Agent breaks down the stories and creates tasks
7. Engineer/agent reviews and clarifies the tasks
8. Agent implements the tasks with TDD
9. Engineer/agent tests the feature
10. Engineer/agent ships the feature

In the **past**, the workflow would be:

```
Plan → Design → Code → Test → Deploy
```

But in the **future**, it will become:

```
Describe → Generate → Validate → Monitor → Improve
```

## Final Thoughts

So what does this mean for me? If you're an engineer who's integrated AI in your day-to-day workflow, then continue to experiment and learn about what works for you. Don't be afraid to try different models, IDEs, TUIs, etc. Things are constantly changing so take one step at a time.

If you haven't adopted AI yet, I think you're _missing out_. It's such a productivity boost and I no longer feel constrained by my human limits since coding isn't just writing code but also thinking, researching, and analyzing. If I have an idea, I use AI to build it. Even if you don't fully trust AI yet, try using it for prototypes or side projects. Don't let resistance cause you to fall behind. Plus, mastering this skill will command a premium.

In terms of Agile/Scrum, we'll have to rethink it since rituals like planning will become obsolete. What an engineer might estimate as a large effort to complete may only require an AI agent a few hours to do.

What will be the dominant AI stack? Since AI is trained on large datasets, we should expect it to do well in Python and JavaScript. Languages with strong typing and documentation will also succeed (e.g., React and Tailwind for frontend).

What about development tools? I think the best IDEs/TUIs will maximize the feedback loops between the AI and the engineer. The focus is on speed and engineers should be aware that agentic coding is programming with probabilities. In other words, the better the prompt, the higher the confidence of the LLM output.

Ultimately, the future of AI-driven development will be more focused on _**identifying and verifying problems**_ than _**implementing solutions**_.
