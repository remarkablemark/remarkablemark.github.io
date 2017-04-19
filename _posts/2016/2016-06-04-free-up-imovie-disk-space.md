---
layout: post
title: How to free up iMovie disk space
date: 2016-06-04 23:32:00 -4000
excerpt: You can free up disk space by deleting iMovie render files.
categories: iMovie disk storage space
---

> **Update 2017-04-18**: As of iMovie version 10.1.3, you can delete Render Files within iMovie Preferences ([credit](https://disq.us/p/1hwltqm)).

As we create more iMovie projects, our disk space starts to diminish.

What if we want to recover all that storage space?

One approach is to delete the **Render Files** of projects you're no longer working on.

### Code Deletion

> **Disclaimer**: although the operation should be safe, I'm not liable if anything goes wrong.

Open `Terminal` and run the following line of code (**this operation cannot be undone**):

```sh
find ~/Movies/iMovie\ Library.imovielibrary -path "*/Render Files" -type d -exec rm -r {} +
```

What the above does is it looks in `iMovie Library` and finds and removes all directories named `Render Files`.

If you're not sure about running this code, you can also clean up the files manually.

### Manual Deletion

Open `Finder` and go to `~/Movies/`.

Then open `iMovie Library` **Package Contents** (right click and select the option):

![iMovie Show Package Contents]({{ "/images/2016/06-04-imovie-show-package-contents.png" | prepend: site.assets_path }})

Go inside each project folder and delete the `Render Files` folder:

![iMovie Render Files]({{ "/images/2016/06-04-imovie-delete-render-files.png" | prepend: site.assets_path }})

Now empty your `Trash` and you should see all that recovered space!
