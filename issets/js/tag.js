(function() {
  var tags = $('.tag a');
  var addTagNav = function() {
    var otags={}, sum=0;
    tags.each(function(i) {
      var tagname = $(this).text();
      if(otags[tagname]) {
        otags[tagname].count++;
      } else {
        otags[tagname] = {count:1};
      }
      sum++;
    });
    var tagc, html=[];
    html.push('<h2>Tag Cloud</h2>');
    html.push('<ul id="tagnav" class="clearfix">');
    html.push('  <li class="tag left"><a href="#all" title="view all posts">ALL</a></li>');
    for(var tag in otags) {
      if(otags.hasOwnProperty(tag)) {
        tagc = Math.round(otags[tag].count / (sum / 10)); // 1-10
        html.push('<li class="tag left">');
        html.push('  <a class="tc_'+tagc+'" href="#'+tag+'" title="view post in tag \''+tag+'\'">'+tag+'</a>');
        html.push('</li>');
      }
    }
    html.push('</ul>');
    $('#sidebar h1').after(html.join(''));
  };
  var showPost = function(tag) {
    tag = tag || null;
    var posts = $('.post-snippet');
    if(tag && tag !== 'all') {
      posts.hide()
        .filter('.'+tag).show();
    } else {
      posts.show();
    }
  };

  if(!location.hash) {
    $('.post-snippet').show();
  } else {
    showPost(location.hash.substr(1));
  }

  addTagNav();
  tags.live('click', function() {
    var context = $(this);
    var tag = context.attr('href').substr(1);
    showPost(tag);
  });

})();
