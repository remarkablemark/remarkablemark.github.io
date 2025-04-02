---
layout: post
title: How to fix Android React Native error "Duplicate class"
date: 2025-04-02 16:47:21
excerpt: How to fix Android React Native error "Duplicate class".
categories: expo react native android error
---

## Problem

If you're getting the error when running [React Native](https://reactnative.dev/) or [Expo](https://expo.dev/) for [Android](https://www.android.com/):

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class android.support.v4.app.INotificationSideChannel found in modules core-1.13.1.aar -> core-1.13.1-runtime (androidx.core:core:1.13.1) and support-compat-26.1.0.aar -> support-compat-26.1.0-runtime (com.android.support:support-compat:26.1.0)

     Go to the documentation to learn how to <a href="d.android.com/r/tools/classpath-sync-errors">Fix dependency resolution errors</a>.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.

BUILD FAILED in 13s
Error: ./android/gradlew app:assembleDebug -x lint -x test --configure-on-demand --build-cache -PreactNativeDevServerPort=8081 -PreactNativeArchitectures=arm64-v8a exited with non-zero code: 1
```

The build fails because there are duplicated classes in 2+ dependencies and the compiler doesn't know which one to use during runtime.

This happens when you're importing modules that carry their own required libraries, which leads to transitive dependencies.

## Solution

The solution is to exclude duplicated classes from libraries in `android/app/build.gradle`:

```gradle
apply plugin: "com.android.application"
// ...

android {
    // ...
    configurations {
        all {
            exclude group: "com.android.support"
            exclude module: "appcompat-v7"
            exclude module: "support-v4"
        }
    }
}
```

See Stackoverflow answers [1](https://stackoverflow.com/a/56029604) and [2](https://stackoverflow.com/a/56334710).
