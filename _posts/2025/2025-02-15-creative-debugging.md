---
layout: post
title: Creative debugging
date: 2025-02-15 16:09:18
excerpt: Creative debugging requires research, investigation, and the scientific method.
categories: debugging programming troubleshooting xcode
---

I recently had to debug why an [Xcode](https://developer.apple.com/xcode/) splash screen color was incorrect. Remembering that [debugging is a creative act](https://p5js.org/tutorials/field-guide-to-debugging/), I put on three hats to help me figure out the issue:

1. Scholar
2. Detective
3. Scientist

## Scholar

I wasn't an expert in Xcode, so I put on the scholar hat to read the documentation on the integrated development environment (IDE). I focused on `LaunchScreen.storyboard` because that's the file I'm touching.

But why did I spend so much time on research and learning? Because the more you understand something, the better you can troubleshoot it. It's like a mechanic who can identify broken parts and a doctor who can diagnose illnesses. I had to build the right contexts and mental models in order to be effective at my task.

## Detective

Once I had a decent understanding of the issue, I put on the detective hat. I needed to investigate the clues that could lead me to the root cause of the problem. I listed several hunches and felt I was getting closer.

## Scientist

In order to test if my suspicions were correct or not, I put on the scientist hat. I used the [scientific method](https://wikipedia.org/wiki/Scientific_method) to validate each one of my hypotheses:

1. My first hypothesis was that it was due to cache. So I cleared my [Xcode cache]({% post_url 2024/2024-01-29-react-native-error-unable-to-lookup-in-current-state-shutdown %}) and generated a fresh build. However, the bug still persisted. So my cache hypothesis got invalidated.
2. My second hypothesis was that the file was incorrect. So I recreated `LaunchScreen.storyboard`, but it still wasn't working. Hence, I eliminated this hypothesis.
3. My third hypothesis was that the references weren't correct. So I renamed and deleted the file. When the bug still occurred, I checked the target memberships and found that it wasn't set to the right project. After making the change, I rebuilt the app and the splash screen color was correct. Bug resolved and case closed.

## Conclusion

The lesson of the story is that debugging requires multiple skillsets as well as creativity and persistence. Don't get too fixed on one approach and be flexible on how you test. Sometimes you just need to take a quick break before the answer comes to you.
