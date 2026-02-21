---
layout: post
title: How I migrated from Disqus to giscus
date: 2026-02-20 19:58:55
excerpt: How I migrated my Jekyll blog comments from Disqus to giscus.
categories: disqus giscus comments
---

This post goes over how I migrated my Jekyll blog comments from [Disqus](https://disqus.com/) to [giscus](https://giscus.app/).

## Motivation

I didn't like the ads displayed by Disqus so I decided to migrate to [giscus](https://github.com/giscus/giscus), which is an open source comments system powered by [GitHub Discussions](https://docs.github.com/discussions).

## giscus

I installed the [giscus app](https://github.com/apps/giscus) to my [repository](https://github.com/remarkablemark/remarkablemark.github.io).

I [enabled discussions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository) (**Settings** > **Features** > **Discussions**).

I created a category (**Discussions** > **Categories** > **New category**):

|                                    | Input           |
| ---------------------------------- | --------------- |
| **Category name**                  | `Comments`      |
| **Description**                    | `Blog comments` |
| **Discussion Format**              | `Announcement`  |
| **Add this category to a section** | `No section`    |

I filled out the [configuration](https://giscus.app/) to generate the embed code:

<!-- prettier-ignore-start -->

| | Input |
| --- | --- |
| **Language** | `English` |
| **Repository** | `https://github.com/remarkablemark/remarkablemark.github.io` |
| **Page ↔️ Discussions Mapping** | `Discussion title contains page pathname` |
| **Discussion Category** | `Comments` |

<!-- prettier-ignore-end -->

I enabled the options:

- Use strict title matching
- Only search for discussions in this category
- Enable reactions for the main post
- Place the comment box above the comments
- Load the comments lazily

I added the giscus `<script>` to `_layouts/post.html`.

I disabled Disqus for posts before the date of the latest discussion:

{% raw %}

```liquid
{% assign post_date = page.date | date: "%s" %}
{% assign disqus_date_cutoff = "2021-01-13" | date: "%s" %}
{% if post_date < disqus_date_cutoff %}
<!-- disqus -->
{% endif %}
```

{% endraw %}

I added a button to load Disqus for those who want it:

{% raw %}

```html
<button id="disqus_button">Disqus</button>
<div id="disqus_thread"></div>
<script>
  window.disqus_config = function () {
    this.page.url = '...';
    this.page.identifier = '...';
  };
  var disqusButton = document.getElementById('disqus_button');
  disqusButton.addEventListener('click', function () {
    disqusButton.remove();
    var script = document.createElement('script');
    script.src = '//remarkablemark.disqus.com/embed.js';
    script.async = true;
    script.setAttribute('data-timestamp', +new Date());
    document.head.appendChild(script);
  });
</script>
```

{% endraw %}
