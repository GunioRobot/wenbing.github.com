var addTagNav = function(tags) {
  tags = $.trim(tags).split(' ');
  var i=0, len=tags.length,
      tagname, otags={}, sum=0;
  for(; tagname=tags[i++]; ) {
    if(otags[tagname]) {
      otags[tagname].count++;
    } else {
      otags[tagname] = {count:1};
    }
    sum++;
  }
  var tagc, html=[];
  //html.push('<h2 class="hide">Tag Cloud</h2>');
  //html.push('<p id="tagcloud" class="hide">');
  html.push('  <a class="tag" href="/blog/all.html#all" title="view all posts">ALL</a>');
  for(var tag in otags) {
    if(otags.hasOwnProperty(tag)) {
      tagc = Math.round(otags[tag].count / (sum / 10)); // 1-10
      html.push('  <a class="tag tc_'+tagc+'" href="/blog/all.html#'+tag+'" title="view post in tag \''+tag+'\'">'+tag+'</a>');
    }
  }
  //html.push('</p>');
  $('#tagcloud').hide().append(html.join('')).show();
};
var showPost = function(tag) {
  tag = $.trim(tag) || 'all';
  var posts = $('.post-snippet');
  if(tag.toLowerCase() !== 'all') {
    posts.hide().filter('.'+tag).show();
  } else {
    posts.show();
  }
};

