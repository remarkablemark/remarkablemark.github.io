---
layout: post
title: Google Drive clear cache
date: 2020-10-03 17:59:19
excerpt: How to clear the Google Drive File Stream cache so files are only available online and not on the computer.
categories: google drive cache
---

> **TL;DR**: remove the Drive File Stream cache from your Terminal:
>
> ```sh
> $ rm -rf ~/Library/Application\ Support/Google/DriveFS/[0-9]*
> ```

## Background

I installed the [Google Drive desktop app](https://support.google.com/drive/answer/7329379) in order to sync files between my computer and the cloud.

I found that you could right-click a file, hover over `Drive File Stream`, and select an option:

- `Available offline`
- `Online only` (default)

But even when `Online only` is selected, large files still persist on my computer.

## Clear cache directory

To remove all files from your computer cache, you can delete the Drive File Stream cache.

You can find your DriveFS cache path by going to `Drive File Stream` > `Settings` (the gear icon) > `Preferences...` > `Local cached files directory`.

By default, the cache directory should be `~/Library/Application Support/Google/DriveFS`.

To delete the DriveFS cache directory using [Terminal](<https://en.wikipedia.org/wiki/Terminal_(macOS)>):

```sh
$ rm -rf ~/Library/Application\ Support/Google/DriveFS/
```

The side-effect of this is that it also deletes your credentials so you'll need to login again.

## Clear cache content directory

To clear cache without deleting credentials, you can delete just the cache content directory:

```sh
$ rm -rf ~/Library/Application\ Support/Google/DriveFS/[0-9]*
```

What the command above is doing is deleting the numeric directory from DriveFS:

```sh
$ cd ~/Library/Application\ Support/Google/DriveFS/
$ du -sh *
224M	101870562975171000593
4.0K	Crashpad
4.7M	Logs
 20M	Resources
 12K	account_db_sqlite.db
512K	cef_cache
4.0K	pid.txt
4.0K	signin
$ rm -rf [0-9]* # 101870562975171000593
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

After deleting this directory, cached files can no longer be opened. In order to open the Drive File Stream files again, you'll need to quit and restart the desktop app and sync the files.

## Resources

See [Uninstall Drive File Stream > Step 3: Clear files cached on your computer.](https://support.google.com/a/answer/7491144)
