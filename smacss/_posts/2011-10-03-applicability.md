---
layout: smacss
title: 
---

<h1>Depth of Applicability</h1>
<p>When learning the inner workings of CSS, we learn that we have selectors and that we use selectors to select the HTML elements on the page that we want to style. CSS has grown over the years to give us more power using an ever increasing number of selectors. Each rule set that we add to our style sheet, however, creates an ever increasing connection between the CSS and the HTML.</p>

<p>Let's review a typical block of CSS that you might find on a web site.</p>

<div class="exm exm-code">
<p class="exm-caption">How we tightly couple our CSS to our HTML</p>
<pre><code>#sidebar div {
border: 1px solid #333;
}

#sidebar div h3 { 
  margin-top: 5px;
}

#sidebar div ul {
  margin-bottom: 5px; 
} 
</code></pre>
</div>

<p>By looking at this, you can see that there's some expectation of what our HTML will look like. There's likely one or more sections in a sidebar that have a heading and an unordered list that follows it. If the site doesn't change very often, this style of CSS will work just fine. I haven't changed the design of my blog in two years. My need to scale just isn't there. If I tried using this approach on a larger site, which can change more frequently and have a greater variety of code requirements, I'm going to have problems. I'll need to add more rules with more complex selectors. I may find myself in a maintenance nightmare.</p>

<p>Where have I gone wrong? There are two particular concerns with the example CSS:</p>

<ol>
<li>I'm relying heavily on a defined HTML structure.</li>
<li>The depth of HTML to which the selectors apply is too deep.</li>
</ol>

<h2>Minimizing the Depth</h2>

<p>HTML is like a tree structure of parents and children. The depth of applicability is the number of generations that are affected by a given rule. For example, <code>body.article > #main > #content > #intro > p > b</code> would have a depth of applicability of 6 generations. If this selector was written as <code>.article #intro b</code> then the depth is still the same: 6 generations.</p>

<p>The problem with such a depth is that it enforces a much greater dependency on a particular HTML structure. Components on the page can't be easily moved around. If we look back at the sidebar example, how do we recreate that module in another part of the page such a footer? We have to duplicate the rules.</p>


<div class="exm exm-code">
<p class="exm-caption">Duplication of rules</p>
<pre><code>#sidebar div, #footer div {
border: 1px solid #333;
}

#sidebar div h3, #footer div h3 { 
  margin-top: 5px;
}

#sidebar div ul, #footer div ul {
  margin-bottom: 5px; 
} 
</code></pre>
</div>

<p>The root node is at the <code>div</code> and it is from here that we should be creating our styles.</p>


<div class="exm exm-code">
<p class="exm-caption">Duplication of rules</p>
<pre><code>.pod {
border: 1px solid #333;
}

.pod > h3 { 
  margin-top: 5px;
}

.pod > ul {
  margin-bottom: 5px; 
} 
</code></pre>
</div>

<p>The pod is a container that still relies on a particular HTML structure but it's of a much shallower depth than what we had before. The "tradeoff" is that we have to repeat the pod class on a numerous elements on the page. Whereas before, we just had two elements with IDs. Of course, we want to avoid going back to the days where we did silly things like adding class names to every paragraph.</p>

<p>An advantage to using this shallow depth of applicability approach is also the ability to more readily templatize these modules. At Yahoo!, for example, we've been relying on Mustache for much of our templating needs. Here is how we'd set up our template for these pods:</p>

<div class="exm exm-code">
<p class="exm-caption">An example Mustache template</p>
<pre><code>&lt;div class=&quot;pod&quot;&gt;
&lt;h3&gt;{{heading}}&lt;/h3&gt;
&lt;ul&gt;
{{#items}}
&lt;li&gt;{{item}}&lt;/li&gt;
{{/items}}
&lt;/ul&gt;
&lt;/div&gt; 
</code></pre>
</div>

<p>We're trying to strike a balance between maintenance, performance, and readability. Going too deep may mean less "classitis" within your HTML but it increases the maintenance and readability overhead. Likewise, you don't want (or need) classes on everything. Adding classes to the <code>h3</code> or <code>ul</code> in this example would've been a little unnecessary unless we need to have an even more flexible system.</p>

<p>To go even further on this last example, this design pattern is a common one. It's a container with a header and a body. (Sometimes, you'll have a footer, too.) We have a <code>ul</code> in there right now but in other examples, we might see an <code>ol</code> or a <code>div</code> in its place.</p>

<p>Once again, we can duplicate our rules for each variation.</p>

<div class="exm exm-code">
<p class="exm-caption">Duplication of rules</p>
<pre><code>
.pod > ul, .pod > ol, .pod > div {
  margin-bottom: 5px; 
} 
</code></pre>
</div>

<p>Alternatively, we can classify the pod body.</p>


<div class="exm exm-code">
<p class="exm-caption">Simplifying with a class</p>
<pre><code>
.pod-body {
  margin-bottom: 5px; 
} 
</code></pre>
</div>

<p>With the module rule approach, it's not even necessary to specify the <code>.pod</code> class. We can visually see that <code>.pod-body</code> is associated with the pod module and from a code perspective, it'll work just fine.</p>


<div class="exm exm-code">
<p class="exm-caption">An example Mustache template</p>
<pre><code>&lt;div class=&quot;pod&quot;&gt;
&lt;h3&gt;{{heading}}&lt;/h3&gt;
&lt;ul <b>class="pod-body"</b>&gt;
{{#items}}
&lt;li&gt;{{item}}&lt;/li&gt;
{{/items}}
&lt;/ul&gt;
&lt;/div&gt; 
</code></pre>
</div>

<p>As a result of this small change, we're able to reduce the depth of applicability to the shallowest it can go. The single selector also means that we're avoiding potential specificity issues, too. All around, that's win-win.</p>

