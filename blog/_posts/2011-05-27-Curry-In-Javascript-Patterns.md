---
layout: blog-post
title: 套用 -- Javascript 函数模式
excerpt: 讨论 currying （套用） 和部分函数应用。
tags: [javascript pattern curry]
---

__Function Application （函数应用）__

在一些纯函数式编程语言中，一个函数并不是被描述为 called （调用） 或是 invoked （请求），
而是 applied （应用）。在 Javascript 中也一样——能够使用 Function.prototype.apply() 方法应用一个函数，
因为 Javascript 中函数实际上是对象，可以有方法。

函数应用示例：

    {% highlight javascript %}
    // 定义函数
    var sayHi = function(who) {
      return "Hello" + (who ? ", " + who : "") + "!";
    };
    // 请求函数
    sayHi(); // "Hello"
    sayHi('world'); // "Hello, world！"
    // 应用函数
    sayHi.apply(null, ["hello"]); // "Hello, hello!"
    {% endhighlight %}

可以看见，请求一个函数和应用一个函数结果相同。
apply() 有两个参数：第一个是在函数内绑定为 this 的对象，
第二个是一个数组或参数（类数组），在函数内即类似数组的参数对象。
如果第一个参数是 null （空），this 则为全局对象，跟 call （调用）一个非对象方法的函数一样。

而函数作为一个对象方法执行时，没有传入 null，这时这个对象就成为 apply() 的第一个参数:

    {% highlight javascript %}
    var alien = {
      sayHi: function(who) {
        return "Hello" + (who ? ", " + who : "") + "!";
      }
    };

    alien.sayHi('world'); // "Hello, world!"
    sayHi.apply(alien, ["humans"]); // "Hello, humans!"
    {% endhighlight %}

这段例子里，sayHi() 函数方法内 this 指向 alien 。而上个例子里，this 指向全局对象。

由是可以看出，我们所知的调用一个函数只是语法糖，等价于一个函数应用。

注意，除了 apply() 外，Function.prototype 对象还有一个 call() 方法，不过也是 apply() 的一个语法糖。
有些时候使用它更好：当你的函数只有一个参数时，可以省去创建数组步骤：

    {% highlight javascript %}
    // the second is more efficient, saves an array
    sayHi.apply(alien, ["humans"]); // "Hello, humans!"
    sayHi.call(alien, "humans"); // "Hello, humans!"
    {% endhighlight %}

__Partial Application （部分应用）__

现在我们知道调用一个函数实际上就是对一个函数应用一个参数集合，
是否可能只传入部分参数，而不是全部呢？
这很像常见的数学运算，如果你手工计算数学函数的话。

假如你有一个两个数（x 和 y）的加法函数。下面的示例是一般的解决方式（x 为 5， y 为 4）：

    {% highlight javascript %}
    // 纯属演示，不是合法的 Javascript
    // 函数如下
    function add(x, y) {
      return x+y;
    }
    // 传入参数
    add(5, 4);
    // 第一步——替换一个参数
    function add(5, y) {
      return 5+y;
    }
    // 第二步——替换另一个参数
    function add(5, 4) {
      return 5+4;
    }
    {% endhighlight %}

这里的第一步和第二步并不是有效的 Javascript 代码，但可能是你手动计算时的方法。
取得第一个参数的值并替换所有的未知数 x，然后重复直至参数全部替换。

上例的 *第一步* 可以称为部分应用：我们只应用了第一个参数。
当你使用部分应用时，并不会立即得到结果，而是获得另一个函数。

下面的示例演示了一个虚拟的 partialApply() 方法的使用：

    {% highlight javascript %}
    var add = function(x, y) {
      return x+y;
    }
    // 完整应用
    add.apply(null, [5,4]); // 9
    // 部分应用
    var newadd = add.partialApply(null, [5]);
    // 应用参数到新函数
    newadd.apply(null, [4]); // 9
    {% endhighlight %}

如上，部分应用返回另一个函数，可以使用其他的参数调用。
跟 add(5)(4) 一样，因为 add(5) 返回的函数能通过 (4) 调用。
同样，可以认为， add(5,4) 就像是 add(5)(4) 的语法糖。

好，回到正题：没有 partialApply() 方法， Javascript 默认没有相似的实现。
不过可以自己制造它，因为 Javascript 足够灵活。

制造理解并处理部分应用的函数的过程就叫 currying （套用）。

__Currying （套用）__

注：此处省略一些 Curry 的背景介绍。

Javascript 中我们可以修改 add() 函数来实现能处理部分应用的增强版。

看一个例子：

    {% highlight javascript %}
    // 一个可套用的 add()
    // 可接受部分参数
    function add(x, y) {
      var oldx = x, oldy = y;
      if(typeof oldy === 'undefined') { // 部分参数
        return function(newy) {
          return oldx+newy;
        };
      }
      // 完整参数
      return x+y;
    }

    // 测试
    typeof add(5); // "function" （函数）
    add(3)(4); // 7

    // 创建并保存一个新函数
    var add2000 = add(2000);
    add2000(10); // 2010
    {% endhighlight %}

上例中，第一次调用 add() 时，会创建并返回一个内部函数的闭包。
闭包中将原始的 x 和 y 保存为私有变量 oldx 和 oldy 。oldx 将用于内部函数执行。
如果不是部分函数应用，x 和 y 都传入时，函数就直接将他们相加。
为了演示清楚，这里的 add() 实现得有些繁琐。
下面看一个简单的版本，没有 oldx 和 oldy ，因为闭包的特性，原始的 x 是直接可用的，
我们也可以复用 y ，作为一个闭包函数的参数，而不必像上例那样新创建一个变量 newy ：

    {% highlight javascript %}
    // 一个可套用的 add()
    // 可接受部分参数
    function add(x, y) {
      if(typeof y === 'undefined') { // partial
        return function(y) {
          return x+y;
        };
      }
      // 完全应用
      return x+y;
    }
    {% endhighlight %}

在上面这些例子中，函数 add() 自己实现部分应用。
那么我们可以有一个通用的形式来实现吗？
也就是说，我们可以将任一函数转为一个能够接受部分参数的新函数吗？
下面的例子就是这样一个函数的演示，这里我称之为 schonfinkelize() 。

这就是通用的套用函数：

    {% highlight javascript %}
    function schonfinkelize(fn) {
      var slice = Array.prototype.slice,
          stored_args = slice.call(arguments, 1);
      return function() {
        var new_args = slice.call(arguments),
            args = stored_args.concat(new_args);
        return fn.apply(null, args);
      };
    }
    {% endhighlight %}

由于在 Javascript 中， arguments 不是一个真正的数组，schonfinkelize() 函数要写得稍微复杂一点。
用 Array.prototype 中的 slice() 方法帮我们将 arguments 转为一个数组，从而方便处理。
当 schonfinkelize() 第一次调用时，它保存了一个私有的 slice() 方法的引用（ 即 slice），
也保存了传入的参数（ 即 stored_args ），去除第一个参数，因为我们它是要套用的函数。
新函数创建后，由于闭包，它可以访问已经保存的参数 stored_args 和 slice 引用。
新函数只要将老参数和新参数合并，然后应用到原始的函数 fn （闭包可见）。

下面我们来测试一下这个生产套用函数的通用方式：

    {% highlight javascript %}
    // 一个普通函数
    function add(x, y) {
      return x+y;
    }

    // 套用一个函数并获得新函数
    var newadd = schonfinkelize(add, 5);
    newadd(4); // 9

    // 也可以直接调用新函数
    schonfinkelize(add, 6)(7); // 13
    {% endhighlight %}

这个转换函数 schonfinkelize() 并不限制参数个数和套用层级。
这里是更多示例：

    {% highlight javascript %}
    // 一个普通函数
    function add(a, b, c, d, e) {
      return a+b+c+d+e;
    }

    // 参数个数可以任意
    schonfinkelize(add, 1, 2, 3)(5, 5); // 16

    // 双重套用
    var addOne = schonfinkelize(add, 1);
    addOne(10, 10, 10, 10); // 41
    var addSix = schonfinkelize(addOne, 2, 3);
    addSix(5, 5); // 16
    {% endhighlight %}

__When to Use Currying （何时使用套用）__

当你发现调用一个函数时几乎都会传入一个相同的参数时，那么对这个函数实现套用会很好。
通过套用，你可以通过传入部分参数动态地创建一个新函数。
这个新函数将会保存这些重复的参数（你就不用每次都传入它们），并在执行时补全原始函数需要的所有参数。



