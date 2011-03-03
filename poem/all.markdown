---
layout: blog
title: 诗存档
section: all-post

feed: atom.xml
keywords: 诗,存档
---

Poem Posts Archives
--------------

这是 _[Poem Posts](/poem)_ 下的全部文章。按时间倒序排列。

{% for post in site.categories.poem %}
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
  
