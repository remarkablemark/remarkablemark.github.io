---
layout: post
title: How to find Java versions on macOS
date: 2024-08-05 21:14:25
excerpt: How to find Java versions on macOS.
categories: macos java
---

List Java versions on macOS:

```sh
/usr/libexec/java_home -V
```

You should see something like:

```sh
Matching Java Virtual Machines (3):
    22.0.1 (arm64) "Eclipse Adoptium" - "OpenJDK 22.0.1" /Library/Java/JavaVirtualMachines/temurin-22.jdk/Contents/Home
    17.0.11 (arm64) "Homebrew" - "OpenJDK 17.0.11" /opt/homebrew/Cellar/openjdk@17/17.0.11/libexec/openjdk.jdk/Contents/Home
    11.0.18 (arm64) "Azul Systems, Inc." - "Zulu 11.62.17" /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home/Library/Java/JavaVirtualMachines/temurin-22.jdk/Contents/Home
```

The JDK is located in:

```sh
ls /Library/Java/JavaVirtualMachines/
```

```
openjdk-17.jdk temurin-22.jdk zulu-11.jdk
```
