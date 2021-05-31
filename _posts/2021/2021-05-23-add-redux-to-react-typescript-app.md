---
layout: post
title: How to add Redux to a React app
date: 2021-05-23 21:33:32
updated: 2021-05-29 21:10:41
excerpt: How to add Redux to a React TypeScript app.
categories: react redux cra typescript javascript web
---

<!--email_off-->

This article goes over how to to add Redux to a React TypeScript app.

<details markdown="1">
<summary>Table of Contents</summary>

- [Video](#video)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Slice](#slice)
- [Store](#store)
- [Provider](#provider)
- [Component](#component)
- [Hooks](#hooks)
- [Resources](#resources)

</details>

## Video

Watch [YouTube video](https://youtu.be/upcZZAN7Gt8?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ):

<iframe width="100%" height="720" src="https://www.youtube.com/embed/upcZZAN7Gt8?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Demo

[CodeSandbox demo](https://codesandbox.io/s/react-redux-typescript-oof6n):

<iframe src="https://codesandbox.io/embed/react-redux-typescript-oof6n?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="React State: Class vs Function" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

## Prerequisites

Given an app bootstrapped by [Create React App](https://create-react-app.dev/):

```sh
npx create-react-app my-app --template typescript && cd my-app
```

## Install

Install the dependencies:

- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
- [@types/react-redux](https://www.npmjs.com/package/@types/react-redux)
- [react-redux](https://www.npmjs.com/package/react-redux)

With npm:

```sh
npm install @reduxjs/toolkit @types/react-redux react-redux
```

Or with Yarn:

```sh
yarn add @reduxjs/toolkit @types/react-redux react-redux
```

## Slice

Create the [slice](https://redux-toolkit.js.org/api/createSlice):

```ts
// src/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const name = 'counter';

const slice = createSlice({
  name,
  initialState,
  // The `reducers` field allows us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers since
      // it doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    // The `PayloadAction` type allows us to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { actions, reducer } = slice;
```

## Store

Create the [store](https://redux.js.org/api/store):

```ts
// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { name, reducer } from './slice';

const store = configureStore({
  reducer: {
    [name]: reducer,
  },
});

export default store;
```

## Provider

Make the store available to all nested components with [`<Provider>`](https://react-redux.js.org/api/provider):

```tsx
// src/index.tsx
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Counter from './Counter';
import store from './store';

render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
```

## Component

Create the component:

```tsx
// src/Counter.tsx
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './slice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.decrement())}>-</button>
    </>
  );
}
```

The [UI is integrated with Redux](https://react-redux.js.org/introduction/why-use-react-redux#integrating-redux-with-a-ui) with [hooks](https://react-redux.js.org/api/hooks).

Not typing the callback function in [`useSelector`](https://react-redux.js.org/api/hooks#useselector) will throw the TypeScript error:

```
Property 'counter' does not exist on type 'DefaultRootState'.
```

This can be fixed by typing `state`:

```tsx
// src/Counter.tsx
// ...
import store from './store';
type RootState = ReturnType<typeof store.getState>;

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  // ...
}
```

## Hooks

Alternatively, type the [hooks](https://react-redux.js.org/api/hooks):

```ts
// src/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from './store';

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

For easier use in components:

```diff
 // src/Counter.tsx
 import { useDispatch, useSelector } from 'react-redux';
 import { actions } from './slice';
-import store from './store';
-type RootState = ReturnType<typeof store.getState>;
+import { useAppDispatch, useAppSelector } from './hooks';

 export default function Counter() {
-  const count = useSelector((state: RootState) => state.counter.value);
-  const dispatch = useDispatch();
+  const count = useAppSelector((state) => state.counter.value);
+  const dispatch = useAppDispatch();
   return (
     <>
       <p>{count}</p>
       <button onClick={() => dispatch(actions.increment())}>+</button>
       <button onClick={() => dispatch(actions.decrement())}>-</button>
     </>
   );
 }
```

## Resources

- [react-redux-typescript-app](https://github.com/remarkablemark/react-redux-typescript-app)
- [cra-template-redux-typescript](https://github.com/reduxjs/cra-template-redux-typescript)
- [cra-template-redux](https://github.com/reduxjs/cra-template-redux)

<!--/email_off-->
