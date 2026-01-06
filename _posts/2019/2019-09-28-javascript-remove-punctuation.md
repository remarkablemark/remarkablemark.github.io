---
layout: post
title: Remove punctuation with JavaScript
date: 2019-09-28 20:51:37
excerpt: How to remove punctuation marks from a string with JavaScript.
categories: javascript string punctuation regex
---

<!--email_off-->

## Punctuation marks

Here's a string of English [punctuation marks](https://en.wikipedia.org/wiki/Punctuation):

```js
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
```

## Remove using iteration

To remove punctuation with JavaScript, you can _iterate_ through each letter and _filter_ out the letters that don't match:

```js
var rawString = 'Hello, world!';

var rawLetters = rawString.split('');
var cleanLetters = rawLetters.filter(function(letter) {
  return punctuation.indexOf(letter) === -1;
});

var cleanString = cleanLetters.join('');
```

Here's a function that removes punctuation marks using _iteration_:

```js
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

function removePunctuation(string) {
  return string
    .split('')
    .filter(function(letter) {
      return punctuation.indexOf(letter) === -1;
    })
    .join('');
}
```

## Remove using regex

Instead of storing the punctuation marks as a _string_, you can store it as a [Regular Expression](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp):

```js
var regex = new RegExp('[' + punctuation + ']', 'g');
```

The following regex is the same as the above:

```js
var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
```

With regex, you can [replace](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/replace) all matches with an _empty string_:

```js
var rawString = 'Hello, world!';

var cleanString = rawString.replace(regex, '');
```

Here's a function that removes punctuation marks using _regex_:

```js
var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

function removePunctuation(string) {
  return string.replace(regex, '');
}
```

## Demo

See [Replit](https://replit.com/@remarkablemark/Remove-punctuation) demo:

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Remove-punctuation?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

You can also find the code in this [Gist](https://gist.github.com/remarkablemark/6ef2779bee9d98bcfdc1fef2300f0476).

<!--/email_off-->
