---
layout: post
title: Add Firebase Realtime Database to Web App
date: 2021-04-11 21:36:39
excerpt: How to add a Firebase Realtime Database to your web app.
categories: firebase realtime database web app javascript
---

## Firebase Project

Go to [**Firebase Console**](https://console.firebase.google.com/) > **Add project**. Give your project a name and/or id and click **Continue**.

Once the project is created, go to **Project Overview**. The URL will look like:

```
https://console.firebase.google.com/project/<project-name>/overview
```

## Realtime Database

In the left navbar, click **Build** > **Realtime Database** > **Create Database**.

1. Select a Realtime Database location closest to your users (e.g., **United States (us-central1)**) and click **Next**.
2. Select the security mode you want to start your Realtime Database in (e.g., **Start in test mode**) and click **Enable**.

Your Realtime Database will look like:

```
<project-id>-default-rtdb: null
```

## Add to Web

To add Firebase to your web app, go to **Project Overview** and under **Get started by adding Firebase to your app**, click the **Web** icon.

**Register app** with an app nickname and click **Register app**.

### CDN

**Add Firebase SDK** by copying and pasting the script to your web page (make sure to update the config):

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-database.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: 'ABCDEFGH-i-jkl_m_1234567890',
    authDomain: '<project-id>.firebaseapp.com',
    databaseURL: 'https://<project-id>-default-rtdb.firebaseio.com',
    projectId: '<project-id>',
    storageBucket: '<project-id>.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdefghi123456789',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```

### Module Bundler

Given you have [`firebase`](https://www.npmjs.com/package/firebase) installed:

```sh
$ npm install firebase
```

Import the Firebase modules and initialize the app:

```js
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'ABCDEFGH-i-jkl_m_1234567890',
  authDomain: '<project-id>.firebaseapp.com',
  databaseURL: 'https://<project-id>-default-rtdb.firebaseio.com',
  projectId: '<project-id>',
  storageBucket: '<project-id>.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdefghi123456789',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

## Read and Write Data

[Get a database reference](https://firebase.google.com/docs/database/web/read-and-write#get_a_database_reference):

```js
const database = firebase.database();
const ref = database.ref();
```

[Read data](https://firebase.google.com/docs/database/web/read-and-write) from the reference:

```js
ref.on('value', snapshot => {
  const data = snapshot.val();
  console.log(data);
});
```

[Write data](https://firebase.google.com/docs/database/web/read-and-write#write_data) to the reference:

```js
ref.set('Hello, World!');
```

## Resources

- [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)
- [Read and Write Data on the Web](https://firebase.google.com/docs/database/web/read-and-write)
