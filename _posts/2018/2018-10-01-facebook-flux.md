---
layout: post
title: Setting up Flux in a React app
date: 2018-10-01 19:43:27
updated: 2019-09-08 20:20:59
excerpt: How to set up Flux in a React app.
categories: flux react javascript
---

This post will go over how to set up [Flux](http://facebook.github.io/flux/) in a React app.

## View

Starting with the _component_:

```jsx
// Counter.js
import React, { Component } from 'react';

export default class Counter extends Component {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}
```

The _data flow_ can be described by the diagram:

```
 ---------------      ----------------      ------------------      --------------
| button (view) | -> | click (action) | -> | setState (store) | -> | count (view) |
 ---------------      ----------------      ------------------      --------------
```

When view components _share state_, then it's a good time to add a _store_.

## Store

Create a store that extends [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter):

```js
// countStore.js
import { EventEmitter } from 'events';

let count = 0;

class CountStore extends EventEmitter {
  getCount() {
    return count;
  }

  increment = () => {
    count++;
    this.emit('change');
  };

  decrement = () => {
    count--;
    this.emit('change');
  };
}

export default new CountStore();
```

`EventEmitter` is used to set up a [publish-subscribe (pub/sub)](https://en.wikipedia.org/wiki/Publish%e2%80%93subscribe_pattern) messaging pattern.

When `increment` or `decrement` is called, the `'change'` event is emitted.

Wire up the component state with the store state:

```jsx
// Counter.js
// ...
import countStore from './countStore';

export default class Counter extends Component {
  state = {
    count: countStore.getCount(),
  };

  componentDidMount() {
    countStore.on('change', this.updateCount);
  }

  componentWillUnmount() {
    // remove or else there will be memory leaks
    countStore.off('change', this.updateCount);
  }

  updateCount = () => {
    this.setState({
      count: countStore.getCount(),
    });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={countStore.increment}>+</button>
        <button onClick={countStore.decrement}>-</button>
      </div>
    );
  }
}
```

[`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount) adds the change listener and [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount) removes the change listener.

To minimize _unexpected side effects_ when the code is changed, refactor the listeners into _helper methods_:

```js
// countStore.js
// ...

class CountStore extends EventEmitter {
  /** @param {Function} callback */
  addChangeListener(callback) {
    this.on('change', callback);
  }

  /** @param {Function} callback */
  removeChangeListener(callback) {
    this.off('change', callback);
  }
  // ...
}
```

Update the listeners in the component:

```jsx
// Counter.jsx
// ...

export default class Counter extends Component {
  componentDidMount() {
    countStore.addChangeListener(this.updateCount);
  }

  componentWillUnmount() {
    countStore.removeChangeListener(this.updateCount);
  }
  // ...
}
```

We can add a _dispatcher_ next. However, the best time to add one is when the number of _stores increase_. This is so a _single_ dispatcher dispatches _all_ actions to the stores.

## Dispatcher

Instantiate a [dispatcher](https://facebook.github.io/flux/docs/dispatcher/) from [`flux`](https://www.npmjs.com/package/flux):

```js
// dispatcher.js
import { Dispatcher } from 'flux';

export default new Dispatcher();
```

The dispatcher _broadcasts payloads_ to its _registered callbacks_.

Thus, register the dispatcher in the store:

```js
// countStore.js
// ...
import dispatcher from './dispatcher';

class CountStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = dispatcher.register(action => {
      switch (action.type) {
        case 'increment':
          this.increment();
          break;
        case 'decrement':
          this.decrement();
          break;
        default:
          break;
      }
    });
  }
  // ...
}
```

The `dispatch` method receives an argument `action`. In our example, it's simply an _object_.

The `action` object can contain _any_ type of property, but `type` is used here as per _convention_.

Additional data can be passed via the property `payload`, which is also named as per convention.

Replace the store methods with `dispatch`:

```jsx
// Counter.js
// ...

export default class Counter extends Component {
  // ...
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => dispatcher.dispatch({ type: 'increment' })}>
          +
        </button>
        <button onClick={() => dispatcher.dispatch({ type: 'decrement' })}>
          -
        </button>
      </div>
    );
  }
}
```

It seems that the dispatch calls are getting _repetitive_.

For the next step, we'll add _action creators_ so we don't have to call the dispatcher _directly_ in our component.

## Actions

Create the _actions_:

```js
// actions.js
import dispatcher from './dispatcher';

export const increment = () => {
  dispatcher.dispatch({
    type: 'increment',
  });
};

export const decrement = () => {
  dispatcher.dispatch({
    type: 'decrement',
  });
};

export default {
  increment,
  decrement,
};
```

Replace them with the dispatcher:

```jsx
// Counter.js
// ...
import actions from './actions';

export default class Counter extends Component {
  // ...
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={actions.increment}>+</button>
        <button onClick={actions.decrement}>-</button>
      </div>
    );
  }
}
```

Since we're using the same action types in multiple files, we can refactor them into _constants_ to keep the code [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself).

## Constants

Action types are simply _strings_:

```js
// constants.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

The convention is to use the _uppercase_ string of the variable name.

Now update actions with the constants:

```js
// actions.js
// ...
import { INCREMENT, DECREMENT } from './constants';

export const increment = () => {
  dispatcher.dispatch({
    type: INCREMENT,
  });
};

export const decrement = () => {
  dispatcher.dispatch({
    type: DECREMENT,
  });
};
```

And update the store as well:

```js
// countStore.js
// ...
import { INCREMENT, DECREMENT } from './constants';

class CountStore extends EventEmitter {
  constructor() {
    super();
    // the token can be used to wait or synchronize with the other stores
    this.dispatchToken = dispatcher.register(action => {
      switch (action.type) {
        case INCREMENT:
          this.increment();
          break;
        case DECREMENT:
          this.decrement();
          break;
        default:
          break;
      }
    });
  }
  // ...
}
```

At last, we have successfully wired up our React app with Flux!
