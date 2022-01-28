---
layout: post
title: 'Enzyme: calling a React component method'
date: 2017-02-13 19:50:00
excerpt: How to use Enzyme and Jasmine to test that a React component method is called.
categories: react enzyme jasmine spy method test
---

This post goes over how to use Enzyme and Jasmine to test that a React component method is called.

## Problem

Given a React component:

```js
// MyComponent.js
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor() {
    super();
    this._method = this._method.bind(this);
  }
  _method() {
    return true;
  }
  render() {
    return null;
  }
}

export default MyComponent;
```

When writing tests, how can we check that `_method` is called?

## Instance

With [enzyme](https://github.com/airbnb/enzyme), you can access the component methods from the component [instance](http://airbnb.io/enzyme/docs/api/ReactWrapper/instance.html):

```js
// __spec__/MyComponent.spec.js
import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from './MyComponent';

const wrapper = shallow(<MyComponent />);
console.log(wrapper.instance()._method()); // true
```

## Spy

If you're using [Jasmine](https://jasmine.github.io/), you can even [spy](https://jasmine.github.io/api/edge/Spy.html) on `_method`:

```js
// ...

describe('MyComponent.prototype._method', () => {
  it('returns true when called', () => {
    // make sure to spy on the method before rendering
    spyOn(MyComponent.prototype, '_method').and.callThrough();

    const wrapper = shallow(<MyComponent />);
    expect(wrapper.instance()._method()).toBe(true);
    expect(MyComponent.prototype._method).toHaveBeenCalled();
  });
});
```

## Arrow Function

But what if you're using [arrow functions as class methods](https://babeljs.io/docs/plugins/transform-class-properties/)?

```js
// MyComponent2.js
import React, { Component } from 'react';

class MyComponent2 extends Component {
  _method = () => {
    return true;
  };
  render() {
    return null;
  }
}

export default MyComponent2;
```

Unfortunately, `_method` is no longer on the component prototype. You'll need to spy on the instance `_method`:

```js
// __spec__/MyComponent2.spec.js
import React from 'react';
import { shallow } from 'enzyme';
import MyComponent2 from '../MyComponent2';

describe('MyComponent2._method', () => {
  it('returns true when called', () => {
    const wrapper = shallow(<MyComponent2 />);
    const instance = wrapper.instance();

    // spy on the instance instead of the component
    spyOn(instance, '_method').and.callThrough();

    expect(instance._method()).toBe(true);
    expect(instance._method).toHaveBeenCalled();
  });
});
```
