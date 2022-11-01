---
layout: post
title: Fix React Native doctor Android errors
date: 2022-11-01 19:50:33
excerpt: How to fix React Native doctor errors for Android on macOS.
categories: react native android macos
---

This post goes over how to fix [React Native](https://reactnative.dev/) doctor errors for [Android](https://www.android.com/) on macOS:

- [JDK](#jdk)
- [Android Studio](#android-studio)
- [Android SDK](#android-sdk)
  - [Versions found: N/A](#versions-found-na)
  - [Version supported](#version-supported)
- [ANDROID_HOME](#android_home)

## Errors

Run:

```sh
npx react-native doctor
```

To see the possible Android errors:

```
Android
 ✖ JDK
 ✖ Android Studio - Required for building and installing your app on Android
 ✖ Android SDK - Required for building and installing your app on Android
   - Versions found: N/A
   - Version supported: 31.0.0
 ✖ ANDROID_HOME
```

## JDK

Follow the [React Native documentation](https://reactnative.dev/docs/environment-setup) to install the **Java Development Kit**:

```sh
brew install --cask zulu11
```

Or download JDK from [Oracle](https://www.oracle.com/java/technologies/downloads/).

## Android Studio

Follow the [React Native documentation](https://reactnative.dev/docs/environment-setup) to set up the **Android development environment**.

## Android SDK

Follow the [React Native documentation](https://reactnative.dev/docs/environment-setup) to **Install Android SDK**.

### Versions found: N/A

Install [Android SDK Command-Line Tools](https://developer.android.com/studio/command-line#tools-sdk) and append the `PATH` in your [config file](#environment-variables):

```bash
export PATH=$PATH:$HOME/Library/Android/sdk/cmdline-tools/latest/bin
```

### Version supported

Go to `android/build.gradle` and set `buildToolsVersion` to the version you're using:

```diff
 buildscript {
     ext {
-        buildToolsVersion = "31.0.0"
+        buildToolsVersion = "33.0.0"
```

> Also bump `compileSdkVersion` if you're getting build errors like:
>
> ```
> Dependency 'androidx.appcompat:appcompat:1.5.1' requires 'compileSdkVersion' to be set to 32 or higher.
> Compilation target for module ':app' is 'android-31'
> ```

## ANDROID_HOME

Export `ANDROID_HOME` in your [config file](#environment-variables):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
```

## Environment Variables

Add the following to your `$HOME/.bash_profile` or `$HOME/.bashrc` (if you're using zsh then `~/.zprofile` or `~/.zshrc`) config:

```bash
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export ANDROID_HOME=$ANDROID_SDK_ROOT
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin
```

## Conclusion

Rerun `npx react-native doctor` and you should get no errors:

```
Android
 ✓ JDK
 ✓ Android Studio - Required for building and installing your app on Android
 ✓ Android SDK - Required for building and installing your app on Android
 ✓ ANDROID_HOME
```
