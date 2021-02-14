---
layout: post
title: How to use Cypress to perform a Google search
date: 2021-02-13 22:20:51
excerpt: How to perform a Google search using the Cypress end-to-end (E2E) test runner.
categories: cypress e2e test nodejs javascript
---

This article goes over how to perform a Google search using the [Cypress](https://b.remarkabl.org/cypress) end-to-end (E2E) test runner. See the [YouTube video](https://b.remarkabl.org/3b7vq1Q):

<iframe width="100%" height="720" src="https://www.youtube.com/embed/XuCXwqLkyVI?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

- [Node.js](http://b.remarkabl.org/nodejs-site)

## Install

Install [cypress](https://www.npmjs.com/package/cypress) with npm or yarn:

```sh
$ npm install cypress
```

## Open

Open Cypress:

```sh
$ npx cypress open
```

![Cypress integration tests]({{ "/images/2021/2021-02-13-cypress-integration-tests.png" | prepend: site.assets_path }})

The directories will be created:

```sh
$ tree cypress -L 1
cypress
├── fixtures
├── integration
├── plugins
└── support

4 directories, 0 files
```

To run a test, click on the test file:

![Cypress actions spec]({{ "/images/2021/2021-02-13-cypress-actions-spec.png" | prepend: site.assets_path }})

## Example

Create file `cypress/integration/example.js`:

```sh
$ touch cypress/integration/example.js
```

Write the test:

```js
it('should pass', () => {
  expect(true).to.equal(true);
});
```

Click on the test so it runs in a new browser window:

![Cypress example test]({{ "/images/2021/2021-02-13-cypress-example-test.png" | prepend: site.assets_path }})

Cypress uses [Mocha](https://mochajs.org/) as the test runner and [Chai](https://www.chaijs.com/) as the assertion library.

## Google Search

Create file `cypress/integration/google-search.js`:

```sh
$ touch cypress/integration/google-search.js
```

Use [`visit`](https://docs.cypress.io/api/commands/visit.html) to open a page:

```js
cy.visit('https://www.google.com');
```

Use [`get`](https://docs.cypress.io/api/commands/get.html) to select a DOM element:

```js
cy.get('input[name="q"]');
```

> The querying behavior is similar to [jQuery](https://jquery.com/)'s `$()`.

Click `Open Selector Playground` to try out different selectors:

![Cypress Open Selector Playground]({{ "/images/2021/2021-02-13-cypress-open-selector-playground.png" | prepend: site.assets_path }})

Click an element or use the browser `Inspect` tool to get a good selector:

![Cypress get selector]({{ "/images/2021/2021-02-13-cypress-get-selector.png" | prepend: site.assets_path }})

Use [`type`](https://docs.cypress.io/api/commands/type.html) to input text and keyboard actions:

```js
cy.get('input[name="q"]').type('remarkablemark{enter}');
```

> `{enter}` types the Enter key.

An alternative to typing the Enter key is to submit the form:

```js
cy.get('form').submit();
```

Or to click the search button:

```js
cy.get('input[value="Google Search"]').first().click();
```

Use [`invoke`](https://docs.cypress.io/api/commands/invoke.html) to get the first search URL:

```js
cy.get('#search a')
  .first()
  .invoke('attr', 'href')
  .then(href => console.log(href));
```

> [`then`](https://docs.cypress.io/api/commands/then.html) is used to yield the promise value since the command is asynchronous.

### Code

```js
describe('Google Search', () => {
  it('loads search page', () => {
    cy.visit('https://www.google.com');
  });

  it('search for `remarkablemark`', () => {
    cy.get('input[name="q"]').type('remarkablemark{enter}');
  });

  it('gets first search result', () => {
    cy.get('#search a')
      .invoke('attr', 'href')
      .then(href => console.log(href));
  });
});
```

![Cypress Google search]({{ "/images/2021/2021-02-13-cypress-google-search.png" | prepend: site.assets_path }})

## Resources

- [Demo repository](https://b.remarkabl.org/37901uU)
- [Cypress FAQ](https://docs.cypress.io/faq/questions/using-cypress-faq.html)
