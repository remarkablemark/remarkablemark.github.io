---
layout: page
title: Projects
excerpt: remarkablemark's projects.
permalink: /projects/
---

<table>
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
          <a href="{{ project.link }}" target="_blank" rel="noopener noreferrer">{{ project.name }}</a>
        </td>
        <td>{% if project.description %}{{ project.description }}{% endif %}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
