---
layout: post
title: How to test react-modal
date: 2017-05-17 20:25:00
updated: 2020-03-14 15:41:17
excerpt: How to write unit tests for react-modal using jest and enzyme.
categories: react modal test jest enzyme javascript
---

Let's say we have `<ModalContainer>` that renders [react-modal](https://github.com/reactjs/react-modal):

```jsx
// ModalContainer.js
import React, { Component } from 'react';
import Modal from 'react-modal';

class ModalContainer extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Open Modal</button>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModal}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ModalContainer;
```

How would we write a test for the modal component?

## Enzyme find

You can use [enzyme](https://github.com/airbnb/enzyme) [`find`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/find.html) to verify that _react-modal_ renders:

```jsx
// ModalContainer.test.js
import { shallow } from 'enzyme';
import Modal from 'react-modal';
import ModalContainer from './ModalContainer';
import React from 'react';

it('renders react-modal', () => {
  const wrapper = shallow(<ModalContainer />);
  expect(wrapper.find(Modal)).toHaveLength(1);
});
```

Or test that _react-modal_ prop `isOpen` changes:

```jsx
it('opens modal when button is clicked', () => {
  const wrapper = shallow(<ModalContainer />);
  expect(wrapper.find(Modal).prop('isOpen')).toBe(false);

  wrapper.find('button').simulate('click');
  expect(wrapper.find(Modal).prop('isOpen')).toBe(true);
});
```

Or check that _react-modal_ `children` matches what you expect:

```jsx
it('renders childen when modal is open', () => {
  const wrapper = shallow(<ModalContainer>modal content</ModalContainer>);
  expect(wrapper.find(Modal).prop('children')).toBe('modal content');
  // expect(wrapper.find(Modal).prop('children')).toMatchSnapshot();
});
```

However, these tests only test implementation details, which has low value.

So how can we write more valuable tests that confirm the modal content is rendered when it's opened?

We could try something like this:

```jsx
it('renders content when modal is open', () => {
  const wrapper = shallow(<ModalContainer>modal content</ModalContainer>);
  wrapper.find('button').simulate('click');
  expect(wrapper.find(Modal).text()).toBe('modal content');
});
```

But it ends up failing:

```
✕ renders content when modal is open

expect(received).toBe(expected)

Expected value to be (using ===):
  "modal content"
Received:
  "<Modal />"

  27 | it('renders content when modal is open', () => {
  28 |   const wrapper = shallow(<ModalContainer>modal content</ModalContainer>);
  29 |   wrapper.find('button').simulate('click');
> 30 |   expect(wrapper.find(Modal).text()).toBe('modal content');
  31 | });
```

To fix it, we can do one of the following:

- [mount](#mount) the element and get the modal text,
- or get the modal [node's innerText](#nodeinnertext).

## mount

The advantage of enzyme [`mount`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/mount.html) is it renders the element to an actual DOM ([browser](https://developer.mozilla.org/docs/Web/API/Document_Object_Model) or [jsdom](https://github.com/jsdom/jsdom)):

```jsx
import { mount } from 'enzyme';

// ...
it('renders content when modal is open', () => {
  // mount renders to the dom (real or mocked)
  const wrapper = mount(<ModalContainer>modal content</ModalContainer>);
  wrapper.find('button').simulate('click');

  // element text
  expect(wrapper.find(Modal).text()).toBe('modal content');
});
```

## node.innerText

### instance

To get _react-modal_ `node` (which is an actual DOM node), you need to get the modal [`instance`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/instance.html):

```jsx
it('renders content when modal is open', () => {
  // mount renders to the dom (real or mocked)
  const wrapper = mount(<ModalContainer>modal content</ModalContainer>);
  wrapper.find('button').simulate('click');

  // instance node
  const instance = wrapper.find(Modal).instance();
  expect(instance.node.innerText).toBe('modal content');
});
```

Then you can call [`innerText`](https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText) on the node to get the rendered text.

### findDOMNode

Since _react-modal_ has a [portal](https://reactcommunity.org/react-modal/testing/) property, you can use [`findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) to get the node:

```jsx
import { findDOMNode } from 'react-dom';

// ...
it('renders content when modal is open', () => {
  // mount renders to the dom (real or mocked)
  const wrapper = mount(<ModalContainer>modal content</ModalContainer>);
  wrapper.find('button').simulate('click');

  // findDOMNode
  const portalNode = findDOMNode(instance.portal);
  expect(portalNode.innerText).toBe('modal content');
});
```

## Demo

The code and tests can be found on [CodeSandbox](https://codesandbox.io/s/testing-react-modal-qnroz):

<iframe
  src="https://codesandbox.io/embed/confident-wright-qnroz?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FModalContainer.test.js&previewwindow=tests"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Testing react-modal"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
