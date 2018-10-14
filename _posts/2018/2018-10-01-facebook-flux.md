---
layout: post
title: Setting up Flux
date: 2018-10-01 19:43:27 -4000
excerpt: How to set up Facebook Flux for a React app.
categories: flux react javascript
---

The following example shows how to wire up a React component with [Facebook Flux](http://facebook.github.io/flux/).

## View

Starting with the component:
```jsx
// Counter.jsx
import React, { Component } from 'react';

export default class Counter extends Component {
  state = {
    count: 0,
  };
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  decrement = () => {
    this.setState({ count: this.state.count - 1 });
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

Application changes can be described by the diagram:
```
 ---------------      ----------------      ------------------      --------------
| button (view) | -> | click (action) | -> | setState (store) | -> | count (view) |
 ---------------      ----------------      ------------------      --------------
```

When the view components start sharing the same state, that's when a store should be added.

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
  // class properties ensure `this` is bound to the instance
  increment = () => {
    count += 1;
    this.emit('change');
  };
  decrement = () => {
    count -= 1;
    this.emit('change');
  };
}

export default new CountStore();
```

`EventEmitter` enables a [pub/sub (publish-subscribe)](https://wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) messaging pattern.

You should notice that when `increment` or `decrement` is called, the `"change"` event is emitted.

Wire up the component state with the store state:
```jsx
// Counter.jsx
// ...
import countStore from './countStore.js';

export default class Counter extends Component {
  state = {
    count: countStore.getCount(),
  };
  componentDidMount() {
    countStore.on('change', this.updateCount);
  }
  componentWillUnmount() {
    // remove the listener otherwise there will be memory leaks
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

[`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount) adds the change listener whereas [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount) removes the change listener. This is to ensure there are no memory leaks.

To minimize unexpected side effects due to future changes, we can refactor the listeners into helper methods:
```js
// countStore.js
// ...

// ...

class CountStore extends EventEmitter {
  addChangeListener(callback) {
    this.on('change', callback);
  }
  removeChangeListener(callback) {
    this.off('change', callback);
  }
  // ...
}

// ...
```

Now the listeners look more consistent when used inside components:
```jsx
// Counter.jsx
// ...

export default class Counter extends Component {
  // ...
  componentDidMount() {
    countStore.addChangeListener(this.updateCount);
  }
  componentWillUnmount() {
    countStore.removeChangeListener(this.updateCount);
  }
  // ...
}
```

So when do we add a dispatcher?

When the number of stores increase&mdash;that's when having a single dispatcher to dispatch actions to stores will be useful.

## Dispatcher

Create a [dispatcher](https://facebook.github.io/flux/docs/dispatcher.html) instance from [`flux`](https://www.npmjs.com/package/flux):
```js
// dispatcher.js
import { Dispatcher } from 'flux';
export default new Dispatcher();
```

The dispatcher will broadcast payloads to registered callbacks.

Hence, register the dispatcher in the store:
```js
// countStore.js
// ...
import dispatcher from './dispatcher';

// ...

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

// ...
```

You'll notice that `dispatcher.dispatch` receives an argument `action`, which is an object.

The object can contain any kind of property, but `type` is used here as convention.

You can pass any additional data via properties like `payload`.

Now replace the store methods with dispatch:
```jsx
// Counter.jsx
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

It may seem that the dispatch calls are getting repetitive.

So for the next step, we'll create action creators so we don't have to call the dispatcher directly in our component.

## Actions

Create the actions:
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

And replace them with the dispatcher:
```jsx
// Counter.jsx
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

By now, you should notice that we're using the same action types in multiple files.

To keep our code [DRY](https://wikipedia.org/wiki/Don%27t_repeat_yourself), we'll turn our action types into constants.

## Constants

The action types are just strings:
```js
// constants.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

The convention is to use uppercase.

Now replace the hardcoded strings with the constants:
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

// ...
```

And don't forget to update the store as well:
```js
// countStore.js
// ...
import { INCREMENT, DECREMENT } from './constants';

// ...

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

// ...
```

At last, we've wired up our React app with Flux!
