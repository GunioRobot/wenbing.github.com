---
layout: blog-post
title: Javascript 变量声明提升 (Hoisting) 
excerpt: Javascript 会提升变量声明。这意味着 var 表达式和 function 声明都将会被提升到当前作用域的顶部。 
tags: [javascript]
---

翻译自：Quick Tip: JavaScript Hoisting Explained
[原文][original]

考虑下面代码：

  {% highlight javascript %}
  var myvar = 'my value';
  alert(myvar); // my value
  {% endhighlight %}

好，alert 当然会显示 'my value'。这是显然的。
不过，看好了。下面我们创建一个立即执行函数来显示同样的值。

  {% highlight javascript %}
  var  myvar = 'my value';

  (function() {
    alert(myvar); // my value
  })();
  {% endhighlight %}

好吧，好吧。我知道这还是显然的。
现在，让我们来捣点乱，并在匿名函数里创建一个同名局部变量。

  {% highlight javascript %}
  var myvar = 'my value';
  (function() {
    alert(myvar); // undefined
    var myvar = 'local value';
  })();
  {% endhighlight %}

哦？为什么 alert 现在显示 undefined ？
尽管我们声明了一个新的变量，但它是在下面声明的啊，不应该有影响的吧？错。

---------------

## 变量声明被提升

在当前作用域内，不管变量是在哪里定义的，都将会在幕后被提升到顶部。
不过，只有声明会被提升。如果变量同时进行了初始化，则被提升到顶部时初始化为 undefined 。

好的，解释下 声明 和 初始化 两个的不同。假设有下面一行代码；

__声明__

  {% highlight javascript %}
  var joe; // 声明
  {% endhighlight %}

__初始化__

  {% highlight javascript %}
  joe = 'plumber'; // 初始化
  {% endhighlight %}

现在我们明白了这些术语，可以容易地理解幕后发生了什么。
看下面一段代码：

  {% highlight javascript %}
  (function() {
    var a = 'a';
    // 几行代码
    var b = 'b';
    // 另几行代码
    var c = 'c'; // 反面模式
    // 最后几行代码
  })();
  {% endhighlight %}

注意上面的示例是不好的实践。
不过，在执行时，所有的变量声明 
-- 不管在函数作用域内什么地方发生 -- 
都将被提升到顶部，就像这样：

  {% highlight javascript %}
  (function() {
    var a, b, c; // 变量声明
    a = 'a';
    // 几行代码
    b = 'b'; // 初始化
    // 另几行代码
    c = 'c'; // 初始化
    // 最后几行代码
  })();
  {% endhighlight %}

>  l在顶部声明所有变量。

## 完工
  现在再回到开头那段让人迷惑的 undefined 代码:

  {% highlight javascript %}
    var myvar = 'my value';

    (function() {
      alert(myvar); // undefined
      var myvar = 'local value';
    })();
  {% endhighlight %}

现在为什么 myvar 显示为 undefined 则很清楚了。
我们知道，本地变量 myvar 一被声明，就自动提升到函数作用域的顶部……在 alert 的前面。
结论是，变量在 alert 时已经声明，然而，因为还未初始化，所以变量值为： undefined 。


[original]:http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-javascript-hoisting-explained/
