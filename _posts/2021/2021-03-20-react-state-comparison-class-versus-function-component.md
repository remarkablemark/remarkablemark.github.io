---
layout: post
title: 'React state comparison: class vs function'
date: 2021-03-20 17:43:27
updated: 2021-03-20 19:03:16
excerpt: How React state is managed for class and function components.
categories: react class function state javascript
---

[YouTube video](https://b.remarkabl.org/3lHwLBG):

<iframe width="100%" height="720" src="https://www.youtube.com/embed/s5u9Ui7e9L4?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[CodeSandbox demo](https://b.remarkabl.org/3tGMTGk):

<iframe src="https://codesandbox.io/embed/react-state-class-vs-function-qwf3z?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="React State: Class vs Function" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

## Class

Rendering initial state:

```jsx
import React, { Component } from 'react';

export default class Klass extends Component {
  state = {
    count: 0,
  };
  render() {
    return <button>{this.state.count}</button>;
  }
}
```

Updating state:

```jsx
import React, { Component } from 'react';

export default class Klass extends Component {
  state = {
    count: 0,
  };
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    return <button onClick={this.handleClick}>{this.state.count}</button>;
  }
}
```

Class `state` property must be an object since `setState` takes an object of state variables to update.

## Function

Rendering initial state:

```jsx
import React, { useState } from 'react';

export default function Funktion() {
  const initialState = {
    count: 0,
  };
  const [state] = useState(initialState);
  return <button>{state.count}</button>;
}
```

Updating state:

```jsx
import React, { useState } from 'react';

export default function Funktion() {
  const initialState = {
    count: 0,
  };
  const [state, setState] = useState(initialState);
  function handleClick() {
    setState({
      count: state.count + 1,
    });
  }
  return <button onClick={handleClick}>{state.count}</button>;
}
```

There can be multiple `useState` hooks in a function.

The initial state passed to `useState` doesn't have to be an object:

```jsx
import React, { useState } from 'react';

export default function Funktion() {
  const initialCount = {
    count: 0,
  };
  const [count, setCount] = useState(initialCount);
  function handleClick() {
    setCount(count + 1);
  }
  return <button onClick={handleClick}>{count}</button>;
}
```

## Resources

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Using the State Hook](https://reactjs.org/docs/hooks-state.html)
