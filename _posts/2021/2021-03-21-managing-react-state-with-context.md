---
layout: post
title: Managing React state with Context
date: 2021-03-21 19:19:03
updated: 2021-07-24 16:36:27
excerpt: How to manage React state with Context and the useReducer hook.
categories: react context reducer hook state javascript
---

[YouTube video](https://b.remarkabl.org/3f1EYz3):

<iframe width="100%" height="720" src="https://www.youtube.com/embed/Bl38Qyg8z3Q?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[CodeSandbox demo](https://b.remarkabl.org/314R56A):

<iframe src="https://codesandbox.io/embed/react-context-state-3ji7t?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="React State: Class vs Function" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

## Motivation

Why use Context to handle React state? The same reason you use [Redux](https://redux.js.org/) to manage your application store. If your components talk to one another and [lifting state](https://reactjs.org/docs/lifting-state-up.html) becomes cumbersome, then Context is a native way to deal with your application state.

## Prerequisites

We will be refactoring `<App>`&mdash;which uses local state&mdash;to use Context:

```jsx
// App.js
import { useState } from 'react';

export default function App() {
  const [state, setState] = useState({ count: 0 });

  function increment() {
    setState({
      count: state.count + 1,
    });
  }

  function decrement() {
    setState({
      count: state.count - 1,
    });
  }

  return (
    <>
      <p>{state.count}</p>
      <button onClick={increment}>+</button>&nbsp;
      <button onClick={decrement}>-</button>
    </>
  );
}
```

As you can see, there's a counter with 2 buttons that increments or decrements the count.

## Provider

Create `<Provider>` and set prop `value` to 0:

```jsx
// Provider.js
import { createContext } from 'react';

export const Context = createContext();

export default function Provider(props) {
  return <Context.Provider value={0}>{props.children}</Context.Provider>;
}
```

Render `<Provider>` as the top-level component in `index.js`:

```jsx
// index.js
import { render } from 'react-dom';
import App from './App';
import Provider from './Provider';

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

Get the Provider `value` with `useContext` in `<App>`:

```jsx
// App.js
import { useContext } from 'react';
import { Context } from './Provider';

export default function App() {
  const value = useContext(Context);
  return (
    <>
      <p>{value}</p>
      <button>+</button>&nbsp;
      <button>-</button>
    </>
  );
}
```

## useReducer

Create a reducer function:

```js
// reducer.js
export default function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.payload,
      };
    case 'DECREMENT':
      return {
        count: state.count - action.payload,
      };
    default:
      throw new Error();
  }
}
```

Pass state and dispatch from `useReducer` to Provider prop `value`:

```jsx
// Provider.js
import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Context = createContext();

const initialState = {
  count: 0,
};

export default function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
}
```

Update `<App>` with the new context value:

```jsx
// App.js
import { useContext } from 'react';
import { Context } from './Provider';

export default function App() {
  const [state, dispatch] = useContext(Context);

  function increment() {
    dispatch({
      type: 'INCREMENT',
      payload: 1,
    });
  }

  function decrement() {
    dispatch({
      type: 'DECREMENT',
      payload: 1,
    });
  }

  return (
    <>
      <p>{state.count}</p>
      <button onClick={increment}>+</button>&nbsp;
      <button onClick={decrement}>-</button>
    </>
  );
}
```

## Consumer

An alternative to `useContext` is [Consumer](https://reactjs.org/docs/context.html#contextconsumer).

First, export `Consumer` from Context:

```js
// Provider.js
export const Context = createContext();
export const { Consumer, Provider } = Context;
```

Then replace `useContext` with `<Consumer>`:

```jsx
// App.js
import { Consumer } from './Provider';

export default function App() {
  return (
    <Consumer>
      {([state, dispatch]) => (
        <>
          <p>{state.count}</p>
          <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>
            +
          </button>&nbsp;
          <button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>
            -
          </button>
        </>
      )}
    </Consumer>
  );
}
```

`<Consumer>` requires a callback function for prop `children`. The 1st argument is the Provider `value`.

## Class

For class components, the Provider value can be accessed on `this.context`:

```jsx
class App extends Component {
  render() {
    const [state, dispatch] = this.context;
    // ...
  }
}
```

## Todo

Ideas for improvements:

- Build a [custom hook](https://reactjs.org/docs/hooks-custom.html) for `useContext(Context)`.
- Refactor action types to constants.
- Create action creators.
- Set [`displayName`](https://reactjs.org/docs/context.html#contextdisplayname) on Context to improve visibility in React DevTools.

## Resources

- [Context](https://reactjs.org/docs/context.html)
- [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
