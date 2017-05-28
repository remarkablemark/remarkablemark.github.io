---
layout: post
title: "How to add an image to a GitHub gist"
date: 2016-06-16 23:57:00 -4000
excerpt: "How to add an image to a GitHub gist. The trick is to use gist like a Git repository."
categories: gist git GitHub image
---

Have you ever wondered how to add an image to a gist?

Well until GitHub allows us to directly upload images, the approach as of now is to use gists like Git repositories:

1. Create a [gist](https://gist.github.com) (if you haven't already).
2. Clone your gist (make sure to update `<hash>` with your gist hash):
   - with SSH: `git clone https://gist.github.com/<hash>.git`
   - or with HTTPS: `git clone https://gist.github.com/<hash>.git`
3. Add the image to your gist's repository: `git add image.jpg`
4. Commit the file: `git commit -m "Add image"`
5. Update remote gist: `git push origin master`
6. Now you can view the **Raw** image at: `https://gist.github.com/<username>/<hash>`

Check out my [example](https://gist.github.com/remarkablemark/feff40b0a522f0c41c4eff0b77ea1d47).
