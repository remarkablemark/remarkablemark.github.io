---
layout: post
title: "Enzyme: get root DOM node"
date: 2017-05-02 21:55:00 -4000
excerpt: How to get the root or outer DOM node of a React component with enzyme.
categories: react enzyme test
---

Given the React component:

```js
class Component extends React.Component {
  render() {
    return <div>text</div>;
  }
}
```

Is it possible to get the root DOM node with [enzyme](https://github.com/airbnb/enzyme)?

Ever since [2.7.0](https://github.com/airbnb/enzyme/blob/master/CHANGELOG.md#270-december-21-2016), you can do it with [getDOMNode](https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/getDOMNode.md):

```js
import { mount } from 'enzyme';

const wrapper = mount(<Component />);
const node = wrapper.getDOMNode();

// now you can access node properties
console.log(node.innerText); // 'text'
```

But `getDOMNode` doesn't work for functional components:

```js
function FunctionalComponent() {
  return <div>text</div>;
}

const wrapper = mount(<FunctionalComponent />);
wrapper.getDOMNode(); // throws an error
```

You'll need to use [findDOMNode](https://facebook.github.io/react/docs/react-dom.html#finddomnode) on the wrapper's node:

```js
import { findDOMNode } from 'react-dom';

const wrapper = mount(<FunctionalComponent />);
const node = findDOMNode(wrapper.node);

// works
console.log(node.innerHTML); // 'text'
```
