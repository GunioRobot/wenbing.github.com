---
layout: blog-post
title: 创建应用程序相关的 jQuery 扩展
excerpt: ... 当你写的代码与你的应用紧密关联，且想以链式方式执行时，是不是要作为一个 jQuery 扩展来写就不是那么清楚了。
tags: [javascript, jQuery, jQuery plugins]
---

使用 jQuery 创建应用时，经常会写些能够直接以 jQuery 对象链式执行的代码。
当你的代码解决的问题与你的应用没有依赖性时，就应该写成一个 jQuery 扩展。
然而，当你写的代码与你的应用紧密关联，且想以链式方式执行时，是不是要作为一个 jQuery 扩展
来写就不是那么清楚了。

一种创建应用相关的扩展的模式是给你的方法添加前缀以避免命名冲突。
例如，假如我们有很多 widget 共用相同的标签结构。如果我们想能够从任何包含此 widget 的元素
定位到此 widget 元素，就要创建一个 nmkWidget 的方法。

假设此 widget 有下面的结构：

  {% highlight html %}
  <div class="nmk-widget">
  	<div class="nmk-widget-header">
      <!-- widget-specific header -->
    </div>
  	<div class="nmk-widget-content">
      <!-- widget-specific content -->
    </div>
  </div>
  {% endhighlight %}

我们可以定义一些能够定位此 widget 的函数：

  {% highlight javascript %}
  $.fn.nmkWidget = function() {
    return this.closest('.nmk-widget');
  };
  $.fn.nmkWidgetHeader = function() {
    return this.nmkWidget.children('.nmk-widget-header');
  };
  $.fn.nmkWidgetContent = function() {
    return this.nmkWidget.children('.nmk-widget-content');
  };
  {% endhighlight %}

这些可以在没有依赖或没有超出 DOM 的状态管理的简单扩展中使用。
如果你想要一个模块内部相关的功能呢？ jQuery 不支持对 jQuery.fn 使用命名空间。
不过有一个简单的模式可以用上。
我们可以定义一个方法，作为 jQuery 到其它对象的传递。

  {% highlight javascript %}
  var slice = Array.prototype.slice;
  $.fn.exec = function(method) {
    return method.apply(this, slice.call(arguments, 1));
  };
  {% endhighlight %}

然后就可以创建对象，嵌套多少层都可以，就像标准 jQuery 方法一样定义在里面定义方法。

  {% highlight javascript %}
  var nmk = {
    widget: {
      open: function(duration) {
              return this.nmkWidget().slideDown(duration);
      },
      close: function(duration) {
              return this.nmkWidget().slideUp(duration);
      }
    }
  };
  {% endhighlight %}

通过 .exec() 方法在 jQuery 链中执行：

  {% highlight javascript %}
  $(elem).exec(nmk.widget.close);
  {% endhighlight %}

还可以向其中传递参数：

  {% highlight javascript %}
  $(elem).exec(nmk.widget.close, 1000);
  {% endhighlight %}

现在我们有了可重用、模块化、支持命名空间的支持 jQuery 链式操作的代码。
可以使用这个方法定义多种关闭 widget 的方法，而不会逻辑重复，也不用担心处于的 DOM 结构了。

  {% highlight javascript %}
  $('.nmk-widget-close-button').live('click', function() {
    $(this).exec(nmk.widget.close);
  });

  $('#add-widget').click(function() {
    var widget = nmk.widget.create();
    $('<p>Your new widget has been added. Click here to undo</p>')
      .click(function() {
        widget.exec(nmk.widget.close);
      });
  });
  
  {% endhighlight %}


[原文][source]

[source]:http://blog.nemikor.com/2010/08/16/creating-application-specific-jquery-plugins/ 

