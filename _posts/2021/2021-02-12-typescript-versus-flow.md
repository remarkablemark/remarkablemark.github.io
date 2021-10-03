---
layout: post
title: TypeScript vs Flow
date: 2021-02-12 20:28:01
updated: 2021-08-22 13:33:33
excerpt: How to determine if you should choose TypeScript or Flow as your JavaScript type checker.
categories: typescript flow javascript
---

> **TL;DR**: choose TypeScript.

When evaluating a [type checker](https://en.wikipedia.org/wiki/Type_system) for your JavaScript project, should you choose [TypeScript](https://www.typescriptlang.org/) or [Flow](https://flow.org/)?

On a high level, you should consider:

- [Use](#use)
- [Support](#support)
- [Community](#community)
- [Trends](#trends)

## Use

Is the type checker easy to install and use? Is it well documented? Is it performant and fast? Are there many type definitions? Ease of use has a direct correlation with adoption rate and productivity.

## Support

Are the maintainers able to support the project and address external contributions?

[Flow](https://medium.com/flow-type/clarity-on-flows-direction-and-open-source-engagement-e721a4eb4d8b):

> Flow is almost exclusively developed by a 10 person team within Facebook ... The team’s priority is the needs of our internal Facebook customers ... sadly we do not have resources to work on features requested only by external developers.

> The complexity of Flow’s codebase makes it difficult to contribute to Flow itself, and our company-internal build systems, performance tests and integration tests make it very time consuming to review and integrate such pull requests, so we may close PRs that don’t align with our priorities. Similarly, we will close GitHub issues when we know we will not be able to provide timely support.

TypeScript has a large number of contributors and is very active on [GitHub](https://github.com/microsoft/TypeScript).

## Community

Is the type checker well supported by the community? Do other developers like using it? Can you easily find answers on [Google](https://www.google.com/) or [Stackoverflow](https://stackoverflow.com/)? Are issues and pull requests adequately addressed? Do other developers build tools, plugins, and integrations for the type checker? A strong community equates to a solid position in the industry.

## Trends

What does the future look like for the type checker? Are contributors releasing features and fixing bugs? Are companies and schools choosing one type checker over the other? This can determine the pool of developers who have experience with a type checker. Ask yourself, "Five years from now, which type checker will win?" By following the wrong trend, it will add [technical debt](https://en.wikipedia.org/wiki/Technical_debt) and outdated skills that will be problematic later on.

## Conclusion

You should choose TypeScript because it has:

- better performance
- great support
- a large community
- more type definitions (see [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped))
- better [Visual Studio Code](https://code.visualstudio.com/) integrations
- more momentum (see [Google Trends](https://trends.google.com/trends/explore?date=today%205-y&q=%2Fm%2F0n50hxv,facebook%20flow%20%2B%20flow%20language%20%2B%20flowtype,%2Fm%2F0hjc5m0,%2Fm%2F03yb8hb,%2Fm%2F0h52xr1) and [npm-stat](https://npm-stat.com/charts.html?package=babel-core&package=typescript&package=flow-bin&from=2015-01-01))

Also, [Facebook](https://www.facebook.com/), the creator of Flow, are migrating several of their big projects like [Yarn](https://github.com/yarnpkg/yarn) and [Jest](https://github.com/facebook/jest) to TypeScript. When the creators of Flow are moving off of Flow, that's a red flag.

## Resources

Repositories:

- [TypeScript](https://github.com/microsoft/TypeScript)
- [Flow](https://github.com/facebook/flow)

Sites:

- [TypeScript](https://www.typescriptlang.org/)
- [Flow](https://flow.org/)
