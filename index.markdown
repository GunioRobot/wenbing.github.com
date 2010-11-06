---
layout: name
title: Home
section: Home
---

欢迎访问
=======

+-- {.section}
[Blogs](/post)
==============
最近发表的文章：
{% for post in site.categories.post limit:3 %}
<ul class="compact recent">
<li>
  <a href="{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
  <span class="date"><em>发表于 </em>{{ post.date | date_to_string }}.</span>
</li>
</ul>
{% endfor %}
=--

+-- {.section}
[Poems](/poem)
==============
最近发表的文章：
{% for post in site.categories.poem limit:3 %}
<ul class="compact recent">
<li>
  <a href="{{ post.url }}" title="{{ post.excerpt }}">{{ post.title }}</a>
  <span class="date"><em>发表于 </em>{{ post.date | date_to_string }}.</span>
</li>
</ul>
{% endfor %}
=--

+--	{.section}
Test
====
test 
=--

+-- {.section}
[Twitter](https://twitter.com/wenbing)
======================================
Contacting Twitter... 
{:#twitter_update_list }
=--
