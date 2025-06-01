---
layout: post
title: Cypress AI command
date: 2025-06-01 19:14:20
excerpt: How to generate E2E tests with the Cypress AI command.
categories: cypress e2e test cypress ai llm ollama
---

This post goes over how to generate E2E tests with the [Cypress AI](https://github.com/ai-action/cy-ai) command.

## Prerequisites

You have [Cypress](https://docs.cypress.io/app/get-started/install-cypress) installed and set up:

```sh
npm install cypress
```

```sh
npx cypress open
```

You have [Ollama](https://ollama.com/download) installed and running:

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

```sh
ollama serve
```

## Install

Install the [package](https://www.npmjs.com/package/cy-ai):

```sh
npm install cy-ai
```

Download the [LLM](https://ollama.com/library/qwen2.5-coder) (large language model):

```sh
ollama pull qwen2.5-coder
```

## Setup

Import the command in `cypress/support/commands.js`:

```js
// cypress/support/commands.js
require('cy-ai');
```

If you're running Chrome, disable `chromeWebSecurity` so the LLM requests aren't blocked by CORS:

```js
// cypress.config.js
module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

Write a test:

```js
// cypress/e2e/example.cy.js
it('visits example.com', () => {
  cy.ai('go to https://example.com and see heading "Example Domain"');
});
```

If you'd like to configure the Cypress AI command (e.g., replace the LLM), check out the [options](https://github.com/ai-action/cy-ai#cyai).

## How It Works

1. A prompt is created from your task, the HTML body, and the template.
2. The prompt is sent to the LLM server.
3. The LLM server responds with Cypress code.
4. The Cypress code is cleaned and run.
5. If the steps pass, the code is saved to `cypress/e2e/**/__generated__/*.json`.
6. If the steps fail, an error is thrown and the LLM response can be inspected in the browser `Console`.

When running tests, if the generated Cypress code exists, the command will reuse the existing code.

To regenerate a step, enable the [regenerate](https://github.com/ai-action/cy-ai#regenerate) option or delete the generated code in `cypress/e2e/**/__generated__/*.json`.

## Links

- [GitHub](https://github.com/ai-action/cy-ai)
- [Documentation](https://ai-action.github.io/cy-ai/)
