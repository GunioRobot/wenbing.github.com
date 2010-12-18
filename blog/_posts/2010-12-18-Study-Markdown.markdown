---
layout: blog-post
title: 学习 Markdown 语法
excerpt: Follow wiki page http://en.wikipedia.org/wiki/Markdown, Study Markdown Syntax, Ready to write blog on this blog system -- pages powered by github.
---

简单的了解了 [Markdown][markdown] 的语法，有几个地方写得不对，等以后写文章时用到再尝试吧！

__Paragraphs（段落）__  
This is paragraph. It has two sentences.  
This is another paragraph. It also has two sentences.  

__Line return（换行）__  
Line breaks inserted in the text are removed from the final result: the web browser is in charge of breaking the lines depending of the available space. To force a line break, insert two spaces at the end of the line.

__Emphasized text（着重词语）__  
>    `*emphasis* or _emphasis_ (more common)`  
>    `**strong emphasis** (more common) or __strong emphasis__`   

__Code（代码）__  
To include code (formatted in monospace font), you can either:  
>    `code here`  
>    one line of code  
>    two line of code  

__Lists（列表）__  
* test list item
* another test list item
>    * An item in a bulleted (unordered) list  
>    * Another item in a bulleted list  
>    1. An item  
>    2. another item

__Headings（标题）__  
>    # Fist-Level heading  
>    #### Fourth-level heading  
The first two heading levels also have a alternate syntax:  
>    First-level heading  
>    ===============  
>    `Second-level heading`  
>    `-----------------------------`

__Blockquotes（引用）__  
>    > This text will be enclosed in an HTML blockquote element.  
>    > Blockquote elements are reflowable. You may arbitrarily  
>    > wrap the text to your liking, and it will all be parsed  

__Links（链接）__  
Links may be included inline:  
>`[link test here](link.address.here "link title here")`
Alternatively, links can be placed in footnotes outside of the paragraph, being referenced with some sort of reference tag. For example, including the following inline:  
>`[link text here][linkref]`
would produce a link if the following showed up outside of the paragraph (or at the end of the document):  
>`[linkref]: link.address.here "link title here"`
   test link  
   [Google][Google]  

__Images（图片）__  
Referring to images is similar to including links. The syntax requires an exclamation point to indicate the link refers to an image.  
The image address may be included inline, as with links:  
>`![Alt text here](Image URL here "Image title here")`
It may also be referred to via a reference:  
>`![Alt text here][imageref]`
Here, imageref refers to information somewhere after the image:  
>`[imageref]: image.url.here "Image title here"`
test image:  
![春-夜-月-樱](/files/images/chyyy.jpg "春-夜-月-樱")
test image link  
[![春-夜-月-樱][chyyy]][Google]


__Horizontal rules__  
Horizontal rules are created by placing three or more hyphens, asterisks, or underscores on a line by themselves. You may use spaces between the hyphens or asterisks. Each of the following lines will produce a horizontal rule:  
>`* * *`  
>`***`  
>`*****`  
>`- - -`  
>`---------------------------------------`  
* * *
***
*****
- - -
---------------------------------------

You can visit [Markdown Syntax][markdown-syntax] for more about Markdown Syntax.

[Google]: http://www.google.com/ncr "Google"
[chyyy]: /files/images/chyyy.jpg  "春-夜-月-樱"
[markdown]: http://daringfireball.net/projects/markdown "Markdown"
[markdown-syntax]: http://daringfireball.net/projects/markdown/syntax "Markdown Syntax"
