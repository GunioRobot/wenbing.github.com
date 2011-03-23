---
layout: blog-post
title: PHP 中使用 Javascript 式对象字面量
excerpt: （译自 JavaScript-style object literals in PHP ）Javascript 中对象字面量使用很方便，这篇文章则在 PHP 中使用类似的写法。
tags: [php, javascript]
---

Javascript 中对象字面量标记如下：

    {% highlight javascript %}
    var fido = {name: "Fido", barks:true};
    {% endhighlight %}

或者这样：

    {% highlight javascript %}
    var fido = {};  
    fido.name = "Fido";  
    fido.barks = true;
    {% endhighlight %}

## 将关联数组转为对象

PHP 中，如下是一个关联数组。

    {% highlight php %}
    <?php
    $fido = array(  
      'name' => 'Fido',  
      'barks' => true  
    );
    {% endhighlight %}

将它转为对象很简单：

    {% highlight php %}
    <?php
    $fido = (object)$fido;  
    echo gettype($fido); // "object"
    {% endhighlight %}

也可以从一个空的对象开始：

    {% highlight php %}
    <?php
    $fido = (object) array();
    {% endhighlight %}

或

    {% highlight php %}
    <?php
    $fido = new stdClass();
    {% endhighlight %}

然后

    {% highlight php %}
    <?php
    $fido->name = 'Fido';  
    $fido->barks = true;
    {% endhighlight %}

稍做解释：Javascript 中对象是哈希、是映射，或是无论其他什么名称。 PHP 中的对象则是后来添加的，而且并不比 “fancy arrays” 强大很多。Fancy associative arrays (哈希、映射、无论什么)。

PHP 中对象需要 class 生成，不过 new stdClass() 让你不需要 class 就能快速获得一个空对象，跟使用 (object) 将一个数组转为对象一样。

至此，一切都相当不错。那么，方法该怎么写呢？

## 方法？

Javascript 并不关心属性和方法。他们都是对象的成员（就像关联数组的成员一样）。只有当一个成员是函数的时候，才是可调用的。

    {% highlight javascript %}
    fido.say = function() {
      if(this.barks) {
        return 'Woof!';
      }
    };
    fido.say(); // 'Woof!'
    {% endhighlight %}

话说回来，PHP 自 5.3 起也有闭包了。所以你可以这样写：

    {% highlight php %}
    <?php
    $fido->say = function() {
      if($this->barks) {
        return 'Woof!';
      }
    };
    {% endhighlight %}

不同的是 $fido->say() 并不能执行。有两个原因：

  1.  say 不是一个方法，而是一个属性。 PHP 关心这个。
  不过你可以将此属性赋值给一个变量 $callme，现在这个变量是一个闭包对象。
  可以这样调用它：

    {% highlight php %}
    <?php
    $callme = $fido->say;
    echo $callme();
    {% endhighlight %}

  注意 $callme() 的那个 $。

  2.  上面的调用还是会失败，因为 $this 并不指向 $fido 对象。不过你可以用 $self ，并指向全局变量 $fido。

看上去有点。。。不好看，不过能运行。

    {% highlight php %}
    <?php
    $fido = (object)array();
    $fido->name = 'Fido';
    $fido->barks = true;

    $fido->say = function() {
      $self = $GLOBALS['fido'];
      if($self->barks) {
        return 'Woof!';
      }
    }

    $callme = $fido->say;
    $callme(); // 'Woof!'
    {% endhighlight %}

## 来点魔法点缀

我们能用一点点 PHP 魔法来让这些变得漂亮点。
PHP 有一些魔术函数，其中有个 \__call() 函数。
如果你在一个类中实现它，则调用不存在的方法时就会执行它。

我们的例子中 $fido->say 并不是一个方法。
所以 \__call 能够截住 $fido->say() 的执行并将 $fido->say 作为闭包对象进行调用。
闭包对象是可调用的，且与 call_user_func() 和 call_user_func_array() 完美搭配。
所以所需全部工作如下：

    {% highlight php %}
    <?php
    $fido = new JSObject();
    $fido->name = 'Fido';
    $fido->barks = true;

    $fido->say = function($self) {
      if($self->barks) {
        return 'Woof!';
      }
    };

    echo $fido->say();
    {% endhighlight %}

如你所见，非常的 Javascript 风格。
除了 $this 变成 $self 并且要作为每个方法的第一个参数传递进去。
实现的秘密都在 JSObject() 类之中。

    {% highlight php %}
    <?php
    class JSObject {
      function __call($name, $args) {
        if(is_callable($this->$name)) {
          array_unshift($args, $this);
          return call_user_func_array($this->$name, $args)
        }
      }
    }
    {% endhighlight %}

完美且简单。也即：
1.  \__call 截住未找到的方法及其所有参数。
2.  l检查有没有同名的可调用的属性（一个闭包对象属性）。
3.  l添加 $this 到参数列表，并执行闭包对象。

大功告成！现在你可以享受近乎不需要类的 JS 风格的 PHP 对象了。
（注：$this->$name 没有写错，不是 $this->name，而是一个动态属性名。）

## 最后一件事情

如果我们给 JSObject 添加一个构造函数，则它可以在创建时接受任何属性。
这样更像 Javascript —— 创建一个‘空’对象，之后再添加属性，
或者创建的同时添加属性。

可以这样修改：

    {% highlight php %}
    <?php
    class JSObject {
      function __construct($members=array()) {
        foreach($members as $name=>$value) {
          $this->$name = $value;
        }
      }
      function __call() {
        if(is_callable($this->$name)) {
          array_unshift($args, $this);
          return call_user_func_array($this->$name, $args)
        }
      }
    }
    {% endhighlight %}

使用示例如下：

    {% highlight php %}
    <?php
    $fido = new JSObject(array(
      'name'=>'Fido',
      'barks'=>true,
      'say'=>function($self) {
        if($self->barks) {
          return 'Woof!';
        }
      }
    ));

    echo $fido->say(); // 'Woof!'
    {% endhighlight %}

这已经很接近 Javascript 中的对象
（添加了 $ 和 ' 的，尽管我们不需要它们也可以）了，
只是改了一点点东西，-> 改为 .和 => 改为 : 

    {% highlight javascript %}
    $fido = {
      'name' : 'Fido',
      'barks' : true,
      'say': function() {
        if(this.barks) {
          return 'Woof';
        }
      }
    };
    
    $fido.say(); // Woof
    {% endhighlight %}

现在 JS 和 PHP 就像双胞胎！

[原文][origin]

[origin]:http://www.phpied.com/javascript-style-object-literals-in-php/
