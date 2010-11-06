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



<script type="text/javascript">
//<![CDATA[
    document.write('<script type="text/javascript" src="http://twitter.com/javascripts/blogger.js"></' + 'script>');
    document.write('<script type="text/javascript" src="http://twitter.com/statuses/user_timeline/wenbing.json?callback=twitterCallback2&count=1"></' + 'script>');
//]]>
</script>
