---
layout: post
title: Jekyll heading links
date: 2020-04-04 23:28:38
excerpt: How to add fragment anchor links to the headings of your Jekyll blog post.
categories: jekyll html scss javascript
---

Recently, I added [fragment links](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page) to my [Jekyll](https://jekyllrb.com/) blog (see [commits](https://github.com/remarkablemark/remarkablemark.github.io/compare/4f36368...8b04d88)).

What this means is when you click on a heading element, the URL will update with the fragment id.

This is useful for bookmarking or sharing a page section. It can also be used when creating a table of contents.

## Prerequisites

First, remove all existing heading links from your blog posts. You can find them by grepping the pattern:

```sh
git grep '# \[' -- _posts/
```

Or add the `-l` option to get all the relative filepaths matching the pattern:

```sh
git grep -l '# \[' -- _posts/
```

## Fragment links

Now add your fragment links. Append the script to the end of `_layouts/post.html`:

```html
<!-- _layouts/post.html -->
<script>
  document
    .querySelector('.post-content') // your selector for the post body
    .querySelectorAll('h1,h2,h3,h4,h5,h6')
    .forEach(function(heading) {
      if (heading.id) {
        heading.innerHTML =
          '<a href="#' + heading.id + '">' + heading.innerText + '<\/a>';
      }
    });
</script>
```

The script does the following:

1. looks for all post heading elements
2. if the element has an `id` attribute, then the text will be surrounded with an anchor element linking to the fragment id

### Example

If you have the following:

```html
<h2 id="title">Title</h2>
```

Then it would be converted like so:

```html
<h2 id="title">
  <a href="#title">Title</a>
</h2>
```

## Styling

To remove the anchor styles, you can inherit the heading styles:

```scss
// main.scss
.post-content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    > a {
      color: inherit;
    }
  }
}
```

If you want to display an icon when the element is _active_, _focused_, or _hovered_, then update your script with:

```js
heading.innerHTML += '<span class="anchor-icon">§</span>';
```

Then add the CSS to toggle the icon display:

```scss
// main.scss
.post-content {
  .anchor-icon {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    > a {
      &:active,
      &:focus,
      &:hover {
        + .anchor-icon {
          display: inline-block;
        }
      }
    }
  }
}
```

And there you have it, heading links for your website!
