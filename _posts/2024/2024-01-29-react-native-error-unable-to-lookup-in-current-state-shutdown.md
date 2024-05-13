---
layout: post
title: 'React Native error: "Unable to lookup in current state: Shutdown"'
date: 2024-01-29 16:07:23
updated: 2024-05-13 14:00:43
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

Delete [Xcode](https://developer.apple.com/xcode/) cache by selecting  > **System Settings...** > **General** > **Storage** > **Developer ⓘ** > **Xcode Caches** and **Project Build Data and Indexes** > **Delete...**

Rerun React Native and open the [Simulator](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device) device:

```sh
npx react-native run-ios
```
