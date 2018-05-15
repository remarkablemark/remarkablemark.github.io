---
layout: post
title: "JavaScript: eval vs Function"
date: 2018-05-15 19:42:03 -4000
excerpt: A comparison of using `eval` or `Function` in JavaScript to evaluate an expression.
categories: javascript eval function
---

[`eval`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/eval) evaluates an expression:
```js
eval('2 + 2'); // 4
```

What if there's more than one expression?
```js
eval('2 + 2; "foo"'); // "foo"
```

It returns the value of the last expression.

However, `eval` is considered to be [_evil_](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/eval#Do_not_ever_use_eval!) because:
1. it's run in the scope that it's invoked and
2. it's not known to be performant.

Here's an example of `eval` evaluating an overridden `undefined` variable:
```js
function evalInScope() {
  var undefined = 'foo';
  return eval('undefined');
}

evalInScope(); // "foo"
undefined; // undefined
```

So what can we do about this?

Luckily, we have [`Function`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) as a better alternative:
```js
var func = new Function('return 2 + 2');
func(); // 4
```

And what about the execution context?
```js
function funcInScope() {
  var undefined = 'foo';
  return new Function('return undefined')();
}

funcInScope(); // undefined
```

It looks like the function is evaluated in a separate scope.

A [helper](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function#Difference_between_Function_constructor_and_function_declaration) can be created for maximum portability:
```js
function execute(code) {
  // this is the recommended way of executing code with Function
  return Function('"use strict";return ' + code)();
}
```

And to invoke our function with a particular context, we can use [`call`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or [`apply`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/apply):
```js
var myContext = { works: true };
Function('return this.works').call(myContext); // true
```
