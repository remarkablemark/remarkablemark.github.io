---
layout: post
title: How to write tests for react-modal
date: 2017-05-17 20:25:00 -4000
excerpt: How to write unit tests for react-modal.
categories: react modal test enzyme
---

Let's say you built the following component with [react-modal](https://github.com/reactjs/react-modal):

```js
// ModalContainer.js
import React, { Component } from 'react';
import ReactModal from 'react-modal';

export default class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>
          Open Modal
        </button>
        <ReactModal
          {...this.props}
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModal}
        />
      </div>
    );
  }
}
```

How would you test the modal in this component?

### [Enzyme](https://github.com/airbnb/enzyme)

With [`.find`](http://airbnb.io/enzyme/docs/api/ReactWrapper/find.html), you can easily confirm that the `react-modal` component is rendered:

```js
// ModalContainer.spec.js
import React from 'react';
import ReactModal from 'react-modal';
import ModalContainer from './ModalContainer';
import { shallow } from 'enzyme';

describe('<ModalContainer>', () => {
  it('renders <ReactModal>', () => {
    const wrapper = shallow(<ModalContainer />);
    expect(wrapper.find(ReactModal).length).toEqual(1);
  });

  it('opens modal when button is clicked', () => {
    const wrapper = shallow(<ModalContainer />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(true);
  });

  // ...
});
```

But what if you want to confirm that the content is rendered when the modal is opened?

```js
// ...
  it('renders children when modal is open', () => {
    const wrapper = shallow(
      <ModalContainer>
        modal content
      </ModalContainer>
    );
    // ensure modal is open, otherwise content is not rendered
    wrapper.find('button').simulate('click');
    expect(wrapper.find(ReactModal).text()).toEqual('modal content');
  });
// ...
```

Unfortunately, the last assertion fails because the modal children is rendered in a separate **portal** element.

As a result, you must figure out a way to use the `.portal` property of your rendered modal.

### [findDOMNode](https://facebook.github.io/react/docs/react-dom.html#finddomnode)

One approach is to use `findDOMNode` to get the actual DOM node:

```js
// ...
import { shallow, mount } from 'enzyme';
import { findDOMNode } from 'react-dom';

// ...
  it('renders children when modal is open', () => {
    // mount is necessary for `findDOMNode` to work
    const wrapper = mount(
      <ModalContainer>
        modal content
      </ModalContainer>
    );
    wrapper.find('button').simulate('click');

    const portalNode = findDOMNode(
      wrapper.find(ReactModal).node.portal
    );
    // this works
    expect(portalNode.innerText).toEqual('modal content');
  });
// ...
```

### [ReactWrapper](https://github.com/airbnb/enzyme/blob/master/packages/enzyme/src/ReactWrapper.js)

An alternative approach is to wrap the portal node with enzyme's wrapper class:

```js
// ...
import { shallow, mount, ReactWrapper } from 'enzyme';

// ...
  it('renders children when modal is open', () => {
    // mount is still necessary here
    const wrapper = mount(
      <ModalContainer>
        modal content
      </ModalContainer>
    );
    wrapper.find('button').simulate('click');

    // this allows you to continue using the enzyme wrapper API
    const portalWrapper = new ReactWrapper(
      wrapper.find(ReactModal).node.portal, true
    );
    expect(portalWrapper.text()).toEqual('modal content');
  });
// ...
```
