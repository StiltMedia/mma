/**
 *
 * @license Guriddo jqGrid JS - v5.0.1
 * Copyright(c) 2008, Tony Tomov, tony@trirand.com
 *
 * License: http://guriddo.net/?page_id=103334
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    "use strict";
    a.fn.jqDrag = function (a) {
        return g(this, a, "d")
    }, a.fn.jqResize = function (a, b) {
        return g(this, a, "r", b)
    }, a.jqDnR = {
        dnr: {}, e: 0, drag: function (a) {
            return "d" == e.k ? f.css({
                left: e.X + a.pageX - e.pX,
                top: e.Y + a.pageY - e.pY
            }) : (f.css({
                width: Math.max(a.pageX - e.pX + e.W, 0),
                height: Math.max(a.pageY - e.pY + e.H, 0)
            }), c && b.css({width: Math.max(a.pageX - c.pX + c.W, 0), height: Math.max(a.pageY - c.pY + c.H, 0)})), !1
        }, stop: function () {
            a(document).unbind("mousemove", d.drag).unbind("mouseup", d.stop)
        }
    };
    var b, c, d = a.jqDnR, e = d.dnr, f = d.e, g = function (d, g, j, k) {
        return d.each(function () {
            g = g ? a(g, d) : d, g.bind("mousedown", {e: d, k: j}, function (d) {
                var g = d.data, j = {};
                if (f = g.e, b = k ? a(k) : !1, "relative" != f.css("position"))try {
                    f.position(j)
                } catch (l) {
                }
                if (e = {
                        X: j.left || h("left") || 0,
                        Y: j.top || h("top") || 0,
                        W: h("width") || f[0].scrollWidth || 0,
                        H: h("height") || f[0].scrollHeight || 0,
                        pX: d.pageX,
                        pY: d.pageY,
                        k: g.k
                    }, c = b && "d" != g.k ? {
                        X: j.left || i("left") || 0,
                        Y: j.top || i("top") || 0,
                        W: b[0].offsetWidth || i("width") || 0,
                        H: b[0].offsetHeight || i("height") || 0,
                        pX: d.pageX,
                        pY: d.pageY,
                        k: g.k
                    } : !1, a("input.hasDatepicker", f[0])[0])try {
                    a("input.hasDatepicker", f[0]).datepicker("hide")
                } catch (m) {
                }
                return a(document).mousemove(a.jqDnR.drag).mouseup(a.jqDnR.stop), !1
            })
        })
    }, h = function (a) {
        return parseInt(f.css(a), 10) || !1
    }, i = function (a) {
        return parseInt(b.css(a), 10) || !1
    };
    a.fn.tinyDraggable = function (b) {
        var c = a.extend({handle: 0, exclude: 0}, b);
        return this.each(function () {
            var b, d, e = a(this), f = c.handle ? a(c.handle, e) : e;
            f.on({
                mousedown: function (f) {
                    if (!c.exclude || !~a.inArray(f.target, a(c.exclude, e))) {
                        f.preventDefault();
                        var g = e.offset();
                        b = f.pageX - g.left, d = f.pageY - g.top, a(document).on("mousemove.drag", function (a) {
                            e.offset({top: a.pageY - d, left: a.pageX - b})
                        })
                    }
                }, mouseup: function () {
                    a(document).off("mousemove.drag")
                }
            })
        })
    }
});