---
layout: page
title: Blog
excerpt: Mark's remarkable blog where he writes about code, ideas, and other musings.
permalink: /blog/
---
<div class="container">
    <ul class="post-list">
        {% for post in site.posts %}
            <li>
                <span class="post-meta">
                    {{ post.date | date: "%b %d, %Y" }}:
                </span>&nbsp;
                <span class="post-title">
                    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                        {{ post.title }}
                    </a>
                </span>
            </li>
        {% endfor %}
    </ul>
</div>
