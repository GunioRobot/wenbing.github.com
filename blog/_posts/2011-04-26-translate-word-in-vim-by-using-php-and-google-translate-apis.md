---
layout: blog-post
title: 利用 php 调用 google translate api 实现 vim 中单词翻译
excerpt: 简单地基本功能，可查当前光标所在位置单词的 google 翻译。
tags: [php, googleapis, vim]
---

翻译使用的 php 功能函数是简单参照 google translate api 中的 php 相关文档写的。

就是利用 curl 获取 google translate api 的响应数据，通过 json 解析即可。

给代码文件可执行权限，则在 shell 中亦可执行。

使用 vim 中的 map，将 gt 映射到执行一段语句，语句中传入当前光标处的单词，
php 脚本执行后返回翻译后文本，直接显示在屏幕上。

映射代码如下：

  {% highlight c %}
  map gt :exe ":!/path/to/gtranslate.php ".expand("<cword>")<CR>
  {% endhighlight %}

现在这样也会有问题，当 php 文件执行时间过长时，屏幕会一直等待。

可以找找解决方法。

php 代码可看 [这里][source]。

网上搜索也有 vim 与 google translate 相关的插件，是用 ruby 写的，没有试过。

[source]:/files/downloads/2011/gtranslate.php.txt
