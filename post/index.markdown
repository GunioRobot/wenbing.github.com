---
layout: post
title: 网志首页
section: Home

feed: atom.xml
keywords: Blog,网志
---

我的网志 -- 记录我的生活
========================

最近发表的文章
--------------

{% for post in site.categories.post limit:5 %}
<div class="section list">
  <h1>{{ post.date | date_to_string }}</h1>
  <p class="line">
  <a class="title" href="{{ post.url }}">{{ post.title }}</a>
  <a class="comments" href="{{ post.url }}#disqus_thread">评论</a>
  </p>
  <p class="excerpt">{{ post.excerpt }}</p>
</div>
{% endfor %}

<p>
<a href="past.html">往期日志 &rarr;</a>
</p>

<script type="text/javascript">
//<![CDATA[
  function get_disqus_comments() {
    var links = document.getElementsByTagName('a');
    var query = '?';
    for(var i = 0; i < links.length; i++) {
      if(links[i].href.indexOf('#disqus_thread') >= 0) {
        query += 'url' + i + '=' + encodeURIComponent(links[i].href) + '&';
      }
    }
    document.write('<script type="text/javascript" src="http://disqus.com/forums/markreid/get_num_replies.js' + query + '"></' + 'script>');
  };
  //window.onload = get_disqus_comments();
//]]>
</script>
