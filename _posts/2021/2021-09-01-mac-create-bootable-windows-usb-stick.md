---
layout: post
title: Create a bootable Windows USB on Mac
date: 2021-09-01 21:23:43
excerpt: How to create a bootable Windows USB stick from an ISO file on macOS.
categories: windows mac
---

This post goes over how to create a bootable Windows USB stick on macOS.

## Requirements

You'll need a(n):

- USB flash/stick drive with at least 5GB of space
- Apple laptop or computer running macOS
- Windows ISO file ([software download](https://www.microsoft.com/software-download/))

## Create Bootable USB

Write the Windows ISO file to the USB stick with Apple's [Boot Camp Assistant](https://support.apple.com/boot-camp):

1. Insert the USB stick to your computer or laptop
2. Launch **Boot Camp Assistant** from **Applications** > **Utilities** or **Spotlight** search
3. Select **Create a Windows 10 or later install disk**
   ![Create a Windows 10 or later install disk]({{ "/images/2021/2021-09-01-boot-camp-assistant-1.png" | prepend: site.assets_path }})
4. Ensure the Windows ISO image and destination USB drive are correct before clicking **Continue**
   ![Create Bootable USB Drive for Windows Installation]({{ "/images/2021/2021-09-01-boot-camp-assistant-2.png" | prepend: site.assets_path }})
5. Once it's done, eject the external drive and [install Windows from the USB flash drive](https://docs.microsoft.com/windows-hardware/manufacture/desktop/install-windows-from-a-usb-flash-drive#step-3---install-windows-to-the-new-pc)

> **Warning:** Backup the files on the USB because the data will be lost after the drive is formatted.
