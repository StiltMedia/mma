/**
 *
 * @license Guriddo jqGrid JS - v5.0.1
 * Copyright(c) 2008, Tony Tomov, tony@trirand.com
 *
 * License: http://guriddo.net/?page_id=103334
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a()
}(function () {
    "use strict";
    return window.jqGridUtils = {
        stringify: function (a) {
            return JSON.stringify(a, function (a, b) {
                return "function" == typeof b ? b.toString() : b
            })
        }, parse: function (str) {
            return JSON.parse(str, function (key, value) {
                return "string" == typeof value && -1 !== value.indexOf("function") ? eval("(" + value + ")") : value
            })
        }, encode: function (a) {
            return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }, jsonToXML: function (a, b) {
            var c = $.extend({
                xmlDecl: '<?xml version="1.0" encoding="UTF-8" ?>\n',
                attr_prefix: "-",
                encode: !0
            }, b || {}), d = this, e = function (a, b) {
                return "#text" === a ? c.encode ? d.encode(b) : b : "function" == typeof b ? "<" + a + "><![CDATA[" + b + "]]></" + a + ">\n" : "" === b ? "<" + a + ">__EMPTY_STRING_</" + a + ">\n" : "<" + a + ">" + (c.encode ? d.encode(b) : b) + "</" + a + ">\n"
            }, f = function (a, b) {
                for (var c = [], d = 0; d < b.length; d++) {
                    var h = b[d];
                    c[c.length] = "undefined" == typeof h || null == h ? "<" + a + " />" : "object" == typeof h && h.constructor == Array ? f(a, h) : "object" == typeof h ? g(a, h) : e(a, h)
                }
                return c.length || (c[0] = "<" + a + ">__EMPTY_ARRAY_</" + a + ">\n"), c.join("")
            }, g = function (a, b) {
                var h = [], i = [];
                for (var j in b)if (b.hasOwnProperty(j)) {
                    var k = b[j];
                    j.charAt(0) !== c.attr_prefix ? h[h.length] = null == k ? "<" + j + " />" : "object" == typeof k && k.constructor === Array ? f(j, k) : "object" == typeof k ? g(j, k) : e(j, k) : i[i.length] = " " + j.substring(1) + '="' + (c.encode ? d.encode(k) : k) + '"'
                }
                var l = i.join(""), m = h.join("");
                return null == a || (m = h.length > 0 ? m.match(/\n/) ? "<" + a + l + ">\n" + m + "</" + a + ">\n" : "<" + a + l + ">" + m + "</" + a + ">\n" : "<" + a + l + " />\n"), m
            }, h = g(null, a);
            return c.xmlDecl + h
        }, xmlToJSON: function (root, options) {
            var o = $.extend({force_array: [], attr_prefix: "-"}, options || {});
            if (root) {
                var __force_array = {};
                if (o.force_array)for (var i = 0; i < o.force_array.length; i++)__force_array[o.force_array[i]] = 1;
                "string" == typeof root && (root = $.parseXML(root)), root.documentElement && (root = root.documentElement);
                var addNode = function (hash, key, cnts, val) {
                    if ("string" == typeof val)if (-1 !== val.indexOf("function"))val = eval("(" + val + ")"); else switch (val) {
                        case"__EMPTY_ARRAY_":
                            val = [];
                            break;
                        case"__EMPTY_STRING_":
                            val = "";
                            break;
                        case"false":
                            val = !1;
                            break;
                        case"true":
                            val = !0
                    }
                    __force_array[key] ? (1 === cnts && (hash[key] = []), hash[key][hash[key].length] = val) : 1 === cnts ? hash[key] = val : 2 === cnts ? hash[key] = [hash[key], val] : hash[key][hash[key].length] = val
                }, parseElement = function (a) {
                    if (7 !== a.nodeType) {
                        if (3 === a.nodeType || 4 === a.nodeType) {
                            var b = a.nodeValue.match(/[^\x00-\x20]/);
                            if (null == b)return;
                            return a.nodeValue
                        }
                        var c, d, e, f, g = {};
                        if (a.attributes && a.attributes.length)for (c = {}, d = 0; d < a.attributes.length; d++)e = a.attributes[d].nodeName, "string" == typeof e && (f = a.attributes[d].nodeValue, f && (e = o.attr_prefix + e, "undefined" == typeof g[e] && (g[e] = 0), g[e]++, addNode(c, e, g[e], f)));
                        if (a.childNodes && a.childNodes.length) {
                            var h = !0;
                            for (c && (h = !1), d = 0; d < a.childNodes.length && h; d++) {
                                var i = a.childNodes[d].nodeType;
                                3 !== i && 4 !== i && (h = !1)
                            }
                            if (h)for (c || (c = ""), d = 0; d < a.childNodes.length; d++)c += a.childNodes[d].nodeValue; else for (c || (c = {}), d = 0; d < a.childNodes.length; d++)e = a.childNodes[d].nodeName, "string" == typeof e && (f = parseElement(a.childNodes[d]), f && ("undefined" == typeof g[e] && (g[e] = 0), g[e]++, addNode(c, e, g[e], f)))
                        }
                        return c
                    }
                }, json = parseElement(root);
                if (__force_array[root.nodeName] && (json = [json]), 11 !== root.nodeType) {
                    var tmp = {};
                    tmp[root.nodeName] = json, json = tmp
                }
                return json
            }
        }
    }, window.jqGridUtils
});