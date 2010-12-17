---
layout: labs
title: Labs
section: labs

keywords: labs, blueprintcss, jquery
---

我的实验室
==========

最近发表的文章
--------------

<div class="post-snippet">
  <div class="post-head">
    <h3><a href="#">This is a sample post</a></h3>
    <p class="byline">2010-12-17 17:59</p>
  </div>
  <div class="post-content">
    <p>This is a sample post...This is a sample post...This is a sample post...This is a sample post...This is a sample post...This is a sample post...This is a sample post...This is a sample post...This is a sample post...This is a sample post...</p>
  </div>
</div>

{% for post in site.categories.labs limit:8 %}
<div class="post-snippet">
  <div class="post-head">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="byline">{{ post.date | date_to_string }}</p>
  </div>
  <div class="post-content">
    <p>{{ post.excerpt }}</p>
  </div>
</div>
{% endfor %}
