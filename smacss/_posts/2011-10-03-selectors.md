---
layout: smacss
title: 
---

<h1>Selector Performance</h1>
<p>With work, I've had to do quite a bit of examination of performance. We run a number of tools over an application to determine where the bottlenecks are. One such application is <a href="http://code.google.com/speed/page-speed/">Google Page Speed</a> which provides a number of recommendations to improve JavaScript and rendering performance. Before I get into its recommendations, we need to understand a little better about how browsers evaulate CSS.</p>
<h2>How CSS gets evaluated</h2>
<h3>The style of an element is evaluated on element creation</h3>
<p>We often think of our pages as these full and complete documents full of elements and content. However, browsers are designed to handle documents like a stream. They begin to receive the document from the server and can render the document before it has completely downloaded. Each node is evaluated and rendered to the viewport as it is received.</p>
<div class="exm">
  <p class="exm-caption">An example HTML document</p>
<pre><code>&lt;body&gt;
   &lt;div id=&quot;content&quot;&gt;
      &lt;div class=&quot;module intro&quot;&gt;
         &lt;p&gt;Lorem Ipsum&lt;/p&gt;
      &lt;/div&gt;
      &lt;div class=&quot;module&quot;&gt;
         &lt;p&gt;Lorem Ipsum&lt;/p&gt;
         &lt;p&gt;Lorem Ipsum&lt;/p&gt;
         &lt;p&gt;Lorem Ipsum &lt;span&gt;Test&lt;/span&gt;&lt;/p&gt;
      &lt;/div&gt;
   &lt;/div&gt;
&lt;/body&gt;</code></pre> 
  </div>
  <p>The browser starts at the top and sees a <code>body</code> element. At this point, it thinks it's empty. It hasn't evaluated anything else. The browser will determine what the computed styles are and apply them to the element. What is the font, the color, the line height? After it figures this out, it paints it to the screen.</p>
  <p>Next, it sees a <code>div</code> element with an ID of content. Again, at this point, it thinks it's empty. It hasn't evaluated anything else. The browser figures out the styles and then the <code>div</code> gets painted. The browser will determine if it needs to repaint the body&mdash;did the element get wider or taller? (I suspect there are other considerations but width and height changes are the most common effects child elements have on their parents.)</p>
  <p>This process continues on until it reaches the end of the document. </p>
  <p>Here is a visualization of the reflow/repaint process in Firefox:</p>

  <!--<iframe width="500" height="339" src="http://www.youtube.com/embed/ZTnIxIA5KGw" frameborder="0" allowfullscreen></iframe>-->

  <h3>CSS gets evaluated from right to left.</h3>
  <p>To determine whether a CSS rule applies to a particular element, it starts from the right of the rule and works it's way left.</p>
  <p>If you have a rule like <code>body div#content p { color: #003366; }</code> then for every element&mdash;as it gets rendered to the page&mdash;it'll first ask if it's a paragraph element. If it is, it'll work its way up the DOM and ask if it's a <code>div </code>with an ID of content. If it finds what it's looking for, it'll continue its way up the DOM until it reaches the <code>body</code>. </p>
  <p>By working right to left, the browser can determine whether a rule applies to this particular element that it is trying to paint to the viewport much faster. To determine which rule is more or less performant, you need to figure out how many nodes need to be evaluated to determine whether a style can be applied to an element. </p>
  <h2>Which rules rule?</h2>
  <p>As each element gets rendered onto the page, it need to figure out which styles should be applied. Now, take a look through the Google Page Speed <a href="http://code.google.com/speed/page-speed/docs/rendering.html#UseEfficientCSSSelectors">recommendations</a>. There are four main rules that they consider inefficient:</p>
  <ul>
    <li>Rules with descendant selectors. E.g. <code>#content h3</code></li>
    <li>Rules with child or adjacent selectors. E.g. <code>#content > h3</code></li>
    <li>Rules with overly qualified selectors. E.g. <code>div#content > h3</code></li>
    <li>Rules that apply <code>:hover</code> to non-link elements. E.g. <code>div#content:hover</code></li>
  </ul>

  <p>What is important to note with these recommendations is that <em>the evaluation of any more than a single element to determine styling is inefficient</em>. That means that you could only ever use a single selector in your rule: a class selector, an ID selector, an element selector, or an attribute selector. If you take this recommendation at face value, they're suggesting we go back to the days of <code>&lt;p class="bodytext"&gt;</code>. (And if you look at the CSS that they generate on products like Search and Google Mail, they follow these recommendations.)</p>

  <h2>Constrain yourself, don't choke yourself</h2>
  <p>For the rest of us, I believe that we can be a little more practical and strike a balance between one end of the spectrum (adding classes and identifiers to everything) and the other (using deep selector rules creating tight coupling between HTML and CSS).</p>

  <p>I follow three simple rules to help limit the number of elements that need to be evaluated:</p>
  <ol>
    <li>Use child selectors</li>
    <li>Avoid tag selectors for common elements</li>
    <li>Use class names as the right-most selector</li>
  </ol> 

  <p>For example, <code>.module h3</code> might be okay if I know I'm only going to have a dozen H3s on my page. How deep are my H3s in the DOM? Are they 4 levels down (e.g.: <code>html &gt; body &gt; #content &gt; h3</code>) or are they 10 levels down (e.g.: <code>html &gt; body &gt; #content &gt; div &gt; div &gt; … &gt; h3</code>)? Can I limit the DOM traversal using child selectors? If I can do <code>.module &gt; h3</code> (sorry IE6), then I know for the 12 H3s I have on my page, it'll only have to evaluate 24 elements. If I do <code>.module div</code>, however, and I have 900 divs on my page (I just loaded up my inbox in Yahoo! Mail and there are 903), then I'm going to have a lot more traversal. A simple <code>&lt;div&gt;&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;</code> (3 levels deep) results in 6 evaluations. It's factorial. 4 levels deep results is 24. 5 levels deep results is 120.</p>

  <p>With all that said, even these simple optimizations may be overkill. Steve Souders, who works tirelessly on performance testing, examined the <a href="http://www.stevesouders.com/blog/2009/03/10/performance-impact-of-css-selectors/">performance impact of CSS selectors</a> and determined (back in 2009) that the delta between the best case and the worst case was 50ms. In other words, consider selector performance but don't waste too much time on it.</p>


