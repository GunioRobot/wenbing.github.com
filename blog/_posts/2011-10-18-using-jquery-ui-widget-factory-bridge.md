---
layout: blog
title: 使用 jquery ui 组件的 factory bridge
excerpt: jQuery UI 组件工厂中有个 $.widget.bridge 的方法，是 $.widget 创建的对象和 jQuery API 的中间人。$.widget.bridge 是一个公共方法，所以你不需要加载 jQuery UI 也可以使用它。
tags: [jquery, javascript]
---

jQuery UI 组件工厂中有个 $.widget.bridge 的方法，是 $.widget 创建的对象和 jQuery API 的中间人。
$.widget.bridge 是一个公共方法，所以你不需要加载 jQuery UI 也可以使用它。

组建工厂中的 "bridge" 是实现模块化和松耦合的重要模式。

$.widget.bridge 实现下面的功能：

* l为一个常规 Javascript 对象连接到 jQuery API
* l自动为上述对象创建实例并存储在元素的 $.data 缓存中
* l允许初始化后更改选项
* l允许调用公共方法
* l阻止私有方法调用
* l阻止未初始化对象的方法调用
* l防止多次初始化

jQuery UI 组件由 `$.widget('foo.bar', {});` 句法创建一个可以实例化的对象。
对一个含五个 .foo 的 DOM 结构，`$('.foo').bar();` 会生成五个 `bar` 对象的实例。
$.widget.bridge 在工厂内部给予 foo 对象公共 API，
使你可以使用 `$('.foo').bar()` 创建实例和使用 `$('.foo').bar('baz')` 调用方法。

其实，传给 `$.widget.bridge` 的对象也可以是你定义的对象，不一定必须是 `$.widget()` 创建的对象。
不过，为了能正常工作，bridge (桥)会对你的代码以下假设：

1. 你的对象必须有一个 `option` 和 `_init` 方法。初始化逻辑写入 `_init`，初始化后更改选项的逻辑写入 `option`。
2. `option` 方法返回当前实例。如果一个元素要重新初始化一个实例，`option` 会首先调用，接着就是 `_init` 。
3. 你的构造器接受两个参数： `options` ，一个配置选项对象， `element` ，要创建实例的 DOM 元素。

让我们开始创建一个对象：

  {% highlight javascript %}
  // "Widget" 对象构造器
  var Widget = function(options, element) {
    this.options = options;
    this.element = element;

    this._init();
  };
  Widget.prototype = {
    // _init 在实例第一次创建时（由上面的构造器）和重新初始化此组建时（由桥）调用
    _init: function() {
      // init code
    },
    option: function(key, value) {
      // 初始化后修改选项

      // 用例： `$('#foo').bar({cool:false});`
      if($.isPlainObject(key)) {
        this.options = $.extend(true, this.options, key);

      // 用例： `$('#foo').option('cool') - getter`
      } else if(key && typeof value === 'undefined') {
        return this.options[key];

      // 用例： `$('#foo').bar('option', 'baz', false)`
      } else {
        this.option[key] = value;
      }

      return this; // 返回实例
    },
    publicFn: function() {
      return 'public method';
    },
    _privateFn: function() {
      return 'private method';
    }
  };
  {% endhighlight %}

现在把它和桥连起来：

  {% highlight javascript %}
  // 在 "foo" 命名空间下将组件连接到 jQuery API
  $.widget.bridge('foo', Widget);

  // 现在你可以…
  var instance = $('#elem').foo({
    baz: true
  })
  // 将会完成下面三件事：
  1. 检查对象是否已经初始化，如果已经初始化，自动调用 `option` 和 `_init` 方法
  2. 创建一个新的实例，传入选项键值对和组件对应的元素
  3. 存储实例到元素的 $.data 缓存中

  // 你的组件实例存在元素的数据缓存中
  instance.data('foo').element; // -- #elem 元素

  // 桥允许你调用公共方法
  instance.foo('publicFn'); // -- "public method"

  // 桥不允许你调用私有方法
  instance.foo('_privateFn') // -- #elem 元素

  // 桥不允许未初始化组件的方法调用
  $('#bar').foo('publicFn'); // 'cannot call methods on 'foo' prior to initialization'

  // 桥不允许调用不存在的方法
  instance.foo('hai'); // 'no such method 'hai' for foo instance'

  // 桥让你可以在初始化后修改选项
  instance.foo('option', 'baz', false);

  // 或取得一个已存在选项的值
  instance.foo('option', 'baz');

  // 如果你试图重新初始化组件
  instance.foo({baz: false})

  // 桥会在已经存在的实例上调用 "options" 方法
  // 更新传入的新选项并自动执行 _init() 方法
  {% endhighlight %}

实现 $.widget.bridge 所有功能的代码不足 50 行。这儿是[源代码][http://github.com/jquery/jquery-ui/blob/1.8.5/ui/jquery.ui.widget.js#L81]链接，参照并学习吧。

另，可阅读[此页][http://sandbox.nemikor.com/extensible-jquery/]上的代码，由 jQuery UI 的核心开发者 Scott Gonzales 提供，介绍了 $.widget.bridge 概念以及如何使用。

