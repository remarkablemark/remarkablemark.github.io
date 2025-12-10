---
layout: post
title: React scroll direction
date: 2025-12-09 13:07:07
excerpt: How to get the scroll direction with React.
categories: react scroll
---

This post goes over how to get the scroll direction with [React](https://react.dev/).

## useScrollDirection

Create a [hook](https://react.dev/learn/reusing-logic-with-custom-hooks) that compares the previous scrollY value to get the scroll direction:

```tsx
// useScrollDirection.ts
import { useCallback, useEffect, useRef, useState } from 'react';

export enum ScrollDirection {
  'up' = 'up',
  'down' = 'down',
}

export function useScrollDirection() {
  const scrollYRef = useRef(0);
  const [direction, setDirection] = useState(ScrollDirection.up);

  const scrollDirection = useCallback(() => {
    setDirection(
      window.scrollY > scrollYRef.current
        ? ScrollDirection.down
        : ScrollDirection.up,
    );

    scrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollDirection);

    return () => {
      window.removeEventListener('scroll', scrollDirection);
    };
  }, [scrollDirection]);

  return direction;
}
```

To use the hook:

```tsx
// App.tsx
import { useScrollDirection } from './useScrollDirection';

function App() {
  const scrollDirection = useScrollDirection();

  return (
    <p>
      Scroll direction: {scrollDirection}
      {/* ... */}
    </p>
  );
}
```

## onWheel

Alternatively, you can use the [wheel event](https://developer.mozilla.org/docs/Web/API/Element/wheel_event) but it has limited availability:

```tsx
// App.tsx
function App() {
  return (
    <div
      onWheel={(event) => {
        event.deltaY > 0 ? console.log('down') : console.log('up');
      }}
    >
      {/* ... */}
    </div>
  );
}
```

## Demo

[StackBlitz](https://stackblitz.com/edit/use-scroll-direction?file=src%2FApp.tsx):

<iframe height="600px" width="100%" src="https://stackblitz.com/edit/use-scroll-direction?embed=1&file=src%2FApp.tsx" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
