---
layout: post
title: How to free up iMovie disk space
date: 2016-06-04 19:32:00
excerpt: Learn how to free up disk space by cleaning up iMovie render files.
categories: iMovie disk space render files bash code
---

As we create more and more iMovie projects, we may notice that our disk space starts to diminish.

Is there a way to recover all that precious hard drive space? You betcha.

The simplest strategy is to delete the `Render Files` of projects you're no longer working on.

Now before we continue, I want to throw a **disclaimer** that although the operation _should_ be safe, _I am not liable if anything goes wrong_.

With that out of the way, open `Terminal`, copy-and-paste the code below, and hit `Enter`:

(_**Warning:** This operation cannot be undone._)

```sh
find ~/Movies/iMovie\ Library.imovielibrary -path "*/Render Files" -type d -exec rm -r {} +
```

What the bash script does is it finds all the `Render Files` directories in your `iMovie Library` and executes a recursive remove on them.

If you're not so confident about running this code, you can also delete the `Render Files` manually.

Open `Finder` and go to `~/Movies/`. Now open your **iMovie Library Package Contents** (right click and select the option).

![iMovie Show Package Contents]({{ "/images/2016/06-04-imovie-show-package-contents.png" | prepend: site.assets_path }})

Go inside each project folder and delete the `Render Files` folder.

![iMovie Render Files]({{ "/images/2016/06-04-imovie-delete-render-files.png" | prepend: site.assets_path }})

Now empty your `Trash` and you should see all that recovered space!
