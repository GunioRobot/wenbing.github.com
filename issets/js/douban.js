
Do.add('douban-api', {path: 'http://www.douban.com/js/api.js?v=2', type:'js'});
Do.add('api-parser', {path: 'http://www.douban.com/js/api-parser.js?v=1', type:'js', requires:['douban-api']});

Do('api-parser', function() {
  DOUBAN.apikey = '083a3e314d86742a18aeba93e8935c7e';
});


