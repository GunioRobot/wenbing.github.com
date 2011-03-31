---
layout: blog-post
title: Stacking Context (层叠环境)
excerpt: 层叠环境使用于控制元素前后层叠显示。别名： Stacking Order(层叠顺序), Stacking Level(层叠级别), Z-index, Layering(层), Painting Order(绘制顺序).
tags: css
---

## Stacking Context (层叠环境)

### Problem
You want to control how positioned elements are stacked from front to back.

### Solution
CSS provides `z-order` to control the stacking of elements. Static elements are stacked from back to front in document order. *Positioned* elements are stacked from back to front from smallest to largest `z-index` with document order breaking ties. Positioned elements with a negative `z-index` are placed behind static elements and non-positioned floats. `z-index` values do not have to be contiguous. The default value for `z-index` is `auto`.

A *positioned* element with a numeric `z-index` creates a local, self-contained, *stacking context*, in which all its descendants are rendered--static, float, and positioned. A stacking context is *not* created when `z-index` is set to `auto` or when `z-index` is assigned to a non-positioned element. The following values create stacking contexts: `z-index:0`, `z-index:-1`, and `z-index:9999`.

Each stacking context is atomic and does not allow *ancestors* or *siblings* to be layered in between its children. Each local stacking context is assigned to an *internel* stacking level of 0, and its descendants are stacked *relative to it*. This is an important point. `z-index` is not global. It is *relative* to the cloest positioned ancestor that has been assigned to a numeric `z-index`. The root element, `<html>`, creates the root stacking context.

A stacking context is rendered in layers from back to front as follows:

1.  Background color, image, and borders of the stacking context element
2.  Descendant positioned elements with a negative `z-index`
3.  Descendant non-positioned block elements 
4.  Descendant non-positioned floats
5.  Descendant non-positioned inline elements
6.  Descendant positioned elements with `z-index:auto` and `z-index:0`
7.  Descendant positioned elements with a positive `z-index`

Step 2, 6, and 7 each recursively render stacking contexts because each positioned element with a numeric `z-index` creates a local stacking context.

Before a browser renders an element's content, it renders its box starting with its background color, then its background image, and then its borders. A browser then renders a box's contents on top of the box.

### Pattern

SELECTOR { z-index:&plusmn;VALUE; position: ABSOLUTE_FIXED_RELATIVE; }

### Location

This pattern applies to all elements.

### Limitations

Firefox 2 incorrectly switches steps 1 and 2, which puts negative child stacking contents behind the background and borders of the parent context! 


简单地说：position 属性为 relative, absolute, fixed 且 z-index 设为数字的元素就生成一个层叠环境，即 stacking context。然后 z-index 是相对于元素所处的层叠环境起作用的。

[原文示例][origin]

[origin]:http://www.cssdesignpatterns.com/Chapter%2007%20-%20POSITIONING1/Stacking%20Context/example.html

