---
layout: blog-post
title: Subversion 中忽略文件和目录
excerpt: 如果你使用 Subversion(svn) 等版本控制系统，那么一定会遇到提交时那些测试文件也出现的问题。其实让 Subversion 忽略这些目录和文件是很简单的。
tags: [svn]
---

本文翻译自：[原文][origin]

如果你使用 Subversion(svn) 等版本控制系统，那么一定会遇到提交时那些测试文件也出现的问题。其实让 Subversion 忽略这些目录和文件是很简单的。

可以如下编辑 svn:ignore 属性：
>    svn propedit svn:ignore ./some_path

当你运行上面的命令时，svn 会打开文本编辑器，你可以在其中定义忽略的类型和特定文件。如果你输入 * ，它会忽略你制定的 ./some_path 目录中所有文件
>    \*

svn:ignore 属性好像只支持 * 通配符。不知吃正则表达式或其他玩意。

但 * 通配符已经足够强大，因为你可以这样做：
>    *.class  
>    test_*

上面的命令会忽略所有以 .class 结尾和以 test_ 开头的文件。

我发现在Web 应用程序开发中，忽略那些包含上传图片或者文件的文件夹是很便捷的。

[origin]:http://www.petefreitag.com/item/662.cfm
