---
layout: post
title: Using ES6 arrow functions in Mocha
date: 2016-08-20 23:59:00 -4000
excerpt: Don't use ES6 arrow functions if you want to attach a property to Mocha's `this`.
categories: mocha test testing nodejs javascript es6
---

It's [recommended](https://mochajs.org/#arrow-functions) not to use [ES6 arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) if you want to use Mocha's `this`.

Why? The reason is because [Mocha](https://mochajs.org/#interfaces) globals like `before`, `after`, and `it` are bound to the same context.

Using `function`, you would get the following:

```js
console.log(this.constructor.name); // Object

describe('test', function() {
    console.log(this.constructor.name); // Suite

    before(function() {
        console.log(this.constructor.name); // Context
    });

    it('should pass', function() {
        console.log(this.constructor.name); // Context
    });
});
```

But with arrow functions, `this` is bound lexically, which means the (inner) function contains the scope of the parent function.

Now, you get something totally different:

```js
console.log(this.constructor.name); // Object

describe('test', () => {
    console.log(this.constructor.name); // Object

    before(() => {
        console.log(this.constructor.name); // Object
    });

    it('should pass', () => {
        console.log(this.constructor.name); // Object
    });
});
```

So as long as you don't need to use Mocha's `this`, arrow functions should be fine.

However, I had to learn the lesson the hard way, so this is an FYI for those who didn't know.
