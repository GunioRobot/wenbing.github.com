---
layout: blog-post
title: jQuery 技巧
excerpt: 
tags: [jquery]
---

1. l保持更新

2. l了解选择器 
    * l各个选择器是不一样的
    * l从快到慢依次是
       1. ID 选择器 ("#AnElementWithID")
       2. 元素 选择器 ("form", "input", etc.)
       3. Class 选择器 (".someClass")
       4. 伪类 和 属性 选择器 (":visible, :hidden" etc.)
    * ID 和 元素 选择器是最快的，因为直接使用了 DOM 的原生操作。

3. l缓存 = 胜利
  * l每次 $('.whatever') 操作都将重新执行 DOM 搜索并返回新的集合
  * $('.parent').find('.child') 不好! - 使用缓存! (像这样： parents.find('.child'))
  * l执行var whatever = $('whatever'), 之后，可以执行 whatever.show()/hide/...

4. l链
  * l几乎所有 jQuery 方法都返回 jQuery 对象并且支持 链式操作
  * l当你执行完一个方法后，可以继续执行其他方法！
  * l更少的代码，更简单以及更快！

5. l事件委托
  * l理解 .bind(), .live(), 和 .delegate() - 你真的知道它们的不同吗?
  * l委托 让你可以附加事件处理到一个通用的父元素上，而不是分散在每个子元素上
  * l同时新的 DOM 节点也得以实现
  * l在需要像很多元素绑定同一个事件处理时使用

6. DOM 不是数据库！
  * jQuery 让你可以这样操作它，但它不是
  * l每次 DOM 插入都消耗很大
  * l将html存入字符串，并尽可能晚的 append() 操作，来减少 DOM 操作
  * l在交互操作时先使用 detach()， 然后重新插入

7. l避免循环。嵌套的 DOM 选择器效率更高

8. l保持代码简洁

<!--
1. Stay up to date!

2. Know your selectors
    * All selectors are NOT created equally
    * Fastest to slowest selectors are
       1. The ID Selectors ("#AnElementWithID")
       2. Element selectors ("form", "input", etc.)
       3. Class selectors (".someClass")
       4. Pseudo & Attribute selectors (":visible, :hidden" etc.)
    * ID and element are fastest as backed by native DOM operations.

3. Caching = Win
  * Each $('.whatever') will re-run your search of the DOM and return a new collection
  * Bad! - use caching! (ie. parents.find('.child'))
  * You can then do whatever.show()/hide/staff to your heart's content

4. Chaining
  * Almost all jQuery methods return a jQuery Object and support chaining
  * After you've run a method on your selection, you can continue runninig more!
  * Less code, easier to write and it runs faster!

5. Event Delegation
  * Understand .bind(), .live(), and .delegate() - do you REALLY know the differences?
  * Delegates let you attach an event handler to a common parent of your elements rather than a discrete one to each of them
  * Also fires for NEW DOM nodes too
  * Use when binding same handler to multiple elements

6. The DOM isn't a Database!
  * jQuery lets you treat it like one, but that doesn't make it so
  * Every DOM insertion is costly
  * Minimize by building HTML strings and using single a single append() as late as possible
  * Use detach() if doing have interation with a node then re-insert it when done

7. Avoid Loops. Nested DOM Selectors can perform better

8. Keep your code DRY

jsPref.com
Benchmark.js
-->
