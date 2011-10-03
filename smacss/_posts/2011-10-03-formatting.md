---
layout: smacss
title: 
---

<h1>Formatting Code</h1>
<p>Everybody has their own way. The tools and techniques that you use are using are ones that you've tried either through trial and error or you've tried what you heard works for other people. When I first got into development, I used Dreamweaver. It was featureful and allowed me to build static HTML sites quickly and efficiently. After seeing a co-worker using Ultraedit and seeing how fast he was able to get work done, I started to learn it as a way of complementing my existing tool set. The same has occurred with the way I code. I'll see a technique or style that someone else uses and I'll assimilate those techniques into my own way of working.</p>

<p>This section, Formatting Code, is a brief look at how I code my work and do so in a way that seems to work well for others having to continue working on my code.</p> 


<h2>Single line versus multiple lines</h2>
<p>For many years, I've coded my CSS using the <a href="http://orderedlist.com/resources/html-css/single-line-css/">single line approach</a>. This means that all of the properties for a given rule set are declared on the same line. This allows for quick scanning of the selectors along the left. Being able to scan selectors has traditionally been more important to me than seeing properties nicely lined up. Up until just a couple years ago, the list of properties assigned to a rule set were quite small; it'd be unsual to have more than a handful.</p>
<p>With CSS3&mdash;and the myriad of vendor-specific prefixes that come with it&mdash;things can get out of hand rather quickly. Between that and working with a larger team, it was easier for everybody to have each property/value pair on its own line. </p>
<div class="exm">
  <p class="exm-caption">CSS3 with the plethora of vendor-prefixed properties can be too much to read easily if all on one line.</p>
  <pre><code>.module {
    display: block;
    height: 200px;
    width: 200px;
    float: left;
    position: relative;

    border: 1px solid #333;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;

    -moz-box-shadow: 10px 10px 5px #888;
    -webkit-box-shadow: 10px 10px 5px #888;
    box-shadow: 10px 10px 5px #888;

    font-size: 12px;
    text-transform: uppercase;
}</code></pre>
  </div>
  <p>In the example, there are 11 properties declared and we could easily have a half-dozen more if we added another feature or two to our module. Having these all on one line would leave the first handful of properties visible on the screen and we'd be left scrolling to the right to uncover the rest of the properties. This makes it hard to scan the document and see what properties have been defined.</p>
  <p>There are a few other minor things to note with the example:</p>

  <ul>
    <li>There is a space after the colon.</li>
    <li>Four spaces before each declaration (no tabs).</li>
    <li>Properties are grouped by type.</li>
    <li>Opening bracket on the same line as the rule set.</li>
    <li>Colour declarations use the short form.</li>
  </ul>

  <p>These are all preferential and I'll not begrudge you for using a completely different approach. This is just what I've found that feels natural and makes the most sense to me. Allow me to explain a couple of them in more detail.</p>
  <h3>Grouping Properties</h3>
  <p>Some people organize alphabetically, others don't organize at all, and others may use some other arbitrary system. I fall in this last category. It's not completely arbitrary, mind you. I'd describe it as ordering from most important to least important but what is important when it comes to declaring styles on an element? </p>
  <p>I organize in the following order:</p>
  <ol>
    <li>Box</li>
    <li>Border</li>
    <li>Background</li>
    <li>Text</li>
    <li>Other</li>
  </ol>
  <p>Box includes any property that affects the display and position of the box such as <code>display</code>, <code>float</code>, <code>position</code>, <code>left</code>, <code>top</code>, <code>height</code>, <code>width</code> and so on. These are most important to me because they affect the flow of the rest of the document.</p>
  <p>Border includes <code>border</code>, the oft-unused <code>border-image</code>, and <code>border-radius</code>.</p>
  <p>Background comes next. With the advent of CSS3 gradients, background declarations can actually become quite verbose. Once again, vendor prefixes just compound the issue.</p>

  <div id="ex2" class="exm">
    <p class="exm-caption">#ex2: Multiple backgrounds with CSS3 declarations. Code example from Lea Verou's <a href="http://leaverou.me/css3patterns/">CSS3 Pattern Gallery</a>.</p>
<pre><code>background-color: #6d695c;
background-image: url("/img/argyle.png");
background-image:
  repeating-linear-gradient(-30deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),
  repeating-linear-gradient(30deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),
  linear-gradient(30deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1)),
  linear-gradient(-30deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1));
background-size: 70px 120px;</code></pre>
    </div>
    <p>Complex patterns are possible with CSS3 gradients but create for lengthy background declarations, and the code in Example 2 doesn't include CSS3 prefixes. Just imagine how long this declaration would be if it did!</p>
    <p>Text declarations include <code>font-family</code>, <code>font-size</code>, <code>text-transform</code>, <code>letter-spacing</code> and any other CSS properties that affect the display of the type.</p>
    <p>Anything that doesn't fall into any of the above categories just gets added to the end in no particular order.</p>
    <h3>Colour Declarations</h3>
    <p>This may seem like a silly thing to even mention but I've seen different developers do different things. Some like using keywords like <code>black</code> and <code>white</code> but I've always tried to stick to either the 3 digit or 6 digit hex format wherever possible. <code>#000</code> and <code>#FFF</code> are shorter, albeit barely, then their keyword counterparts.</p>

