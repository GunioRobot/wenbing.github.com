---
layout: smacss
title: 基本规则
---


<h1>模块</h1>

<p>上一章曾简单的提到，一个模块是页面上一个比较松散的组件。就是导航栏、幻灯片、弹出对话框和小工具等等。是页面的主要部分。模块位于布局组件中。模块有时也嵌于另一个模块中。每个模块都应该设计为作为独立组件存在。这样，页面更具可扩展性。如果做得好，模块能很轻松的在不同部分移动而不破坏页面。</p>


<p>为模块定义规则集合时，避免使用 ID 和 元素选择器，应只使用类选择器。一个模块可能包含一些元素，并要求使用后代或子选择器来定位这些元素。</p>

<div class="exm">
<p class="exm-caption">模块示例</p>
<pre><code>.module > h2 {
padding: 5px;
}

.module span {
padding: 5px;
}</code></pre>
</div>

<h2>避免元素选择器</h2>

<p>如果元素选择器是可预期的，则可将元素选择器和子或后代选择器一起使用。如果一个 span 元素是可预期被使用的，且在此模块中都相同，那么用 <code>.module span</code> 更好。</p>

<div class="exm">
<p class="exm-caption">使用一般元素样式样</p>
<pre><code>&lt;div class=&quot;fld&quot;&gt;
&lt;span&gt;Folder Name&lt;/span&gt;
&lt;/div&gt;

/* The Folder Module */
.fld > span {
  padding-left: 20px;
background: url(icon.png);
}
</code></pre>
</div>

<p>问题是随着项目复杂度的增长，你可能需要扩展一个组件的功能性，那么在规则中使用一般元素将会有更多限制。</p>


<div class="exm">
<p class="exm-caption">使用一般元素式样</p>
<pre><code>&lt;div class=&quot;fld&quot;&gt;
&lt;span&gt;Folder Name&lt;/span&gt; 
&lt;span&gt;(32 items)&lt;/span&gt;
&lt;/div&gt;
</code></pre>
</div>

<p>现在我们进入困境。我们不需要图标出现在文件夹模块的每个元素上。那么来看下面一点：</p>

<p><em>只包含一个有语义的选择器。</em> 一个 span 或 div 没有语义。而标题元素有语义。一个定义在元素上的类有很多语义。</p>

<div class="exm">
<p class="exm-caption">使用一般元素式样</p>
<pre><code>&lt;div class=&quot;fld&quot;&gt;
&lt;span class="fld-name"&gt;Folder Name&lt;/span&gt; 
&lt;span class="fld-items"&gt;(32 items)&lt;/span&gt;
&lt;/div&gt;
</code></pre>
</div>

<p>通过添加类到元素上，我们增加了这些元素的语义并移除了应用样式时的任何不确定性。</p>

<p>如果你要使用元素选择器，它应该在类选择器的一个层级下。也就是说，你应该使用子选择器。非此即彼，你应该很清楚那个元素将不会和其它元素混淆。语义上更通用的 HTML 元素(如一个 span 和 div )，更可能在路上制造混乱。有更好语义的元素，如标题元素，更有可能以其自身出现在容器里，你也更可能正确的使用它。</p>


<h2>新的上下文</h2>
<p>使用模块策略还使我们更好的理解哪里发生上下文变化。举例，一个新位置上下文的需要，一般发生在布局层次或模块的跟元素上。</p>

<h2>子类模块</h2>

<p>当我们在不同区块有相同模块时，第一直觉是使用父元素来区分那个模块。</p>


<div class="exm">
<p class="exm-caption">子类</p>
<pre><code>.pod { 
width: 100%; 
}
.pod input[type=text] { 
width: 50%; 
}
#sidebar .pod input[type=text] { 
width: 100%; 
}
</code></pre>
</div>

<p>使用这个策略的问题是会陷入需要添加更多选择器来战斗，或直接使用 <code>!important</code> 回退的特定问题。</p>

<p>扩展我们的 pod 示例，现在有两个不同宽度的输入框。整个站点上，输入框旁边都有一个标签，所以输入区域应该只有一半宽度。而在侧边栏输入区域就太小了，所以我们将其宽度设为 100% 并调整标签到它上面。看上去都很好。现在，我们需要给页面添加一个新的组件，它使用了和 <code>.pod</code> 相同的样式，所以我们重用此类。然而，这个 pod 很特别，它在页面任意位置都使用限定的宽度，为 180px 。虽然这是一个很小的不同。</p>


<div class="exm">
<p class="exm-caption">与特殊性战斗</p>
<pre><code>.pod { 
width: 100%; 
} 
.pod input[type=text] { 
width: 50%; 
}
#sidebar .pod input[type=text] { 
width: 100%; 
}

.pod-callout { 
width: 200px; 
}
#sidebar .pod-callout input[type=text],
.pod-callout input[type=text] { 
width: 180px; 
}
</code></pre>
</div>

<p>我们使用加倍的选择器使其覆盖特殊的 <code>#sidebar</code> 。</p>

<p>我们应该这样做，让侧边栏的限定样式布局成为 pod 的子类并相应的应用样式。</p>

<div class="exm">
<p class="exm-caption">与特殊性战斗</p>
<pre><code>.pod { 
width: 100%; 
} 
.pod input[type=text] { 
width: 50%; 
}
.pod-constrained input[type=text] { 
width: 100%; 
}

.pod-callout { 
width: 200px; 
}
.pod-callout input[type=text] { 
width: 180px; 
}
</code></pre>
</div>

<p>尽量避免基予位置条件的样式。如果要改变页面或站点上某个模块的外观，以子类替代这个模块。</p>

<p>为了与特殊性战斗( 不考虑 IE6 )，可以像下面示例中使用双重类名。</p>
<div class="exm">
<p class="exm-caption">子类</p>
<pre><code>.pod.pod-callout { }
</code></pre>
</div>

<p>你可能需要考虑加载顺序依赖。举个例子， Yahoo! 邮箱上，我们有来自不同地方的代码。有我们基础按钮样式，也有为排版屏幕的特殊按钮。然而，当你点击添加联系人时，它会从另一个产品--地址簿(是的，在雅虎地址簿是一个另一个的产品)加载一个组件，地址簿加载它自己的基础按钮样式，从而覆盖我们已有的子类按钮样式。</p>

<p>如果在你的项目中加载顺序是一个因素，注意特殊性问题。</p>

<p>赋予了 ID 的特定布局组件能用来给模块提供特殊样式的同时，子类模块允你轻松的将模块移到站点的其它区块而不 增加不必要的特殊性。</p>
