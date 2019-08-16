---
layout: page
title: Blog
excerpt: remarkablemark's blog.
permalink: /blog/
---

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <span class="post-meta">{{ post.date | date: "%b %d, %Y" }}</span>
      <span class="post-title">
        <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
      </span>
    </li>
  {% endfor %}
</ul>
