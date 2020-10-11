---
layout: post
title: Write Selenium tests that don't suck
date: 2020-10-10 22:25:05
excerpt: How to write Selenium tests that don't suck.
categories: selenium test
---

## Planning

- Prefer unit/integration tests over [E2E](https://www.browserstack.com/guide/end-to-end-testing) tests. (See [TestPyramid](https://martinfowler.com/bliki/TestPyramid.html) and [Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html).)
- Do not write [unnecessary](https://github.com/testdouble/contributing-tests/wiki/Necessary-%26-Sufficient) [UI](https://en.wikipedia.org/wiki/User_interface) tests. Test [happy/sad paths](https://en.wikipedia.org/wiki/Happy_path).
- [Automate](https://www.selenium.dev/documentation/en/introduction/on_test_automation/) manual [QA](https://en.wikipedia.org/wiki/Quality_assurance) that is performed frequently.

## Design Patterns

- [Behavior-Driven Development (BDD)](https://www.selenium.dev/documentation/en/introduction/types_of_testing/#behavior-driven-development-bdd)
- [Page Object](https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/)
- [Bot Style](https://github.com/SeleniumHQ/selenium/wiki/Bot-Style-Tests)
- [Domain-Driven Design (DDD)](https://github.com/SeleniumHQ/selenium/wiki/Domain-Driven-Design)
- [Loadable Component](https://github.com/SeleniumHQ/selenium/wiki/LoadableComponent)
- [Acceptance](https://www.selenium.dev/documentation/en/introduction/types_of_testing/#acceptance-testing)
- [Regression](https://www.selenium.dev/documentation/en/introduction/types_of_testing/#regression-testing)

## Development

### Code

- Use a framework that allows you to write once and run everywhere.
- Test should emulate the action performed by a user.
- Use [Gherkin](https://cucumber.io/) syntax for readability.
- Modularize your scenarios so you have many _small_ tests instead of one _large_ test.
- A test should not be dependent on another. They should be able to run in _any_ order.
- Colocate test code with feature code so the correct build artifact is used.

### Locators

- Separate [locators](https://www.selenium.dev/documentation/en/getting_started_with_webdriver/locating_elements/) in their own files.
- Locators should not be brittle or else tests will be _flaky_.
- Use [XPath](https://devhints.io/xpath) to find elements with text.

### Debugging

- Log each action to the screen and to a file.
  - Include information like user credentials to make troubleshooting easier.
- Add a flag to control whether the test halts on error.
- Allow the test to be paused when a breakpoint is hit.
- Save a screenshot when a test fails.

### Tips

- If a test is flaky, disable it. Then harden the test before reenabling it.
- Avoid using `sleep()` to resolve [race conditions](https://www.selenium.dev/documentation/en/webdriver/waits/).

## Runtime

- Minimize setup and teardown time. Aim for fast test execution.
- Tighten [feedback loops](https://github.com/testdouble/contributing-tests/wiki/Feedback-Loop) so developers can run and troubleshoot tests efficiently.
- [Parallelize](https://www.selenium.dev/documentation/en/grid/when_to_use_grid/) test execution.
- Retry failed tests.
