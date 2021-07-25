---
layout: post
title: YouCompleteMe install error for Mojave
date: 2021-04-25 14:41:35
excerpt: How to fix YouCompleteMe install error for macOS 10.14 (Mojave).
categories: youcompleteme
---

This post goes over how to fix [YouCompleteMe](https://github.com/ycm-core/YouCompleteMe) install error for macOS 10.14 (Mojave).

## Problem

I recently updated my YouCompleteMe plugin:

```sh
cd ~/.vim/bundle/YouCompleteMe/ && git pull
```

After reinstalling:

```sh
python3 install.py --all
```

I got the following errors:

```
Searching Python 3.9 libraries...
Found Python library: /usr/local/opt/python@3.9/Frameworks/Python.framework/Versions/3.9/lib/python3.9/config-3.9-darwin/libpython3.9.dylib
Found Python headers folder: /usr/local/opt/python@3.9/Frameworks/Python.framework/Versions/3.9/include/python3.9
-- The C compiler identification is AppleClang 11.0.0.11000033
-- The CXX compiler identification is AppleClang 11.0.0.11000033
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Found Python3: /usr/local/opt/python@3.9/bin/python3.9 (found suitable version "3.9.2", required range is "3.6...3.10") found components: Interpreter Development Development.Module Development.Embed
-- Looking for pthread.h
-- Looking for pthread.h - found
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
-- Found Threads: TRUE
-- Using libclang archive: /Users/mark/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/../clang_archives/libclang-11.0.0-x86_64-apple-darwin.tar.bz2
-- Using libclang to provide semantic completion for C/C++/ObjC
-- Using external libclang: /private/var/folders/rk/95025w0x07v17qc1nn_3b2bc0000gn/T/ycm_build_3hn8sks8/lib/libclang.dylib
CMake Error at ycm/CMakeLists.txt:307 (message):
  Unknown compiler - C++17 filesystem library missing


  -- Configuring incomplete, errors occurred!
  See also "/private/var/folders/rk/95025w0x07v17qc1nn_3b2bc0000gn/T/ycm_build_3hn8sks8/CMakeFiles/CMakeOutput.log".
  ERROR: the build failed.

  NOTE: it is *highly* unlikely that this is a bug but rather
  that this is a problem with the configuration of your system
  or a missing dependency. Please carefully read CONTRIBUTING.md
  and if you're sure that it is a bug, please raise an issue on the
  issue tracker, including the entire output of this script
  and the invocation line used to run it.
```

I searched for the error:

```
CMake Error at ycm/CMakeLists.txt:307 (message):
  Unknown compiler - C++17 filesystem library missing
```

And came upon this [Gitter thread](https://gitter.im/Valloric/YouCompleteMe?at=600e78d3dfdbc1437fae9287):

> macOS 10.14 doesn't have `<filesystem>` enabled.
>
> The point is that you have to avoid [ycm-core/ycmd@ece414c](https://github.com/ycm-core/ycmd/commit/ece414c8c01fe9bf83f3752db00a4a589a3a14cb) in `/path/to/YCM/third_party/ycmd`. That's the thing that depends on C++17.

## Solution

From the [install failure issue](https://github.com/ycm-core/YouCompleteMe/issues/3805), the [instructions](https://github.com/ycm-core/YouCompleteMe/issues/3805#issuecomment-784107020) are to install from a legacy branch:

```sh
cd ~/.vim/bundle/YouCompleteMe/ &&
  git fetch &&
  git checkout legacy-c++11 &&
  git submodule update --init --recursive &&
  python3 install.py --all
```

This fixed it for me.
