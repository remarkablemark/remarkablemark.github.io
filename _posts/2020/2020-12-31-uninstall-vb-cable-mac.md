---
layout: post
title: Uninstall VB-Cable on macOS
date: 2020-12-31 16:25:04
updated: 2021-01-17 13:42:13
excerpt: How to uninstall VB-Cable on macOS.
categories: vb-cable bash script mac
---

> **TL;DR**: copy, paste, and run the uninstall script in Terminal:
>
> ```sh
> sudo /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/remarkablemark/vb-cable-uninstall-macos/master/uninstall.sh)"
> ```

## Uninstall

### Required

Delete the `VBCable.driver` directory from the `/Library/Audio/Plug-Ins/HAL/` directory:

```sh
sudo rm -rf /Library/Audio/Plug-Ins/HAL/VBCable.driver/
```

Verify the directory is no longer there:

```sh
find /Library/Audio/Plug-Ins/HAL/ -type d -iname 'vbcable*' -maxdepth 1
```

Delete the `VB-CABLE Control Panel.app` file from the `/Applications/VB-Audio/` directory:

```sh
rm '/Applications/VB-Audio/VB-CABLE Control Panel.app'
```

Or delete the entire `/Applications/VB-Audio/` directory:

```sh
rm -rf /Applications/VB-Audio/
```

### Optional

Delete the `com.vbaudio.vbcable.plist` file from the `/Library/Preferences/` directory:

```sh
sudo rm -rf /Library/Preferences/com.vbaudio.vbcable.plist
```

Delete the `com.vbaudio.vbcableagent.plist` file from the `/Library/LaunchDaemons/` directory:

```sh
sudo rm -rf /Library/LaunchDaemons/com.vbaudio.vbcableagent.plist
```

### Final

Once you finished deleting, restart your computer.

## Resources

- The [VB-Cable](https://vb-audio.com/Cable/) uninstall script is inspired by the [forum post](https://forum.vb-audio.com/viewtopic.php?p=3683&sid=f6e0e6f6eec13915a75a230bf92bd451#p3683).
- See the [GitHub repository](https://github.com/remarkablemark/vb-cable-uninstall-macos).
