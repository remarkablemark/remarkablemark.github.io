---
layout: post
title: Gherkin feature files
date: 2021-03-18 21:25:11
excerpt: An overview of what Gherkin feature files are and how to write them.
categories: gherkin dsl bdd test automation feature file
---

## Background

What are [Gherkin feature files](https://docs.behat.org/en/v2.5/guides/1.gherkin.html)? They're human-readable documentation that can map to automated tests.

Gherkin is a [DSL (domain-specific language)](https://wikipedia.org/wiki/Domain-specific_language) for [BDD (behavior-driven development)](https://wikipedia.org/wiki/Behavior-driven_development).

## Example

Here's an example of using [Gherkin](https://cucumber.io/docs/gherkin/reference/) to describe how to search for `remarkablemark` on Google:

```
Given I am on "https://www.google.com/"
When I click on the search bar
    And I type "remarkablemark"
    And I press "Enter"
Then I see in the search results "remarkablemark.org"
```

Each line is a step:

- [`Given`](https://cucumber.io/docs/gherkin/reference/#given) sets up the scenario.
- [`When`](https://cucumber.io/docs/gherkin/reference/#when) describes the action.
- [`Then`](https://cucumber.io/docs/gherkin/reference/#then) states the expected outcome.
- [`And`](https://cucumber.io/docs/gherkin/reference/#and-but) chains successive `Given`'s, `When`'s, and `Then`'s.

Steps can be organized under [`Scenario`](https://cucumber.io/docs/gherkin/reference/#example)'s, and they're all under a single [`Feature`](https://cucumber.io/docs/gherkin/reference/#feature).

Here's the Google search with `Feature` and `Scenario`:

```
Feature: Google search
    Scenario: Search for remarkablemark
        Given I am on "https://www.google.com/"
        When I click on the search bar
            And I type "remarkablemark"
            And I press "Enter"
        Then I see in the search results "remarkablemark.org"
```

## Resources

To learn more about the syntax, go to [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/).

To see a feature file used as an automated test, check out the [cucumber](https://github.com/remarkablemark/webdriverjs-recipes/tree/master/recipes/cucumber) example in [webdriverjs-recipes](https://github.com/remarkablemark/webdriverjs-recipes).
