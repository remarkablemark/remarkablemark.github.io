---
layout: post
title: How to test process.exit() with Sinon
date: 2017-12-10 21:30:05
excerpt: How to test Node.js process.exit() with Sinon stubs.
categories: sinon stub process nodejs test
---

Install [Mocha](https://mochajs.org) and [Sinon.js](https://sinonjs.org):

```sh
npm install mocha sinon
```

Create the test directory and file:

```sh
mkdir test && touch test/file.js
```

Import `assert` and `sinon`:

```js
// test/file.js
const assert = require('assert');
const sinon = require('sinon');
```

Now create a test case that stubs `exit` from `process`:

```js
describe('process.exit', () => {
  it('is stubbed', () => {
    sinon.stub(process, 'exit');
    process.exit(1);
    assert(process.exit.isSinonProxy);
  });
});
```

Write your assertions with `assert`:

```js
assert(process.exit.called);
assert(process.exit.calledWith(1));
assert.equal(process.exit.args[0][0], 1);
```

Or write them with `sinon`:

```js
sinon.assert.called(process.exit);
sinon.assert.calledWith(process.exit, 1);
```

Also, don't forget to restore the original function when the test is done:

```js
it('is stubbed', () => {
  // ...
  process.exit.restore();
});
```

A good refactor tip is to move the stub and restore logic to mocha's `before` and `after` hooks:

```js
describe('process.exit', () => {
  before(() => {
    sinon.stub(process, 'exit');
  });

  after(() => {
    process.exit.restore();
  });

  it('is stubbed', () => {
    process.exit(1);
    assert(process.exit.isSinonProxy);
    sinon.assert.called(process.exit);
    sinon.assert.calledWith(process.exit, 1);
  });
});
```

Lastly, you can alter the stub's behavior with `callsFake`:

```js
it('is stubbed and faked', () => {
  process.exit.callsFake(() => {
    return 'foo';
  });
  assert.equal(process.exit(), 'foo');
});
```

To run the tests in your command-line:

```sh
npx mocha
```

Check out the [documentation](https://sinonjs.org) for more information.
