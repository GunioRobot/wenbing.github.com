---
layout: blog
title: About Me 
section: about

keywords: about me, Wenbing Zheng
---

<div id="me"></div>

<script type="text/javascript">
//<![CDATA[
  Do.add('douban-api', {path: 'http://www.douban.com/js/api.js?v=2', type:'js'});
  Do.add('api-parser', {path: 'http://www.douban.com/js/api-parser.js?v=1', type:'js', requires:['douban-api']});

  Do.add('json-template', {path:'/issets/js/json-template.js', type:'js'});
  Do('json-template');
  
  Do('api-parser', function() {
    DOUBAN.apikey = '083a3e314d86742a18aeba93e8935c7e';
    var tpl = '<p><span>Name:</span>{name}</p>'
      + '<img class="right" src="{link.icon}" alt="{name}" />'
      + '<p><span>Location:</span>{location}</p>'
      + '<p><span>Mind:</span>{content}</p>'
      + '<p><span>Douban:</span><a href="{link.alternate}" title="去我的豆瓣">{name}</a></p>';
    var me = 'yongyezhimian';
    DOUBAN.getUser({
      'id': me,
      'callback': function(re) {
        var user = DOUBAN.parseUser(re);
        var t = jsontemplate.Template(tpl);
        var html = t.expand(user);
        $('#me').html(html);
      }
    });
  });

//]]>
</script>

<h2>Read, Watch, Listen</h2>
<script type="text/javascript">
//<![CDATA[
  Do.add('douban-api', {path: 'http://www.douban.com/js/api.js?v=2', type:'js'});
  Do.add('api-parser', {path: 'http://www.douban.com/js/api-parser.js?v=1', type:'js', requires:['douban-api']});
  Do.add('mustache', {path: '/issets/js/mustache.js', type:'js'});
  Do('mustache');

  Do('api-parser', function() {
    //
  });
//]]>
</script>

