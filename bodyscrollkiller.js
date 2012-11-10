/*jshint laxcomma:true, laxbreak: true, asi:true */
/*
* MIT Licensed
* Copyright (c) 2012, Priit Pirita, atirip@yahoo.com
*/

;(function(window, APP) {

	var scrollBarsOn = true
	,	overflow = { x: 0, y: 0 }
	,	scrollbars = overflow
	,	margins = overflow
	,	cssText = ''
	,	doc = window.document
	,	body = doc.body
	,	html = doc.documentElement
	,	systemScrollbarWidth = APP.systemScrollbarWidth || (function() {
			// You must have correct html & body tags in your html for this to work
			// generally html tag and body tag are optional, but IE renders html in a way
			// that those tags are not inserted automatically before parsing as other browsers do
			// so without body all tags we try to insert have 0 dimensions and our measurement trick does not
			// work. As starndard width on Windows is 13px, we use it here as last resort, more or less correct
			// value in this case,
			if ( !body ) return 13

			var width = 0
			,	m = doc.createElement("div")
			m.style.cssText = "visibility:hidden;overflow-y:scroll;"
			m.appendChild( doc.createTextNode("Hi!") )
			body.appendChild(m)
			width = m.offsetWidth - m.clientWidth
			m.parentNode.removeChild(m)
			return width
		})()
	, isIE = APP.isIE || (function() {
			var div = doc.createElement('div')
			div.innerHTML = '<!--[if IE]><i></i><![endif]-->'
			return ( 1 === div.getElementsByTagName('i').length )
		})()
	,	target = isIE ? html : body
	,	touch = 'ontouchstart' in window


// both parameters are optional an for IE only, see explanation below
APP.bodyScrollOff = function(wrapper, adjust) {
	var wr,	rw

	// I have no idea why on IE systemscrollbars is wrong, or more specifically it seems correct, but nonetheless
	// to avoid flick, we must pass -2 margin to html tag,
	// if in some circumstances this should be something else, I added parameter to change it
	adjust = isIE ? +adjust||-2 : 0

	if ( !scrollBarsOn ) return

	if ( touch ) {
		body.addEventListener('touchmove', function(e){ e.preventDefault() })

	} else {
		if ( body ) {
			scrollbars.x = Math.max(html.scrollWidth, body.scrollWidth) > Math.min(html.clientWidth, body.clientWidth)
			scrollbars.y = Math.max(html.scrollHeight, body.scrollHeight) > Math.min(html.clientHeight, body.clientHeight)
		} else {
			scrollbars.x = html.scrollWidth > html.clientWidth
			scrollbars.y = html.scrollHeight > html.clientHeight
		}
		
		overflow.x = target.style.overflowX
		overflow.y = target.style.overflowY

		margins.x = target.style.marginRight
		margins.y = target.style.marginBottom

		cssText = target.style.cssText

		// IE rounds rectangles differenlty , if you have content wrapper in body centered (margin: 0 auto) then small adjustment is needed sometimes
		// to compensate you must that pass along that content wrapper
		if ( isIE && wrapper ) {
			// if wrapper is given, save it's width ( not set with CSS, but measured one)
			wr = wrapper.getBoundingClientRect()
			rw = wr.right - wr.left
		}

		target.style.overflowX = 'hidden'
		target.style.overflowY = 'hidden'
		target.style.marginRight = ( parseInt(margins.x, 10)||0 + scrollbars.y ? (systemScrollbarWidth + adjust) : 0) + 'px'
		target.style.marginBottom = ( parseInt(margins.y, 10)||0 + scrollbars.x ? (systemScrollbarWidth + adjust) : 0) + 'px'

		if ( isIE  && wrapper ) {
			// measure again
			wr = wrapper.getBoundingClientRect()
			// pattern so far ( there may be expections, but I haven't found yet any )
			// if new is wider than old, reduce margin by 1px
			if ( wr.right - wr.left > rw ) {
				target.style.marginRight =  (parseInt(target.style.marginRight, 10) - 1) + 'px'
			}
		}
	}
	scrollBarsOn = false
}

APP.bodyScrollOn = function() {

	if ( scrollBarsOn ) return

	if ( touch ) {
		body.removeEventListener('touchmove', function(e){ e.preventDefault() })
	} else {
		target.style.overflowX = -1 === cssText.indexOf('overflowX') ? '' : overflow.x
		target.style.overflowY = -1 === cssText.indexOf('overflowY') ? '' : overflow.y
		target.style.marginRight = -1 === cssText.indexOf('marginRight') ? '' : margins.x
		target.style.marginBottom = -1 === cssText.indexOf('marginBottom') ? '' : margins.y
	}
	scrollBarsOn = true
}


APP.bodyScroll = function() {
	return scrollBarsOn
}

})(window, (window.atirip || (window.atirip = {}) ));
