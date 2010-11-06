---
layout: name
title: Home
section: Home
---

Welcome
=======

Welcome

+-- {.section}
[Blogs](/post)
=====
Recent posts include:
{% for post in site.categories.post limit:3 %}
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
========
test 
=--

+-- {.section}
[Twitter](https://twitter.com/wenbing)
====================================

Contacting Twitter... 
{:#twitter_update_list }

=--
