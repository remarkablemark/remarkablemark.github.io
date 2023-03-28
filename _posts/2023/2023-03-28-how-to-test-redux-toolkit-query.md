---
layout: post
title: How to test RTK Query with Jest and RTL
date: 2023-03-28 18:35:44
excerpt: How to test Redux Toolkit (RTK) Query API with Jest and React Testing Library.
categories: rtk redux toolkit query jest test
---

This post goes over how to test [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) API with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/):

- [Prerequisites](#prerequisites)
- [Test](#test)
- [Demo](#demo)

## Prerequisites

Install and set up:

- [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)
- [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock)
- [jest](https://www.npmjs.com/package/jest)

Enable `jest-fetch-mock` in [`setupTests`](https://create-react-app.dev/docs/running-tests/#srcsetuptestsjs):

```ts
// src/setupTests.ts
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
```

We'll be testing RTK Query's createApi [example](https://redux-toolkit.js.org/rtk-query/usage-with-typescript#createapi). This means the auto-generated React hook is exported from `api.ts`:

```ts
// src/api.ts
export const { useGetPokemonByNameQuery } = pokemonApi;
```

## Test

Create `api.test.tsx`:

```sh
touch api.test.tsx
```

Create an empty test:

```ts
it('renders hook', () => {
  // ...
});
```

Use [renderHook](https://testing-library.com/docs/react-testing-library/api/#renderhook) to render the hook:

```ts
import { useGetPokemonByNameQuery } from './api';

it('renders hook', () => {
  renderHook(() => useGetPokemonByNameQuery('pikachu'));
});
```

The test should fail with the error:

```
Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
```

Create a [`wrapper`](https://testing-library.com/docs/react-testing-library/api/#renderhook-options-wrapper) component using the Redux store:

```tsx
// ...
import { store } from './store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

it('renders hook', () => {
  renderHook(() => useGetPokemonByNameQuery('pikachu'), { wrapper: Wrapper });
});
```

The test should now pass.

Mock the fetch call in [`beforeAll`](https://jestjs.io/docs/api#beforeallfn-timeout):

```ts
const data = {};

beforeAll(() => {
  fetchMock.mockOnceIf('https://pokeapi.co/api/v2/pokemon/pikachu', () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ data }),
    })
  );
});
```

Assert that the hook [`result`](https://testing-library.com/docs/react-testing-library/api/#result) is correct:

```ts
it('renders hook', () => {
  const { result } = renderHook(() => useGetPokemonByNameQuery('pikachu'), {
    wrapper: Wrapper,
  });

  expect(result.current).toMatchObject({
    status: 'pending',
    endpointName: 'getPokemonByName',
    isLoading: true,
    isSuccess: false,
    isError: false,
    isFetching: true,
  });
});
```

Assert that `fetchMock` is called:

```ts
it('renders hook', () => {
  // ...
  expect(fetchMock).toBeCalled();
});
```

But the test should fail. This is because we need to use [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor) to wait for the request to finish:

```ts
it('renders hook', async () => {
  // ...
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(fetchMock).toBeCalledTimes(1);
});
```

The test should pass again.

Finally, assert that the updated hook `result` is correct:

```ts
it('renders hook', async () => {
  // ...
  expect(result.current).toMatchObject({
    status: 'fulfilled',
    endpointName: 'getPokemonByName',
    data: {},
    isLoading: false,
    isSuccess: true,
    isError: false,
    currentData: {},
    isFetching: false,
  });
});
```

## Demo

See [CodeSandbox](https://codesandbox.io/p/sandbox/redux-toolkit-query-example-7tmj7z).
