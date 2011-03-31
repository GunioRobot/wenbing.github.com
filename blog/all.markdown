---
layout: blog
title: 日志存档
section: all-post

feed: atom.xml
keywords: 网志,存档
---

Posts Archives
--------------

这是 _[Blog Posts](/blog)_ 下的全部文章。按时间倒序排列。

{% for post in site.categories.blog %}
  <div class="hide post-snippet {{ post.tags | join:' ' }}">
    <div class="post-head">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <div class="clearfix">
        <p class="left"><em>Date:</em> {{ post.date | date_to_long_string }}</p>
        <p class="post-tag right">
          <em>Tag: </em><span>{{ post.tags | join:', ' }}</span>
        </p>
      </div>
    </div>
    <div class="post-content">
      <p>{{ post.excerpt }}</p>
    </div>
  </div>
{% endfor %}

