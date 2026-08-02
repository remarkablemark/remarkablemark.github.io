---
layout: post
title: UIGraphicsBeginImageContext() failed to allocate CGBitampContext
date: 2024-05-04 17:54:24
excerpt: How to fix the iOS mobile app error "UIGraphicsBeginImageContext() failed to allocate CGBitampContext".
categories: ios react-native mobile error bug
---

## Problem

I upgraded a React Native mobile app to iOS 17 and encountered a crash while testing in BrowserStack:

```
Terminating app due to uncaught exception 'NSInternalInconsistencyException'
```

I checked the logs and found the reason:

```
UIGraphicsBeginImageContext() failed to allocate CGBitampContext: size={0, 0}, scale=3.000000, bitmapInfo=0x2002. Use UIGraphicsImageRenderer to avoid this assert.
```

[`UIGraphicsBeginImageContext()`](https://developer.apple.com/documentation/uikit/1623922-uigraphicsbeginimagecontext) is deprecated in iOS 17 and when the width or height is 0, it throws an exception.

This error appears in:

- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image/issues/1006)
- [TOCropViewController](https://github.com/TimOliver/TOCropViewController/issues/577)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker/issues/2054)

## Solution

I did a recursive search for `UIGraphicsBeginImageContext` in my working directory:

```sh
grep -r UIGraphicsBeginImageContext
```

I located the files from `node_modules` that used the deprecated function:

```
./node_modules/react-native-image-crop-picker/ios/QBImagePicker/QBImagePicker/QBAlbumsViewController.m:    UIGraphicsBeginImageContext(size);
./node_modules/react-native-image-crop-picker/ios/src/Compression.m:    UIGraphicsBeginImageContext(newSize);
./node_modules/react-native-image-crop-picker/ios/src/UIImage+Resize.m:   UIGraphicsBeginImageContextWithOptions(dstSize, NO, self.scale);
```

These were the offending lines of code:

```objectivec
UIGraphicsBeginImageContext(newSize);
[image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
UIImage *resizedImage = UIGraphicsGetImageFromCurrentImageContext();
UIGraphicsEndImageContext();
```

I replaced the code block with [`UIGraphicsImageRenderer`](https://developer.apple.com/documentation/uikit/uigraphicsimagerenderer?language=objc):

```objectivec
UIGraphicsImageRenderer *renderer = [[UIGraphicsImageRenderer alloc] initWithSize:newSize];
UIImage *resizedImage = [renderer imageWithActions:^(UIGraphicsImageRendererContext * _Nonnull rendererContext) {
    [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
}];
```

I rebuilt the app and was no longer able to reproduce the error.
