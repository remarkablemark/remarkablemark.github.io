---
layout: post
title: How to add an image to a GitHub gist
date: 2016-06-16 23:57:00 -4000
excerpt: How to add images or other static files to a GitHub gist. The trick is to use gist like a Git repository.
categories: gist git GitHub image static file
---

Did you know you can upload images (and other static files) to a [gist](https://gist.github.com) simply because it's a Git repository?

### Instructions

First you need to make sure you're logged in to your GitHub [account](https://github.com/login).

1. Create or find a [gist](https://gist.github.com) that you own.
2. Clone your gist (replace `<hash>` with your gist's hash):
   ```sh
   # with ssh
   git clone git@gist.github.com:<hash>.git mygist

   # or with https
   git clone https://gist.github.com/<hash>.git mygist
   ```

3. Change to your gist's directory:
   ```sh
   cd mygist
   ```

4. Add and commit the image:
   ```sh
   git add image.jpg
   git commit -m "Add image to gist"
   ```

5. Update remote:
   ```sh
   git push origin master
   ```

And voilà you can view the image in your gist:

```sh
open https://gist.github.com/<username>/<hash>
```

If you inspect the **Raw** file, you'll get something like the following:

```
https://gist.githubusercontent.com/<username>/<gist-sha>/raw/<commit-sha>/image.jpg
```

> **Note**: One disadvantage of gist is it doesn't support directories.
> This means all files live in the root folder of the repository.

### Example

See [gist](https://gist.github.com/remarkablemark/feff40b0a522f0c41c4eff0b77ea1d47):

{% gist feff40b0a522f0c41c4eff0b77ea1d47 %}
