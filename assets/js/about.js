Do.add('douban-api', {path: 'http://www.douban.com/js/api.js?v=2', type:'js'});
Do.add('api-parser', {path: 'http://www.douban.com/js/api-parser.js?v=1', type:'js', requires:['douban-api']});
Do.add('mustache', {path: '/assets/js/mustache.js', type:'js'});
Do('mustache');

Do('api-parser', function() {
  DOUBAN.apikey = '083a3e314d86742a18aeba93e8935c7e';
  var baseUri = 'http://api.douban.com/';
  var id = 'yongyezhimian';
  var me;

  var profile_tpl =  ''
  + '<img class="right" src="{{icon}}" alt="name">'
  + '<p><span>Name:</span>{{name}}</p>'
  + '<p><span>Location:</span>{{location}}</p>'
  + '<p><span>Mind:</span>{{content}}</p>'
  + '<p><span>Douban:</span><a href="{{link}}" title="去我的豆瓣">{{name}}</a></p>';
  DOUBAN.getUser({
    id:id,
    callback: function(re) {
      me = DOUBAN.parseUser(re);
      me.icon = me.link.icon;
      me.link = me.link.alternate;
      $('#me').html(Mustache.to_html(profile_tpl, me));
    }
  });

  var render_collection = function(data) {
    alert(data);
  };

  var collection_uri = baseUri+'people/'+id+'/collection?'
    +'cat=book&status=read&start-index=0&max-results=10'
    +'&alt=xd&callback=render_collection';
  $.getJSON(collection_uri);
});


