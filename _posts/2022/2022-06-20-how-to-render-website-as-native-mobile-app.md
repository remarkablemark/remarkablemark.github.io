---
layout: post
title: Render a website as a native mobile app
date: 2022-06-20 20:56:28
excerpt: To display a website as a native mobile app, render it as a React Native WebView.
categories: react native website mobile app
---

This post goes over how to render a website in a native mobile app by wrapping it inside a [React Native](https://reactnative.dev/) [WebView](https://docs.expo.dev/versions/latest/sdk/webview/).

## Prerequisites

- [Node.js](https://nodejs.org/)

## React Native

Install the [Expo CLI](https://reactnative.dev/docs/environment-setup):

```sh
npm install --global expo-cli
```

Then create a new React Native project:

```sh
expo init react-native-webview-example
```

Change into your project directory:

```sh
cd react-native-webview-example
```

## WebView

Install [React Native WebView](https://www.npmjs.com/package/react-native-webview):

```sh
npm install --save react-native-webview
```

Update `App.js` with the source URI to your example site:

{% raw %}

```jsx
// App.js
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{ uri: 'https://example.com/' }}
      style={{ marginTop: 20 }}
    />
  );
}
```

{% endraw %}

Run your React Native application:

```sh
npm start
```

> Install the Expo client app on [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) to run the app on your phone.

## Example

See [GitHub repository](https://github.com/remarkablemark/react-native-webview-example).
