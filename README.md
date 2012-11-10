# bodyscrollkiller.js

Small utility to prevent webpage body to scroll.

## Intro

Sometimes you need to prevent your webpage to scroll, mostly when you want to use a modal dialog box, lightbox or similar. On all inside tags, prevent scrollig is simple - just add scroll eventhandler and prevent default avtion. 

But page scroll is different. Browsers themselves scroll the whole page and do it differently. Some scroll BODY, some scroll HTML tag. But more importantly, page scroll cannot be prevented in no other way than setting that scrolling tag overflow settings to 'hidden'. Unfortunately there's a ugly side effect - when scrollbar(s) disappear and you have centered page contents (as common approach is), the page shifts right.

To compensate that right shift `bodyscrollkiller.js` measures your browser's scrollbar width and adds that width temporarily to the right margin of the scrollig tag. No shift anymore.

As a bonus, viewport scrolling on touch webkit can be turned off too. 

`bodyscrollkiller.js` is written in vanilla Javascript and has no dependancies.

## Usage

**Include bodyscrollkiller.js:**

    <script src="path/to/bodyscrollkiller.js" type="text/javascript"></script>

**To disable page scroll:**

	atirip.bodyScrollOff()

**To enable page scroll:**

	atirip.bodyScrollOn()

**To check status:**

	atirip.bodyScroll()

returns true if scrollbars are on, false if off

#### Internet Explorer

IE is a special beast (as always). IE rounds rectangles (tags) differenlty from others, if you have content wrapper in body centered (margin: 0 auto) then small adjustment is needed sometimes. 

**To disable page scroll in IE :**

	atirip.bodyScrollOff(wrapper)

where wrapper is vanilla DOM Node of your wrapper tag, if you use jQuery, then its likely something like this: `$('#wrapper')[0]`
 

## Demo

Simple demo [http://atirip.github.com/bodyscrollkiller.js/scroll.html]  
Click once to turn scrolling off, click again to turn it back on.

## Compatible

Tested on Firefox 16, Chrome 23, Opera 12 on Mountain Lion and Windows, IE 8, IE 7 on Windows
(Windows XP under Parallels 7).

## TODO

* Windows Phone support, I have no idea if it works or not 

## Contact me

For support, remarks and requests, please mail me at [atirip@yahoo.com](mailto:atirip@yahoo.com).

## License

Copyright (c) 2012 Priit Pirita, released under the MIT license.

