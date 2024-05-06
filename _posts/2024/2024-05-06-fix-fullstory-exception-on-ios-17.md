---
layout: post
title: Fix FullStory exception on iOS 17
date: 2024-05-06 12:55:51
excerpt: How to fix FullStory crash on iOS 17.
categories: ios fullstory react-native exception
---

## Problem

I upgraded a React Native mobile app to [iOS 17](https://developer.apple.com/news/upcoming-requirements/?id=04292024a) and encountered an app crash when uploading images:

```
Terminating app due to uncaught exception 'NSInternalInconsistencyException'
```

```
UIGraphicsBeginImageContext() failed to allocate CGBitampContext: size={0, 0}, scale=3.000000, bitmapInfo=0x2002. Use UIGraphicsImageRenderer to avoid this assert.
```

[`UIGraphicsBeginImageContext()`](https://developer.apple.com/documentation/uikit/1623922-uigraphicsbeginimagecontext) is a deprecated function in iOS 17 and when the width or height is 0, it throws an exception.

I did a recursive search for `UIGraphicsBeginImageContext` in my working directory:

```sh
grep -r UIGraphicsBeginImageContext
```

And found it's used by FullStory:

```
Binary file ./ios/Pods/FullStory/FullStory.xcframework/ios-arm64_x86_64-simulator/FullStory.framework/FullStory matches
Binary file ./ios/Pods/FullStory/FullStory.xcframework/ios-arm64/FullStory.framework/FullStory matches
```

## Solution

I reached out to [FullStory support](https://help.fullstory.com/hc/en-us/requests/new) and they helped guide me to upgrade the iOS SDK to the latest version following their [release notes](https://help.fullstory.com/hc/en-us/articles/4412766845591-Fullstory-for-Mobile-Apps-Release-Notes).

I updated `ios/Podfile`:

```diff
-  pod 'FullStory', :http => 'https://ios-releases.fullstory.com/fullstory-1.42.0-xcframework.tar.gz'
+  pod 'FullStory', :http => 'https://ios-releases.fullstory.com/fullstory-1.48.0-xcframework.tar.gz'
```

Then ran `pod install` so `ios/Podfile.lock` is updated:

```sh
bundle exec pod install --project-directory=ios # cd ios; pod install; cd -
```

After restarting the React Native app, the error no longer showed up.
