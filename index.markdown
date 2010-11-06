---
layout: name
title: Home

section: Home
---

欢迎
====

<img class='inset right' src='/files/images/chyyy.jpg' title='春-夜-月-樱' alt='春-夜-月-樱-图' width='120px' />

+-- {.section}
[Blog](/blog)
==============
最近发表的文章：
{% for post in site.categories.blog limit:3 %}
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
{:#twitter-update-list }
=--



<script type="text/javascript">
//<![CDATA[
//document.write('<script type="text/javascript" src="http://twitter.com/javascripts/blogger.js"></' + 'script>');
//document.write('<script type="text/javascript" src="http://twitter.com/statuses/user_timeline/wenbing.json?callback=twitterCallback2&count=1"></' + 'script>');
google.load("jquery", "1.4.3");
$(document).ready(function() {
  $.get('http://twitter.com/statuses/user_timeline/wenbing.json?callback=twitterCallback2&count=1', function(data) {
    $('#twitter-update-list').html(data);
  });
});
//]]>
</script>
