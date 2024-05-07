---
layout: post
title: How to open Android Emulator on macOS
date: 2024-05-07 14:16:53
excerpt: How to open Android Emulator on macOS.
categories: android emulator macos
---

This post goes over how to open Android Emulator on macOS.

## Prerequisites

You already installed [Android Studio](https://developer.android.com/studio), updated the tools with the [SDK Manager](https://developer.android.com/studio/intro/update#sdk-manager), and created a [virtual device](https://developer.android.com/studio/run/managing-avds).

## Open Android Emulator

List the Android Virtual Devices (AVDs):

```sh
~/Library/Android/sdk/emulator/emulator -list-avds
```

You should see something like:

```
Pixel_3a_API_33
Pixel_4_API_33_1
```

Open the emulator:

```sh
~/Library/Android/sdk/emulator/emulator -avds <AVD_NAME>
```

> Replace `<AVD_NAME>` with one of the AVD names from the list.

For example:

```sh
~/Library/Android/sdk/emulator/emulator -avds Pixel_3a_API_33
```
