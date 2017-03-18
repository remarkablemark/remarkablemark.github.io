---
layout: post
title: "Enzyme: call a React component method"
date: 2017-02-13 19:50:00 -4000
excerpt: How to use enzyme to test that a React component method is called.
categories: enzyme react test
---

Imagine you have the following component:

```js
class Component extends React.Component {
    method() {
        console.log('method called');
    }
    render() {
        return null;
    }
}
```

How can you test that `method` is called?

With [enzyme](https://github.com/airbnb/enzyme), you can access the method from the [component instance](http://airbnb.io/enzyme/docs/api/ReactWrapper/instance.html):

```js
import { shallow } from 'enzyme';

const wrapper = shallow(<Component />);
wrapper.instance().method();
```

And with [sinon](http://sinonjs.org), you can spy on the method:

```js
import sinon from 'sinon';

const spy = sinon.spy(Component.prototype, 'method');
const wrapper = shallow(<Component />);

wrapper.instance().method();
sinon.assert.calledOnce(spy);
```
