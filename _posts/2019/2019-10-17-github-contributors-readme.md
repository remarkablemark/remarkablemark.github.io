---
layout: post
title: Display GitHub contributors in README
date: 2019-10-17 21:22:42
updated: 2026-06-24 21:48:13
excerpt: How to display GitHub contributors in README.
categories: github contributors readme avatar image html markdown
---

## contrib.rocks

[contrib.rocks](https://contrib.rocks/) has an embed for displaying contributors.

The following embed is for [html-react-parser](https://github.com/remarkablemark/html-react-parser):

[![html-react-parser contributors](https://contrib.rocks/image?repo=remarkablemark/html-react-parser)](https://github.com/remarkablemark/html-react-parser/graphs/contributors)

The Markdown embed is:

```md
[![Code Contributors](https://contrib.rocks/image?repo=remarkablemark/html-react-parser)](https://github.com/remarkablemark/html-react-parser/graphs/contributors)
```

## Custom

You can embed a linked image as long as you have the urls to the contributor's _profile_ and _avatar_.

To get the avatar url:

1. Go to the profile page
2. Right-click the image
3. Select `Copy Image Address` (or `Open Link in New Tab`)

See screenshot below:

![Copy GitHub avatar image address]({{ "/images/2019/2019-10-17-github-avatar-image.png" | prepend: site.assets_path }})

What's copied should be similar to the url below:

```
https://avatars2.githubusercontent.com/u/10594555?s=460&v=4
```

The querystring `?s=460&v=4` can be described as follows:

- `s` stands for the size (width and height in pixels)
- `v` represents the version used by GitHub for [cache busting](https://www.keycdn.com/support/what-is-cache-busting)

Alternatively, you can add `.png` to the profile url (which acts as a redirect to the avatar image):

```
https://github.com/remarkablemark.png?size=50
```

This means you can add the following HTML to your `README.md`:

```html
<a href="https://github.com/remarkablemark">
  <img src="https://github.com/remarkablemark.png?size=50" />
</a>
```

Or include the Markdown below which does the same thing:

```md
[![](https://github.com/remarkablemark.png?size=50)](https://github.com/remarkablemark)
```

Here's the output:

[![remarkablemark](https://github.com/remarkablemark.png?size=50)](https://github.com/remarkablemark)
