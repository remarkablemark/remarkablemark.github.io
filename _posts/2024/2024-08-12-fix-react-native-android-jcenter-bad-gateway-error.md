---
layout: post
title: Fix React Native Android JCenter Bad Gateway error
date: 2024-08-12 20:20:20
excerpt: How to fix React Native Android JCenter Bad Gateway error.
categories: react native android jcenter
---

## Problem

If you're getting the React Native Android build error:

```
FAILURE: Build failed with an exception.

> Could not resolve com.facebook.react:react-android:0.71.19.
    > Could not get resource 'https://jcenter.bintray.com/com/facebook/react/react-android/0.71.19/react-android-0.71.19.module'.
        > Could not GET 'https://jcenter.bintray.com/com/facebook/react/react-android/0.71.19/react-android-0.71.19.module'. Received status code 502 from server: Bad Gateway
```

This is because Bintray (JCenter) has been [sunsetted](https://jfrog.com/blog/into-the-sunset-bintray-jcenter-gocenter-and-chartcenter/) (see [#31165](https://github.com/facebook/react-native/issues/31165)).

## Solution

The preferred solution is to [upgrade your React Native dependencies](https://react-native-community.github.io/upgrade-helper/) to the latest version.

If that's not possible, then update `android/build.gradle` and replace JCenter with Maven Central:

```groovy
allprojects {
    repositories {
        all { ArtifactRepository repo ->
            if (repo instanceof MavenArtifactRepository) {
                if (repo.url.toString().startsWith('https://jcenter.bintray.com/')) {
                    remove repo
                    add(mavenCentral())
                }
            }
        }
    }
}
```

See [StackOverflow answer](https://stackoverflow.com/a/74265617).
