---
layout: name
title: Home
section: Home
---

欢迎
====

+-- {.section}
[Blog](/post)
==============
最近发表的文章：
{% for post in site.categories.post limit:3 %}
<ul class="compact recent">
<li>
  <a href="{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
</li>
</ul>
{% endfor %}
=--

+-- {.section}
[Poems](/poem)
==============
最近更新：
{% for post in site.categories.poem limit:3 %}
<ul class="compact recent">
<li>
  <a href="{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
</li>
</ul>
{% endfor %}
=--

+-- {.section}
[Twitter](https://twitter.com/wenbing)
======================================
Contacting Twitter... 
{:#twitter_update_list }
=--
