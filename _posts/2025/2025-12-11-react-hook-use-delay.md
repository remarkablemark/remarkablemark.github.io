---
layout: post
title: React hook useDelay
date: 2025-12-11 16:17:13
excerpt: How to set a delay using a React hook.
categories: react hook timeout
---

This post goes over how to set a delay using a [React](https://react.dev/) hook.

## useDelay

Create a [hook](https://react.dev/learn/reusing-logic-with-custom-hooks) with `setTimeout`:

```ts
// useDelay.ts
import { useEffect, useState } from 'react';

/**
 * Triggers a delay after the component mounts.
 *
 * @param delay - The delay in milliseconds.
 * @returns A boolean indicating whether the element is visible.
 */
export function useDelay(delay: number): boolean {
  const [state, setState] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setState(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return state;
}
```

To use the hook:

```tsx
// App.tsx
import { useDelay } from './useDelay';

function App() {
  const isDelayFinished = useDelay(3000); // 3 seconds

  return <p>Delay finished? {isDelayFinished}</p>;
}
```
