---
layout: labs
title: Labs Home
section: labs

keywords: labs, blueprintcss, jquery
---

Recent Posts
------------

{% for post in site.categories.labs limit:8 %}
<div class="post-snippet">
  <div class="post-head">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.date | date_to_string }}</p>
  </div>
  <div class="post-content">
    <p>{{ post.excerpt }}</p>
  </div>
</div>
{% endfor %}
