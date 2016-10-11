---
layout: post
title: JavaScript object reference
date: 2016-08-23 18:13:00 -4000
excerpt: JavaScript objects are a reference type. This is useful to know when copying or comparing objects.
categories: javascript object reference
---

In JavaScript, what happens when a new variable is assigned to an existing object? Does that create a **_copy_** of the original object?

Well, let's see:

```js
var original = { id: 1 };
var copy = original;

copy.id = 2;

console.log(copy.id);     // 2
console.log(original.id); // 2
```

In the example, `copy` ended up overriding `original`. So it turns out that instead of making a _copy_, it makes a **_reference_** to the object.

Now what if the original variable is reassigned to a different value?

```js
var obj = { foo: 'bar' };
var ref = obj;

obj = null;

console.log(obj); // null
console.log(ref); // { foo: 'bar' }
```

In this case, `obj` being reassigned to `null` doesn't change `ref` because `ref` continues to point to the original reference.

This is why _an empty object **does not equal** another empty object_&mdash;the references simply don't match.

```js
var obj1 = {};
var obj2 = {};
obj1 === obj2; // false
{} === {};     // false
```

It's only equivalent when an object is compared to its own reference.

```js
var obj = {};
var ref = obj;
ref === obj; // true
```

Check out this [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Comparing_Objects) for more information.
