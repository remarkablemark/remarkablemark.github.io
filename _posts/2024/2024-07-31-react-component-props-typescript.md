---
layout: post
title: React component props in TypeScript
date: 2024-07-31 18:33:13
excerpt: How to access React component props in TypeScript.
categories: react typescript
---

Let's say you have a React component but the prop type isn't exported:

```tsx
import { MyComponent } from './MyComponent';

type Props = {};
```

To access the React component props, you can use React's `ComponentProps` utility:

```tsx
import type { ComponentProps } from 'react';
import { MyComponent } from './MyComponent';

type Props = ComponentProps<typeof MyComponent>;
```

Here's the single-liner:

```tsx
type Props = React.ComponentProps<typeof MyComponent>;
```
