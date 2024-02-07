---
layout: page
title: Blog
# excerpt: remarkablemark's blog.
permalink: /blog/
---

# Blog

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <span class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d, %Y" }}</time>:
      </span>
      <span class="post-title">
        <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
      </span>
    </li>
  {% endfor %}
</ul>
