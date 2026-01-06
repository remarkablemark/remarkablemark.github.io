---
layout: post
title: 'React versus Vue: A Code Comparison'
date: 2020-12-17 17:08:50
updated: 2020-12-25 15:47:49
excerpt: Code comparison between React, Vue 2, and Vue 3.
categories: react vue javascript
---

Comparison between [React](https://reactjs.org/), [Vue 2](https://vuejs.org/), and [Vue 3](https://v3.vuejs.org/):

- [Component](#component)
- [Event](#event)
- [Prop](#prop)
- [State](#state)
- [Render](#render)

## Demo

[Replit](https://replit.com/@remarkablemark/React-versus-Vue):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/React-versus-Vue?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Component

### React

[Function](https://reactjs.org/docs/components-and-props.html#function-and-class-components) component:

```jsx
function Component() {
  return <p>Hello, component!</p>;
}
```

[Class](https://reactjs.org/docs/components-and-props.html#function-and-class-components) component:

```jsx
class Component extends React.Component {
  render() {
    return <p>Hello, component!</p>;
  }
}
```

### Vue 2

[Component](https://vuejs.org/v2/guide/components.html):

```js
Vue.component('vue-component', {
  template: '<p>Hello, component!</p>',
});
```

> It's not named `'component'` because Vue does not like the use of built-in or reserved HTML elements as the component id.

### Vue 3

[Component](https://v3.vuejs.org/guide/component-basics.html):

```js
Vue.createApp({}).component('vue-component', {
  template: '<p>Hello, component!</p>',
});
```

## Event

### React

[Handling event](https://reactjs.org/docs/handling-events.html) for function component:

```jsx
function Event() {
  function handleClick() {
    alert();
  }
  return <button onClick={handleClick}>Click Event</button>;
}
```

[Handling event](https://reactjs.org/docs/handling-events.html) for class component:

```jsx
class Event extends React.Component {
  handleClick() {
    alert();
  }
  render() {
    return <button onClick={this.handleClick}>Click Event</button>;
  }
}
```

### Vue 2

[Event handling](https://vuejs.org/v2/guide/events.html):

```js
Vue.component('event', {
  template: '<button @click="handleClick">Click Event</button>',
  methods: {
    handleClick: () => {
      alert();
    },
  },
});
```

> The `@` symbol is the shortened form of the `v-on` directive.

### Vue 3

[Event handling](https://v3.vuejs.org/guide/events.html):

```js
Vue.createApp({}).component('event', {
  template: '<button @click="handleClick">Click Event</button>',
  methods: {
    handleClick: () => {
      alert();
    },
  },
});
```

## Prop

### React

Function component [props](https://reactjs.org/docs/components-and-props.html#function-and-class-components):

```jsx
function Prop(props) {
  return <p>Hello, {props.name}!</p>;
}

Prop.defaultProps = {
  name: 'prop',
};
```

Class component [props](https://reactjs.org/docs/components-and-props.html#function-and-class-components):

```jsx
class Prop extends React.Component {
  static defaultProps = {
    name: 'prop',
  };
  render() {
    return <p>Hello, {this.props.name}!</p>;
  }
}
```

Passing props:

```jsx
<Prop name="prop" />
```

### Vue 2

Component with [data](https://vuejs.org/v2/api/#data):

{% raw %}

```js
Vue.component('prop', {
  data() {
    return {
      name: 'prop',
    };
  },
  template: '<p>Hello, {{ name }}!</p>',
});
```

{% endraw %}

Component with [props](https://vuejs.org/v2/api/#props):

{% raw %}

```js
// prop.js
Vue.component('prop', {
  props: ['name'],
  template: '<p>Hello, {{ name }}!</p>',
});
```

{% endraw %}

```html
<!-- prop.html -->
<prop name="prop"></prop>
```

### Vue 3

Component with [data](https://v3.vuejs.org/api/options-data.html#data-2):

{% raw %}

```js
Vue.createApp({}).component('prop', {
  data() {
    return {
      name: 'prop',
    };
  },
  template: '<p>Hello, {{ name }}!</p>',
});
```

{% endraw %}

Component with [props](https://v3.vuejs.org/api/options-data.html#props):

{% raw %}

```js
// prop.js
Vue.createApp({}).component('prop', {
  props: ['name'],
  template: '<p>Hello, {{ name }}!</p>',
});
```

{% endraw %}

```html
<!-- prop.html -->
<prop name="prop"></prop>
```

App with data and component with props:

{% raw %}

```js
// prop.js
const App = {
  data() {
    return {
      name: 'prop',
    };
  },
};

const app = Vue.createApp(App);

app.component('prop', {
  props: ['name'],
  template: '<p>Hello, {{ name }}!</p>',
});

app.mount('#app');
```

{% endraw %}

```html
<!-- prop.html -->
<div id="app">
  <prop :name="name"></prop>
</div>
```

## State

### React

Function component using [state hook](https://reactjs.org/docs/hooks-state.html):

```jsx
function State() {
  const [count, setCount] = React.useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return <button onClick={handleClick}>Clicks: {count}</button>;
}
```

Class component using [state](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class):

```jsx
class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    return (
      <button onClick={this.handleClick}>Clicks: {this.state.count}</button>
    );
  }
}
```

### Vue 2

Updating data:

{% raw %}

```js
Vue.component('state', {
  data() {
    return {
      count: 0,
    };
  },
  template: '<button @click="count += 1">Clicks: {{ count }}</button>',
});
```

{% endraw %}

### Vue 3

Updating [data](https://v3.vuejs.org/guide/data-methods.html#data-properties):

{% raw %}

```js
Vue.createApp({}).component('state', {
  data() {
    return {
      count: 0,
    };
  },
  template: '<button @click="count += 1">Clicks: {{ count }}</button>',
});
```

{% endraw %}

## Render

### React

[Rendering](https://reactjs.org/docs/components-and-props.html#rendering-a-component) a component:

```html
<!-- index.html -->
<div id="app"></div>
```

```jsx
// render.jsx
ReactDOM.render(
  <>
    <Component />
    <Event />
    <Prop />
    <State />
  </>,
  document.getElementById('app')
);
```

### Vue 2

Mounting an app:

```html
<!-- index.html -->
<div id="app">
  <vue-component></vue-component>
  <event></event>
  <prop></prop>
  <state></state>
</div>
```

```js
// render.js
new Vue({
  el: '#app',
});
```

### Vue 3

Mounting an app:

```html
<!-- index.html -->
<div id="app">
  <vue-component></vue-component>
  <event></event>
  <prop></prop>
  <state></state>
</div>
```

```js
// render.js
Vue.createApp({}).mount('#app');
```
