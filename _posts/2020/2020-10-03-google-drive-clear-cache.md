---
layout: post
title: Google Drive clear cache
date: 2020-10-03 17:59:19
updated: 2021-03-19 20:20:38
excerpt: Save disk space by clearing the Google Drive File Stream cache so files are only available online and not on the computer.
categories: google drive cache bash terminal
image: /assets/images/2020/2020-10-04-drive-file-stream-options.png
---

> **TL;DR**: remove the Drive File Stream cache from your Terminal:
>
> ```sh
> $ rm -rf ~/Library/Application\ Support/Google/DriveFS/[0-9]*
> ```
>
> **WARNING**: If files are pending upload to Drive, deleting the cache may cause the files to be lost (see [comment](https://disq.us/p/2fteuml)).

## Background

I installed the [Google Drive desktop app](https://support.google.com/drive/answer/7329379) in order to sync files between my computer and the cloud.

I found that you could right-click a file, hover over `Drive File Stream`, and select an option:

- `Available offline`
- `Online only` (default)

![Drive File Stream options]({{ "/images/2020/2020-10-04-drive-file-stream-options.png" | prepend: site.assets_path }})

But even when `Online only` is selected, large files still persist on my computer.

## Clear cache directory

To remove all files from your computer cache, you can delete the Drive File Stream cache.

You can find your DriveFS cache path by going to `Drive File Stream` > `Settings` (gear icon) > `Preferences...` > `Local cached files directory`.

![Drive File Stream settings]({{ "/images/2020/2020-10-04-drive-file-stream-settings.png" | prepend: site.assets_path }})

By default, the cache directory should be `~/Library/Application Support/Google/DriveFS`.

![Drive File Stream preferences]({{ "/images/2020/2020-10-04-drive-file-stream-preferences.png" | prepend: site.assets_path }})

To delete the DriveFS cache directory using [Terminal](<https://en.wikipedia.org/wiki/Terminal_(macOS)>):

```sh
$ rm -rf ~/Library/Application\ Support/Google/DriveFS/
```

> **WARNING**: If files are pending upload to Drive, deleting the cache may cause the files to be lost (see [comment](https://disq.us/p/2fteuml)).

The side-effect of this is that it also deletes your credentials so you'll need to login again.

## Clear cache content directory

To clear cache without deleting credentials, you can delete just the cache content directory:

```sh
$ rm -rf ~/Library/Application\ Support/Google/DriveFS/[0-9]*
```

> **WARNING**: If files are pending upload to Drive, deleting the cache may cause the files to be lost (see [comment](https://disq.us/p/2fteuml)).

What the command above is doing is deleting the numeric directory from DriveFS:

```sh
$ cd ~/Library/Application\ Support/Google/DriveFS/
$ du -sh *
224M	114104707028901901726
4.0K	Crashpad
4.7M	Logs
 20M	Resources
 12K	account_db_sqlite.db
512K	cef_cache
4.0K	pid.txt
4.0K	signin
$ rm -rf [0-9]* # 114104707028901901726
$ du -sh *
4.0K	Crashpad
4.7M	Logs
 20M	Resources
 12K	account_db_sqlite.db
512K	cef_cache
4.0K	pid.txt
4.0K	signin
```

> **Note**: The numeric folder name may change from machine to machine.

![Move DriveFS cache directory to Trash]({{ "/images/2020/2020-10-04-drivefs-move-to-trash.png" | prepend: site.assets_path }})

After deleting this directory, cached files can no longer be opened. In order to open the Drive File Stream files again, you'll need to quit and restart the desktop app and sync the files.

## Resources

See [Uninstall Drive File Stream > Step 3: Clear files cached on your computer.](https://support.google.com/a/answer/7491144)
