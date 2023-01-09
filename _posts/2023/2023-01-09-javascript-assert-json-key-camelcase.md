---
layout: post
title: Assert JSON keys are camelCase
date: 2023-01-09 14:45:38
excerpt: How to assert JSON keys are camelCase with JavaScript.
categories: javascript json camelcase
---

This post goes over how to assert JSON keys are camelCase with JavaScript.

## camelCase

Create a function that camelCases a string:

```js
const camelCase = (string) =>
  string.replace(/[^a-zA-Z0-9]+(.)/g, (match, character) =>
    character.toUpperCase()
  );
```

Or use [lodash](https://lodash.com/docs#camelCase):

```js
import { camelCase } from 'lodash';
```

## assert

Given the JSON file:

```sh
echo '{"foo":"bar"}' > data.json
```

Create a recursive function that asserts the JSON keys are camelCase:

```js
import assert from 'assert';
import json from './data.json';

function assertCamelCase(object) {
  for (const [key, value] of Object.entries(object)) {
    assert.strictEqual(key, camelCase(key));

    if (value instanceof Object) {
      assertCamelCase(value);
    }
  }
}
```

Then call the function with the JSON data:

```js
import data from './data.json';

assertCamelCase(data);
```

## Demo

Check out the [Replit](https://replit.com/@remarkablemark/JS-assert-JSON-keys-are-camelCase#index.js) demo:

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/JS-assert-JSON-keys-are-camelCase?lite=true#index.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
