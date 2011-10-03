---
layout: smacss
title: 状态规则
---


<h1>状态规则</h1>

<p>状态是用来增强和覆盖所有其它样式的。例如，一个可折叠区块可能处于折叠和展开状态。一个消息可能有成功和失败状态。</p>

<p>状态通常作为布局规则或基本模块类应用到同一个元素。</p>

<div class="exm">
<p class="exm-caption">状态应用到一个元素</p>
<pre><code>&lt;div id=&quot;header&quot; class=&quot;s-collapsed&quot;&gt;
&lt;form&gt;
&lt;div class=&quot;msg s-error&quot;&gt;
There is an error!
&lt;/div&gt;
&lt;label for=&quot;searchbox&quot; class=&quot;s-hidden&quot;&gt;Search&lt;/label&gt;
&lt;input type=&quot;search&quot; id=&quot;searchbox&quot;&gt;
&lt;/form&gt;
&lt;/div&gt;
</code></pre>
</div>

<p> header 元素有一个 ID 。我们可以假定此元素上的所有样式都是布局样式，类 <code>s-collapsed</code> 代表一个折叠状态。可推定，没有这个状态规则，默认是展开状态。</p>

<p><code>msg</code> 模块很简单，并应用了一个错误状态。可知相反的会应用一个成功状态。</p>

<p>最后，标签应用了一个隐藏状态以隐藏但保留给屏幕阅读器使用。这里，其实是作为基本样式，而不是覆盖布局或模块样式。</p>

<h2>提示</h2>

<p>状态应该独立作用，且通常以单独类名构成。</p>

<p>因为状态需要覆盖一个更复杂的模块规则集合， <code>!important</code> 是可以且建议使用的。(之前我说过 <code>!important</code> 是永远不需要使用的，但对于复杂系统，却经常是需要的。) 并不会有很多这样的情况，两个状态同时作用于同一个模块，或者两个状态都改变同样的样式集合，所以使用 <code>!important</code> 处理特殊的冲突应该会很少。</p>

<p>由上可知，要小心使用，只在真正需要时使用 <code>!important</code> (你将会在下面的例子中看到原因)。记住，其他规则尽量避免使用 <code>!important</code> 。只应该状态中使用。</p>

<h2>日历示例</h2>
<p>在遇到继承时，状态会增加一些复杂度。让我们来看一个实际的例子： 一个日历。</p>

<div class="exm">
<p class="exm-caption">日历表格</p>
<pre><code>&lt;table class=&quot;cal&quot;&gt;
&lt;tr&gt;
&lt;td&gt;1&lt;/td&gt;
&lt;td&gt;2&lt;/td&gt;
&lt;td&gt;3&lt;/td&gt;
&lt;td&gt;4&lt;/td&gt;
&lt;td&gt;5&lt;/td&gt;
&lt;td&gt;6&lt;/td&gt;
&lt;td&gt;7&lt;/td&gt;
&lt;/tr&gt;
&lt;!-- repeated 3-4 times --&gt;
&lt;/table&gt;
</code></pre>
</div>

<p>日历由表格的行和列组成。每一个单元是一天。默认样式是正常情况下一个天单元看上去的样式。</p>

<div class="exm">
<p class="exm-caption">天单元</p>
<pre><code>.cal td {
  background-color: #EFEFEF;
color: #333;
}
</code></pre>
</div>

<p>表格中每个单元都有一个浅灰色背景和深灰色文本。现在，我想高亮哪天是 <em>今天</em> 。</p>

<div class="exm">
<p class="exm-caption">今天样式</p>
<pre><code>.cal td.cal-today {
  background-color: #F33;
color: #000;
}
</code></pre>
</div>

<p><code>cal-today</code> 类显示 today 类是 cal 模块的一部分。我们也增加了给这个样式覆盖默认样式的特殊性。我们或者在默认状态规则样式定义后面使用 <code>td.cal-today</code> ，或者只使用 <code>.cal-today</code> 选择器，而使用 <code>!important</code> 来重排以使样式成功应用。</p>

<p>要知道其中要考虑的情形，第一个方案中，<code>.cal-today</code> 只能应用到一个表格单元元素 (<code>&lt;td&gt;</code>) 上，且应该在一个有类 <code>cal</code> 的元素内 ( 这个在使用 SMACSS 时，应该已经考虑到)。</p>

<p>回到我们的示例，看上去都还不错。现在，这个小日历和一个显示星期信息的大日历相连。我们的小日历需要显示现在的星期数。</p>

<div class="exm">
<p class="exm-caption">选中行</p>
<pre><code>&lt;tr class=&quot;s-selected&quot;&gt;
&lt;td&gt;1&lt;/td&gt;
&lt;td class=&quot;cal-today&quot;&gt;2&lt;/td&gt;
&lt;td&gt;3&lt;/td&gt;
...
&lt;/tr&gt;
</code></pre>
</div>

<p>选中状态会在这个应用中使用的很多，这里正好也用上。这个选中状态样式看上去怎么样？</p>

<div class="exm">
<p class="exm-caption">选中行规则</p>
<pre><code>.s-selected {
  background-color: #FFD700; /* Yellow */
color: #000;
}</code></pre>
</div>

<p>你能看出问题吗？文本颜色是继承了，但是背景颜色被更特殊的基本样式和今天样式覆盖了。</p>

<p>可以像上面提到的那样给状态添加 <code>!important</code>，但是它让你给同一个元素应用样式更特殊的同时，也没有多大帮助，因为它不会向下继承到表格单元上。 <code>!important</code> 不会覆盖继承样式，只是专一的。</p>

<p>也就是说我需要创建一新规则以让选中状态反应到子元素上。</p>

<div class="exm">
<p class="exm-caption">表格单元的选中行规则</p>
<pre><code>.s-selected td {
  background-color: #FFD700; /* Yellow */
color: #000;
}</code></pre>
</div>

<p>现在我们的单元格是什么颜色的？这取决于样式是定义在 <code>cal</code> 类的前面还是后面。如果是后面，那么所有单元格将仍是黄色，在这里，正是我们想要的。</p> 

<h3> !important 哪里容易出错</h3>
<p>如果我们给选中单元格添加 <code>!important</code> 规则，那么今天单元格的样式就不再显示了，它会跟其它星期的样式一样。</p>
<p>为了让今天单元格显示正确，我们要新建一个规则，将状态规则和模块规则联合起来。</p>

<h2>状态和模块联合</h2>
<p>必然的，一个状态规则不能依赖继承来应用正确的样式。正如我们在日历示例中，为表格单元格增加选中状态看到的那样。另外，我们会发现实际上需要把状态和模块样式联合到一个规则中。</p>

<p>最后必须提的一点。如果模块规则放在一起，而状态规则另外放在一起，那么这些规则在哪里联合呢？和模块一起。</p>

<p>如果你使用选择性加载 CSS ，要考虑把状态放在基本和全部样式的一部分在页面初始化时加载。特定模块的样式可能只需在相应模块出现后加载，也只在那时我们需要考虑联合规则。</p>




