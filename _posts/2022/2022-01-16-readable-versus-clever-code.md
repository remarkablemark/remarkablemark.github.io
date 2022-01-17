---
layout: post
title: Should your code be readable or clever?
date: 2022-01-16 21:44:18
excerpt: Thoughts on code readability versus cleverness and optimization.
categories: philosophy programming
---

Sometimes it's not about who's right or who's wrong, but more about the best approach to achieve the goal. How you define success depends on what you and your team values.

In coding, there are many ways to achieve the same outcome. Some approaches are good, while others are better. For example, one can implement a clever solution with minimal lines changed, whereas another can have many lines changed but is more understandable.

Personally, I find readable code to be more valuable that clever code. This is because we [_humans_](https://wikipedia.org/wiki/Human-centered_design) spend more time reading code than writing it. As a result, focusing on [readability](https://wikipedia.org/wiki/Readability) allows for easier [maintenance](https://wikipedia.org/wiki/Software_maintenance), better improvements, and less [bugs](https://wikipedia.org/wiki/Software_bug) and [regression](https://wikipedia.org/wiki/Software_regression). Enhancing the [mental models](https://wikipedia.org/wiki/Mental_model) of the code is a boon for developers.

Once upon a time, I wrote some clever code at my job. I was pretty damn proud of how clever it was and I even showed it off to my coworkers. I didn't touch the code for 6 months and when I came back to it, I had no idea what it was doing. Ironically, I asked myself, "Who wrote this shitty code?" and was embarrassed to find out that it was me after doing a git blame. I learned a very important lesson—that although code is _executed by machines_, it's _written by humans_. From that day on, I spent more time writing readable and [well-documented](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/) code.

But you may quip, "Won't you be sacrificing [optimization](https://wikipedia.org/wiki/Program_optimization)?" Most of the time, lines saved and optimization aren't worth the sacrifice in readability—especially if it's [premature](https://softwareengineering.stackexchange.com/questions/80084/is-premature-optimization-really-the-root-of-all-evil). Based on the 80/20 rule or the [Pareto principle](https://wikipedia.org/wiki/Pareto_principle), there are other places in your codebase that can give you higher gains than prematurely optimizing some parts of your code. [Benchmark](<https://wikipedia.org/wiki/Benchmark_(computing)>) to discover where they are and optimize where necessary.
