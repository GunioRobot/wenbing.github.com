---
layout: blog
title: Home

section: home
---

Recent Posts
------------

+-- {.section}
<!-- commented
[Blog](/blog)
==============
-->
最近发表的文章：
{% for post in site.categories.blog limit:3 %}
<div class="post-snippet">
  <div class="post-head">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.date | date_to_long_string }}</p>
  </div>
  <div class="post-content">
    <p>{{ post.excerpt }}</p>
  </div>
</div>
{% endfor %}
=--

