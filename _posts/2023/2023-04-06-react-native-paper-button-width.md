---
layout: post
title: React Native Paper Button width
date: 2023-04-06 18:44:14
excerpt: How to ensure React Native Paper Button doesn't take full width.
categories: react-native react-native-paper button
---

This post goes over how to ensure [React Native Paper](https://reactnativepaper.com/) [`<Button>`](https://callstack.github.io/react-native-paper/docs/components/Button/) doesn't take full width.

## View

The simplest [solution](https://github.com/callstack/react-native-paper/issues/1979#issuecomment-654310158) is to wrap [`<Button>`](https://callstack.github.io/react-native-paper/docs/components/Button/) in [`<View>`](https://reactnative.dev/docs/view):

{% raw %}

```tsx
import { View } from 'react-native';
import { Button } from 'react-native-paper';

function MyComponent() {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Button>My Button</Button>
    </View>
  );
}
```

{% endraw %}

Make sure you set the `<View>` style:

```js
{ display: 'flex', flexDirection: 'row' }
```

## Card

If rendered inside [`<Card.Actions>`](https://callstack.github.io/react-native-paper/docs/components/Card/CardActions/), [`<Button>`](https://callstack.github.io/react-native-paper/docs/components/Button/) won't take full-width:

```tsx
import { Button, Card } from 'react-native-paper';

function MyComponent() {
  return (
    <Card.Actions>
      <Button>My Button</Button>
    </Card.Actions>
  );
}
```

But it'll be right-aligned. To left-align the button, set `<Card.Actions>` style:

<!-- prettier-ignore-start -->

```js
{ alignSelf: 'flex-start' }
```

<!-- prettier-ignore-end -->
