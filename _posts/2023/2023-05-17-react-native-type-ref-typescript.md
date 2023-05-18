---
layout: post
title: How to type React Native ref in TypeScript
date: 2023-05-17 21:21:22
excerpt: How to type React Native ref in TypeScript.
categories: react native typescript
---

This post goes over how to type [React Native](https://reactnative.dev/) [ref](https://react.dev/learn/manipulating-the-dom-with-refs) in [TypeScript](https://www.typescriptlang.org/).

## Prerequisites

Assuming you have `React` and `TextInput` imported:

```ts
import React from 'react';
import { TextInput } from 'react-native';
```

## useRef

Use the [`React.useRef`](https://react.dev/reference/react/useRef) hook for function components:

```ts
const ref = React.useRef<TextInput>();
```

This is the same as:

```ts
let ref: React.RefObject<TextInput> | null = null;
ref = React.useRef(null);
```

## createRef

Use [`React.createRef`](https://react.dev/reference/react/useRef) for class components:

```ts
const ref = React.createRef<TextInput>();
```

This is the same as:

```ts
let ref: React.RefObject<TextInput> | null = null;
ref = React.createRef();
```

## ElementRef

Use `ElementRef` for ref callback:

```tsx
let ref: React.ElementRef<typeof TextInput> | null = null;
<TextInput ref={(element: TextInput) => (ref = element)} />;
```

This is the same as:

```tsx
let ref: React.ElementRef<typeof TextInput> | null = null;
const callback: React.RefCallback<TextInput> = (element: TextInput) =>
  (ref = element);
<TextInput ref={callback} />;
```

As well as:

```tsx
let ref: React.ElementRef<typeof TextInput> | null = null;
const callback: React.LegacyCallback<TextInput> = (element: TextInput) =>
  (ref = element);
<TextInput ref={callback} />;
```
