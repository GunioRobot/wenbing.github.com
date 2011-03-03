---
layout: blog-post
title: 跨浏览器支持的 inline-block 样式
excerpt: 
---

Inline-block 布局可以解决很多问题。比如是的 vertical-align 正常工作。但浏览器对它的支持不是很好。

Firefox 3之前版本 并不支持 inline-block ，但是有 -moz-inline-stack 值，很 inline-block 功能一样。所以可以这样写：
>  `display: -moz-inline-stack;`  
>  `display: inline-block;`
只要将 inline-block 置于-moz-inline-stack 之后，Moz（Firefox 3之后） 将会使用正确的那个。

IE 支持 inline-block, 但是只能对那写原生为 inline 的元素。所以如果你想要使用 inline-block ，则只能对有限的几个，span, strong 以及 em。不过可以对一个 block 元素激活 hasLayout 后，再设置为 display:inline，就会变成 inline-block 的了。使用 *property 方式，就可以只针对 IE 执行了。

下面就是最终的代码了：
>  `display: -moz-inline-stack;`  
>  `display: inline-block;`  
>  `zoom: 1;`  
>  `*display: inline;`

详细请参见[原文][origin]

[origin]:http://foohack.com/2007/11/cross-browser-support-for-inline-block-styling/
