---
layout: post
title: 'React Native error: "Unable to lookup in current state: Shutdown"'
date: 2024-01-29 16:07:23
updated: 2025-01-15 17:53:47
excerpt: 'How to fix React Native error: "Unable to lookup in current state: Shutdown"'
categories: react native xcode simulator
---

## Problem

I was running [React Native](https://reactnative.dev/) on iOS and got the error:

```
error Failed to launch the app on simulator, An error was encountered processing the command (domain=com.apple.CoreSimulator.SimError, code=405):
Unable to lookup in current state: Shutdown
```

## Solution

Open settings:

-  > **System Settings...**

Go to storage:

- **General** > **Storage**

Click on the developer icon:

- **Developer ⓘ**

Select the build files:

- **Xcode Caches**
- **Project Build Data and Indexes**

Delete [Xcode](https://developer.apple.com/xcode/) cache:

- **Delete...**

Rerun React Native and open the [Simulator](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device) device:

```sh
npx react-native run-ios
```
