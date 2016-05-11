---
layout: page
title: Projects
permalink: /projects/
---
<div class="container">
    <ul>
    {% for project in site.data.projects %}
        <li>
            <a href="{{ project.link }}" target="_blank">{{ project.name }}</a>
            {% if project.description %}
                &mdash; <span>{{ project.description }}</span>
            {% endif %}
        </li>
    {% endfor %}
    </ul>
</div>
