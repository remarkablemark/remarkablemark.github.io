---
layout: post
title: 'JavaScript: check if string exists in array'
date: 2019-09-01 21:32:51
excerpt: How to check if a string exists in an array of strings using JavaScript.
categories: javascript array string includes indexOf for-loop trie trieste
---

Given an array of strings:

```js
const strings = ['foo', 'bar', 'baz'];
```

## includes

Use [`includes`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) to check if a string is found in a list:

```js
strings.includes('foo'); // true
```

In terms of browser support, `includes` is _not_ supported in [Internet Explorer](https://caniuse.com/#search=includes). [`indexOf`](#indexof) can be used instead.

## indexOf

Use [`indexOf`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) to get the _index position_ of a string in a list:

```js
strings.indexOf('foo'); // 0
```

To check that a string exists in the list:

```js
strings.indexOf('foo') !== -1; // true
```

## for-loop

Of course, you can use a [`for` statement](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement):

```js
let stringMatch = 'foo';
let stringExists = false;

for (let i = 0, len = strings.length, i < len; i++) {
  if (strings[i] === stringMatch) {
    stringExists = true;
    break;
  }
}

stringExists; // true
```

The benefit of `for` statements over [`forEach`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) or [`map`](http://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is the ability to [`break`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/break) (return early).

## trie

Lastly, if there are _a lot_ of strings in the array, storing them in a [trie](https://wikipedia.org/wiki/Trie) may improve performance.

The following example uses the package [trieste](https://www.npmjs.com/package/trieste):

```js
const trie = trieste();
trie.add.apply(trie, strings);
trie.contains('foo'); // true
```
