/*
 * jQuery pager plugin
 * Version 1.0 (02/27/2011)
 * @requires jQuery v1.2.6 or later
 *
 * Example at: https://github.com/yoker/jquery-pager-plugins/raw/master/demo.html
 *
 * Copyright (c) 2011 Yoker Wu
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 效果:  < [4] [5] [6] [7] [8] >
 * Usage: 
 .pager({ callback: go });
 .pager({listnum: 9,totalrecords: 58,pagesize: 5,pageindex: 6,callback:go});
 *
 * Where listnum is 分割数量
 *       pagesize is 每页条数
        totalrecords is 总条数
        pageindex is 当前页码;
 *       callback is the method to fire when a pager button is clicked.
 *
 * callback signiture is go = function(pageclickednumber) 
 * Where pageclickednumber is the number of the page clicked in the control.
 *
 * The css file is a dependancy but can obviously tweaked to your wishes
    #pager a {display:block;text-transform:uppercase;font-size:12px;float:left;}
    #pager a.number {border:1px solid #ccc;text-decoration:none;margin:0 5px 0 0;padding:5px;background:#f0f0f0;color:#333;}
    #pager a.hover {border:1px solid #f00;}
    #pager a.empty {display:none;}
    #pager a.current {border:1px solid #003f7e;color:#000;font-weight:700;background-color:#eee;}
 */

(function(g) {
	function e(i, b, c, a, h) {
		i = g("<a />").html(i).addClass(b);
		typeof h === "function" && i.bind("click", function() {
			h(c)
		});
		return i
	}
	g.fn.pager = function(i) {
		var b = g.extend({}, g.fn.pager.defaults, i);
		return this
				.each(function() {
					g(this).empty();
					var c = parseInt(b.listnum), a = parseInt(b.totalrecords), h = parseInt(b.pagesize), d = parseInt(b.pageindex), f = 0;
					if (c % 2 == 0)
						f = -1;
					a = parseInt(a);
					d = parseInt(d);
					if (isNaN(d))
						d = 1;
					a = a % h == 0 ? parseInt(a / h) : parseInt(a / h) + 1;
					if (!(a < 2)) {
						if (d > a)
							d = a;
						if (d < 1)
							d = 1;
						h = a > d + parseInt(c / 2) && a > c ? d
								- parseInt(c / 2) >= 1 ? d + parseInt(c / 2)
								: c : a;
						f = d - parseInt(c / 2) >= 1 ? d + parseInt(c / 2) <= a ? d
								- parseInt(c / 2) - f
								: a - c > 0 ? a - c + 1 : 1
								: 1;
						c = g(this);
						if (d == 1) {
							c.append(e(b.firsttext, "number empty", d, a,
									b.callback));
							c.append(e(b.prevtext, "number empty", d, a,
									b.callback))
						} else if (d == 2) {
							c.append(e(b.firsttext, "number empty", 1, a,
									b.callback));
							c.append(e(b.prevtext, "number", 1, a, b.callback))
						} else {
							c
									.append(e(b.firsttext, "number", 1, a,
											b.callback));
							c.append(e(b.prevtext, "number", d - 1, a,
									b.callback))
						}
						for (f = f; f <= h; f++)
							f == d ? c.append(e(f, "number current", f, a,
									b.callback)) : c.append(e(f, "number", f,
									a, b.callback));
						if (d == a) {
							c.append(e(b.nexttext, "number empty", d, a,
									b.callback));
							c.append(e(b.lasttext, "number empty", d, a,
									b.callback))
						} else if (d == a - 1) {
							c.append(e(b.nexttext, "number", d + 1, a,
									b.callback));
							c.append(e(b.lasttext, "number empty", a, a,
									b.callback))
						} else {
							c.append(e(b.nexttext, "number", d + 1, a,
									b.callback));
							c.append(e(b.lasttext, "number", a, a, b.callback))
						}
						g("a", c).hover(function() {
							g(this).addClass("hover").css("cursor", "pointer")
						}, function() {
							g(this).removeClass("hover").css("cursor", "auto")
						})
					}
				})
	};
	g.fn.pager.defaults = {
		listnum : 7,
		totalrecords : 1,
		pagesize : 5,
		pageindex : 3,
		firsttext : "&laquo; 第一页",
		lasttext : "最后一页 &raquo;",
		prevtext : "&laquo; 上一页",
		nexttext : "下一页 &raquo;"
	}
})(jQuery);