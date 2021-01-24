---
layout: post
title: Uninstall iShowU Audio Capture on macOS
date: 2021-01-23 21:51:16
excerpt: How to uninstall iShowU Audio Capture on macOS.
categories: ishowu bash mac
---

> **TL;DR**: run the commands in Terminal:
>
> ```sh
> open -a 'Uninstall iShowU Audio Capture'
> mdfind -0 'iShowU Audio Capture.kext' | xargs -0 sudo rm -rf --
> sudo kextcache --clear-staging
> ```

## Uninstall

### App

Uninstall with the [uninstaller app](https://support.shinywhitebox.com/hc/en-us/articles/204161529-Uninstalling-iShowU-Audio-Capture) first:

```sh
open -a 'Uninstall iShowU Audio Capture'
```

### Manual

Find all the `iShowU Audio Capture.kext` directories:

```sh
mdfind -name 'iShowU Audio Capture.kext'
```

Delete the kext directories:

```sh
mdfind -0 'iShowU Audio Capture.kext' | xargs -0 sudo rm -rf --
```

Alternatively, to delete the kext directories one-by-one:

```sh
sudo rm -rf '/Library/StagedExtensions/Library/Extensions/iShowU Audio Capture.kext'
sudo rm -rf '/Library/Extensions/iShowU Audio Capture.kext'
```

Then clear the kext staging area:

```sh
sudo kextcache --clear-staging
```

### Final

Once you finished deleting, restart your computer.

## Resources

- [Uninstall iShowU Audio Capture](https://support.shinywhitebox.com/hc/en-us/articles/204161529-Uninstalling-iShowU-Audio-Capture)
