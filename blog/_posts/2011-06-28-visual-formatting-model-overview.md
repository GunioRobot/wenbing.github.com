---
layout: blog-post
title: Visual Formatting Model Overview 摘要
excerpt: Visual Formatting Model Overview  摘要 -- reading "CSS Mastery - Advanced Web Standards Solutions, Second Edition"
tags: [css]
---

__Margins Collapse__

* When two elements are above one another, the bottom margin of the first element will collapse
with the top margin of the second element
* When one element is contained within another element, assuming there is no padding or border
separating margins, their top and/or bottom margins will also collapse together 
* It may seem strange at first, but margins can even collapse on themselves. Say you have an
empty element with a margin but no border or padding

Margin collapsing only happens with the vertical margins of block boxes in the normal flow of the
document. Margins between inline boxes, floated, or absolutely positioned boxes never collapse.

__Clear__

When you clear an element, the browser adds enough margin to the top of the element 
to push the element’s top border edge vertically down, past the float


