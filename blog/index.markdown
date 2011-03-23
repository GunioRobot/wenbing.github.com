---
layout: blog
title: Blog Home 
section: Blog

feed: atom.xml
keywords: Blog,网志
---

Recent Posts
------------

{% for post in site.categories.blog limit:20 %}
<div class="hide post-snippet {{ post.tags | join:' ' }}">
  <div class="post-head clearfix">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="left"><em>Date:</em> {{ post.date | date_to_long_string }}</p>
    {% if post.tags != empty %}
    <ul class="taglist right">
      <em class="left">Tags:</em>
      {% for tag in post.tags limit:5 %}
        <li class="tag left">
          <a href="#{{tag}}" title="view posts in tag '{{tag}}'">{{tag}}</a>
        </li>
      {% endfor %}
    </ul>
    {% endif %}
  </div>

  <div class="post-content">
    <p>{{ post.excerpt }}</p>
  </div>
</div>
{% endfor %}

<p>
<a href="all.html">往期日志 &rarr;</a>
</p>

<script>
  Do('/issets/js/tag.js', function() {
    // other stuff
  });
</script>

<!--
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
    document.write('<script type="text/javascript" src="http://disqus.com/forums/quliaojie/get_num_replies.js' + query + '"></' + 'script>');
  };
  window.onload = get_disqus_comments();
//]]>
</script>
-->
