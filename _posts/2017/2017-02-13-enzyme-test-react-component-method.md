---
layout: post
title: "Enzyme: call a React component method"
date: 2017-02-13 19:50:00 -4000
excerpt: How to use enzyme to test that a React component method is called.
categories: enzyme react sinon spy method test
---

Imagine you have the following component:

```js
class Component extends React.Component {
  constructor() {
    this.method = this.method.bind(this);
  }
  method() {
    console.log('method called');
  }
  render() {
    return null;
  }
}
```

How can you call `method` in your test?

With [enzyme](https://github.com/airbnb/enzyme), you can get the method from the [component instance](http://airbnb.io/enzyme/docs/api/ReactWrapper/instance.html):

```js
import { shallow } from 'enzyme';

const wrapper = shallow(<Component />);
const instance = wrapper.instance();
instance.method(); // 'method called'
```

Then with [sinon](http://sinonjs.org), you can spy on `method`:

```js
import sinon from 'sinon';

const spy = sinon.spy(Component.prototype, 'method');
const wrapper = shallow(<Component />);

wrapper.instance().method();
sinon.assert.calledOnce(spy);
```

If you're using [class property transform](https://babeljs.io/docs/plugins/transform-class-properties/) (stage-2 feature):

```js
class Component2 extends React.Component {
  method = () => {
    console.log('method called');
  };
  render() {
    return null;
  }
}
```

Then you'll need to update your approach since `method` is no longer on `prototype`:

```js
const wrapper = shallow(<Component2 />);
const instance = wrapper.instance();
const spy = sinon.spy(Component, 'method');

// method is not available until component is updated
instance.forceUpdate();

instance.method();
sinon.assert.calledOnce(spy);
```
