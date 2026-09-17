---
layout: post
title: What are the costs of AI?
date: 2026-09-17 18:00:39
excerpt: 'AI has two costs: tokens up front and slop over time.'
categories: ai tokens slop
---

When we use AI, we assume it will increase productivity and lower costs. But AI has two costs and only one of them appears on the invoice:

1. [Tokens](#tokens)
2. [Slop](#slop)

## Tokens

The first cost is **tokens**: the price of model usage, infrastructure, and electricity. This is the direct or explicit cost.

Many AI companies subsidize usage to drive adoption, contributing to significant operating losses. The price you pay today may not reflect the true cost of providing the service, so don't expect AI to remain this cheap forever.

## Slop

The second cost is **slop**: the time, complexity, and technical debt incurred by output that is low-quality, unnecessary, or insufficiently reviewed.

When AI produces bad code or a poorly reasoned document, humans still have to review, correct, and rewrite it. In a codebase, this becomes technical debt. In other settings, it becomes additional work spent verifying whether something is accurate or done correctly.

But shouldn't the indirect cost be smaller than the direct cost? Not necessarily. Slop can compound over time.

Imagine a codebase with one million lines of code. Suppose AI helps engineers produce twice as much code in a short period of time. That may appear to be a productivity gain, but a larger codebase also requires more maintenance, more context, and potentially more tokens for an LLM to understand.

Meanwhile, developers may gradually lose their mental model of how the system works. They generate more features while understanding less of the underlying software. The result is a codebase with more functionality, more technical debt, weaker human understanding, and higher AI costs.

That's the beginning of an AI slop spiral:

1. AI makes it cheaper to produce output.
2. More output increases complexity.
3. Increased complexity makes review and maintenance harder.
4. Harder review allows more low-quality output to accumulate.
5. Accumulated complexity requires even more AI assistance.

The real danger is not that AI occasionally produces bad work. It's that organizations reward quantity over quality and short-term gains over long-term value.

## Conclusion

AI can reduce costs when it's used to simplify systems, improve tests, explain existing features, or support planning and research. But when it's used primarily to generate more code, more documents, and more activity, its apparent productivity can conceal a growing liability.

The first cost is measured in tokens. The second is measured in everything humans do after the tokens are spent.
