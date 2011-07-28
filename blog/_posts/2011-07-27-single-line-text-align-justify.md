---
layout: blog-post
title: 单行文本两端对齐 
excerpt: 实现单行文本的两端对齐，一个还算简单的方法。
tags: [css]
---

使用 text-align:justify 只能实现多行文本的两端对齐，且不会作用于最后一行。
故对于单行文本无效。而且也不支持中文两端对齐。

使用 text-align:justify; text-justify:inter-ideograph; 也不行。

我的解决方法是：
    
{% highlight css %}
.pl { width:130px; padding:10px; }
.pl-2 { width:226px; letter-spacing:96px; margin-right:-96px; }
.pl-3 { width:170px; letter-spacing:40px; margin-right:-40px; }
.pl-4 { width:151px; letter-spacing:21px; margin-right:-21px; }
.pl-5 { width:142px; letter-spacing:12px; margin-right:-12px; }
{% endhighlight %}

其实挺简单的。

参看[单行文本两端对齐][1]

--------------------

__更新__

使用 em 单位更方便，也更准确：


{% highlight css %}
.pl { width:8em; padding:10px; }
.pl-2 { width:17em; letter-spacing:6em; margin-right:-6em; }
.pl-3 { width:10.5em; letter-spacing:2.5em; margin-right:-2.5em; }
.pl-4 { width:9.25em; letter-spacing:1.25em; margin-right:-1.25em; }
.pl-5 { width:8.75em; letter-spacing:0.75em; margin-right:-0.75em; }
{% endhighlight %}


[1]: /files/sample/single-line-text-align-justify.html "text align sample"


