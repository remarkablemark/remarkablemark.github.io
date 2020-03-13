---
layout: post
title: How to test react-modal
date: 2017-05-17 20:25:00
updated: 2020-03-12 21:19:43
excerpt: Writing unit tests for react-modal using jest and enzyme.
categories: react react-dom react-modal modal jest test enzyme jsx javascript
---

Let's say you have a component `ModalContainer` that renders [react-modal](https://github.com/reactjs/react-modal):

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

How would you write a test for this component?

## Enzyme find

You can use [enzyme's](https://github.com/airbnb/enzyme) [`.find()`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/find.html) to verify that `react-modal` is rendered:

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

it('opens modal when button is clicked', () => {
  const wrapper = shallow(<ModalContainer />);
  wrapper.find('button').simulate('click');
  expect(wrapper.find(Modal).prop('isOpen')).toBe(true);
});
```

But what if you want to confirm that the modal content is rendered when the modal is opened?

```jsx
it('renders content when modal is open', () => {
  const wrapper = shallow(<ModalContainer>modal content</ModalContainer>);
  wrapper.find('button').simulate('click');
  expect(wrapper.find(Modal).text()).toBe('modal content');
});
```

However, the last assertion fails because the modal children is rendered in a separate **portal** element.

As a result, you must make use of the `.portal` property of the modal element for this test to work.

## ReactDOM findDOMNode

One approach is to use ReactDOM's [`findDOMNode()`](https://reactjs.org/docs/react-dom.html#finddomnode):

```jsx
// ...
import { findDOMNode } from 'react-dom';
import { mount } from 'enzyme';

it('renders content when modal is open', () => {
  // mount is necessary for findDOMNode
  const wrapper = mount(<ModalContainer>modal content</ModalContainer>);
  wrapper.find('button').simulate('click');

  const portalNode = findDOMNode(wrapper.find(Modal).node.portal);
  expect(portalNode.innerText).toBe('modal content');
});
```

## Enzyme ReactWrapper

Alternatively, you can instantiate the portal node with enzyme's [ReactWrapper](https://github.com/airbnb/enzyme/blob/master/packages/enzyme/src/ReactWrapper.js):

```jsx
// ...
import { ReactWrapper } from 'enzyme';

it('renders content when modal is open', () => {
  const wrapper = mount(<ModalContainer>modal content</ModalContainer>);
  wrapper.find('button').simulate('click');

  const portalWrapper = new ReactWrapper(wrapper.find(Modal).node.portal, true);
  expect(portalWrapper.text()).toBe('modal content');
});
```
