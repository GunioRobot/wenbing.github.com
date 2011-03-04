---
layout: blog
title: About Me 
section: about

keywords: about me, Wenbing Zheng
---

<img src='/issets/images/chyyy.jpg' title='春-夜-月-樱' alt='春-夜-月-樱-图' width='120px' class="right" />


<script>
Do.add('douban', {'path': 'http://www.douban.com/js/api.js?v=2', 'type':'js'});
Do.add('api-parser', {'path': 'http://www.douban.com/js/api-parser.js?v=1', 'type':'js'});

Do('douban', function() {
  DOUBAN.apikey = '083a3e314d86742a18aeba93e8935c7e';

  console.log(DOUBAN);
});

</script>
