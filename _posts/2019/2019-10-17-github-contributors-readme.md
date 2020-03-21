---
layout: post
title: Display GitHub contributors in README
date: 2019-10-17 21:22:42
excerpt: How to display GitHub contributors in README.
categories: github contributors readme avatar image html markdown opencollective
---

## Open Collective

[Open Collective](https://opencollective.com/) has an embed for displaying contributors, which is pretty cool.

The following embed is for [html-react-parser](https://github.com/remarkablemark/html-react-parser):

[![html-react-parser contributors](https://opencollective.com/html-react-parser/contributors.svg?width=890&button=false)](https://github.com/remarkablemark/html-react-parser/graphs/contributors)

The HTML of the embed is:

```html
<a href="https://github.com/remarkablemark/html-react-parser/graphs/contributors">
  <img src="https://opencollective.com/html-react-parser/contributors.svg?width=890&button=false">
</a>
```

And the Markdown equivalent is:

```md
[![](https://opencollective.com/html-react-parser/contributors.svg?width=890&button=false)](https://github.com/remarkablemark/html-react-parser/graphs/contributors)
```

But for projects not on Open Collective, how can I display my contributors?

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
  <img src="https://github.com/remarkablemark.png?size=50">
</a>
```

Or include the Markdown below which does the same thing:

```md
[![](https://github.com/remarkablemark.png?size=50)](https://github.com/remarkablemark)
```

Here's the output:

[![remarkablemark](https://github.com/remarkablemark.png?size=50)](https://github.com/remarkablemark)
