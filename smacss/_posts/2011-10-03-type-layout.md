---
layout: smacss
title: 布局规则
---


<h1>布局规则 </h1>

<p>CSS 本质上是用来在页面上布置元素的。然而，页面布局上的主次部分是有区别的。次要部分有提示框、登录表单，主要部分有导航项--头部和尾部。 我将次要部分作为模块，并在下一节深入介绍。这里将主要部分作为布局样式。</p>

<p>布局样式也能以重用来分为主样式和次样式。主样式例如头部和尾部通常使用 ID 选择器，尽管类选择器也同样可以。不需在布局样式中使用元素选择器。</p>


<div class="exm">
<p class="exm-caption">布局定义 </p>
<pre><code>#header, #article, #footer {
width: 960px;
margin: auto;
}

#article {
border: solid #CCC;
        border-width: 1px 0 0;
}
</code></pre>
</div>

<p>有些站点可能需要一个更全面的布局框架（例如，<a href="http://960.gs/">960.gs</a>）。次要部分布局样式会使用类名代替 ID ，以在页面上能多次使用。</p>


<p>通常，一个布局样式只有一个选择器：一个 ID 或 类名。不过有些时候一个布局需要考虑多种情况。例如，你可能会基于用户偏好采取不同的布局。这个布局也应该作为布局样式来声明并和其它布局样式合并使用。</p>


<div class="exm">
<p class="exm-caption">使用更高层级的布局样式实现其它样式偏好 </p>
<pre><code>#article {
float: left;
}

#sidebar {
float: right;
}

.l-flipped #article {
float: right;
}

.l-flipped #sidebar {
float: left;
}
</code></pre>
</div>

<p>在布局示例中，.l-flipped 类名应用到一个更高层级元素如 body 元素上，从而允许文章和边栏内容交换，把边栏从右边移到左边，文章则相反。</p>

<div class="exm">
<p class="exm-caption">同时使用两种布局样式，从流式布局到固定布局。</p>
<pre><code>#article {
width: 80%;
float: left;
}

#sidebar {
width: 20%;
float: right;
}

.l-fixed #article {
width: 600px;
}

.l-fixed #sidebar {
width: 200px;
}
</code></pre>
</div>

<p>上例中， <code>.l-fixed</code> 类将设计方案由流式布局(使用百分比)改为固定布局(使用像素值)。</p>

<p>上例中另一个要注意的是我使用的命名惯例。声明使用的 ID 选择器是精确的，并没有特定的命名空间。然而，类基选择器使用了一个 <code>l-</code> 前缀。以此方便识别这些样式的目的，并将它们区别于模块和状态。布局样式是唯一使用 ID 选择器的主分类，如果你选择使用它们的话。如果希望在 ID 选择器上使用命名空间，也可以，不过那是没有必要的。</p>

<h4>使用 ID 选择器 </h4>
<p>为了清楚，在 HTML 中使用 ID 选择器是好的，有时候是必需的。例如，有个能用的 Javascript 钩子时。不过对于 CSS ，ID 选择器不是必需的，因为 ID 和 类选择器的几乎没有性能区别，而又因为增加了专一性而是样式更复杂了。</p>

<h4>布局示例 </h4>
<p>理论是一方面，应用又是另一种情况。让我们看看一个实际的站点并考虑一下哪些是布局而哪些是模块。</p>
<div class="exm">
<img src="/smacss/img/lyt-cnn0.png" alt="使用 CNN.com 作为例子。">
</div>

<p>看 CNN 网站，上面有很多出现在其他网站上的模式。例如，有头部、导航条，内容区域和尾部(截图中看不见)。</p>

<div class="exm">
<img src="/smacss/img/lyt-cnn1.png" alt="将页面分为头部、主导航和三个主要内容区域。">
</div>

<p>写这篇文章的时候，这个站点很接近这个划分，下面是主要部分的 ID 属性。</p>

<div class="exm">
<p class="exm-caption">我们的 CSS 结构可能是这样： </p>
<pre><code>#header { &hellip; }
#primarynav { &hellip; }
#maincontent { &hellip; }

&lt;div id=&quot;header&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;primarynav&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;maincontent&quot;&gt;&lt;/div&gt;

</code></pre>
</div>

<p>好，很直观，你可能在想，“就这样吗？你就让我看些？！” 让我们看看页面上另一部分。</p>

<div class="exm">
<img src="/smacss/img/lyt-cnn-ft0.png" alt="CNN.com 主页上特色区块"> 
</div>

<p>看看特色区块，我们看到一个新闻条目的格子。CNN 现在的标记是一个 <code>div</code> 容器下一系列 <code>div</code> 。我可能会用无序列表，让我们用它来实现。</p>

<div class="exm">
<p class="exm-caption">特色区块布局的 HTML 代码示例 </p>
<pre><code>&lt;div&gt;
&lt;h2&gt;Featured&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;&lt;a href=&quot;&hellip;&quot;&gt;&hellip;&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;&lt;a href=&quot;&hellip;&quot;&gt;&hellip;&lt;/a&gt;&lt;/li&gt;
&hellip;
&lt;/ul&gt;
&lt;/div&gt;
</code></pre>
</div>
<p>不考虑 SMACSS 来实现这个，我们可能会倾向于添加一个 ID "featured" 到外面的 DIV，之后再给内容添加样式。</p>

<div class="exm">
<p class="exm-caption">一个特色条目列表样式的可能实现</p>
<pre><code>div#featured ul { 
margin: 0;
padding: 0;
         list-style-type: none;
}

div#featured li {
float: left;
height: 100px;
        margin-left: 10px;
}
</code></pre>
</div>

<p>这是我们实现此方案的一些假定：</p>
<ol>
<li>这个页面上只有一个特色区块。</li>
<li>列表项目是向左浮动的</li>
<li>列表项目高度为 100 像素</li>
</ol>

<p>这些也许是合理的假设。这是一个小网站对于这个结构的原始样本：它不大可能改变且不大可能变得比它现在更复杂。<em>或许，</em> 样式更易变的更大的站点只是会有更多的可能性，去重构页面组件和重新编排相应的样式。</p>

<p>再回头看看示代码，很明显需要做一些优化。ID 选择器不需要由标签选择器限定，而且，因为列表是 <code>div</code> 的直接后代，子选择器可以派上用场。</p>
<p>让我们看看能带来更好适应性的重新编排。</p>

<p>以布局视角看，我们需要关心的只是每个元素是如何联系的。我们不用关心模块自己的设计，也不用担心布局的上下文，必须的。</p>

<div class="exm">
<p class="exm-caption">应用到 有序列表或无序列表的栅格模块</p>
<pre><code>.l-grid {
margin: 0;
padding: 0;
         list-style-type: none;
}

.l-grid &gt; li {
display: inline-block;
margin: 0 0 10px 10px; 

        /* 模拟行内块 的 IE7 骇客 */
        *display: inline;
        *zoom: 1;
}
</code></pre>
</div>

<p>我们解决了哪些问题和我们引进了哪些问题？(极少有 <code>哪个</code> 解决方案能 100% 解决问题。)</p>
<ol>
<li>栅格布局现在可以应用到任意容器来创建一个浮动样式的布局</li>
<li>我们降低了一层适用性的深度</li>
<li>我们减少了选择器的专一性</li>
<li>高度要求被移除。每行高度将为最高条目的行高。</li>
</ol>

<p>反过来看，我们做了哪些不好的事情？</p>

<ol>
<li>使用子选择器， IE6 将不再支持。(可以通过避免使用子选择器绕过。)</li>
<li>增加了 CSS 大小和复杂度。</li>
</ol>

<p>大小的增加是无可争论的，不过是表面上的。现在我们有了这个可重用的模块，能应用到站点的任意地方，而没有代码重复。复杂度的增加也是表面上的。我们确实在过时的浏览器上做了一些工作，并使用了让一些人皱眉的 hacks 。然而，选择器更简单了。</p>
