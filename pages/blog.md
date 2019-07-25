---
layout: page
title: Blog
excerpt: remarkablemark's blog.
permalink: /blog/
---

<div class="container">
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">
          {{ post.date | date: "%b %d, %Y" }}:
        </span>
        <span class="post-title">
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
            {{ post.title }}
          </a>
        </span>
      </li>
    {% endfor %}
  </ul>
</div>
