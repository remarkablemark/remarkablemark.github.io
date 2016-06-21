---
layout: page
title: Projects
excerpt: Mark's remarkable projects.
permalink: /projects/
---
<div class="container">
    <table class="u-full-width">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {% for project in site.data.projects %}
                <tr>
                    <td>
                        <a href="{{ project.link }}" target="_blank">
                            {{ project.name }}
                        </a>
                    </td>
                    <td>
                        {% if project.description %}
                            {{ project.description }}
                        {% endif %}
                    </td>
                </tr>
            {% endfor %}
        </tbody>
    </table>
</div>
