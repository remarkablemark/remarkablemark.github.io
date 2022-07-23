---
layout: post
title: Spying on React class methods
date: 2018-06-13 19:45:55 -4000
excerpt: How to spy on React class methods with Jest and Enzyme.
categories: test enzyme jest react es6 javascript
---

Given the following [class component](https://reactjs.org/docs/react-component.html#overview):
```jsx
// Test.js
import React, { Component } from 'react';

class Test extends Component {
  componentDidMount() {
    this.func();
  }
  func = () => {
    // noop
  };
  render() {
    return null;
  }
}

export default Test;
```

To verify that [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount) was invoked after component was mounted:
```jsx
// Test.spec.js
import React from 'react';
import { shallow } from 'enzyme';
import Test from './Test';

it('invokes `componentDidMount` when mounted', () => {
  jest.spyOn(Test.prototype, 'componentDidMount');
  shallow(<Test />);
  expect(Test.prototype.componentDidMount).toHaveBeenCalled();
  Test.prototype.componentDidMount.mockRestore();
});
```

Now what if we want to spy on the [class field arrow function](https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal)?

Could we do something like below?
```jsx
// Test.spec.js
// ...

it('invokes `func` when mounted', () => {
  jest.spyOn(Test.prototype, 'func');
  shallow(<Test />);
  expect(Test.prototype.func).toHaveBeenCalled();
  Test.prototype.func.mockRestore();
});
```

Unfortunately, we get a failure:
```
FAIL  Test.spec.js
 ● calls `func` when mounted

   Cannot spy the func property because it is not a function; undefined given instead
```

This is because arrow function class properties aren't found on the __class__ but on the class __instance__.

So we have 2 options:
1. Spy on the [instance](https://airbnb.io/enzyme/docs/api/ReactWrapper/instance.html) method and explicitly invoke the lifecycle method
2. Or refactor to [bind in constructor](https://reactjs.org/docs/faq-functions.html#bind-in-constructor-es2015) instead of [arrows for class methods](https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal).

### Option 1

Spy on the instance method and explicitly call [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount):
```jsx
// Test.spec.js
// ...

it('calls `func` when mounted', () => {
  const wrapper = shallow(<Test />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'func');
  instance.componentDidMount();
  expect(instance.func).toHaveBeenCalled();
});
```

Here the component remains unchanged whereas the test case needs to be updated.

### Option 2

Refactor from [class properties (Stage 3)](https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal) to [bind in constructor (ES2015)](https://reactjs.org/docs/faq-functions.html#bind-in-constructor-es2015):
```jsx
// Test.js
import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.func = this.func.bind(this);
  }
  componentDidMount() {
    this.func();
  }
  func() {
    // noop
  };
  render() {
    return null;
  }
}

export default Test;
```

Here the test case remains unchanged whereas the component is updated.
