---
layout: smacss
title: 
---

<h1>The Four Types of CSS Rules</h1>

<p>Every project needs some organization. Throwing every new style you create onto the end of a single file would make finding things more difficult and would be very confusing for anybody else working on the project. Of course, you likely have some organization in place already. Hopefully, what you read among these pages will highlight what works with your existing process and, if I'm lucky, you'll see new ways in which you can improve your process.</p>

<p>How do you decide whether to use ID selectors, or class selectors, or any number of selectors to decide which elements should get the styling magic you wish to bestow upon it? How do you make it easy to understand how your site and your styles are organized? </p>

<p>At the very core of SMACSS is categorization. By categorizing CSS rules, we begin to see patterns and can define better practices around each of these patterns.</p>

<p>The four types of categories are:</p>
<ol>
<li>Base</li>
<li>Layout</li>
<li>Module</li>
<li>State</li>
</ol>

<p>We often find ourselves mixing styles across each of these categories. But if we're more aware of what we're trying to style, we can avoid the complexity that comes from intertwining these rules.</p>

<p>Each category has certain guidelines that apply to it. This somewhat succinct separation allows us to ask ourselves questions during the development process. How are we going to code things and <em>why</em> are we going to code them that way?</p>

<p>Much of the purpose of categorizing things is to codify patterns—things that repeat themselves within our design. Repetition results in less code, easier maintenance, and greater consistency in the user experience. These are all wins. Exceptions to the rule can be advantageous but they should be justified.</p>

<p><strong>Base styles</strong> are the defaults that we set. They're almost exclusively single element selectors but it could include attribute selectors, pseudo-class selectors, child selectors or sibling selectors. Essentially, a base style says that whereever this element is on the page, it should look like <em>this</em>.</p>

<div class="exm">
<p class="exm-caption">Examples of Base Styles</p>
<pre><code>html, body, form { margin: 0; padding: 0; }
input[type=text] { border: 1px solid #999; }
a { color: #039; }
a:hover { color: #03C; }
</code></pre>
</div>

<p><strong>Modules</strong> are the reusable, modular parts of our design. They are the callouts, the sidebar sections, and the product list and so on.</p>

<p><strong>Layout styles</strong> divide the page into sections. Layouts hold all your modules together.</p>

<p>Finally, <strong>State styles</strong> are ways to describe how our modules or layouts will look when in a particular state. Is it hidden or expanded? Is it active or inactive?</p> 


<h2>Naming Convention</h2>
<p>By separating as we have, we have the benefit of using naming convention as a way of understanding immediately which category a particular style belongs to and its role within the overall scope of the page. On large projects, you are more likely to have styles broken up across multiple files. In these cases, naming convention also makes it easier to find which file a style belongs to.</p>

<p>Is it <code>.red-background</code> or <code>.error-msg</code>?</p>

<p>I use a prefix to differentiate the different between the different types of rules. Feel free to pick an approach that works best for you. I use <code>l-</code> for Layout, and <code>s-</code> for State. </p>


<div class="exm">
<p class="exm-caption">Examples of Layout and State rules</p>
<pre><code>.l-grid { 
float: left; 
}
.s-error { 
color: #F00; 
       background-color: #FEE; 
}
.s-hidden { 
position: absolute;
left: -999em;
}</code></pre>
</div>

<p>Modules are going to be the bulk of any project. As a result, having every module start with a prefix like <code>.mod-</code> would be needlessly verbose. If it doesn't start with <code>l-</code> or <code>s-</code> then it must be a module. For modules, I try to stick to a three letter prefix.</p>

<div class="exm">
<p class="exm-caption">Examples of Module classes</p>
<pre><code>/* Example Module */
.exm { }

/* Callout Module */
.cll { }

/* Form field module */
.fld { }
</code></pre>
</div>

<p>These three letter rules would then be used for any related styles. On this site, for example, code examples use the <code>.exm</code> class and the captions use a <code>.exm-caption</code> class. I can instantly look at the caption class and understand that it's related to the code examples and where I can find the styles for that.</p> 

<p>This naming convention will be used throughout these pages. Like most other things that I've outlined here, don't feel that you have to stick to these guidelines rigidly. Have a convention, document it, and stick to it.</p>
