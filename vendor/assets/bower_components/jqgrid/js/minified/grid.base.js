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
}(function ($) {
    "use strict";
    $.jgrid = $.jgrid || {}, $.jgrid.hasOwnProperty("defaults") || ($.jgrid.defaults = {}), $.extend($.jgrid, {
        version: "5.0.1",
        htmlDecode: function (a) {
            return a && ("&nbsp;" === a || "&#160;" === a || 1 === a.length && 160 === a.charCodeAt(0)) ? "" : a ? String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : a
        },
        htmlEncode: function (a) {
            return a ? String(a).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : a
        },
        template: function (a) {
            var b, c = $.makeArray(arguments).slice(1), d = c.length;
            return null == a && (a = ""), a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function (a, e) {
                if (!isNaN(parseInt(e, 10)))return c[parseInt(e, 10)];
                for (b = 0; d > b; b++)if ($.isArray(c[b]))for (var f = c[b], g = f.length; g--;)if (e === f[g].nm)return f[g].v
            })
        },
        msie: "Microsoft Internet Explorer" === navigator.appName,
        msiever: function () {
            var a = -1, b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            return null != c.exec(b) && (a = parseFloat(RegExp.$1)), a
        },
        getCellIndex: function (a) {
            var b = $(a);
            return b.is("tr") ? -1 : (b = (b.is("td") || b.is("th") ? b : b.closest("td,th"))[0], $.jgrid.msie ? $.inArray(b, b.parentNode.cells) : b.cellIndex)
        },
        stripHtml: function (a) {
            a = String(a);
            var b = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            return a ? (a = a.replace(b, ""), a && "&nbsp;" !== a && "&#160;" !== a ? a.replace(/\"/g, "'") : "") : a
        },
        stripPref: function (a, b) {
            var c = $.type(a);
            return ("string" === c || "number" === c) && (a = String(a), b = "" !== a ? String(b).replace(String(a), "") : b), b
        },
        parse: function (jsonString) {
            var js = jsonString;
            return "while(1);" === js.substr(0, 9) && (js = js.substr(9)), "/*" === js.substr(0, 2) && (js = js.substr(2, js.length - 4)), js || (js = "{}"), $.jgrid.useJSON === !0 && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(js) : eval("(" + js + ")")
        },
        parseDate: function (a, b, c, d) {
            var e, f, g, h = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, i = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, j = /[^-+\dA-Z]/g, k = new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"), l = "string" == typeof b ? b.match(k) : null, m = function (a, b) {
                for (a = String(a), b = parseInt(b, 10) || 2; a.length < b;)a = "0" + a;
                return a
            }, n = {m: 1, d: 1, y: 1970, h: 0, i: 0, s: 0, u: 0}, o = 0, p = function (a, b) {
                return 0 === a ? 12 === b && (b = 0) : 12 !== b && (b += 12), b
            }, q = 0;
            if (void 0 === d && (d = $.jgrid.getRegional(this, "formatter.date")), void 0 === d.parseRe && (d.parseRe = /[#%\\\/:_;.,\t\s-]/), d.masks.hasOwnProperty(a) && (a = d.masks[a]), b && null != b)if (isNaN(b - 0) || "u" !== String(a).toLowerCase())if (b.constructor === Date)o = b; else if (null !== l)o = new Date(parseInt(l[1], 10)), l[3] && (q = 60 * Number(l[5]) + Number(l[6]), q *= "-" === l[4] ? 1 : -1, q -= o.getTimezoneOffset(), o.setTime(Number(Number(o) + 60 * q * 1e3))); else {
                for ("ISO8601Long" === d.srcformat && "Z" === b.charAt(b.length - 1) && (q -= (new Date).getTimezoneOffset()), b = String(b).replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), a = a.replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), f = 0, g = a.length; g > f; f++) {
                    switch (a[f]) {
                        case"M":
                            e = $.inArray(b[f], d.monthNames), -1 !== e && 12 > e && (b[f] = e + 1, n.m = b[f]);
                            break;
                        case"F":
                            e = $.inArray(b[f], d.monthNames, 12), -1 !== e && e > 11 && (b[f] = e + 1 - 12, n.m = b[f]);
                            break;
                        case"n":
                            a[f] = "m";
                            break;
                        case"j":
                            a[f] = "d";
                            break;
                        case"a":
                            e = $.inArray(b[f], d.AmPm), -1 !== e && 2 > e && b[f] === d.AmPm[e] && (b[f] = e, n.h = p(b[f], n.h));
                            break;
                        case"A":
                            e = $.inArray(b[f], d.AmPm), -1 !== e && e > 1 && b[f] === d.AmPm[e] && (b[f] = e - 2, n.h = p(b[f], n.h));
                            break;
                        case"g":
                            n.h = parseInt(b[f], 10)
                    }
                    void 0 !== b[f] && (n[a[f].toLowerCase()] = parseInt(b[f], 10))
                }
                if (n.f && (n.m = n.f), 0 === n.m && 0 === n.y && 0 === n.d)return "&#160;";
                n.m = parseInt(n.m, 10) - 1;
                var r = n.y;
                r >= 70 && 99 >= r ? n.y = 1900 + n.y : r >= 0 && 69 >= r && (n.y = 2e3 + n.y), o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u), q > 0 && o.setTime(Number(Number(o) + 60 * q * 1e3))
            } else o = new Date(1e3 * parseFloat(b)); else o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u);
            if (d.userLocalTime && 0 === q && (q -= (new Date).getTimezoneOffset(), q > 0 && o.setTime(Number(Number(o) + 60 * q * 1e3))), void 0 === c)return o;
            d.masks.hasOwnProperty(c) ? c = d.masks[c] : c || (c = "Y-m-d");
            var s = o.getHours(), t = o.getMinutes(), u = o.getDate(), v = o.getMonth() + 1, w = o.getTimezoneOffset(), x = o.getSeconds(), y = o.getMilliseconds(), z = o.getDay(), A = o.getFullYear(), B = (z + 6) % 7 + 1, C = (new Date(A, v - 1, u) - new Date(A, 0, 1)) / 864e5, D = {
                d: m(u),
                D: d.dayNames[z],
                j: u,
                l: d.dayNames[z + 7],
                N: B,
                S: d.S(u),
                w: z,
                z: C,
                W: 5 > B ? Math.floor((C + B - 1) / 7) + 1 : Math.floor((C + B - 1) / 7) || ((new Date(A - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
                F: d.monthNames[v - 1 + 12],
                m: m(v),
                M: d.monthNames[v - 1],
                n: v,
                t: "?",
                L: "?",
                o: "?",
                Y: A,
                y: String(A).substring(2),
                a: 12 > s ? d.AmPm[0] : d.AmPm[1],
                A: 12 > s ? d.AmPm[2] : d.AmPm[3],
                B: "?",
                g: s % 12 || 12,
                G: s,
                h: m(s % 12 || 12),
                H: m(s),
                i: m(t),
                s: m(x),
                u: y,
                e: "?",
                I: "?",
                O: (w > 0 ? "-" : "+") + m(100 * Math.floor(Math.abs(w) / 60) + Math.abs(w) % 60, 4),
                P: "?",
                T: (String(o).match(i) || [""]).pop().replace(j, ""),
                Z: "?",
                c: "?",
                r: "?",
                U: Math.floor(o / 1e3)
            };
            return c.replace(h, function (a) {
                return D.hasOwnProperty(a) ? D[a] : a.substring(1)
            })
        },
        jqID: function (a) {
            return String(a).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
        },
        guid: 1,
        uidPref: "jqg",
        randId: function (a) {
            return (a || $.jgrid.uidPref) + $.jgrid.guid++
        },
        getAccessor: function (a, b) {
            var c, d, e, f = [];
            if ("function" == typeof b)return b(a);
            if (c = a[b], void 0 === c)try {
                if ("string" == typeof b && (f = b.split(".")), e = f.length)for (c = a; c && e--;)d = f.shift(), c = c[d]
            } catch (g) {
            }
            return c
        },
        getXmlData: function (a, b, c) {
            var d, e = "string" == typeof b ? b.match(/^(.*)\[(\w+)\]$/) : null;
            return "function" == typeof b ? b(a) : e && e[2] ? e[1] ? $(e[1], a).attr(e[2]) : $(a).attr(e[2]) : (d = $(b, a), c ? d : d.length > 0 ? $(d).text() : void 0)
        },
        cellWidth: function () {
            var a = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable ui-common-table' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"), b = a.appendTo("body").find("td").width();
            return a.remove(), Math.abs(b - 5) > .1
        },
        isLocalStorage: function () {
            try {
                return "localStorage"in window && null !== window.localStorage
            } catch (a) {
                return !1
            }
        },
        getRegional: function (a, b, c) {
            var d;
            return void 0 !== c ? c : (a.p && a.p.regional && $.jgrid.regional && (d = $.jgrid.getAccessor($.jgrid.regional[a.p.regional] || {}, b)), void 0 === d && (d = $.jgrid.getAccessor($.jgrid, b)), d)
        },
        isMobile: function () {
            try {
                return /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent) ? !0 : !1
            } catch (a) {
                return !1
            }
        },
        cell_width: !0,
        ajaxOptions: {},
        from: function (source) {
            var $t = this, QueryObject = function (d, q) {
                "string" == typeof d && (d = $.data(d));
                var self = this, _data = d, _usecase = !0, _trim = !1, _query = q, _stripNum = /[\$,%]/g, _lastCommand = null, _lastField = null, _orDepth = 0, _negate = !1, _queuedOperator = "", _sorting = [], _useProperties = !0;
                if ("object" != typeof d || !d.push)throw"data provides is not an array";
                return d.length > 0 && (_useProperties = "object" != typeof d[0] ? !1 : !0), this._hasData = function () {
                    return null === _data ? !1 : 0 === _data.length ? !1 : !0
                }, this._getStr = function (a) {
                    var b = [];
                    return _trim && b.push("jQuery.trim("), b.push("String(" + a + ")"), _trim && b.push(")"), _usecase || b.push(".toLowerCase()"), b.join("")
                }, this._strComp = function (a) {
                    return "string" == typeof a ? ".toString()" : ""
                }, this._group = function (a, b) {
                    return {field: a.toString(), unique: b, items: []}
                }, this._toStr = function (a) {
                    return _trim && (a = $.trim(a)), a = a.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"'), _usecase ? a : a.toLowerCase()
                }, this._funcLoop = function (a) {
                    var b = [];
                    return $.each(_data, function (c, d) {
                        b.push(a(d))
                    }), b
                }, this._append = function (a) {
                    var b;
                    for (null === _query ? _query = "" : _query += "" === _queuedOperator ? " && " : _queuedOperator, b = 0; _orDepth > b; b++)_query += "(";
                    _negate && (_query += "!"), _query += "(" + a + ")", _negate = !1, _queuedOperator = "", _orDepth = 0
                }, this._setCommand = function (a, b) {
                    _lastCommand = a, _lastField = b
                }, this._resetNegate = function () {
                    _negate = !1
                }, this._repeatCommand = function (a, b) {
                    return null === _lastCommand ? self : null !== a && null !== b ? _lastCommand(a, b) : null === _lastField ? _lastCommand(a) : _useProperties ? _lastCommand(_lastField, a) : _lastCommand(a)
                }, this._equals = function (a, b) {
                    return 0 === self._compare(a, b, 1)
                }, this._compare = function (a, b, c) {
                    var d = Object.prototype.toString;
                    return void 0 === c && (c = 1), void 0 === a && (a = null), void 0 === b && (b = null), null === a && null === b ? 0 : null === a && null !== b ? 1 : null !== a && null === b ? -1 : "[object Date]" === d.call(a) && "[object Date]" === d.call(b) ? b > a ? -c : a > b ? c : 0 : (_usecase || "number" == typeof a || "number" == typeof b || (a = String(a), b = String(b)), b > a ? -c : a > b ? c : 0)
                }, this._performSort = function () {
                    0 !== _sorting.length && (_data = self._doSort(_data, 0))
                }, this._doSort = function (a, b) {
                    var c = _sorting[b].by, d = _sorting[b].dir, e = _sorting[b].type, f = _sorting[b].datefmt, g = _sorting[b].sfunc;
                    if (b === _sorting.length - 1)return self._getOrder(a, c, d, e, f, g);
                    b++;
                    var h, i, j, k = self._getGroup(a, c, d, e, f), l = [];
                    for (h = 0; h < k.length; h++)for (j = self._doSort(k[h].items, b), i = 0; i < j.length; i++)l.push(j[i]);
                    return l
                }, this._getOrder = function (a, b, c, d, e, f) {
                    var g, h, i, j, k = [], l = [], m = "a" === c ? 1 : -1;
                    void 0 === d && (d = "text"), j = "float" === d || "number" === d || "currency" === d || "numeric" === d ? function (a) {
                        var b = parseFloat(String(a).replace(_stripNum, ""));
                        return isNaN(b) ? Number.NEGATIVE_INFINITY : b
                    } : "int" === d || "integer" === d ? function (a) {
                        return a ? parseFloat(String(a).replace(_stripNum, "")) : Number.NEGATIVE_INFINITY
                    } : "date" === d || "datetime" === d ? function (a) {
                        return $.jgrid.parseDate.call($t, e, a).getTime()
                    } : $.isFunction(d) ? d : function (a) {
                        return a = a ? $.trim(String(a)) : "", _usecase ? a : a.toLowerCase()
                    }, $.each(a, function (a, c) {
                        h = "" !== b ? $.jgrid.getAccessor(c, b) : c, void 0 === h && (h = ""), h = j(h, c), l.push({
                            vSort: h,
                            index: a
                        })
                    }), l.sort($.isFunction(f) ? function (a, b) {
                        return a = a.vSort, b = b.vSort, f.call(this, a, b, m)
                    } : function (a, b) {
                        return a = a.vSort, b = b.vSort, self._compare(a, b, m)
                    }), i = 0;
                    for (var n = a.length; n > i;)g = l[i].index, k.push(a[g]), i++;
                    return k
                }, this._getGroup = function (a, b, c, d, e) {
                    var f, g = [], h = null, i = null;
                    return $.each(self._getOrder(a, b, c, d, e), function (a, c) {
                        f = $.jgrid.getAccessor(c, b), null == f && (f = ""), self._equals(i, f) || (i = f, null !== h && g.push(h), h = self._group(b, f)), h.items.push(c)
                    }), null !== h && g.push(h), g
                }, this.ignoreCase = function () {
                    return _usecase = !1, self
                }, this.useCase = function () {
                    return _usecase = !0, self
                }, this.trim = function () {
                    return _trim = !0, self
                }, this.noTrim = function () {
                    return _trim = !1, self
                }, this.execute = function () {
                    var match = _query, results = [];
                    return null === match ? self : ($.each(_data, function () {
                        eval(match) && results.push(this)
                    }), _data = results, self)
                }, this.data = function () {
                    return _data
                }, this.select = function (a) {
                    if (self._performSort(), !self._hasData())return [];
                    if (self.execute(), $.isFunction(a)) {
                        var b = [];
                        return $.each(_data, function (c, d) {
                            b.push(a(d))
                        }), b
                    }
                    return _data
                }, this.hasMatch = function () {
                    return self._hasData() ? (self.execute(), _data.length > 0) : !1
                }, this.andNot = function (a, b, c) {
                    return _negate = !_negate, self.and(a, b, c)
                }, this.orNot = function (a, b, c) {
                    return _negate = !_negate, self.or(a, b, c)
                }, this.not = function (a, b, c) {
                    return self.andNot(a, b, c)
                }, this.and = function (a, b, c) {
                    return _queuedOperator = " && ", void 0 === a ? self : self._repeatCommand(a, b, c)
                }, this.or = function (a, b, c) {
                    return _queuedOperator = " || ", void 0 === a ? self : self._repeatCommand(a, b, c)
                }, this.orBegin = function () {
                    return _orDepth++, self
                }, this.orEnd = function () {
                    return null !== _query && (_query += ")"), self
                }, this.isNot = function (a) {
                    return _negate = !_negate, self.is(a)
                }, this.is = function (a) {
                    return self._append("this." + a), self._resetNegate(), self
                }, this._compareValues = function (a, b, c, d, e) {
                    var f;
                    f = _useProperties ? "jQuery.jgrid.getAccessor(this,'" + b + "')" : "this", void 0 === c && (c = null);
                    var g = c, h = void 0 === e.stype ? "text" : e.stype;
                    if (null !== c)switch (h) {
                        case"int":
                        case"integer":
                            g = isNaN(Number(g)) || "" === g ? "0" : g, f = "parseInt(" + f + ",10)", g = "parseInt(" + g + ",10)";
                            break;
                        case"float":
                        case"number":
                        case"numeric":
                            g = String(g).replace(_stripNum, ""), g = isNaN(Number(g)) || "" === g ? "0" : g, f = "parseFloat(" + f + ")", g = "parseFloat(" + g + ")";
                            break;
                        case"date":
                        case"datetime":
                            g = String($.jgrid.parseDate.call($t, e.srcfmt || "Y-m-d", g).getTime()), f = 'jQuery.jgrid.parseDate.call(jQuery("#' + $.jgrid.jqID($t.p.id) + '")[0],"' + e.srcfmt + '",' + f + ").getTime()";
                            break;
                        default:
                            f = self._getStr(f), g = self._getStr('"' + self._toStr(g) + '"')
                    }
                    return self._append(f + " " + d + " " + g), self._setCommand(a, b), self._resetNegate(), self
                }, this.equals = function (a, b, c) {
                    return self._compareValues(self.equals, a, b, "==", c)
                }, this.notEquals = function (a, b, c) {
                    return self._compareValues(self.equals, a, b, "!==", c)
                }, this.isNull = function (a, b, c) {
                    return self._compareValues(self.equals, a, null, "===", c)
                }, this.greater = function (a, b, c) {
                    return self._compareValues(self.greater, a, b, ">", c)
                }, this.less = function (a, b, c) {
                    return self._compareValues(self.less, a, b, "<", c)
                }, this.greaterOrEquals = function (a, b, c) {
                    return self._compareValues(self.greaterOrEquals, a, b, ">=", c)
                }, this.lessOrEquals = function (a, b, c) {
                    return self._compareValues(self.lessOrEquals, a, b, "<=", c)
                }, this.startsWith = function (a, b) {
                    var c = null == b ? a : b, d = _trim ? $.trim(c.toString()).length : c.toString().length;
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(b) + '"')) : (null != b && (d = _trim ? $.trim(b.toString()).length : b.toString().length), self._append(self._getStr("this") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(a) + '"'))), self._setCommand(self.startsWith, a), self._resetNegate(), self
                }, this.endsWith = function (a, b) {
                    var c = null == b ? a : b, d = _trim ? $.trim(c.toString()).length : c.toString().length;
                    return self._append(_useProperties ? self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(" + self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".length-" + d + "," + d + ') == "' + self._toStr(b) + '"' : self._getStr("this") + ".substr(" + self._getStr("this") + '.length-"' + self._toStr(a) + '".length,"' + self._toStr(a) + '".length) == "' + self._toStr(a) + '"'), self._setCommand(self.endsWith, a), self._resetNegate(), self
                }, this.contains = function (a, b) {
                    return self._append(_useProperties ? self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + '.indexOf("' + self._toStr(b) + '",0) > -1' : self._getStr("this") + '.indexOf("' + self._toStr(a) + '",0) > -1'), self._setCommand(self.contains, a), self._resetNegate(), self
                }, this.groupBy = function (a, b, c, d) {
                    return self._hasData() ? self._getGroup(_data, a, b, c, d) : null
                }, this.orderBy = function (a, b, c, d, e) {
                    return b = null == b ? "a" : $.trim(b.toString().toLowerCase()), null == c && (c = "text"), null == d && (d = "Y-m-d"), null == e && (e = !1), ("desc" === b || "descending" === b) && (b = "d"), ("asc" === b || "ascending" === b) && (b = "a"), _sorting.push({
                        by: a,
                        dir: b,
                        type: c,
                        datefmt: d,
                        sfunc: e
                    }), self
                }, self
            };
            return new QueryObject(source, null)
        },
        getMethod: function (a) {
            return this.getAccessor($.fn.jqGrid, a)
        },
        extend: function (a) {
            $.extend($.fn.jqGrid, a), this.no_legacy_api || $.fn.extend(a)
        },
        clearBeforeUnload: function (a) {
            var b, c = $("#" + $.jgrid.jqID(a))[0];
            if (c.grid) {
                b = c.grid, $.isFunction(b.emptyRows) && b.emptyRows.call(c, !0, !0), $(document).unbind("mouseup.jqGrid" + c.p.id), $(b.hDiv).unbind("mousemove"), $(c).unbind();
                var d, e = b.headers.length, f = ["formatCol", "sortData", "updatepager", "refreshIndex", "setHeadCheckBox", "constructTr", "formatter", "addXmlData", "addJSONData", "grid", "p"];
                for (d = 0; e > d; d++)b.headers[d].el = null;
                for (d in b)b.hasOwnProperty(d) && (b[d] = null);
                for (d in c.p)c.p.hasOwnProperty(d) && (c.p[d] = $.isArray(c.p[d]) ? [] : null);
                for (e = f.length, d = 0; e > d; d++)c.hasOwnProperty(f[d]) && (c[f[d]] = null, delete c[f[d]])
            }
        },
        gridUnload: function (a) {
            if (a) {
                a = $.trim(a), 0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    var c = {id: $(b).attr("id"), cl: $(b).attr("class")};
                    b.p.pager && $(b.p.pager).unbind().empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
                    var d = document.createElement("table");
                    d.className = c.cl;
                    var e = $.jgrid.jqID(b.id);
                    $(d).removeClass("ui-jqgrid-btable ui-common-table").insertBefore("#gbox_" + e), 1 === $(b.p.pager).parents("#gbox_" + e).length && $(b.p.pager).insertBefore("#gbox_" + e), $.jgrid.clearBeforeUnload(a), $("#gbox_" + e).remove(), $(d).attr({id: c.id}), $("#alertmod_" + $.jgrid.jqID(a)).remove()
                }
            }
        },
        gridDestroy: function (a) {
            if (a) {
                a = $.trim(a), 0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    b.p.pager && $(b.p.pager).remove();
                    try {
                        $.jgrid.clearBeforeUnload(a), $("#gbox_" + $.jgrid.jqID(a)).remove()
                    } catch (c) {
                    }
                }
            }
        },
        styleUI: {
            jQueryUI: {
                common: {
                    disabled: "ui-state-disabled",
                    highlight: "ui-state-highlight",
                    hover: "ui-state-hover",
                    cornerall: "ui-corner-all",
                    cornertop: "ui-corner-top",
                    cornerbottom: "ui-corner-bottom",
                    hidden: "ui-helper-hidden",
                    icon_base: "ui-icon",
                    overlay: "ui-widget-overlay",
                    active: "ui-state-active",
                    error: "ui-state-error",
                    button: "ui-state-default ui-corner-all",
                    content: "ui-widget-content"
                },
                base: {
                    entrieBox: "ui-widget ui-widget-content ui-corner-all",
                    viewBox: "",
                    headerTable: "",
                    headerBox: "ui-state-default",
                    rowTable: "",
                    rowBox: "ui-widget-content",
                    footerTable: "",
                    footerBox: "ui-widget-content",
                    headerDiv: "ui-state-default",
                    gridtitleBox: "ui-widget-header ui-corner-top ui-helper-clearfix",
                    customtoolbarBox: "ui-state-default",
                    loadingBox: "ui-state-default ui-state-active",
                    rownumBox: "ui-state-default",
                    scrollBox: "ui-widget-content",
                    multiBox: "cbox",
                    pagerBox: "ui-state-default ui-corner-bottom",
                    pagerTable: "",
                    toppagerBox: "ui-state-default",
                    pgInput: "ui-corner-all",
                    pgSelectBox: "ui-widget-content ui-corner-all",
                    pgButtonBox: "ui-corner-all",
                    icon_first: "ui-icon-seek-first",
                    icon_prev: "ui-icon-seek-prev",
                    icon_next: "ui-icon-seek-next",
                    icon_end: "ui-icon-seek-end",
                    icon_asc: "ui-icon-triangle-1-n",
                    icon_desc: "ui-icon-triangle-1-s",
                    icon_caption_open: "ui-icon-circle-triangle-n",
                    icon_caption_close: "ui-icon-circle-triangle-s"
                },
                modal: {
                    modal: "ui-widget ui-widget-content ui-corner-all",
                    header: "ui-widget-header ui-corner-all ui-helper-clearfix",
                    content: "ui-widget-content",
                    resizable: "ui-resizable-handle ui-resizable-se",
                    icon_close: "ui-icon-closethick",
                    icon_resizable: "ui-icon-gripsmall-diagonal-se"
                },
                celledit: {inputClass: "ui-widget-content ui-corner-all"},
                inlinedit: {
                    inputClass: "ui-widget-content ui-corner-all",
                    icon_edit_nav: "ui-icon-pencil",
                    icon_add_nav: "ui-icon-plus",
                    icon_save_nav: "ui-icon-disk",
                    icon_cancel_nav: "ui-icon-cancel"
                },
                formedit: {
                    inputClass: "ui-widget-content ui-corner-all",
                    icon_prev: "ui-icon-triangle-1-w",
                    icon_next: "ui-icon-triangle-1-e",
                    icon_save: "ui-icon-disk",
                    icon_close: "ui-icon-close",
                    icon_del: "ui-icon-scissors",
                    icon_cancel: "ui-icon-cancel"
                },
                navigator: {
                    icon_edit_nav: "ui-icon-pencil",
                    icon_add_nav: "ui-icon-plus",
                    icon_del_nav: "ui-icon-trash",
                    icon_search_nav: "ui-icon-search",
                    icon_refresh_nav: "ui-icon-refresh",
                    icon_view_nav: "ui-icon-document",
                    icon_newbutton_nav: "ui-icon-newwin"
                },
                grouping: {icon_plus: "ui-icon-circlesmall-plus", icon_minus: "ui-icon-circlesmall-minus"},
                filter: {
                    table_widget: "ui-widget ui-widget-content",
                    srSelect: "ui-widget-content ui-corner-all",
                    srInput: "ui-widget-content ui-corner-all",
                    menu_widget: "ui-widget ui-widget-content ui-corner-all",
                    icon_search: "ui-icon-search",
                    icon_reset: "ui-icon-arrowreturnthick-1-w",
                    icon_query: "ui-icon-comment"
                },
                subgrid: {icon_plus: "ui-icon-plus", icon_minus: "ui-icon-minus", icon_open: "ui-icon-carat-1-sw"},
                treegrid: {
                    icon_plus: "ui-icon-triangle-1-",
                    icon_minus: "ui-icon-triangle-1-s",
                    icon_leaf: "ui-icon-radio-off"
                },
                fmatter: {
                    icon_edit: "ui-icon-pencil",
                    icon_add: "ui-icon-plus",
                    icon_save: "ui-icon-disk",
                    icon_cancel: "ui-icon-cancel",
                    icon_del: "ui-icon-trash"
                }
            },
            Bootstrap: {
                common: {
                    disabled: "ui-disabled",
                    highlight: "success",
                    hover: "active",
                    cornerall: "",
                    cornertop: "",
                    cornerbottom: "",
                    hidden: "",
                    icon_base: "glyphicon",
                    overlay: "ui-overlay",
                    active: "active",
                    error: "bg-danger",
                    button: "btn btn-default",
                    content: ""
                },
                base: {
                    entrieBox: "",
                    viewBox: "table-responsive",
                    headerTable: "table table-bordered",
                    headerBox: "",
                    rowTable: "table table-bordered",
                    rowBox: "",
                    footerTable: "table table-bordered",
                    footerBox: "",
                    headerDiv: "",
                    gridtitleBox: "",
                    customtoolbarBox: "",
                    loadingBox: "row",
                    rownumBox: "active",
                    scrollBox: "",
                    multiBox: "checkbox",
                    pagerBox: "",
                    pagerTable: "table",
                    toppagerBox: "",
                    pgInput: "form-control",
                    pgSelectBox: "form-control",
                    pgButtonBox: "",
                    icon_first: "glyphicon-step-backward",
                    icon_prev: "glyphicon-backward",
                    icon_next: "glyphicon-forward",
                    icon_end: "glyphicon-step-forward",
                    icon_asc: "glyphicon-triangle-top",
                    icon_desc: "glyphicon-triangle-bottom",
                    icon_caption_open: "glyphicon-circle-arrow-up",
                    icon_caption_close: "glyphicon-circle-arrow-down"
                },
                modal: {
                    modal: "modal-content",
                    header: "modal-header",
                    title: "modal-title",
                    content: "modal-body",
                    resizable: "ui-resizable-handle ui-resizable-se",
                    icon_close: "glyphicon-remove-circle",
                    icon_resizable: "glyphicon-import"
                },
                celledit: {inputClass: "form-control"},
                inlinedit: {
                    inputClass: "form-control",
                    icon_edit_nav: "glyphicon-edit",
                    icon_add_nav: "glyphicon-plus",
                    icon_save_nav: "glyphicon-save",
                    icon_cancel_nav: "glyphicon-remove-circle"
                },
                formedit: {
                    inputClass: "form-control",
                    icon_prev: "glyphicon-step-backward",
                    icon_next: "glyphicon-step-forward",
                    icon_save: "glyphicon-save",
                    icon_close: "glyphicon-remove-circle",
                    icon_del: "glyphicon-trash",
                    icon_cancel: "glyphicon-remove-circle"
                },
                navigator: {
                    icon_edit_nav: "glyphicon-edit",
                    icon_add_nav: "glyphicon-plus",
                    icon_del_nav: "glyphicon-trash",
                    icon_search_nav: "glyphicon-search",
                    icon_refresh_nav: "glyphicon-refresh",
                    icon_view_nav: "glyphicon-info-sign",
                    icon_newbutton_nav: "glyphicon-new-window"
                },
                grouping: {icon_plus: "glyphicon-triangle-right", icon_minus: "glyphicon-triangle-bottom"},
                filter: {
                    table_widget: "table table-condensed",
                    srSelect: "form-control",
                    srInput: "form-control",
                    menu_widget: "",
                    icon_search: "glyphicon-search",
                    icon_reset: "glyphicon-refresh",
                    icon_query: "glyphicon-comment"
                },
                subgrid: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom",
                    icon_open: "glyphicon-indent-left"
                },
                treegrid: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom",
                    icon_leaf: "glyphicon-unchecked"
                },
                fmatter: {
                    icon_edit: "glyphicon-edit",
                    icon_add: "glyphicon-plus",
                    icon_save: "glyphicon-save",
                    icon_cancel: "glyphicon-remove-circle",
                    icon_del: "glyphicon-trash"
                }
            }
        }
    }), $.fn.jqGrid = function (a) {
        if ("string" == typeof a) {
            var b = $.jgrid.getMethod(a);
            if (!b)throw"jqGrid - No such method: " + a;
            var c = $.makeArray(arguments).slice(1);
            return b.apply(this, c)
        }
        return this.each(function () {
            if (!this.grid) {
                var b;
                null != a && void 0 !== a.data && (b = a.data, a.data = []);
                var c = $.extend(!0, {
                    url: "",
                    height: 150,
                    page: 1,
                    rowNum: 20,
                    rowTotal: null,
                    records: 0,
                    pager: "",
                    pgbuttons: !0,
                    pginput: !0,
                    colModel: [],
                    rowList: [],
                    colNames: [],
                    sortorder: "asc",
                    sortname: "",
                    datatype: "xml",
                    mtype: "GET",
                    altRows: !1,
                    selarrrow: [],
                    savedRow: [],
                    shrinkToFit: !0,
                    xmlReader: {},
                    jsonReader: {},
                    subGrid: !1,
                    subGridModel: [],
                    reccount: 0,
                    lastpage: 0,
                    lastsort: 0,
                    selrow: null,
                    beforeSelectRow: null,
                    onSelectRow: null,
                    onSortCol: null,
                    ondblClickRow: null,
                    onRightClickRow: null,
                    onPaging: null,
                    onSelectAll: null,
                    onInitGrid: null,
                    loadComplete: null,
                    gridComplete: null,
                    loadError: null,
                    loadBeforeSend: null,
                    afterInsertRow: null,
                    beforeRequest: null,
                    beforeProcessing: null,
                    onHeaderClick: null,
                    viewrecords: !1,
                    loadonce: !1,
                    multiselect: !1,
                    multikey: !1,
                    editurl: null,
                    search: !1,
                    caption: "",
                    hidegrid: !0,
                    hiddengrid: !1,
                    postData: {},
                    userData: {},
                    treeGrid: !1,
                    treeGridModel: "nested",
                    treeReader: {},
                    treeANode: -1,
                    ExpandColumn: null,
                    tree_root_level: 0,
                    prmNames: {
                        page: "page",
                        rows: "rows",
                        sort: "sidx",
                        order: "sord",
                        search: "_search",
                        nd: "nd",
                        id: "id",
                        oper: "oper",
                        editoper: "edit",
                        addoper: "add",
                        deloper: "del",
                        subgridid: "id",
                        npage: null,
                        totalrows: "totalrows"
                    },
                    forceFit: !1,
                    gridstate: "visible",
                    cellEdit: !1,
                    cellsubmit: "remote",
                    nv: 0,
                    loadui: "enable",
                    toolbar: [!1, ""],
                    scroll: !1,
                    multiboxonly: !1,
                    deselectAfterSort: !0,
                    scrollrows: !1,
                    autowidth: !1,
                    scrollOffset: 18,
                    cellLayout: 5,
                    subGridWidth: 20,
                    multiselectWidth: 30,
                    gridview: !0,
                    rownumWidth: 35,
                    rownumbers: !1,
                    pagerpos: "center",
                    recordpos: "right",
                    footerrow: !1,
                    userDataOnFooter: !1,
                    hoverrows: !0,
                    altclass: "ui-priority-secondary",
                    viewsortcols: [!1, "vertical", !0],
                    resizeclass: "",
                    autoencode: !1,
                    remapColumns: [],
                    ajaxGridOptions: {},
                    direction: "ltr",
                    toppager: !1,
                    headertitles: !1,
                    scrollTimeout: 40,
                    data: [],
                    _index: {},
                    grouping: !1,
                    groupingView: {
                        groupField: [],
                        groupOrder: [],
                        groupText: [],
                        groupColumnShow: [],
                        groupSummary: [],
                        showSummaryOnHide: !1,
                        sortitems: [],
                        sortnames: [],
                        summary: [],
                        summaryval: [],
                        plusicon: "",
                        minusicon: "",
                        displayField: [],
                        groupSummaryPos: [],
                        formatDisplayField: [],
                        _locgr: !1
                    },
                    ignoreCase: !0,
                    cmTemplate: {},
                    idPrefix: "",
                    multiSort: !1,
                    minColWidth: 33,
                    scrollPopUp: !1,
                    scrollTopOffset: 0,
                    scrollLeftOffset: "100%",
                    storeNavOptions: !1,
                    regional: "en",
                    styleUI: "jQueryUI",
                    responsive: !1,
                    restoreCellonFail: !0
                }, $.jgrid.defaults, a);
                void 0 !== b && (c.data = b, a.data = b);
                var d = this, e = {
                    headers: [], cols: [], footers: [], dragStart: function (a, b, e) {
                        var f = $(this.bDiv).offset().left;
                        this.resizing = {
                            idx: a,
                            startX: b.pageX,
                            sOL: b.pageX - f
                        }, this.hDiv.style.cursor = "col-resize", this.curGbox = $("#rs_m" + $.jgrid.jqID(c.id), "#gbox_" + $.jgrid.jqID(c.id)), this.curGbox.css({
                            display: "block",
                            left: b.pageX - f,
                            top: e[1],
                            height: e[2]
                        }), $(d).triggerHandler("jqGridResizeStart", [b, a]), $.isFunction(c.resizeStart) && c.resizeStart.call(d, b, a), document.onselectstart = function () {
                            return !1
                        }
                    }, dragMove: function (a) {
                        if (this.resizing) {
                            var b, d, e = a.pageX - this.resizing.startX, f = this.headers[this.resizing.idx], g = "ltr" === c.direction ? f.width + e : f.width - e;
                            g > 33 && (this.curGbox.css({left: this.resizing.sOL + e}), c.forceFit === !0 ? (b = this.headers[this.resizing.idx + c.nv], d = "ltr" === c.direction ? b.width - e : b.width + e, d > c.minColWidth && (f.newWidth = g, b.newWidth = d)) : (this.newWidth = "ltr" === c.direction ? c.tblwidth + e : c.tblwidth - e, f.newWidth = g))
                        }
                    }, dragEnd: function (a) {
                        if (this.hDiv.style.cursor = "default", this.resizing) {
                            var b = this.resizing.idx, e = this.headers[b].newWidth || this.headers[b].width;
                            e = parseInt(e, 10), this.resizing = !1, $("#rs_m" + $.jgrid.jqID(c.id)).css("display", "none"), c.colModel[b].width = e, this.headers[b].width = e, this.headers[b].el.style.width = e + "px", this.cols[b].style.width = e + "px", this.footers.length > 0 && (this.footers[b].style.width = e + "px"), c.forceFit === !0 ? (e = this.headers[b + c.nv].newWidth || this.headers[b + c.nv].width, this.headers[b + c.nv].width = e, this.headers[b + c.nv].el.style.width = e + "px", this.cols[b + c.nv].style.width = e + "px", this.footers.length > 0 && (this.footers[b + c.nv].style.width = e + "px"), c.colModel[b + c.nv].width = e) : (c.tblwidth = this.newWidth || c.tblwidth, $("table:first", this.bDiv).css("width", c.tblwidth + "px"), $("table:first", this.hDiv).css("width", c.tblwidth + "px"), this.hDiv.scrollLeft = this.bDiv.scrollLeft, c.footerrow && ($("table:first", this.sDiv).css("width", c.tblwidth + "px"), this.sDiv.scrollLeft = this.bDiv.scrollLeft)), a && ($(d).triggerHandler("jqGridResizeStop", [e, b]), $.isFunction(c.resizeStop) && c.resizeStop.call(d, e, b))
                        }
                        this.curGbox = null, document.onselectstart = function () {
                            return !0
                        }
                    }, populateVisible: function () {
                        e.timer && clearTimeout(e.timer), e.timer = null;
                        var a = $(e.bDiv).height();
                        if (a) {
                            var b, f, g = $("table:first", e.bDiv);
                            if (g[0].rows.length)try {
                                b = g[0].rows[1], f = b ? $(b).outerHeight() || e.prevRowHeight : e.prevRowHeight
                            } catch (h) {
                                f = e.prevRowHeight
                            }
                            if (f) {
                                e.prevRowHeight = f;
                                var i, j, k, l = c.rowNum, m = e.scrollTop = e.bDiv.scrollTop, n = Math.round(g.position().top) - m, o = n + g.height(), p = f * l;
                                if (a > o && 0 >= n && (void 0 === c.lastpage || (parseInt((o + m + p - 1) / p, 10) || 0) <= c.lastpage) && (j = parseInt((a - o + p - 1) / p, 10) || 1, o >= 0 || 2 > j || c.scroll === !0 ? (i = (Math.round((o + m) / p) || 0) + 1, n = -1) : n = 1), n > 0 && (i = (parseInt(m / p, 10) || 0) + 1, j = (parseInt((m + a) / p, 10) || 0) + 2 - i, k = !0), j) {
                                    if (c.lastpage && (i > c.lastpage || 1 === c.lastpage || i === c.page && i === c.lastpage))return;
                                    e.hDiv.loading ? e.timer = setTimeout(e.populateVisible, c.scrollTimeout) : (c.page = i, k && (e.selectionPreserver(g[0]), e.emptyRows.call(g[0], !1, !1)), e.populate(j)), c.scrollPopUp && null != c.lastpage && ($("#scroll_g" + c.id).show().html($.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", c.pgtext), c.page, c.lastpage)).css({
                                        top: c.scrollTopOffset + m * ((parseInt(c.height, 10) - 45) / (parseInt(f, 10) * parseInt(c.records, 10))) + "px",
                                        left: c.scrollLeftOffset
                                    }), $(this).mouseout(function () {
                                        $("#scroll_g" + c.id).hide()
                                    }))
                                }
                            }
                        }
                    }, scrollGrid: function (a) {
                        if (c.scroll) {
                            var b = e.bDiv.scrollTop;
                            void 0 === e.scrollTop && (e.scrollTop = 0), b !== e.scrollTop && (e.scrollTop = b, e.timer && clearTimeout(e.timer), e.timer = setTimeout(e.populateVisible, c.scrollTimeout))
                        }
                        e.hDiv.scrollLeft = e.bDiv.scrollLeft, c.footerrow && (e.sDiv.scrollLeft = e.bDiv.scrollLeft), c.frozenColumns && $(e.fbDiv).scrollTop(e.bDiv.scrollTop), a && a.stopPropagation()
                    }, selectionPreserver: function (a) {
                        var b = a.p, c = b.selrow, d = b.selarrrow ? $.makeArray(b.selarrrow) : null, e = a.grid.bDiv.scrollLeft, f = function () {
                            var g;
                            if (b.selrow = null, b.selarrrow = [], b.multiselect && d && d.length > 0)for (g = 0; g < d.length; g++)d[g] !== c && $(a).jqGrid("setSelection", d[g], !1, null);
                            c && $(a).jqGrid("setSelection", c, !1, null), a.grid.bDiv.scrollLeft = e, $(a).unbind(".selectionPreserver", f)
                        };
                        $(a).bind("jqGridGridComplete.selectionPreserver", f)
                    }
                };
                if ("TABLE" !== this.tagName.toUpperCase() || null == this.id)return void alert("Element is not a table or has no id!");
                if (void 0 !== document.documentMode && document.documentMode <= 5)return void alert("Grid can not be used in this ('quirks') mode!");
                var f, g, h, i = 0;
                for (g in $.jgrid.regional)$.jgrid.regional.hasOwnProperty(g) && (0 === i && (f = g), i++);
                if (1 === i && f !== c.regional && (c.regional = f), $(this).empty().attr("tabindex", "0"), this.p = c, this.p.useProp = !!$.fn.prop, 0 === this.p.colNames.length)for (i = 0; i < this.p.colModel.length; i++)this.p.colNames[i] = this.p.colModel[i].label || this.p.colModel[i].name;
                if (this.p.colNames.length !== this.p.colModel.length)return void alert($.jgrid.getRegional(this, "errors.model"));
                var j, k = $.jgrid.getMethod("getStyleUI"), l = d.p.styleUI + ".common", m = k(l, "disabled", !0), n = k(l, "highlight", !0), o = k(l, "hover", !0), p = k(l, "cornerall", !0), q = k(l, "icon_base", !0), r = $.jgrid.msie, s = [], t = [], u = [];
                l = d.p.styleUI + ".base", j = $("<div " + k(l, "viewBox", !1, "ui-jqgrid-view") + " role='grid'></div>"), d.p.direction = $.trim(d.p.direction.toLowerCase()), d.p._ald = !1, -1 === $.inArray(d.p.direction, ["ltr", "rtl"]) && (d.p.direction = "ltr"), h = d.p.direction, $(j).insertBefore(this), $(this).appendTo(j);
                var v = $("<div " + k(l, "entrieBox", !1, "ui-jqgrid") + "></div>");
                $(v).attr({
                    id: "gbox_" + this.id,
                    dir: h
                }).insertBefore(j), $(j).attr("id", "gview_" + this.id).appendTo(v), $("<div " + k(d.p.styleUI + ".common", "overlay", !1, "jqgrid-overlay") + " id='lui_" + this.id + "'></div>").insertBefore(j), $("<div " + k(l, "loadingBox", !1, "loading") + " id='load_" + this.id + "'>" + $.jgrid.getRegional(d, "defaults.loadtext", this.p.loadtext) + "</div>").insertBefore(j), $(this).attr({
                    role: "presentation",
                    "aria-multiselectable": !!this.p.multiselect,
                    "aria-labelledby": "gbox_" + this.id
                });
                var w, x = ["shiftKey", "altKey", "ctrlKey"], y = function (a, b) {
                    return a = parseInt(a, 10), isNaN(a) ? b || 0 : a
                }, z = function (a, b, c, f, g, h) {
                    var i, j, k = d.p.colModel[a], l = k.align, m = 'style="', n = k.classes, o = k.name, p = [];
                    return l && (m += "text-align:" + l + ";"), k.hidden === !0 && (m += "display:none;"), 0 === b ? m += "width: " + e.headers[a].width + "px;" : ($.isFunction(k.cellattr) || "string" == typeof k.cellattr && null != $.jgrid.cellattr && $.isFunction($.jgrid.cellattr[k.cellattr])) && (i = $.isFunction(k.cellattr) ? k.cellattr : $.jgrid.cellattr[k.cellattr], j = i.call(d, g, c, f, k, h), j && "string" == typeof j && (j = j.replace(/style/i, "style").replace(/title/i, "title"), j.indexOf("title") > -1 && (k.title = !1), j.indexOf("class") > -1 && (n = void 0), p = j.replace(/\-style/g, "-sti").split(/style/), 2 === p.length ? (p[1] = $.trim(p[1].replace(/\-sti/g, "-style").replace("=", "")), (0 === p[1].indexOf("'") || 0 === p[1].indexOf('"')) && (p[1] = p[1].substring(1)), m += p[1].replace(/'/gi, '"')) : m += '"')), p.length || (p[0] = "", m += '"'), m += (void 0 !== n ? ' class="' + n + '"' : "") + (k.title && c ? ' title="' + $.jgrid.stripHtml(c) + '"' : ""), m += ' aria-describedby="' + d.p.id + "_" + o + '"', m + p[0]
                }, A = function (a) {
                    return null == a || "" === a ? "&#160;" : d.p.autoencode ? $.jgrid.htmlEncode(a) : String(a)
                }, B = function (a, b, c, e, f) {
                    var g, h = d.p.colModel[c];
                    if (void 0 !== h.formatter) {
                        a = "" !== String(d.p.idPrefix) ? $.jgrid.stripPref(d.p.idPrefix, a) : a;
                        var i = {rowId: a, colModel: h, gid: d.p.id, pos: c, styleUI: d.p.styleUI};
                        g = $.isFunction(h.formatter) ? h.formatter.call(d, b, i, e, f) : $.fmatter ? $.fn.fmatter.call(d, h.formatter, b, i, e, f) : A(b)
                    } else g = A(b);
                    return g
                }, C = function (a, b, c, d, e, f) {
                    var g, h;
                    return g = B(a, b, c, e, "add"), h = z(c, d, g, e, a, f), '<td role="gridcell" ' + h + ">" + g + "</td>"
                }, D = function (a, b, c, e, f) {
                    var g = '<input role="checkbox" type="checkbox" id="jqg_' + d.p.id + "_" + a + '" ' + f + ' name="jqg_' + d.p.id + "_" + a + '"' + (e ? 'checked="checked"' : "") + "/>", h = z(b, c, "", null, a, !0);
                    return '<td role="gridcell" ' + h + ">" + g + "</td>"
                }, E = function (a, b, c, d, e) {
                    var f = (parseInt(c, 10) - 1) * parseInt(d, 10) + 1 + b, g = z(a, b, f, null, b, !0);
                    return '<td role="gridcell" ' + e + " " + g + ">" + f + "</td>"
                }, F = function (a) {
                    var b, c, e = [], f = 0;
                    for (c = 0; c < d.p.colModel.length; c++)b = d.p.colModel[c], "cb" !== b.name && "subgrid" !== b.name && "rn" !== b.name && (e[f] = "local" === a ? b.name : "xml" === a || "xmlstring" === a ? b.xmlmap || b.name : b.jsonmap || b.name, d.p.keyName !== !1 && b.key === !0 && (d.p.keyName = e[f]), f++);
                    return e
                }, G = function (a) {
                    var b = d.p.remapColumns;
                    return b && b.length || (b = $.map(d.p.colModel, function (a, b) {
                        return b
                    })), a && (b = $.map(b, function (b) {
                        return a > b ? null : b - a
                    })), b
                }, H = function (a, b) {
                    var c;
                    this.p.deepempty ? $(this.rows).slice(1).remove() : (c = this.rows.length > 0 ? this.rows[0] : null, $(this.firstChild).empty().append(c)), a && this.p.scroll && ($(this.grid.bDiv.firstChild).css({height: "auto"}), $(this.grid.bDiv.firstChild.firstChild).css({
                        height: "0px",
                        display: "none"
                    }), 0 !== this.grid.bDiv.scrollTop && (this.grid.bDiv.scrollTop = 0)), b === !0 && this.p.treeGrid && !this.p.loadonce && (this.p.data = [], this.p._index = {})
                }, I = function () {
                    var a, b, c, e, f, g, h, i, j, k, l, m = d.p, n = m.data, o = n.length, p = m.localReader, q = m.colModel, r = p.cell, s = (m.multiselect === !0 ? 1 : 0) + (m.subGrid === !0 ? 1 : 0) + (m.rownumbers === !0 ? 1 : 0), t = m.scroll ? $.jgrid.randId() : 1;
                    if ("local" === m.datatype && p.repeatitems === !0)for (j = G(s), k = F("local"), e = m.keyIndex === !1 ? $.isFunction(p.id) ? p.id.call(d, n) : p.id : m.keyIndex, a = 0; o > a; a++) {
                        for (c = n[a], f = $.jgrid.getAccessor(c, e), void 0 === f && ("number" == typeof e && null != q[e + s] && (f = $.jgrid.getAccessor(c, q[e + s].name)), void 0 === f && (f = t + a, r && (g = $.jgrid.getAccessor(c, r) || c, f = null != g && void 0 !== g[e] ? g[e] : f, g = null))), i = {}, i[p.id] = f, r && (c = $.jgrid.getAccessor(c, r) || c), l = $.isArray(c) ? j : k, b = 0; b < l.length; b++)h = $.jgrid.getAccessor(c, l[b]), i[q[b + s].name] = h;
                        $.extend(!0, n[a], i)
                    }
                }, J = function () {
                    var a, b, c, e = d.p.data.length;
                    for (a = d.p.keyName === !1 || d.p.loadonce === !0 ? d.p.localReader.id : d.p.keyName, d.p._index = [], b = 0; e > b; b++)c = $.jgrid.getAccessor(d.p.data[b], a), void 0 === c && (c = String(b + 1)), d.p._index[c] = b
                }, K = function (a, b, c, e, f) {
                    var g, h = "-1", i = "", j = b ? "display:none;" : "", k = $(d).triggerHandler("jqGridRowAttr", [e, f, a]);
                    if ("object" != typeof k && (k = $.isFunction(d.p.rowattr) ? d.p.rowattr.call(d, e, f, a) : "string" == typeof d.p.rowattr && null != $.jgrid.rowattr && $.isFunction($.jgrid.rowattr[d.p.rowattr]) ? $.jgrid.rowattr[d.p.rowattr].call(d, e, f, a) : {}), !$.isEmptyObject(k)) {
                        k.hasOwnProperty("id") && (a = k.id, delete k.id), k.hasOwnProperty("tabindex") && (h = k.tabindex, delete k.tabindex), k.hasOwnProperty("style") && (j += k.style, delete k.style), k.hasOwnProperty("class") && (c += " " + k["class"], delete k["class"]);
                        try {
                            delete k.role
                        } catch (l) {
                        }
                        for (g in k)k.hasOwnProperty(g) && (i += " " + g + "=" + k[g])
                    }
                    return '<tr role="row" id="' + a + '" tabindex="' + h + '" class="' + c + '"' + ("" === j ? "" : ' style="' + j + '"') + i + ">"
                }, L = function (a, b, c, e) {
                    var f = new Date, g = "local" !== d.p.datatype && d.p.loadonce || "xmlstring" === d.p.datatype, h = "_id_", i = d.p.xmlReader, j = "local" === d.p.datatype ? "local" : "xml";
                    if (g && (d.p.data = [], d.p._index = {}, d.p.localReader.id = h), d.p.reccount = 0, $.isXMLDoc(a)) {
                        -1 !== d.p.treeANode || d.p.scroll ? b = b > 1 ? b : 1 : (H.call(d, !1, !0), b = 1);
                        var m, n, o, p, q, r, s, t, u, v, w = $(d), x = 0, z = d.p.multiselect === !0 ? 1 : 0, A = 0, B = d.p.rownumbers === !0 ? 1 : 0, I = [], J = {}, L = [], M = d.p.altRows === !0 ? d.p.altclass : "", N = k(l, "rowBox", !0, "jqgrow ui-row-" + d.p.direction);
                        d.p.subGrid === !0 && (A = 1, p = $.jgrid.getMethod("addSubGridCell")), i.repeatitems || (I = F(j)), q = d.p.keyName === !1 ? $.isFunction(i.id) ? i.id.call(d, a) : i.id : d.p.keyName, r = -1 === String(q).indexOf("[") ? I.length ? function (a, b) {
                            return $(q, a).text() || b
                        } : function (a, b) {
                            return $(i.cell, a).eq(q).text() || b
                        } : function (a, b) {
                            return a.getAttribute(q.replace(/[\[\]]/g, "")) || b
                        }, d.p.userData = {}, d.p.page = y($.jgrid.getXmlData(a, i.page), d.p.page), d.p.lastpage = y($.jgrid.getXmlData(a, i.total), 1), d.p.records = y($.jgrid.getXmlData(a, i.records)), $.isFunction(i.userdata) ? d.p.userData = i.userdata.call(d, a) || {} : $.jgrid.getXmlData(a, i.userdata, !0).each(function () {
                            d.p.userData[this.getAttribute("name")] = $(this).text()
                        });
                        var O = $.jgrid.getXmlData(a, i.root, !0);
                        O = $.jgrid.getXmlData(O, i.row, !0), O || (O = []);
                        var P, Q = O.length, R = 0, S = [], T = parseInt(d.p.rowNum, 10), U = d.p.scroll ? $.jgrid.randId() : 1, V = $("#" + $.jgrid.jqID(d.p.id) + " tbody:first");
                        if (Q > 0 && d.p.page <= 0 && (d.p.page = 1), O && Q) {
                            e && (T *= e + 1);
                            var W, X = $.isFunction(d.p.afterInsertRow), Y = !1, Z = B ? k(l, "rownumBox", !1, "jqgrid-rownum") : "", _ = z ? k(l, "multiBox", !1, "cbox") : "";
                            for (d.p.grouping && (Y = d.p.groupingView.groupCollapse === !0, W = $.jgrid.getMethod("groupingPrepare")); Q > R;) {
                                t = O[R], u = r(t, U + R), u = d.p.idPrefix + u, P = 0 === b ? 0 : b + 1, v = N + ((P + R) % 2 === 1 ? " " + M : "");
                                var ab = L.length;
                                if (L.push(""), B && L.push(E(0, R, d.p.page, d.p.rowNum, Z)), z && L.push(D(u, B, R, !1, _)), A && L.push(p.call(w, z + B, R + b)), i.repeatitems) {
                                    s || (s = G(z + A + B));
                                    var bb = $.jgrid.getXmlData(t, i.cell, !0);
                                    $.each(s, function (a) {
                                        var c = bb[this];
                                        return c ? (o = c.textContent || c.text, J[d.p.colModel[a + z + A + B].name] = o, void L.push(C(u, o, a + z + A + B, R + b, t, J))) : !1
                                    })
                                } else for (m = 0; m < I.length; m++)o = $.jgrid.getXmlData(t, I[m]), J[d.p.colModel[m + z + A + B].name] = o, L.push(C(u, o, m + z + A + B, R + b, t, J));
                                if (L[ab] = K(u, Y, v, J, t), L.push("</tr>"), d.p.grouping && (S.push(L), d.p.groupingView._locgr || W.call(w, J, R), L = []), (g || d.p.treeGrid === !0 && !d.p._ald) && (J[h] = $.jgrid.stripPref(d.p.idPrefix, u), d.p.data.push(J), d.p._index[J[h]] = d.p.data.length - 1), d.p.gridview === !1 && (V.append(L.join("")), w.triggerHandler("jqGridAfterInsertRow", [u, J, t]), X && d.p.afterInsertRow.call(d, u, J, t), L = []), J = {}, x++, R++, x === T)break
                            }
                        }
                        if (d.p.gridview === !0 && (n = d.p.treeANode > -1 ? d.p.treeANode : 0, d.p.grouping ? g || (w.jqGrid("groupingRender", S, d.p.colModel.length, d.p.page, T), S = null) : d.p.treeGrid === !0 && n > 0 ? $(d.rows[n]).after(L.join("")) : (V.append(L.join("")), d.grid.cols = d.rows[0].cells)), d.p.subGrid === !0)try {
                            w.jqGrid("addSubGrid", z + B)
                        } catch (cb) {
                        }
                        if (d.p.totaltime = new Date - f, x > 0 && 0 === d.p.records && (d.p.records = Q), L = null, d.p.treeGrid === !0)try {
                            w.jqGrid("setTreeNode", n + 1, x + n + 1)
                        } catch (db) {
                        }
                        if (d.p.reccount = x, d.p.treeANode = -1, d.p.userDataOnFooter && w.jqGrid("footerData", "set", d.p.userData, !0), g && (d.p.records = Q, d.p.lastpage = Math.ceil(Q / T)), c || d.updatepager(!1, !0), g) {
                            for (; Q > x;) {
                                if (t = O[x], u = r(t, x + U), u = d.p.idPrefix + u, i.repeatitems) {
                                    s || (s = G(z + A + B));
                                    var eb = $.jgrid.getXmlData(t, i.cell, !0);
                                    $.each(s, function (a) {
                                        var b = eb[this];
                                        return b ? (o = b.textContent || b.text, void(J[d.p.colModel[a + z + A + B].name] = o)) : !1
                                    })
                                } else for (m = 0; m < I.length; m++)o = $.jgrid.getXmlData(t, I[m]), J[d.p.colModel[m + z + A + B].name] = o;
                                J[h] = $.jgrid.stripPref(d.p.idPrefix, u), d.p.grouping && W.call(w, J, x), d.p.data.push(J), d.p._index[J[h]] = d.p.data.length - 1, J = {}, x++
                            }
                            d.p.grouping && (d.p.groupingView._locgr = !0, w.jqGrid("groupingRender", S, d.p.colModel.length, d.p.page, T), S = null)
                        }
                    }
                }, M = function (a, b, c, e) {
                    var f = new Date;
                    if (a) {
                        -1 !== d.p.treeANode || d.p.scroll ? b = b > 1 ? b : 1 : (H.call(d, !1, !0), b = 1);
                        var g, h, i = "_id_", j = "local" !== d.p.datatype && d.p.loadonce || "jsonstring" === d.p.datatype;
                        j && (d.p.data = [], d.p._index = {}, d.p.localReader.id = i), d.p.reccount = 0, "local" === d.p.datatype ? (g = d.p.localReader, h = "local") : (g = d.p.jsonReader, h = "json");
                        var m, o, p, q, r, s, t, u, v, w, x, z, A = $(d), B = 0, I = [], J = d.p.multiselect ? 1 : 0, L = d.p.subGrid === !0 ? 1 : 0, M = d.p.rownumbers === !0 ? 1 : 0, N = G(J + L + M), O = F(h), P = {}, Q = [], R = d.p.altRows === !0 ? d.p.altclass : "", S = k(l, "rowBox", !0, "jqgrow ui-row-" + d.p.direction);
                        d.p.page = y($.jgrid.getAccessor(a, g.page), d.p.page), d.p.lastpage = y($.jgrid.getAccessor(a, g.total), 1), d.p.records = y($.jgrid.getAccessor(a, g.records)), d.p.userData = $.jgrid.getAccessor(a, g.userdata) || {}, L && (r = $.jgrid.getMethod("addSubGridCell")), v = d.p.keyName === !1 ? $.isFunction(g.id) ? g.id.call(d, a) : g.id : d.p.keyName, u = $.jgrid.getAccessor(a, g.root), null == u && $.isArray(a) && (u = a), u || (u = []), t = u.length, o = 0, t > 0 && d.p.page <= 0 && (d.p.page = 1);
                        var T, U, V = parseInt(d.p.rowNum, 10), W = d.p.scroll ? $.jgrid.randId() : 1, X = !1;
                        e && (V *= e + 1), "local" !== d.p.datatype || d.p.deselectAfterSort || (X = !0);
                        var Y, Z = $.isFunction(d.p.afterInsertRow), _ = [], ab = !1, bb = $("#" + $.jgrid.jqID(d.p.id) + " tbody:first"), cb = M ? k(l, "rownumBox", !1, "jqgrid-rownum") : "", db = J ? k(l, "multiBox", !1, "cbox") : "";
                        for (d.p.grouping && (ab = d.p.groupingView.groupCollapse === !0, Y = $.jgrid.getMethod("groupingPrepare")); t > o;) {
                            if (q = u[o], x = $.jgrid.getAccessor(q, v), void 0 === x && ("number" == typeof v && null != d.p.colModel[v + J + L + M] && (x = $.jgrid.getAccessor(q, d.p.colModel[v + J + L + M].name)), void 0 === x && (x = W + o, 0 === I.length && g.cell))) {
                                var eb = $.jgrid.getAccessor(q, g.cell) || q;
                                x = null != eb && void 0 !== eb[v] ? eb[v] : x, eb = null
                            }
                            x = d.p.idPrefix + x, T = 1 === b ? 0 : b, z = S + ((T + o) % 2 === 1 ? " " + R : ""), X && (U = d.p.multiselect ? -1 !== $.inArray(x, d.p.selarrrow) : x === d.p.selrow);
                            var fb = Q.length;
                            for (Q.push(""), M && Q.push(E(0, o, d.p.page, d.p.rowNum, cb)), J && Q.push(D(x, M, o, U, db)), L && Q.push(r.call(A, J + M, o + b)), s = O, g.repeatitems && (g.cell && (q = $.jgrid.getAccessor(q, g.cell) || q), $.isArray(q) && (s = N)), p = 0; p < s.length; p++)m = $.jgrid.getAccessor(q, s[p]), P[d.p.colModel[p + J + L + M].name] = m, Q.push(C(x, m, p + J + L + M, o + b, q, P));
                            if (z += U ? " " + n : "", Q[fb] = K(x, ab, z, P, q), Q.push("</tr>"), d.p.grouping && (_.push(Q), d.p.groupingView._locgr || Y.call(A, P, o), Q = []), (j || d.p.treeGrid === !0 && !d.p._ald) && (P[i] = $.jgrid.stripPref(d.p.idPrefix, x), d.p.data.push(P), d.p._index[P[i]] = d.p.data.length - 1), d.p.gridview === !1 && (bb.append(Q.join("")), A.triggerHandler("jqGridAfterInsertRow", [x, P, q]), Z && d.p.afterInsertRow.call(d, x, P, q), Q = []), P = {}, B++, o++, B === V)break
                        }
                        if (d.p.gridview === !0 && (w = d.p.treeANode > -1 ? d.p.treeANode : 0, d.p.grouping ? j || (A.jqGrid("groupingRender", _, d.p.colModel.length, d.p.page, V), _ = null) : d.p.treeGrid === !0 && w > 0 ? $(d.rows[w]).after(Q.join("")) : (bb.append(Q.join("")), d.grid.cols = d.rows[0].cells)), d.p.subGrid === !0)try {
                            A.jqGrid("addSubGrid", J + M)
                        } catch (gb) {
                        }
                        if (d.p.totaltime = new Date - f, B > 0 && 0 === d.p.records && (d.p.records = t), Q = null, d.p.treeGrid === !0)try {
                            A.jqGrid("setTreeNode", w + 1, B + w + 1)
                        } catch (hb) {
                        }
                        if (d.p.reccount = B, d.p.treeANode = -1, d.p.userDataOnFooter && A.jqGrid("footerData", "set", d.p.userData, !0), j && (d.p.records = t, d.p.lastpage = Math.ceil(t / V)), c || d.updatepager(!1, !0), j) {
                            for (; t > B && u[B];) {
                                if (q = u[B], x = $.jgrid.getAccessor(q, v), void 0 === x && ("number" == typeof v && null != d.p.colModel[v + J + L + M] && (x = $.jgrid.getAccessor(q, d.p.colModel[v + J + L + M].name)), void 0 === x && (x = W + B, 0 === I.length && g.cell))) {
                                    var ib = $.jgrid.getAccessor(q, g.cell) || q;
                                    x = null != ib && void 0 !== ib[v] ? ib[v] : x, ib = null
                                }
                                if (q) {
                                    for (x = d.p.idPrefix + x, s = O, g.repeatitems && (g.cell && (q = $.jgrid.getAccessor(q, g.cell) || q), $.isArray(q) && (s = N)), p = 0; p < s.length; p++)P[d.p.colModel[p + J + L + M].name] = $.jgrid.getAccessor(q, s[p]);
                                    P[i] = $.jgrid.stripPref(d.p.idPrefix, x), d.p.grouping && Y.call(A, P, B), d.p.data.push(P), d.p._index[P[i]] = d.p.data.length - 1, P = {}
                                }
                                B++
                            }
                            d.p.grouping && (d.p.groupingView._locgr = !0, A.jqGrid("groupingRender", _, d.p.colModel.length, d.p.page, V), _ = null)
                        }
                    }
                }, N = function () {
                    function a(b) {
                        var c, e, f, g, h, i, k = 0;
                        if (null != b.groups) {
                            for (e = b.groups.length && "OR" === b.groupOp.toString().toUpperCase(), e && r.orBegin(), c = 0; c < b.groups.length; c++) {
                                k > 0 && e && r.or();
                                try {
                                    a(b.groups[c])
                                } catch (l) {
                                    alert(l)
                                }
                                k++
                            }
                            e && r.orEnd()
                        }
                        if (null != b.rules)try {
                            for (f = b.rules.length && "OR" === b.groupOp.toString().toUpperCase(), f && r.orBegin(), c = 0; c < b.rules.length; c++)h = b.rules[c], g = b.groupOp.toString().toUpperCase(), q[h.op] && h.field && (k > 0 && g && "OR" === g && (r = r.or()), i = j[h.field], "date" === i.stype && i.srcfmt && i.newfmt && i.srcfmt !== i.newfmt && (h.data = $.jgrid.parseDate.call(d, i.newfmt, h.data, i.srcfmt)), r = q[h.op](r, g)(h.field, h.data, j[h.field])), k++;
                            f && r.orEnd()
                        } catch (m) {
                            alert(m)
                        }
                    }

                    var b, c, e, f, g = d.p.multiSort ? [] : "", h = [], i = !1, j = {}, k = [], l = [];
                    if ($.isArray(d.p.data)) {
                        var m, n, o, p = d.p.grouping ? d.p.groupingView : !1;
                        if ($.each(d.p.colModel, function () {
                                if (c = this.sorttype || "text", o = this.index || this.name, "date" === c || "datetime" === c ? (this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? (b = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat : $.jgrid.getRegional(d, "formatter.date.srcformat"), e = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat : $.jgrid.getRegional(d, "formatter.date.newformat")) : b = e = this.datefmt || "Y-m-d", j[o] = {
                                        stype: c,
                                        srcfmt: b,
                                        newfmt: e,
                                        sfunc: this.sortfunc || null
                                    }) : j[o] = {
                                        stype: c,
                                        srcfmt: "",
                                        newfmt: "",
                                        sfunc: this.sortfunc || null
                                    }, d.p.grouping)for (n = 0, m = p.groupField.length; m > n; n++)this.name === p.groupField[n] && (k[n] = j[o], l[n] = o);
                                d.p.multiSort || i || o !== d.p.sortname || (g = o, i = !0)
                            }), d.p.multiSort && (g = s, h = t), d.p.treeGrid && d.p._sort)return void $(d).jqGrid("SortTree", g, d.p.sortorder, j[g].stype || "text", j[g].srcfmt || "");
                        var q = {
                            eq: function (a) {
                                return a.equals
                            }, ne: function (a) {
                                return a.notEquals
                            }, lt: function (a) {
                                return a.less
                            }, le: function (a) {
                                return a.lessOrEquals
                            }, gt: function (a) {
                                return a.greater
                            }, ge: function (a) {
                                return a.greaterOrEquals
                            }, cn: function (a) {
                                return a.contains
                            }, nc: function (a, b) {
                                return "OR" === b ? a.orNot().contains : a.andNot().contains
                            }, bw: function (a) {
                                return a.startsWith
                            }, bn: function (a, b) {
                                return "OR" === b ? a.orNot().startsWith : a.andNot().startsWith
                            }, en: function (a, b) {
                                return "OR" === b ? a.orNot().endsWith : a.andNot().endsWith
                            }, ew: function (a) {
                                return a.endsWith
                            }, ni: function (a, b) {
                                return "OR" === b ? a.orNot().equals : a.andNot().equals
                            }, "in": function (a) {
                                return a.equals
                            }, nu: function (a) {
                                return a.isNull
                            }, nn: function (a, b) {
                                return "OR" === b ? a.orNot().isNull : a.andNot().isNull
                            }
                        }, r = $.jgrid.from.call(d, d.p.data);
                        if (d.p.ignoreCase && (r = r.ignoreCase()), d.p.search === !0) {
                            var u = d.p.postData.filters;
                            if (u)"string" == typeof u && (u = $.jgrid.parse(u)), a(u); else try {
                                f = j[d.p.postData.searchField], "date" === f.stype && f.srcfmt && f.newfmt && f.srcfmt !== f.newfmt && (d.p.postData.searchString = $.jgrid.parseDate.call(d, f.newfmt, d.p.postData.searchString, f.srcfmt)), r = q[d.p.postData.searchOper](r)(d.p.postData.searchField, d.p.postData.searchString, j[d.p.postData.searchField])
                            } catch (v) {
                            }
                        } else d.p.treeGrid && "nested" === d.p.treeGridModel && r.orderBy(d.p.treeReader.left_field, "asc", "integer", "", null);
                        if (d.p.treeGrid && "adjacency" === d.p.treeGridModel && (m = 0, g = null), d.p.grouping)for (n = 0; m > n; n++)r.orderBy(l[n], p.groupOrder[n], k[n].stype, k[n].srcfmt);
                        d.p.multiSort ? $.each(g, function (a) {
                            r.orderBy(this, h[a], j[this].stype, j[this].srcfmt, j[this].sfunc)
                        }) : g && d.p.sortorder && i && ("DESC" === d.p.sortorder.toUpperCase() ? r.orderBy(d.p.sortname, "d", j[g].stype, j[g].srcfmt, j[g].sfunc) : r.orderBy(d.p.sortname, "a", j[g].stype, j[g].srcfmt, j[g].sfunc));
                        var w = r.select(), x = parseInt(d.p.rowNum, 10), y = w.length, z = parseInt(d.p.page, 10), A = Math.ceil(y / x), B = {};
                        if ((d.p.search || d.p.resetsearch) && d.p.grouping && d.p.groupingView._locgr) {
                            d.p.groupingView.groups = [];
                            var C, D, E, F = $.jgrid.getMethod("groupingPrepare");
                            if (d.p.footerrow && d.p.userDataOnFooter) {
                                for (D in d.p.userData)d.p.userData.hasOwnProperty(D) && (d.p.userData[D] = 0);
                                E = !0
                            }
                            for (C = 0; y > C; C++) {
                                if (E)for (D in d.p.userData)d.p.userData.hasOwnProperty(D) && (d.p.userData[D] += parseFloat(w[C][D] || 0));
                                F.call($(d), w[C], C, x)
                            }
                        }
                        return w = d.p.treeGrid && d.p.search ? $(d).jqGrid("searchTree", w) : w.slice((z - 1) * x, z * x), r = null, j = null, B[d.p.localReader.total] = A, B[d.p.localReader.page] = z, B[d.p.localReader.records] = y, B[d.p.localReader.root] = w, B[d.p.localReader.userdata] = d.p.userData, w = null, B
                    }
                }, O = function (a, b) {
                    var c, e, f, g, h, i, j, n, p = "", q = d.p.pager ? $.jgrid.jqID(d.p.pager.substr(1)) : "", r = q ? "_" + q : "", s = d.p.toppager ? "_" + d.p.toppager.substr(1) : "";
                    if (f = parseInt(d.p.page, 10) - 1, 0 > f && (f = 0), f *= parseInt(d.p.rowNum, 10), h = f + d.p.reccount, d.p.scroll) {
                        var t = $("tbody:first > tr:gt(0)", d.grid.bDiv);
                        f = h - t.length, d.p.reccount = t.length;
                        var u = t.outerHeight() || d.grid.prevRowHeight;
                        if (u) {
                            var v = f * u, w = parseInt(d.p.records, 10) * u;
                            $(">div:first", d.grid.bDiv).css({height: w}).children("div:first").css({
                                height: v,
                                display: v ? "" : "none"
                            }), 0 === d.grid.bDiv.scrollTop && d.p.page > 1 && (d.grid.bDiv.scrollTop = d.p.rowNum * (d.p.page - 1) * u)
                        }
                        d.grid.bDiv.scrollLeft = d.grid.hDiv.scrollLeft
                    }
                    if (p = d.p.pager || "", p += d.p.toppager ? p ? "," + d.p.toppager : d.p.toppager : "") {
                        if (j = $.jgrid.getRegional(d, "formatter.integer"), c = y(d.p.page), e = y(d.p.lastpage), $(".selbox", p)[this.p.useProp ? "prop" : "attr"]("disabled", !1), d.p.pginput === !0 && ($("#input" + r).html($.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", d.p.pgtext) || "", "<input " + k(l, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(q) + "'></span>")), d.p.toppager && $("#input_t" + s).html($.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", d.p.pgtext) || "", "<input " + k(l, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(q) + "_toppager'></span>")), $(".ui-pg-input", p).val(d.p.page), n = d.p.toppager ? "#sp_1" + r + ",#sp_1" + r + "_toppager" : "#sp_1" + r, $(n).html($.fmatter ? $.fmatter.util.NumberFormat(d.p.lastpage, j) : d.p.lastpage)), d.p.viewrecords)if (0 === d.p.reccount)$(".ui-paging-info", p).html($.jgrid.getRegional(d, "defaults.emptyrecords", d.p.emptyrecords)); else {
                            g = f + 1, i = d.p.records, $.fmatter && (g = $.fmatter.util.NumberFormat(g, j), h = $.fmatter.util.NumberFormat(h, j), i = $.fmatter.util.NumberFormat(i, j));
                            var x = $.jgrid.getRegional(d, "defaults.recordtext", d.p.recordtext);
                            $(".ui-paging-info", p).html($.jgrid.template(x, g, h, i))
                        }
                        d.p.pgbuttons === !0 && (0 >= c && (c = e = 0), 1 === c || 0 === c ? ($("#first" + r + ", #prev" + r).addClass(m).removeClass(o), d.p.toppager && $("#first_t" + s + ", #prev_t" + s).addClass(m).removeClass(o)) : ($("#first" + r + ", #prev" + r).removeClass(m), d.p.toppager && $("#first_t" + s + ", #prev_t" + s).removeClass(m)), c === e || 0 === c ? ($("#next" + r + ", #last" + r).addClass(m).removeClass(o), d.p.toppager && $("#next_t" + s + ", #last_t" + s).addClass(m).removeClass(o)) : ($("#next" + r + ", #last" + r).removeClass(m), d.p.toppager && $("#next_t" + s + ", #last_t" + s).removeClass(m)))
                    }
                    a === !0 && d.p.rownumbers === !0 && $(">td.jqgrid-rownum", d.rows).each(function (a) {
                        $(this).html(f + 1 + a)
                    }), b && d.p.jqgdnd && $(d).jqGrid("gridDnD", "updateDnD"), $(d).triggerHandler("jqGridGridComplete"), $.isFunction(d.p.gridComplete) && d.p.gridComplete.call(d), $(d).triggerHandler("jqGridAfterGridComplete")
                }, P = function () {
                    d.grid.hDiv.loading = !0, d.p.hiddengrid || $(d).jqGrid("progressBar", {
                        method: "show",
                        loadtype: d.p.loadui,
                        htmlcontent: $.jgrid.getRegional(d, "defaults.loadtext", d.p.loadtext)
                    })
                }, Q = function () {
                    d.grid.hDiv.loading = !1, $(d).jqGrid("progressBar", {method: "hide", loadtype: d.p.loadui})
                }, R = function (a) {
                    if (!d.grid.hDiv.loading) {
                        var b, c, e = d.p.scroll && a === !1, f = {}, g = d.p.prmNames;
                        d.p.page <= 0 && (d.p.page = Math.min(1, d.p.lastpage)), null !== g.search && (f[g.search] = d.p.search), null !== g.nd && (f[g.nd] = (new Date).getTime()), null !== g.rows && (f[g.rows] = d.p.rowNum), null !== g.page && (f[g.page] = d.p.page), null !== g.sort && (f[g.sort] = d.p.sortname), null !== g.order && (f[g.order] = d.p.sortorder), null !== d.p.rowTotal && null !== g.totalrows && (f[g.totalrows] = d.p.rowTotal);
                        var h = $.isFunction(d.p.loadComplete), i = h ? d.p.loadComplete : null, j = 0;
                        if (a = a || 1, a > 1 ? null !== g.npage ? (f[g.npage] = a, j = a - 1, a = 1) : i = function (b) {
                                d.p.page++, d.grid.hDiv.loading = !1, h && d.p.loadComplete.call(d, b), R(a - 1)
                            } : null !== g.npage && delete d.p.postData[g.npage], d.p.grouping) {
                            $(d).jqGrid("groupingSetup");
                            var k, l = d.p.groupingView, m = "";
                            for (k = 0; k < l.groupField.length; k++) {
                                var n = l.groupField[k];
                                $.each(d.p.colModel, function (a, b) {
                                    b.name === n && b.index && (n = b.index)
                                }), m += n + " " + l.groupOrder[k] + ", "
                            }
                            f[g.sort] = m + f[g.sort]
                        }
                        $.extend(d.p.postData, f);
                        var o = d.p.scroll ? d.rows.length - 1 : 1, p = $(d).triggerHandler("jqGridBeforeRequest");
                        if (p === !1 || "stop" === p)return;
                        if ($.isFunction(d.p.datatype))return void d.p.datatype.call(d, d.p.postData, "load_" + d.p.id, o, a, j);
                        if ($.isFunction(d.p.beforeRequest) && (p = d.p.beforeRequest.call(d), void 0 === p && (p = !0), p === !1))return;
                        switch (b = d.p.datatype.toLowerCase()) {
                            case"json":
                            case"jsonp":
                            case"xml":
                            case"script":
                                $.ajax($.extend({
                                    url: d.p.url,
                                    type: d.p.mtype,
                                    dataType: b,
                                    data: $.isFunction(d.p.serializeGridData) ? d.p.serializeGridData.call(d, d.p.postData) : d.p.postData,
                                    success: function (c, f, g) {
                                        return $.isFunction(d.p.beforeProcessing) && d.p.beforeProcessing.call(d, c, f, g) === !1 ? void Q() : ("xml" === b ? L(c, o, a > 1, j) : M(c, o, a > 1, j), $(d).triggerHandler("jqGridLoadComplete", [c]), i && i.call(d, c), $(d).triggerHandler("jqGridAfterLoadComplete", [c]), e && d.grid.populateVisible(), (d.p.loadonce || d.p.treeGrid) && (d.p.datatype = "local"), c = null, void(1 === a && Q()))
                                    },
                                    error: function (b, c, e) {
                                        $.isFunction(d.p.loadError) && d.p.loadError.call(d, b, c, e), 1 === a && Q(), b = null
                                    },
                                    beforeSend: function (a, b) {
                                        var c = !0;
                                        return $.isFunction(d.p.loadBeforeSend) && (c = d.p.loadBeforeSend.call(d, a, b)), void 0 === c && (c = !0), c === !1 ? !1 : void P()
                                    }
                                }, $.jgrid.ajaxOptions, d.p.ajaxGridOptions));
                                break;
                            case"xmlstring":
                                P(), c = "string" != typeof d.p.datastr ? d.p.datastr : $.parseXML(d.p.datastr), L(c), $(d).triggerHandler("jqGridLoadComplete", [c]), h && d.p.loadComplete.call(d, c), $(d).triggerHandler("jqGridAfterLoadComplete", [c]), d.p.datatype = "local", d.p.datastr = null, Q();
                                break;
                            case"jsonstring":
                                P(), c = "string" == typeof d.p.datastr ? $.jgrid.parse(d.p.datastr) : d.p.datastr, M(c), $(d).triggerHandler("jqGridLoadComplete", [c]), h && d.p.loadComplete.call(d, c), $(d).triggerHandler("jqGridAfterLoadComplete", [c]), d.p.datatype = "local", d.p.datastr = null, Q();
                                break;
                            case"local":
                            case"clientside":
                                P(), d.p.datatype = "local", d.p._ald = !0;
                                var q = N();
                                M(q, o, a > 1, j), $(d).triggerHandler("jqGridLoadComplete", [q]), i && i.call(d, q), $(d).triggerHandler("jqGridAfterLoadComplete", [q]), e && d.grid.populateVisible(), Q(), d.p._ald = !1
                        }
                        d.p._sort = !1
                    }
                }, S = function (a) {
                    $("#cb_" + $.jgrid.jqID(d.p.id), d.grid.hDiv)[d.p.useProp ? "prop" : "attr"]("checked", a);
                    var b = d.p.frozenColumns ? d.p.id + "_frozen" : "";
                    b && $("#cb_" + $.jgrid.jqID(d.p.id), d.grid.fhDiv)[d.p.useProp ? "prop" : "attr"]("checked", a)
                }, T = function (a, b) {
                    var c, e, f, g, i, j, n, p = "<td class='ui-pg-button " + m + "'><span class='ui-separator'></span></td>", r = "", s = "<table class='ui-pg-table ui-common-table ui-paging-pager'><tbody><tr>", t = "", u = function (a, b) {
                        var c;
                        return $.isFunction(d.p.onPaging) && (c = d.p.onPaging.call(d, a, b)), "stop" === c ? !1 : (d.p.selrow = null, d.p.multiselect && (d.p.selarrrow = [], S(!1)), d.p.savedRow = [], !0)
                    };
                    if (a = a.substr(1), b += "_" + a, c = "pg_" + a, e = a + "_left", f = a + "_center", g = a + "_right", $("#" + $.jgrid.jqID(a)).append("<div id='" + c + "' class='ui-pager-control' role='group'><table " + k(l, "pagerTable", !1, "ui-pg-table ui-common-table ui-pager-table") + "><tbody><tr><td id='" + e + "' align='left'></td><td id='" + f + "' align='center' style='white-space:pre;'></td><td id='" + g + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr"), d.p.rowList.length > 0) {
                        t = '<td dir="' + h + '">', t += "<select " + k(l, "pgSelectBox", !1, "ui-pg-selbox") + ' role="listbox" title="' + ($.jgrid.getRegional(d, "defaults.pgrecs", d.p.pgrecs) || "") + '">';
                        var v;
                        for (n = 0; n < d.p.rowList.length; n++)v = d.p.rowList[n].toString().split(":"), 1 === v.length && (v[1] = v[0]), t += '<option role="option" value="' + v[0] + '"' + (y(d.p.rowNum, 0) === y(v[0], 0) ? ' selected="selected"' : "") + ">" + v[1] + "</option>";
                        t += "</select></td>"
                    }
                    if ("rtl" === h && (s += t), d.p.pginput === !0 && (r = "<td id='input" + b + "' dir='" + h + "'>" + $.jgrid.template($.jgrid.getRegional(d, "defaults.pgtext", d.p.pgtext) || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(a) + "'></span>") + "</td>"), d.p.pgbuttons === !0) {
                        var w = ["first" + b, "prev" + b, "next" + b, "last" + b], x = k(l, "pgButtonBox", !0, "ui-pg-button"), z = [$.jgrid.getRegional(d, "defaults.pgfirst", d.p.pgfirst) || "", $.jgrid.getRegional(d, "defaults.pgprev", d.p.pgprev) || "", $.jgrid.getRegional(d, "defaults.pgnext", d.p.pgnext) || "", $.jgrid.getRegional(d, "defaults.pglast", d.p.pglast) || ""];
                        "rtl" === h && (w.reverse(), z.reverse()), s += "<td id='" + w[0] + "' class='" + x + "' title='" + z[0] + "'><span " + k(l, "icon_first", !1, q) + "></span></td>", s += "<td id='" + w[1] + "' class='" + x + "'  title='" + z[1] + "'><span " + k(l, "icon_prev", !1, q) + "></span></td>", s += "" !== r ? p + r + p : "", s += "<td id='" + w[2] + "' class='" + x + "' title='" + z[2] + "'><span " + k(l, "icon_next", !1, q) + "></span></td>", s += "<td id='" + w[3] + "' class='" + x + "' title='" + z[3] + "'><span " + k(l, "icon_end", !1, q) + "></span></td>"
                    } else"" !== r && (s += r);
                    "ltr" === h && (s += t), s += "</tr></tbody></table>", d.p.viewrecords === !0 && $("td#" + a + "_" + d.p.recordpos, "#" + c).append("<div dir='" + h + "' style='text-align:" + d.p.recordpos + "' class='ui-paging-info'></div>"), $("td#" + a + "_" + d.p.pagerpos, "#" + c).append(s), j = $("#gbox_" + $.jgrid.jqID(d.p.id)).css("font-size") || "11px", $("#gbox_" + $.jgrid.jqID(d.p.id)).append("<div id='testpg' " + k(l, "entrieBox", !1, "ui-jqgrid") + " style='font-size:" + j + ";visibility:hidden;' ></div>"), i = $(s).clone().appendTo("#testpg").width(), $("#testpg").remove(), i > 0 && ("" !== r && (i += 50), $("td#" + a + "_" + d.p.pagerpos, "#" + c).width(i)), d.p._nvtd = [], d.p._nvtd[0] = Math.floor(i ? (d.p.width - i) / 2 : d.p.width / 3), d.p._nvtd[1] = 0, s = null, $(".ui-pg-selbox", "#" + c).bind("change", function () {
                        return u("records", this) ? (d.p.page = Math.round(d.p.rowNum * (d.p.page - 1) / this.value - .5) + 1, d.p.rowNum = this.value, d.p.pager && $(".ui-pg-selbox", d.p.pager).val(this.value), d.p.toppager && $(".ui-pg-selbox", d.p.toppager).val(this.value), R(), !1) : !1
                    }), d.p.pgbuttons === !0 && ($(".ui-pg-button", "#" + c).hover(function () {
                        $(this).hasClass(m) ? this.style.cursor = "default" : ($(this).addClass(o), this.style.cursor = "pointer")
                    }, function () {
                        $(this).hasClass(m) || ($(this).removeClass(o), this.style.cursor = "default")
                    }), $("#first" + $.jgrid.jqID(b) + ", #prev" + $.jgrid.jqID(b) + ", #next" + $.jgrid.jqID(b) + ", #last" + $.jgrid.jqID(b)).click(function () {
                        if ($(this).hasClass(m))return !1;
                        var a = y(d.p.page, 1), c = y(d.p.lastpage, 1), e = !1, f = !0, g = !0, h = !0, i = !0;
                        return 0 === c || 1 === c ? (f = !1, g = !1, h = !1, i = !1) : c > 1 && a >= 1 ? 1 === a ? (f = !1, g = !1) : a === c && (h = !1, i = !1) : c > 1 && 0 === a && (h = !1, i = !1, a = c - 1), u(this.id.split("_")[0], this) ? (this.id === "first" + b && f && (d.p.page = 1, e = !0), this.id === "prev" + b && g && (d.p.page = a - 1, e = !0), this.id === "next" + b && h && (d.p.page = a + 1, e = !0), this.id === "last" + b && i && (d.p.page = c, e = !0), e && R(), !1) : !1
                    })), d.p.pginput === !0 && $("#" + c).on("keypress", "input.ui-pg-input", function (a) {
                        var b = a.charCode || a.keyCode || 0;
                        return 13 === b ? u("user", this) ? ($(this).val(y($(this).val(), 1)), d.p.page = $(this).val() > 0 ? $(this).val() : d.p.page, R(), !1) : !1 : this
                    })
                }, U = function (a, b) {
                    var c, e = d.p.colModel, f = d.p.frozenColumns ? b : d.grid.headers[a].el, g = "";
                    $("span.ui-grid-ico-sort", f).addClass(m), $(f).attr("aria-selected", "false"), c = e[a].index || e[a].name, e[a].lso ? "asc" === e[a].lso ? (e[a].lso += "-desc", g = "desc") : "desc" === e[a].lso ? (e[a].lso += "-asc", g = "asc") : ("asc-desc" === e[a].lso || "desc-asc" === e[a].lso) && (e[a].lso = "") : e[a].lso = g = e[a].firstsortorder || "asc", g ? ($("span.s-ico", f).show(), $("span.ui-icon-" + g, f).removeClass(m), $(f).attr("aria-selected", "true")) : d.p.viewsortcols[0] || $("span.s-ico", f).hide();
                    var h = s.indexOf(c);
                    -1 === h ? (s.push(c), t.push(g)) : g ? t[h] = g : (t.splice(h, 1), s.splice(h, 1)), d.p.sortorder = "", d.p.sortname = "";
                    for (var i = 0, j = s.length; j > i; i++)i > 0 && (d.p.sortname += ", "), d.p.sortname += s[i], i !== j - 1 && (d.p.sortname += " " + t[i]);
                    d.p.sortorder = t[j - 1]
                }, V = function (a, b, c, e, f) {
                    if (d.p.colModel[b].sortable && !(d.p.savedRow.length > 0)) {
                        if (c || (d.p.lastsort === b && "" !== d.p.sortname ? "asc" === d.p.sortorder ? d.p.sortorder = "desc" : "desc" === d.p.sortorder && (d.p.sortorder = "asc") : d.p.sortorder = d.p.colModel[b].firstsortorder || "asc", d.p.page = 1), d.p.multiSort)U(b, f); else {
                            if (e) {
                                if (d.p.lastsort === b && d.p.sortorder === e && !c)return;
                                d.p.sortorder = e
                            }
                            var g, h = d.grid.headers[d.p.lastsort] ? d.grid.headers[d.p.lastsort].el : null, i = d.p.frozenColumns ? f : d.grid.headers[b].el, j = "single" === d.p.viewsortcols[1] ? !0 : !1;
                            g = $(h).find("span.ui-grid-ico-sort"), g.addClass(m), j && $(g).css("display", "none"), $(h).attr("aria-selected", "false"), d.p.frozenColumns && (g = d.grid.fhDiv.find("span.ui-grid-ico-sort"), g.addClass(m), j && g.css("display", "none"), d.grid.fhDiv.find("th").attr("aria-selected", "false")), g = $(i).find("span.ui-icon-" + d.p.sortorder), g.removeClass(m), j && g.css("display", ""), $(i).attr("aria-selected", "true"), d.p.viewsortcols[0] || (d.p.lastsort !== b ? (d.p.frozenColumns && d.grid.fhDiv.find("span.s-ico").hide(), $("span.s-ico", h).hide(), $("span.s-ico", i).show()) : "" === d.p.sortname && $("span.s-ico", i).show()), a = a.substring(5 + d.p.id.length + 1), d.p.sortname = d.p.colModel[b].index || a
                        }
                        if ("stop" === $(d).triggerHandler("jqGridSortCol", [d.p.sortname, b, d.p.sortorder]))return void(d.p.lastsort = b);
                        if ($.isFunction(d.p.onSortCol) && "stop" === d.p.onSortCol.call(d, d.p.sortname, b, d.p.sortorder))return void(d.p.lastsort = b);
                        if ("local" === d.p.datatype ? d.p.deselectAfterSort && $(d).jqGrid("resetSelection") : (d.p.selrow = null, d.p.multiselect && S(!1), d.p.selarrrow = [], d.p.savedRow = []), d.p.scroll) {
                            var k = d.grid.bDiv.scrollLeft;
                            H.call(d, !0, !1), d.grid.hDiv.scrollLeft = k
                        }
                        d.p.subGrid && "local" === d.p.datatype && $("td.sgexpanded", "#" + $.jgrid.jqID(d.p.id)).each(function () {
                            $(this).trigger("click")
                        }), d.p._sort = !0, R(), d.p.lastsort = b, d.p.sortname !== a && b && (d.p.lastsort = b)
                    }
                }, W = function () {
                    var a, b, c, f, g = 0, h = $.jgrid.cell_width ? 0 : y(d.p.cellLayout, 0), i = 0, j = y(d.p.scrollOffset, 0), k = !1, l = 0;
                    $.each(d.p.colModel, function () {
                        if (void 0 === this.hidden && (this.hidden = !1), d.p.grouping && d.p.autowidth) {
                            var a = $.inArray(this.name, d.p.groupingView.groupField);
                            a >= 0 && d.p.groupingView.groupColumnShow.length > a && (this.hidden = !d.p.groupingView.groupColumnShow[a])
                        }
                        this.widthOrg = b = y(this.width, 0), this.hidden === !1 && (g += b + h, this.fixed ? l += b + h : i++)
                    }), isNaN(d.p.width) && (d.p.width = g + (d.p.shrinkToFit !== !1 || isNaN(d.p.height) ? 0 : j)), e.width = d.p.width, d.p.tblwidth = g, d.p.shrinkToFit === !1 && d.p.forceFit === !0 && (d.p.forceFit = !1), d.p.shrinkToFit === !0 && i > 0 && (c = e.width - h * i - l, isNaN(d.p.height) || (c -= j, k = !0), g = 0, $.each(d.p.colModel, function (e) {
                        this.hidden !== !1 || this.fixed || (b = Math.round(c * this.width / (d.p.tblwidth - h * i - l)), this.width = b, g += b, a = e)
                    }), f = 0, k ? e.width - l - (g + h * i) !== j && (f = e.width - l - (g + h * i) - j) : k || 1 === Math.abs(e.width - l - (g + h * i)) || (f = e.width - l - (g + h * i)), d.p.colModel[a].width += f, d.p.tblwidth = g + f + h * i + l, d.p.tblwidth > d.p.width && (d.p.colModel[a].width -= d.p.tblwidth - parseInt(d.p.width, 10), d.p.tblwidth = d.p.width))
                }, X = function (a) {
                    var b, c = a, e = a;
                    for (b = a + 1; b < d.p.colModel.length; b++)if (d.p.colModel[b].hidden !== !0) {
                        e = b;
                        break
                    }
                    return e - c
                }, Y = function (a) {
                    var b = $(d.grid.headers[a].el), c = [b.position().left + b.outerWidth()];
                    return "rtl" === d.p.direction && (c[0] = d.p.width - c[0]), c[0] -= d.grid.bDiv.scrollLeft, c.push($(d.grid.hDiv).position().top), c.push($(d.grid.bDiv).offset().top - $(d.grid.hDiv).offset().top + $(d.grid.bDiv).height()), c
                }, Z = function (a) {
                    var b, c = d.grid.headers, e = $.jgrid.getCellIndex(a);
                    for (b = 0; b < c.length; b++)if (a === c[b].el) {
                        e = b;
                        break
                    }
                    return e
                };
                for (this.p.id = this.id, -1 === $.inArray(d.p.multikey, x) && (d.p.multikey = !1), d.p.keyName = !1, i = 0; i < d.p.colModel.length; i++)w = "string" == typeof d.p.colModel[i].template ? null != $.jgrid.cmTemplate && "object" == typeof $.jgrid.cmTemplate[d.p.colModel[i].template] ? $.jgrid.cmTemplate[d.p.colModel[i].template] : {} : d.p.colModel[i].template, d.p.colModel[i] = $.extend(!0, {}, d.p.cmTemplate, w || {}, d.p.colModel[i]), d.p.keyName === !1 && d.p.colModel[i].key === !0 && (d.p.keyName = d.p.colModel[i].name);
                if (d.p.sortorder = d.p.sortorder.toLowerCase(), $.jgrid.cell_width = $.jgrid.cellWidth(), d.p.grouping === !0 && (d.p.scroll = !1, d.p.rownumbers = !1, d.p.treeGrid = !1, d.p.gridview = !0), this.p.treeGrid === !0) {
                    try {
                        $(this).jqGrid("setTreeGrid")
                    } catch (_) {
                    }
                    "local" !== d.p.datatype && (d.p.localReader = {id: "_id_"})
                }
                if (this.p.subGrid)try {
                    $(d).jqGrid("setSubGrid")
                } catch (ab) {
                }
                this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"), this.p.colModel.unshift({
                    name: "cb",
                    width: $.jgrid.cell_width ? d.p.multiselectWidth + d.p.cellLayout : d.p.multiselectWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0
                })), this.p.rownumbers && (this.p.colNames.unshift(""), this.p.colModel.unshift({
                    name: "rn",
                    width: d.p.rownumWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0
                })), d.p.xmlReader = $.extend(!0, {
                    root: "rows",
                    row: "row",
                    page: "rows>page",
                    total: "rows>total",
                    records: "rows>records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "[id]",
                    userdata: "userdata",
                    subgrid: {root: "rows", row: "row", repeatitems: !0, cell: "cell"}
                }, d.p.xmlReader), d.p.jsonReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {root: "rows", repeatitems: !0, cell: "cell"}
                }, d.p.jsonReader), d.p.localReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !1,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {root: "rows", repeatitems: !0, cell: "cell"}
                }, d.p.localReader), d.p.scroll && (d.p.pgbuttons = !1, d.p.pginput = !1, d.p.rowList = []), d.p.data.length && (I(), J());
                var bb, cb, db, eb, fb, gb, hb, ib, jb = "<thead><tr class='ui-jqgrid-labels' role='row'>", kb = "", lb = "", mb = "";
                if (d.p.shrinkToFit === !0 && d.p.forceFit === !0)for (i = d.p.colModel.length - 1; i >= 0; i--)if (!d.p.colModel[i].hidden) {
                    d.p.colModel[i].resizable = !1;
                    break
                }
                if ("horizontal" === d.p.viewsortcols[1] ? (lb = " ui-i-asc", mb = " ui-i-desc") : "single" === d.p.viewsortcols[1] && (lb = " ui-single-sort-asc", mb = " ui-single-sort-desc", kb = " style='display:none'", d.p.viewsortcols[0] = !1), bb = r ? "class='ui-th-div-ie'" : "", ib = "<span class='s-ico' style='display:none'>", ib += "<span sort='asc'  class='ui-grid-ico-sort ui-icon-asc" + lb + " ui-sort-" + h + " " + m + " " + q + " " + k(l, "icon_asc", !0) + "'" + kb + "></span>", ib += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + mb + " ui-sort-" + h + " " + m + " " + q + " " + k(l, "icon_desc", !0) + "'" + kb + "></span></span>", d.p.multiSort && d.p.sortname)for (s = d.p.sortname.split(","), i = 0; i < s.length; i++)u = $.trim(s[i]).split(" "), s[i] = $.trim(u[0]), t[i] = u[1] ? $.trim(u[1]) : d.p.sortorder || "asc";
                for (i = 0; i < this.p.colNames.length; i++) {
                    var nb = d.p.headertitles ? ' title="' + $.jgrid.stripHtml(d.p.colNames[i]) + '"' : "";
                    jb += "<th id='" + d.p.id + "_" + d.p.colModel[i].name + "' role='columnheader' " + k(l, "headerBox", !1, "ui-th-column ui-th-" + h) + " " + nb + ">", cb = d.p.colModel[i].index || d.p.colModel[i].name, jb += "<div id='jqgh_" + d.p.id + "_" + d.p.colModel[i].name + "' " + bb + ">" + d.p.colNames[i], d.p.colModel[i].width = d.p.colModel[i].width ? parseInt(d.p.colModel[i].width, 10) : 150, "boolean" != typeof d.p.colModel[i].title && (d.p.colModel[i].title = !0), d.p.colModel[i].lso = "", cb === d.p.sortname && (d.p.lastsort = i), d.p.multiSort && (u = $.inArray(cb, s), -1 !== u && (d.p.colModel[i].lso = t[u])), jb += ib + "</div></th>"
                }
                if (jb += "</tr></thead>", ib = null, $(this).append(jb), $("thead tr:first th", this).hover(function () {
                        $(this).addClass(o)
                    }, function () {
                        $(this).removeClass(o)
                    }), this.p.multiselect) {
                    var ob, pb = [];
                    $("#cb_" + $.jgrid.jqID(d.p.id), this).bind("click", function () {
                        d.p.selarrrow = [];
                        var a = d.p.frozenColumns === !0 ? d.p.id + "_frozen" : "";
                        this.checked ? ($(d.rows).each(function (b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(m) || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id))[d.p.useProp ? "prop" : "attr"]("checked", !0), $(this).addClass(n).attr("aria-selected", "true"), d.p.selarrrow.push(this.id), d.p.selrow = this.id, a && ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id), d.grid.fbDiv)[d.p.useProp ? "prop" : "attr"]("checked", !0), $("#" + $.jgrid.jqID(this.id), d.grid.fbDiv).addClass(n))))
                        }), ob = !0, pb = []) : ($(d.rows).each(function (b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(m) || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id))[d.p.useProp ? "prop" : "attr"]("checked", !1), $(this).removeClass(n).attr("aria-selected", "false"), pb.push(this.id), a && ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(this.id), d.grid.fbDiv)[d.p.useProp ? "prop" : "attr"]("checked", !1), $("#" + $.jgrid.jqID(this.id), d.grid.fbDiv).removeClass(n))))
                        }), d.p.selrow = null, ob = !1), $(d).triggerHandler("jqGridSelectAll", [ob ? d.p.selarrrow : pb, ob]), $.isFunction(d.p.onSelectAll) && d.p.onSelectAll.call(d, ob ? d.p.selarrrow : pb, ob)
                    })
                }
                if (d.p.autowidth === !0) {
                    var qb = $(v).innerWidth();
                    d.p.width = qb > 0 ? qb : "nw"
                }
                W(), $(v).css("width", e.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + d.p.id + "'>&#160;</div>"), d.p.scrollPopUp && $(v).append("<div " + k(l, "scrollBox", !1, "loading ui-scroll-popup") + " id='scroll_g" + d.p.id + "'></div>"), $(j).css("width", e.width + "px"), jb = $("thead:first", d).get(0);
                var rb = "";
                d.p.footerrow && (rb += "<table role='presentation' style='width:" + d.p.tblwidth + "px' " + k(l, "footerTable", !1, "ui-jqgrid-ftable ui-common-table") + "><tbody><tr role='row' " + k(l, "footerBox", !1, "footrow footrow-" + h) + ">");
                var sb = $("tr:first", jb), tb = "<tr class='jqgfirstrow' role='row'>";
                if (d.p.disableClick = !1, $("th", sb).each(function (a) {
                        db = d.p.colModel[a].width, void 0 === d.p.colModel[a].resizable && (d.p.colModel[a].resizable = !0), d.p.colModel[a].resizable ? (eb = document.createElement("span"), $(eb).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + h).css("cursor", "col-resize"), $(this).addClass(d.p.resizeclass)) : eb = "", $(this).css("width", db + "px").prepend(eb), eb = null;
                        var b = "";
                        d.p.colModel[a].hidden && ($(this).css("display", "none"), b = "display:none;"), tb += "<td role='gridcell' style='height:0px;width:" + db + "px;" + b + "'></td>", e.headers[a] = {
                            width: db,
                            el: this
                        }, kb = d.p.colModel[a].sortable, "boolean" != typeof kb && (d.p.colModel[a].sortable = !0, kb = !0);
                        var c = d.p.colModel[a].name;
                        "cb" !== c && "subgrid" !== c && "rn" !== c && d.p.viewsortcols[2] && $(">div", this).addClass("ui-jqgrid-sortable"), kb && (d.p.multiSort ? d.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), d.p.colModel[a].lso && $("div span.ui-icon-" + d.p.colModel[a].lso, this).removeClass(m).css("display", "")) : d.p.colModel[a].lso && ($("div span.s-ico", this).show(), $("div span.ui-icon-" + d.p.colModel[a].lso, this).removeClass(m).css("display", "")) : d.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), a === d.p.lastsort && $("div span.ui-icon-" + d.p.sortorder, this).removeClass(m).css("display", "")) : a === d.p.lastsort && "" !== d.p.sortname && ($("div span.s-ico", this).show(), $("div span.ui-icon-" + d.p.sortorder, this).removeClass(m).css("display", ""))), d.p.footerrow && (rb += "<td role='gridcell' " + z(a, 0, "", null, "", !1) + ">&#160;</td>")
                    }).mousedown(function (a) {
                        if (1 === $(a.target).closest("th>span.ui-jqgrid-resize").length) {
                            var b = Z(this);
                            return d.p.forceFit === !0 && (d.p.nv = X(b)), e.dragStart(b, a, Y(b)), !1
                        }
                    }).click(function (a) {
                        if (d.p.disableClick)return d.p.disableClick = !1, !1;
                        var b, c, e = "th>div.ui-jqgrid-sortable";
                        d.p.viewsortcols[2] || (e = "th>div>span>span.ui-grid-ico-sort");
                        var f = $(a.target).closest(e);
                        if (1 === f.length) {
                            var g;
                            if (d.p.frozenColumns) {
                                var h = $(this)[0].id.substring(d.p.id.length + 1);
                                $(d.p.colModel).each(function (a) {
                                    return this.name === h ? (g = a, !1) : void 0
                                })
                            } else g = Z(this);
                            return d.p.viewsortcols[2] || (b = !0, c = f.attr("sort")), null != g && V($("div", this)[0].id, g, b, c, this), !1
                        }
                    }), d.p.sortable && $.fn.sortable)try {
                    $(d).jqGrid("sortableColumns", sb)
                } catch (ub) {
                }
                d.p.footerrow && (rb += "</tr></tbody></table>"), tb += "</tr>", hb = document.createElement("tbody"), this.appendChild(hb), $(this).addClass(k(l, "rowTable", !0, "ui-jqgrid-btable ui-common-table")).append(tb), tb = null;
                var vb = $("<table " + k(l, "headerTable", !1, "ui-jqgrid-htable ui-common-table") + " style='width:" + d.p.tblwidth + "px' role='presentation' aria-labelledby='gbox_" + this.id + "'></table>").append(jb), wb = d.p.caption && d.p.hiddengrid === !0 ? !0 : !1, xb = $("<div class='ui-jqgrid-hbox" + ("rtl" === h ? "-rtl" : "") + "'></div>");
                jb = null, e.hDiv = document.createElement("div"), e.hDiv.style.width = e.width + "px", e.hDiv.className = k(l, "headerDiv", !0, "ui-jqgrid-hdiv"), $(e.hDiv).append(xb), $(xb).append(vb), vb = null, wb && $(e.hDiv).hide(), d.p.pager && ("string" == typeof d.p.pager ? "#" !== d.p.pager.substr(0, 1) && (d.p.pager = "#" + d.p.pager) : d.p.pager = "#" + $(d.p.pager).attr("id"), $(d.p.pager).css({width: e.width + "px"}).addClass(k(l, "pagerBox", !0, "ui-jqgrid-pager")).appendTo(v), wb && $(d.p.pager).hide(), T(d.p.pager, "")), d.p.cellEdit === !1 && d.p.hoverrows === !0 && $(d).bind("mouseover", function (a) {
                    gb = $(a.target).closest("tr.jqgrow"), "ui-subgrid" !== $(gb).attr("class") && $(gb).addClass(o)
                }).bind("mouseout", function (a) {
                    gb = $(a.target).closest("tr.jqgrow"), $(gb).removeClass(o)
                });
                var yb, zb, Ab;
                $(d).before(e.hDiv).click(function (a) {
                    if (fb = a.target, gb = $(fb, d.rows).closest("tr.jqgrow"), 0 === $(gb).length || gb[0].className.indexOf(m) > -1 || ($(fb, d).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== d.id)return this;
                    var b = $(fb).hasClass("cbox"), c = $(d).triggerHandler("jqGridBeforeSelectRow", [gb[0].id, a]);
                    if (c = c === !1 || "stop" === c ? !1 : !0, $.isFunction(d.p.beforeSelectRow)) {
                        var e = d.p.beforeSelectRow.call(d, gb[0].id, a);
                        (e === !1 || "stop" === e) && (c = !1)
                    }
                    if ("A" !== fb.tagName && ("INPUT" !== fb.tagName && "TEXTAREA" !== fb.tagName && "OPTION" !== fb.tagName && "SELECT" !== fb.tagName || b)) {
                        if (yb = gb[0].id, fb = $(fb).closest("tr.jqgrow>td"), fb.length > 0 && (zb = $.jgrid.getCellIndex(fb), Ab = $(fb).closest("td,th").html(), $(d).triggerHandler("jqGridCellSelect", [yb, zb, Ab, a]), $.isFunction(d.p.onCellSelect) && d.p.onCellSelect.call(d, yb, zb, Ab, a)), d.p.cellEdit === !0)if (d.p.multiselect && b && c)$(d).jqGrid("setSelection", yb, !0, a); else if (fb.length > 0) {
                            yb = gb[0].rowIndex;
                            try {
                                $(d).jqGrid("editCell", yb, zb, !0)
                            } catch (f) {
                            }
                        }
                        if (c)if (d.p.multikey)a[d.p.multikey] ? $(d).jqGrid("setSelection", yb, !0, a) : d.p.multiselect && b && (b = $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + yb).is(":checked"), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + yb)[d.p.useProp ? "prop" : "attr"]("checked", !b)); else if (d.p.multiselect && d.p.multiboxonly)if (b)$(d).jqGrid("setSelection", yb, !0, a); else {
                            var g = d.p.frozenColumns ? d.p.id + "_frozen" : "";
                            $(d.p.selarrrow).each(function (a, b) {
                                var c = $(d).jqGrid("getGridRowById", b);
                                c && $(c).removeClass(n), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b))[d.p.useProp ? "prop" : "attr"]("checked", !1), g && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(g)).removeClass(n), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(g))[d.p.useProp ? "prop" : "attr"]("checked", !1))
                            }), d.p.selarrrow = [], $(d).jqGrid("setSelection", yb, !0, a)
                        } else $(d).jqGrid("setSelection", yb, !0, a)
                    }
                }).bind("reloadGrid", function (a, b) {
                    if (d.p.treeGrid === !0 && (d.p.datatype = d.p.treedatatype), b = b || {}, b.current && d.grid.selectionPreserver(d), "local" === d.p.datatype ? ($(d).jqGrid("resetSelection"), d.p.data.length && (I(), J())) : d.p.treeGrid || (d.p.selrow = null, d.p.multiselect && (d.p.selarrrow = [], S(!1)), d.p.savedRow = []), d.p.scroll && H.call(d, !0, !1), b.page) {
                        var c = b.page;
                        c > d.p.lastpage && (c = d.p.lastpage), 1 > c && (c = 1), d.p.page = c, d.grid.bDiv.scrollTop = d.grid.prevRowHeight ? (c - 1) * d.grid.prevRowHeight * d.p.rowNum : 0
                    }
                    return d.grid.prevRowHeight && d.p.scroll && void 0 === b.page ? (delete d.p.lastpage, d.grid.populateVisible()) : d.grid.populate(), d.p.inlineNav === !0 && $(d).jqGrid("showAddEditButtons"), !1
                }).dblclick(function (a) {
                    if (fb = a.target, gb = $(fb, d.rows).closest("tr.jqgrow"), 0 !== $(gb).length) {
                        yb = gb[0].rowIndex, zb = $.jgrid.getCellIndex(fb);
                        var b = $(d).triggerHandler("jqGridDblClickRow", [$(gb).attr("id"), yb, zb, a]);
                        return null != b ? b : $.isFunction(d.p.ondblClickRow) && (b = d.p.ondblClickRow.call(d, $(gb).attr("id"), yb, zb, a), null != b) ? b : void 0
                    }
                }).bind("contextmenu", function (a) {
                    if (fb = a.target, gb = $(fb, d.rows).closest("tr.jqgrow"), 0 !== $(gb).length) {
                        d.p.multiselect || $(d).jqGrid("setSelection", gb[0].id, !0, a), yb = gb[0].rowIndex, zb = $.jgrid.getCellIndex(fb);
                        var b = $(d).triggerHandler("jqGridRightClickRow", [$(gb).attr("id"), yb, zb, a]);
                        return null != b ? b : $.isFunction(d.p.onRightClickRow) && (b = d.p.onRightClickRow.call(d, $(gb).attr("id"), yb, zb, a), null != b) ? b : void 0
                    }
                }), e.bDiv = document.createElement("div"), r && "auto" === String(d.p.height).toLowerCase() && (d.p.height = "100%"), $(e.bDiv).append($('<div style="position:relative;"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({
                    height: d.p.height + (isNaN(d.p.height) ? "" : "px"),
                    width: e.width + "px"
                }).scroll(e.scrollGrid), $("table:first", e.bDiv).css({width: d.p.tblwidth + "px"}), $.support.tbody || 2 === $("tbody", this).length && $("tbody:gt(0)", this).remove(), d.p.multikey && ($.jgrid.msie ? $(e.bDiv).bind("selectstart", function () {
                    return !1
                }) : $(e.bDiv).bind("mousedown", function () {
                    return !1
                })), wb && $(e.bDiv).hide();
                var Bb = q + " " + k(l, "icon_caption_open", !0), Cb = q + " " + k(l, "icon_caption_close", !0);
                e.cDiv = document.createElement("div");
                var Db = d.p.hidegrid === !0 ? $("<a role='link' class='ui-jqgrid-titlebar-close HeaderButton " + p + "' title='" + ($.jgrid.getRegional(d, "defaults.showhide", d.p.showhide) || "") + "' />").hover(function () {
                    Db.addClass(o)
                }, function () {
                    Db.removeClass(o)
                }).append("<span class='ui-jqgrid-headlink " + Bb + "'></span>").css("rtl" === h ? "left" : "right", "0px") : "";
                if ($(e.cDiv).append(Db).append("<span class='ui-jqgrid-title'>" + d.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === h ? "-rtl" : "") + " " + k(l, "gridtitleBox", !0)), $(e.cDiv).insertBefore(e.hDiv), d.p.toolbar[0]) {
                    var Eb = k(l, "customtoolbarBox", !0, "ui-userdata");
                    e.uDiv = document.createElement("div"), "top" === d.p.toolbar[1] ? $(e.uDiv).insertBefore(e.hDiv) : "bottom" === d.p.toolbar[1] && $(e.uDiv).insertAfter(e.hDiv), "both" === d.p.toolbar[1] ? (e.ubDiv = document.createElement("div"), $(e.uDiv).addClass(Eb + " ui-userdata-top").attr("id", "t_" + this.id).insertBefore(e.hDiv).width(e.width), $(e.ubDiv).addClass(Eb + " ui-userdata-bottom").attr("id", "tb_" + this.id).insertAfter(e.hDiv).width(e.width), wb && $(e.ubDiv).hide()) : $(e.uDiv).width(e.width).addClass(Eb + " ui-userdata-top").attr("id", "t_" + this.id), wb && $(e.uDiv).hide()
                }
                if (d.p.toppager && (d.p.toppager = $.jgrid.jqID(d.p.id) + "_toppager", e.topDiv = $("<div id='" + d.p.toppager + "'></div>")[0], d.p.toppager = "#" + d.p.toppager, $(e.topDiv).addClass(k(l, "toppagerBox", !0, "ui-jqgrid-toppager")).width(e.width).insertBefore(e.hDiv), T(d.p.toppager, "_t")), d.p.footerrow && (e.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0], xb = $("<div class='ui-jqgrid-hbox" + ("rtl" === h ? "-rtl" : "") + "'></div>"), $(e.sDiv).append(xb).width(e.width).insertAfter(e.hDiv), $(xb).append(rb), e.footers = $(".ui-jqgrid-ftable", e.sDiv)[0].rows[0].cells, d.p.rownumbers && (e.footers[0].className = k(l, "rownumBox", !0, "jqgrid-rownum")), wb && $(e.sDiv).hide()), xb = null, d.p.caption) {
                    var Fb = d.p.datatype;
                    d.p.hidegrid === !0 && ($(".ui-jqgrid-titlebar-close", e.cDiv).click(function (a) {
                        var b, c = $.isFunction(d.p.onHeaderClick), f = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-toppager, .ui-jqgrid-pager, .ui-jqgrid-sdiv", g = this;
                        return d.p.toolbar[0] === !0 && ("both" === d.p.toolbar[1] && (f += ", #" + $(e.ubDiv).attr("id")), f += ", #" + $(e.uDiv).attr("id")), b = $(f, "#gview_" + $.jgrid.jqID(d.p.id)).length, "visible" === d.p.gridstate ? $(f, "#gbox_" + $.jgrid.jqID(d.p.id)).slideUp("fast", function () {
                            b--, 0 === b && ($("span", g).removeClass(Bb).addClass(Cb), d.p.gridstate = "hidden", $("#gbox_" + $.jgrid.jqID(d.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(d.p.id)).hide(), $(d).triggerHandler("jqGridHeaderClick", [d.p.gridstate, a]), c && (wb || d.p.onHeaderClick.call(d, d.p.gridstate, a)))
                        }) : "hidden" === d.p.gridstate && $(f, "#gbox_" + $.jgrid.jqID(d.p.id)).slideDown("fast", function () {
                            b--, 0 === b && ($("span", g).removeClass(Cb).addClass(Bb), wb && (d.p.datatype = Fb, R(), wb = !1), d.p.gridstate = "visible", $("#gbox_" + $.jgrid.jqID(d.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(d.p.id)).show(), $(d).triggerHandler("jqGridHeaderClick", [d.p.gridstate, a]), c && (wb || d.p.onHeaderClick.call(d, d.p.gridstate, a)))
                        }), !1
                    }), wb && (d.p.datatype = "local", $(".ui-jqgrid-titlebar-close", e.cDiv).trigger("click")))
                } else $(e.cDiv).hide(), d.p.toppager || $(e.hDiv).addClass(k(d.p.styleUI + ".common", "cornertop", !0));
                if ($(e.hDiv).after(e.bDiv).mousemove(function (a) {
                        return e.resizing ? (e.dragMove(a), !1) : void 0
                    }), $(".ui-jqgrid-labels", e.hDiv).bind("selectstart", function () {
                        return !1
                    }), $(document).bind("mouseup.jqGrid" + d.p.id, function () {
                        return e.resizing ? (e.dragEnd(!0), !1) : !0
                    }), d.formatCol = z, d.sortData = V, d.updatepager = O, d.refreshIndex = J, d.setHeadCheckBox = S, d.constructTr = K, d.formatter = function (a, b, c, d, e) {
                        return B(a, b, c, d, e)
                    }, $.extend(e, {
                        populate: R,
                        emptyRows: H,
                        beginReq: P,
                        endReq: Q
                    }), this.grid = e, d.addXmlData = function (a) {
                        L(a)
                    }, d.addJSONData = function (a) {
                        M(a)
                    }, this.grid.cols = this.rows[0].cells, $(d).triggerHandler("jqGridInitGrid"), $.isFunction(d.p.onInitGrid) && d.p.onInitGrid.call(d), R(), d.p.hiddengrid = !1, d.p.responsive) {
                    var Gb = "onorientationchange"in window, Hb = Gb ? "orientationchange" : "resize";
                    $(window).on(Hb, function () {
                        $(d).jqGrid("resizeGrid")
                    })
                }
            }
        })
    }, $.jgrid.extend({
        getGridParam: function (a, b) {
            var c, d = this[0];
            if (d && d.grid) {
                if (void 0 === b && "string" != typeof b && (b = "jqGrid"), c = d.p, "jqGrid" !== b)try {
                    c = $(d).data(b)
                } catch (e) {
                    c = d.p
                }
                return a ? void 0 !== c[a] ? c[a] : null : c
            }
        }, setGridParam: function (a, b) {
            return this.each(function () {
                if (null == b && (b = !1), this.grid && "object" == typeof a)if (b === !0) {
                    var c = $.extend({}, this.p, a);
                    this.p = c
                } else $.extend(!0, this.p, a)
            })
        }, getGridRowById: function (a) {
            var b;
            return this.each(function () {
                try {
                    for (var c = this.rows.length; c--;)if (a.toString() === this.rows[c].id) {
                        b = this.rows[c];
                        break
                    }
                } catch (d) {
                    b = $(this.grid.bDiv).find("#" + $.jgrid.jqID(a))
                }
            }), b
        }, getDataIDs: function () {
            var a, b = [], c = 0, d = 0;
            return this.each(function () {
                if (a = this.rows.length, a && a > 0)for (; a > c;)$(this.rows[c]).hasClass("jqgrow") && (b[d] = this.rows[c].id, d++), c++
            }), b
        }, setSelection: function (a, b, c) {
            return this.each(function () {
                function d(a) {
                    var b = $(l.grid.bDiv)[0].clientHeight, c = $(l.grid.bDiv)[0].scrollTop, d = $(l.rows[a]).position().top, e = l.rows[a].clientHeight;
                    d + e >= b + c ? $(l.grid.bDiv)[0].scrollTop = d - (b + c) + e + c : b + c > d && c > d && ($(l.grid.bDiv)[0].scrollTop = d)
                }

                var e, f, g, h, i, j, k, l = this, m = $.jgrid.getMethod("getStyleUI"), n = m(l.p.styleUI + ".common", "highlight", !0), o = m(l.p.styleUI + ".common", "disabled", !0);
                void 0 !== a && (b = b === !1 ? !1 : !0, f = $(l).jqGrid("getGridRowById", a), !f || !f.className || f.className.indexOf(o) > -1 || (l.p.scrollrows === !0 && (g = $(l).jqGrid("getGridRowById", a).rowIndex, g >= 0 && d(g)), l.p.frozenColumns === !0 && (j = l.p.id + "_frozen"), l.p.multiselect ? (l.setHeadCheckBox(!1), l.p.selrow = f.id, h = $.inArray(l.p.selrow, l.p.selarrrow), -1 === h ? ("ui-subgrid" !== f.className && $(f).addClass(n).attr("aria-selected", "true"), e = !0, l.p.selarrrow.push(l.p.selrow)) : ("ui-subgrid" !== f.className && $(f).removeClass(n).attr("aria-selected", "false"), e = !1, l.p.selarrrow.splice(h, 1), i = l.p.selarrrow[0], l.p.selrow = void 0 === i ? null : i), $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(f.id))[l.p.useProp ? "prop" : "attr"]("checked", e), j && (-1 === h ? $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n) : $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).removeClass(n), $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j))[l.p.useProp ? "prop" : "attr"]("checked", e)), b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]), l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c))) : "ui-subgrid" !== f.className && (l.p.selrow !== f.id ? (k = $(l).jqGrid("getGridRowById", l.p.selrow), k && $(k).removeClass(n).attr({
                    "aria-selected": "false",
                    tabindex: "-1"
                }), $(f).addClass(n).attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }), j && ($("#" + $.jgrid.jqID(l.p.selrow), "#" + $.jgrid.jqID(j)).removeClass(n), $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n)), e = !0) : e = !1, l.p.selrow = f.id, b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]), l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c)))))
            })
        }, resetSelection: function (a) {
            return this.each(function () {
                var b, c, d = this, e = $.jgrid.getMethod("getStyleUI"), f = e(d.p.styleUI + ".common", "highlight", !0), g = e(d.p.styleUI + ".common", "hover", !0);
                if (d.p.frozenColumns === !0 && (c = d.p.id + "_frozen"), void 0 !== a) {
                    if (b = a === d.p.selrow ? d.p.selrow : a, $("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(b)).removeClass(f).attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f), d.p.multiselect) {
                        $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(d.p.id))[d.p.useProp ? "prop" : "attr"]("checked", !1), c && $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1), d.setHeadCheckBox(!1);
                        var h = $.inArray($.jgrid.jqID(b), d.p.selarrrow);
                        -1 !== h && d.p.selarrrow.splice(h, 1)
                    }
                    d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b), b = null
                } else d.p.multiselect ? ($(d.p.selarrrow).each(function (a, b) {
                    $($(d).jqGrid("getGridRowById", b)).removeClass(f).attr("aria-selected", "false"), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b))[d.p.useProp ? "prop" : "attr"]("checked", !1), c && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1)), d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b)
                }), d.setHeadCheckBox(!1), d.p.selarrrow = [], d.p.selrow = null) : d.p.selrow && ($("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(d.p.selrow)).removeClass(f).attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(d.p.selrow), "#" + $.jgrid.jqID(c)).removeClass(f), d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, d.p.selrow), d.p.selrow = null);
                d.p.cellEdit === !0 && parseInt(d.p.iCol, 10) >= 0 && parseInt(d.p.iRow, 10) >= 0 && ($("td:eq(" + d.p.iCol + ")", d.rows[d.p.iRow]).removeClass("edit-cell " + f), $(d.rows[d.p.iRow]).removeClass("selected-row " + g)), d.p.savedRow = []
            })
        }, getRowData: function (a, b) {
            var c, d, e = {}, f = !1, g = 0;
            return this.each(function () {
                var h, i, j = this;
                if (null == a)f = !0, c = [], d = j.rows.length; else {
                    if (i = $(j).jqGrid("getGridRowById", a), !i)return e;
                    d = 2
                }
                for (b && b === !0 && j.p.data.length > 0 || (b = !1); d > g;)f && (i = j.rows[g]), $(i).hasClass("jqgrow") && (b ? e = j.p.data[j.p._index[i.id]] : $('td[role="gridcell"]', i).each(function (a) {
                    if (h = j.p.colModel[a].name, "cb" !== h && "subgrid" !== h && "rn" !== h)if (j.p.treeGrid === !0 && h === j.p.ExpandColumn)e[h] = $.jgrid.htmlDecode($("span:first", this).html()); else try {
                        e[h] = $.unformat.call(j, this, {rowId: i.id, colModel: j.p.colModel[a]}, a)
                    } catch (b) {
                        e[h] = $.jgrid.htmlDecode($(this).html())
                    }
                }), f && (c.push(e), e = {})), g++
            }), c || e
        }, delRowData: function (a) {
            var b, c, d, e = !1;
            return this.each(function () {
                var f = this;
                if (b = $(f).jqGrid("getGridRowById", a), !b)return !1;
                if (f.p.subGrid && (d = $(b).next(), d.hasClass("ui-subgrid") && d.remove()), $(b).remove(), f.p.records--, f.p.reccount--, f.updatepager(!0, !1), e = !0, f.p.multiselect && (c = $.inArray(a, f.p.selarrrow), -1 !== c && f.p.selarrrow.splice(c, 1)), f.p.multiselect && f.p.selarrrow.length > 0 ? f.p.selrow = f.p.selarrrow[f.p.selarrrow.length - 1] : f.p.selrow === a && (f.p.selrow = null), "local" === f.p.datatype) {
                    var g = $.jgrid.stripPref(f.p.idPrefix, a), h = f.p._index[g];
                    void 0 !== h && (f.p.data.splice(h, 1), f.refreshIndex())
                }
                if (f.p.altRows === !0 && e) {
                    var i = f.p.altclass;
                    $(f.rows).each(function (a) {
                        a % 2 === 1 ? $(this).addClass(i) : $(this).removeClass(i)
                    })
                }
            }), e
        }, setRowData: function (a, b, c) {
            var d, e, f = !0;
            return this.each(function () {
                if (!this.grid)return !1;
                var g, h, i = this, j = typeof c, k = {};
                if (h = $(this).jqGrid("getGridRowById", a), !h)return !1;
                if (b)try {
                    if ($(this.p.colModel).each(function (c) {
                            d = this.name;
                            var f = $.jgrid.getAccessor(b, d);
                            void 0 !== f && (k[d] = this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? $.unformat.date.call(i, f, this) : f, g = i.formatter(a, k[d], c, b, "edit"), e = this.title ? {title: $.jgrid.stripHtml(g)} : {}, i.p.treeGrid === !0 && d === i.p.ExpandColumn ? $("td[role='gridcell']:eq(" + c + ") > span:first", h).html(g).attr(e) : $("td[role='gridcell']:eq(" + c + ")", h).html(g).attr(e))
                        }), "local" === i.p.datatype) {
                        var l, m = $.jgrid.stripPref(i.p.idPrefix, a), n = i.p._index[m];
                        if (i.p.treeGrid)for (l in i.p.treeReader)i.p.treeReader.hasOwnProperty(l) && delete k[i.p.treeReader[l]];
                        void 0 !== n && (i.p.data[n] = $.extend(!0, i.p.data[n], k)), k = null
                    }
                } catch (o) {
                    f = !1
                }
                f && ("string" === j ? $(h).addClass(c) : null !== c && "object" === j && $(h).css(c), $(i).triggerHandler("jqGridAfterGridComplete"))
            }), f
        }, addRowData: function (a, b, c, d) {
            -1 === $.inArray(c, ["first", "last", "before", "after"]) && (c = "last");
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = !1, t = "", u = "", v = "";
            return b && ($.isArray(b) ? (m = !0, n = a) : (b = [b], m = !1), this.each(function () {
                var w = this, x = b.length;
                i = w.p.rownumbers === !0 ? 1 : 0, g = w.p.multiselect === !0 ? 1 : 0, h = w.p.subGrid === !0 ? 1 : 0, m || (void 0 !== a ? a = String(a) : (a = $.jgrid.randId(), w.p.keyName !== !1 && (n = w.p.keyName, void 0 !== b[0][n] && (a = b[0][n])))), o = w.p.altclass;
                var y, z = 0, A = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "rowBox", !0, "jqgrow ui-row-" + w.p.direction), B = {}, C = $.isFunction(w.p.afterInsertRow) ? !0 : !1;
                for (i && (t = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "rownumBox", !1, "jqgrid-rownum")), g && (u = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "multiBox", !1, "cbox")); x > z;) {
                    if (p = b[z], f = [], y = A, m) {
                        try {
                            a = p[n], void 0 === a && (a = $.jgrid.randId())
                        } catch (D) {
                            a = $.jgrid.randId()
                        }
                        y += w.p.altRows === !0 && (w.rows.length - 1) % 2 === 0 ? " " + o : ""
                    }
                    for (r = a, a = w.p.idPrefix + a, i && (v = w.formatCol(0, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" ' + t + " " + v + ">0</td>"), g && (l = '<input role="checkbox" type="checkbox" id="jqg_' + w.p.id + "_" + a + '" ' + u + "/>", v = w.formatCol(i, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" ' + v + ">" + l + "</td>"), h && (f[f.length] = $(w).jqGrid("addSubGridCell", g + i, 1)), k = g + h + i; k < w.p.colModel.length; k++)q = w.p.colModel[k], e = q.name, B[e] = p[e], l = w.formatter(a, $.jgrid.getAccessor(p, e), k, p), v = w.formatCol(k, 1, l, p, a, B), f[f.length] = '<td role="gridcell" ' + v + ">" + l + "</td>";
                    if (f.unshift(w.constructTr(a, !1, y, B, p)), f[f.length] = "</tr>", 0 === w.rows.length)$("table:first", w.grid.bDiv).append(f.join("")); else switch (c) {
                        case"last":
                            $(w.rows[w.rows.length - 1]).after(f.join("")), j = w.rows.length - 1;
                            break;
                        case"first":
                            $(w.rows[0]).after(f.join("")), j = 1;
                            break;
                        case"after":
                            j = $(w).jqGrid("getGridRowById", d), j && ($(w.rows[j.rowIndex + 1]).hasClass("ui-subgrid") ? $(w.rows[j.rowIndex + 1]).after(f) : $(j).after(f.join("")), j = j.rowIndex + 1);
                            break;
                        case"before":
                            j = $(w).jqGrid("getGridRowById", d), j && ($(j).before(f.join("")), j = j.rowIndex - 1)
                    }
                    w.p.subGrid === !0 && $(w).jqGrid("addSubGrid", g + i, j), w.p.records++, w.p.reccount++, $(w).triggerHandler("jqGridAfterInsertRow", [a, p, p]), C && w.p.afterInsertRow.call(w, a, p, p), z++, "local" === w.p.datatype && (B[w.p.localReader.id] = r, w.p._index[r] = w.p.data.length, w.p.data.push(B), B = {})
                }
                w.p.altRows !== !0 || m || ("last" === c ? (w.rows.length - 1) % 2 === 0 && $(w.rows[w.rows.length - 1]).addClass(o) : $(w.rows).each(function (a) {
                    a % 2 === 0 ? $(this).addClass(o) : $(this).removeClass(o)
                })), w.updatepager(!0, !0), s = !0
            })), s
        }, footerData: function (a, b, c) {
            function d(a) {
                var b;
                for (b in a)if (a.hasOwnProperty(b))return !1;
                return !0
            }

            var e, f, g = !1, h = {};
            return void 0 === a && (a = "get"), "boolean" != typeof c && (c = !0), a = a.toLowerCase(), this.each(function () {
                var i, j = this;
                return j.grid && j.p.footerrow ? "set" === a && d(b) ? !1 : (g = !0, void $(this.p.colModel).each(function (d) {
                    e = this.name, "set" === a ? void 0 !== b[e] && (i = c ? j.formatter("", b[e], d, b, "edit") : b[e], f = this.title ? {title: $.jgrid.stripHtml(i)} : {}, $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html(i).attr(f), g = !0) : "get" === a && (h[e] = $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html())
                })) : !1
            }), "get" === a ? h : g
        }, showHideCol: function (a, b) {
            return this.each(function () {
                var c, d = this, e = !1, f = $.jgrid.cell_width ? 0 : d.p.cellLayout;
                if (d.grid) {
                    "string" == typeof a && (a = [a]), b = "none" !== b ? "" : "none";
                    var g = "" === b ? !0 : !1, h = d.p.groupHeader && ($.isArray(d.p.groupHeader) || $.isFunction(d.p.groupHeader));
                    if (h && $(d).jqGrid("destroyGroupHeader", !1), $(this.p.colModel).each(function (h) {
                            if (-1 !== $.inArray(this.name, a) && this.hidden === g) {
                                if (d.p.frozenColumns === !0 && this.frozen === !0)return !0;
                                $("tr[role=row]", d.grid.hDiv).each(function () {
                                    $(this.cells[h]).css("display", b)
                                }), $(d.rows).each(function () {
                                    $(this).hasClass("jqgroup") || $(this.cells[h]).css("display", b)
                                }), d.p.footerrow && $("tr.footrow td:eq(" + h + ")", d.grid.sDiv).css("display", b), c = parseInt(this.width, 10), "none" === b ? d.p.tblwidth -= c + f : d.p.tblwidth += c + f, this.hidden = !g, e = !0, $(d).triggerHandler("jqGridShowHideCol", [g, this.name, h])
                            }
                        }), e === !0 && (d.p.shrinkToFit !== !0 || isNaN(d.p.height) || (d.p.tblwidth += parseInt(d.p.scrollOffset, 10)), $(d).jqGrid("setGridWidth", d.p.shrinkToFit === !0 ? d.p.tblwidth : d.p.width)), h) {
                        var i = $.extend([], d.p.groupHeader);
                        d.p.groupHeader = null;
                        for (var j = 0; j < i.length; j++)$(d).jqGrid("setGroupHeaders", i[j])
                    }
                }
            })
        }, hideCol: function (a) {
            return this.each(function () {
                $(this).jqGrid("showHideCol", a, "none")
            })
        }, showCol: function (a) {
            return this.each(function () {
                $(this).jqGrid("showHideCol", a, "")
            })
        }, remapColumns: function (a, b, c) {
            function d(b) {
                var c;
                c = b.length ? $.makeArray(b) : $.extend({}, b), $.each(a, function (a) {
                    b[a] = c[this]
                })
            }

            function e(b, c) {
                $(">tr" + (c || ""), b).each(function () {
                    var b = this, c = $.makeArray(b.cells);
                    $.each(a, function () {
                        var a = c[this];
                        a && b.appendChild(a)
                    })
                })
            }

            var f = this.get(0);
            d(f.p.colModel), d(f.p.colNames), d(f.grid.headers), e($("thead:first", f.grid.hDiv), c && ":not(.ui-jqgrid-labels)"), b && e($("#" + $.jgrid.jqID(f.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot"), f.p.footerrow && e($("tbody:first", f.grid.sDiv)), f.p.remapColumns && (f.p.remapColumns.length ? d(f.p.remapColumns) : f.p.remapColumns = $.makeArray(a)), f.p.lastsort = $.inArray(f.p.lastsort, a), f.p.treeGrid && (f.p.expColInd = $.inArray(f.p.expColInd, a)), $(f).triggerHandler("jqGridRemapColumns", [a, b, c])
        }, setGridWidth: function (a, b) {
            return this.each(function () {
                if (this.grid) {
                    var c, d, e, f, g = this, h = 0, i = $.jgrid.cell_width ? 0 : g.p.cellLayout, j = 0, k = !1, l = g.p.scrollOffset, m = 0;
                    if ("boolean" != typeof b && (b = g.p.shrinkToFit), !isNaN(a)) {
                        if (a = parseInt(a, 10), g.grid.width = g.p.width = a, $("#gbox_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $("#gview_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $(g.grid.bDiv).css("width", a + "px"), $(g.grid.hDiv).css("width", a + "px"), g.p.pager && $(g.p.pager).css("width", a + "px"), g.p.toppager && $(g.p.toppager).css("width", a + "px"), g.p.toolbar[0] === !0 && ($(g.grid.uDiv).css("width", a + "px"), "both" === g.p.toolbar[1] && $(g.grid.ubDiv).css("width", a + "px")), g.p.footerrow && $(g.grid.sDiv).css("width", a + "px"), b === !1 && g.p.forceFit === !0 && (g.p.forceFit = !1), b === !0) {
                            if ($.each(g.p.colModel, function () {
                                    this.hidden === !1 && (c = this.widthOrg, h += c + i, this.fixed ? m += c + i : j++)
                                }), 0 === j)return;
                            g.p.tblwidth = h, e = a - i * j - m, isNaN(g.p.height) || ($(g.grid.bDiv)[0].clientHeight < $(g.grid.bDiv)[0].scrollHeight || 1 === g.rows.length) && (k = !0, e -= l), h = 0;
                            var n = g.grid.cols.length > 0;
                            if ($.each(g.p.colModel, function (a) {
                                    if (this.hidden === !1 && !this.fixed) {
                                        if (c = this.widthOrg, c = Math.round(e * c / (g.p.tblwidth - i * j - m)), 0 > c)return;
                                        this.width = c, h += c, g.grid.headers[a].width = c, g.grid.headers[a].el.style.width = c + "px", g.p.footerrow && (g.grid.footers[a].style.width = c + "px"), n && (g.grid.cols[a].style.width = c + "px"), d = a
                                    }
                                }), !d)return;
                            if (f = 0, k ? a - m - (h + i * j) !== l && (f = a - m - (h + i * j) - l) : 1 !== Math.abs(a - m - (h + i * j)) && (f = a - m - (h + i * j)), g.p.colModel[d].width += f, g.p.tblwidth = h + f + i * j + m, g.p.tblwidth > a) {
                                var o = g.p.tblwidth - parseInt(a, 10);
                                g.p.tblwidth = a, c = g.p.colModel[d].width = g.p.colModel[d].width - o
                            } else c = g.p.colModel[d].width;
                            g.grid.headers[d].width = c, g.grid.headers[d].el.style.width = c + "px", n && (g.grid.cols[d].style.width = c + "px"), g.p.footerrow && (g.grid.footers[d].style.width = c + "px")
                        }
                        g.p.tblwidth && ($("table:first", g.grid.bDiv).css("width", g.p.tblwidth + "px"), $("table:first", g.grid.hDiv).css("width", g.p.tblwidth + "px"), g.grid.hDiv.scrollLeft = g.grid.bDiv.scrollLeft, g.p.footerrow && $("table:first", g.grid.sDiv).css("width", g.p.tblwidth + "px"))
                    }
                }
            })
        }, setGridHeight: function (a) {
            return this.each(function () {
                var b = this;
                if (b.grid) {
                    var c = $(b.grid.bDiv);
                    c.css({height: a + (isNaN(a) ? "" : "px")}), b.p.frozenColumns === !0 && $("#" + $.jgrid.jqID(b.p.id) + "_frozen").parent().height(c.height() - 16), b.p.height = a, b.p.scroll && b.grid.populateVisible()
                }
            })
        }, setCaption: function (a) {
            return this.each(function () {
                var b = $(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "cornertop", !0);
                this.p.caption = a, $(".ui-jqgrid-title, .ui-jqgrid-title-rtl", this.grid.cDiv).html(a), $(this.grid.cDiv).show(), $(this.grid.hDiv).removeClass(b)
            })
        }, setLabel: function (a, b, c, d) {
            return this.each(function () {
                var e = this, f = -1;
                if (e.grid && void 0 !== a && ($(e.p.colModel).each(function (b) {
                        return this.name === a ? (f = b, !1) : void 0
                    }), f >= 0)) {
                    var g = $("tr.ui-jqgrid-labels th:eq(" + f + ")", e.grid.hDiv);
                    if (b) {
                        var h = $(".s-ico", g);
                        $("[id^=jqgh_]", g).empty().html(b).append(h), e.p.colNames[f] = b
                    }
                    c && ("string" == typeof c ? $(g).addClass(c) : $(g).css(c)), "object" == typeof d && $(g).attr(d)
                }
            })
        }, setCell: function (a, b, c, d, e, f) {
            return this.each(function () {
                var g, h, i = this, j = -1;
                if (i.grid && (isNaN(b) ? $(i.p.colModel).each(function (a) {
                        return this.name === b ? (j = a, !1) : void 0
                    }) : j = parseInt(b, 10), j >= 0)) {
                    var k = $(i).jqGrid("getGridRowById", a);
                    if (k) {
                        var l = $("td:eq(" + j + ")", k), m = 0, n = [];
                        if ("" !== c || f === !0) {
                            if (void 0 !== k.cells)for (; m < k.cells.length;)n.push(k.cells[m].innerHTML), m++;
                            if (g = i.formatter(a, c, j, n, "edit"), h = i.p.colModel[j].title ? {title: $.jgrid.stripHtml(g)} : {}, i.p.treeGrid && $(".tree-wrap", $(l)).length > 0 ? $("span", $(l)).html(g).attr(h) : $(l).html(g).attr(h), "local" === i.p.datatype) {
                                var o, p = i.p.colModel[j];
                                c = p.formatter && "string" == typeof p.formatter && "date" === p.formatter ? $.unformat.date.call(i, c, p) : c, o = i.p._index[$.jgrid.stripPref(i.p.idPrefix, a)], void 0 !== o && (i.p.data[o][p.name] = c)
                            }
                        }
                        "string" == typeof d ? $(l).addClass(d) : d && $(l).css(d), "object" == typeof e && $(l).attr(e)
                    }
                }
            })
        }, getCell: function (a, b) {
            var c = !1;
            return this.each(function () {
                var d = this, e = -1;
                if (d.grid && (isNaN(b) ? $(d.p.colModel).each(function (a) {
                        return this.name === b ? (e = a, !1) : void 0
                    }) : e = parseInt(b, 10), e >= 0)) {
                    var f = $(d).jqGrid("getGridRowById", a);
                    if (f)try {
                        c = $.unformat.call(d, $("td:eq(" + e + ")", f), {rowId: f.id, colModel: d.p.colModel[e]}, e)
                    } catch (g) {
                        c = $.jgrid.htmlDecode($("td:eq(" + e + ")", f).html())
                    }
                }
            }), c
        }, getCol: function (a, b, c) {
            var d, e, f, g, h = [], i = 0;
            return b = "boolean" != typeof b ? !1 : b, void 0 === c && (c = !1), this.each(function () {
                var j = this, k = -1;
                if (j.grid && (isNaN(a) ? $(j.p.colModel).each(function (b) {
                        return this.name === a ? (k = b, !1) : void 0
                    }) : k = parseInt(a, 10), k >= 0)) {
                    var l = j.rows.length, m = 0, n = 0;
                    if (l && l > 0) {
                        for (; l > m;) {
                            if ($(j.rows[m]).hasClass("jqgrow")) {
                                try {
                                    d = $.unformat.call(j, $(j.rows[m].cells[k]), {
                                        rowId: j.rows[m].id,
                                        colModel: j.p.colModel[k]
                                    }, k)
                                } catch (o) {
                                    d = $.jgrid.htmlDecode(j.rows[m].cells[k].innerHTML)
                                }
                                c ? (g = parseFloat(d), isNaN(g) || (i += g, void 0 === f && (f = e = g), e = Math.min(e, g), f = Math.max(f, g), n++)) : h.push(b ? {
                                    id: j.rows[m].id,
                                    value: d
                                } : d)
                            }
                            m++
                        }
                        if (c)switch (c.toLowerCase()) {
                            case"sum":
                                h = i;
                                break;
                            case"avg":
                                h = i / n;
                                break;
                            case"count":
                                h = l - 1;
                                break;
                            case"min":
                                h = e;
                                break;
                            case"max":
                                h = f
                        }
                    }
                }
            }), h
        }, clearGridData: function (a) {
            return this.each(function () {
                var b = this;
                if (b.grid) {
                    if ("boolean" != typeof a && (a = !1), b.p.deepempty)$("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:gt(0)").remove(); else {
                        var c = $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:first")[0];
                        $("#" + $.jgrid.jqID(b.p.id) + " tbody:first").empty().append(c)
                    }
                    b.p.footerrow && a && $(".ui-jqgrid-ftable td", b.grid.sDiv).html("&#160;"), b.p.selrow = null, b.p.selarrrow = [], b.p.savedRow = [], b.p.records = 0, b.p.page = 1, b.p.lastpage = 0, b.p.reccount = 0, b.p.data = [], b.p._index = {}, b.updatepager(!0, !1)
                }
            })
        }, getInd: function (a, b) {
            var c, d = !1;
            return this.each(function () {
                c = $(this).jqGrid("getGridRowById", a), c && (d = b === !0 ? c : c.rowIndex)
            }), d
        }, bindKeys: function (a) {
            var b = $.extend({
                onEnter: null,
                onSpace: null,
                onLeftKey: null,
                onRightKey: null,
                scrollingRows: !0
            }, a || {});
            return this.each(function () {
                var a = this;
                $("body").is("[role]") || $("body").attr("role", "application"), a.p.scrollrows = b.scrollingRows, $(a).keydown(function (c) {
                    var d, e, f, g = $(a).find("tr[tabindex=0]")[0], h = a.p.treeReader.expanded_field;
                    if (g)if (f = a.p._index[$.jgrid.stripPref(a.p.idPrefix, g.id)], 37 === c.keyCode || 38 === c.keyCode || 39 === c.keyCode || 40 === c.keyCode) {
                        if (38 === c.keyCode) {
                            if (e = g.previousSibling, d = "", e)if ($(e).is(":hidden")) {
                                for (; e;)if (e = e.previousSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                    d = e.id;
                                    break
                                }
                            } else d = e.id;
                            $(a).jqGrid("setSelection", d, !0, c), c.preventDefault()
                        }
                        if (40 === c.keyCode) {
                            if (e = g.nextSibling, d = "", e)if ($(e).is(":hidden")) {
                                for (; e;)if (e = e.nextSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                    d = e.id;
                                    break
                                }
                            } else d = e.id;
                            $(a).jqGrid("setSelection", d, !0, c), c.preventDefault()
                        }
                        37 === c.keyCode && (a.p.treeGrid && a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyLeft", [a.p.selrow]), $.isFunction(b.onLeftKey) && b.onLeftKey.call(a, a.p.selrow)), 39 === c.keyCode && (a.p.treeGrid && !a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyRight", [a.p.selrow]), $.isFunction(b.onRightKey) && b.onRightKey.call(a, a.p.selrow))
                    } else 13 === c.keyCode ? ($(a).triggerHandler("jqGridKeyEnter", [a.p.selrow]), $.isFunction(b.onEnter) && b.onEnter.call(a, a.p.selrow)) : 32 === c.keyCode && ($(a).triggerHandler("jqGridKeySpace", [a.p.selrow]), $.isFunction(b.onSpace) && b.onSpace.call(a, a.p.selrow))
                })
            })
        }, unbindKeys: function () {
            return this.each(function () {
                $(this).unbind("keydown")
            })
        }, getLocalRow: function (a) {
            var b, c = !1;
            return this.each(function () {
                void 0 !== a && (b = this.p._index[$.jgrid.stripPref(this.p.idPrefix, a)], b >= 0 && (c = this.p.data[b]))
            }), c
        }, progressBar: function (a) {
            return a = $.extend({
                htmlcontent: "",
                method: "hide",
                loadtype: "disable"
            }, a || {}), this.each(function () {
                var b, c, d = "show" === a.method ? !0 : !1, e = $("#load_" + $.jgrid.jqID(this.p.id)), f = $(window).scrollTop();
                switch ("" !== a.htmlcontent && e.html(a.htmlcontent), a.loadtype) {
                    case"disable":
                        break;
                    case"enable":
                        e.toggle(d);
                        break;
                    case"block":
                        $("#lui_" + $.jgrid.jqID(this.p.id)).toggle(d), e.toggle(d)
                }
                e.is(":visible") && (b = e.offsetParent(), e.css("top", ""), e.offset().top < f && (c = Math.min(10 + f - b.offset().top, b.height() - e.height()), e.css("top", c + "px")))
            })
        }, getColProp: function (a) {
            var b = {}, c = this[0];
            if (!c.grid)return !1;
            var d, e = c.p.colModel;
            for (d = 0; d < e.length; d++)if (e[d].name === a) {
                b = e[d];
                break
            }
            return b
        }, setColProp: function (a, b) {
            return this.each(function () {
                if (this.grid && b) {
                    var c, d = this.p.colModel;
                    for (c = 0; c < d.length; c++)if (d[c].name === a) {
                        $.extend(!0, this.p.colModel[c], b);
                        break
                    }
                }
            })
        }, sortGrid: function (a, b, c) {
            return this.each(function () {
                var d, e = this, f = -1, g = !1;
                if (e.grid) {
                    for (a || (a = e.p.sortname), d = 0; d < e.p.colModel.length; d++)if (e.p.colModel[d].index === a || e.p.colModel[d].name === a) {
                        f = d, e.p.frozenColumns === !0 && e.p.colModel[d].frozen === !0 && (g = e.grid.fhDiv.find("#" + e.p.id + "_" + a));
                        break
                    }
                    if (-1 !== f) {
                        var h = e.p.colModel[f].sortable;
                        g || (g = e.grid.headers[f].el), "boolean" != typeof h && (h = !0), "boolean" != typeof b && (b = !1), h && e.sortData("jqgh_" + e.p.id + "_" + a, f, b, c, g)
                    }
                }
            })
        }, setGridState: function (a) {
            return this.each(function () {
                if (this.grid) {
                    var b = this, c = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_open", !0), d = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_close", !0);
                    "hidden" === a ? ($(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideUp("fast"), b.p.pager && $(b.p.pager).slideUp("fast"), b.p.toppager && $(b.p.toppager).slideUp("fast"), b.p.toolbar[0] === !0 && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideUp("fast"), $(b.grid.uDiv).slideUp("fast")), b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideUp("fast"), $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(c).addClass(d), b.p.gridstate = "hidden") : "visible" === a && ($(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideDown("fast"), b.p.pager && $(b.p.pager).slideDown("fast"), b.p.toppager && $(b.p.toppager).slideDown("fast"), b.p.toolbar[0] === !0 && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideDown("fast"), $(b.grid.uDiv).slideDown("fast")), b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideDown("fast"), $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(d).addClass(c), b.p.gridstate = "visible")
                }
            })
        }, setFrozenColumns: function () {
            return this.each(function () {
                if (this.grid) {
                    var a = this, b = a.p.colModel, c = 0, d = b.length, e = -1, f = !1, g = $(a).jqGrid("getStyleUI", a.p.styleUI + ".base", "headerDiv", !0, "ui-jqgrid-hdiv"), h = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0);
                    if (a.p.subGrid !== !0 && a.p.treeGrid !== !0 && a.p.cellEdit !== !0 && !a.p.sortable && !a.p.scroll) {
                        for (a.p.rownumbers && c++, a.p.multiselect && c++; d > c && b[c].frozen === !0;)f = !0, e = c, c++;
                        if (e >= 0 && f) {
                            var i = a.p.caption ? $(a.grid.cDiv).outerHeight() : 0, j = $(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).height();
                            a.p.toppager && (i += $(a.grid.topDiv).outerHeight()), a.p.toolbar[0] === !0 && "bottom" !== a.p.toolbar[1] && (i += $(a.grid.uDiv).outerHeight()), a.grid.fhDiv = $('<div style="position:absolute;' + ("rtl" === a.p.direction ? "right:0;" : "left:0;") + "top:" + i + "px;height:" + j + 'px;" class="frozen-div ' + g + '"></div>'), a.grid.fbDiv = $('<div style="position:absolute;' + ("rtl" === a.p.direction ? "right:0;" : "left:0;") + "top:" + (parseInt(i, 10) + parseInt(j, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>'), $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fhDiv);
                            var k = $(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                            if (a.p.groupHeader) {
                                $("tr.jqg-first-row-header, tr.jqg-third-row-header", k).each(function () {
                                    $("th:gt(" + e + ")", this).remove()
                                });
                                var l, m, n = -1, o = -1;
                                $("tr.jqg-second-row-header th", k).each(function () {
                                    return l = parseInt($(this).attr("colspan"), 10), m = parseInt($(this).attr("rowspan"), 10), m && (n++, o++), l && (n += l, o++), n === e ? (o = e, !1) : void 0
                                }), n !== e && (o = e), $("tr.jqg-second-row-header", k).each(function () {
                                    $("th:gt(" + o + ")", this).remove()
                                })
                            } else $("tr", k).each(function () {
                                $("th:gt(" + e + ")", this).remove()
                            });
                            if ($(k).width(1), $(a.grid.fhDiv).append(k).mousemove(function (b) {
                                    return a.grid.resizing ? (a.grid.dragMove(b), !1) : void 0
                                }), a.p.footerrow) {
                                var p = $(".ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(a.p.id)).height();
                                a.grid.fsDiv = $('<div style="position:absolute;left:0px;top:' + (parseInt(i, 10) + parseInt(j, 10) + parseInt(p, 10) + 1) + 'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>'), $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fsDiv);
                                var q = $(".ui-jqgrid-ftable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr", q).each(function () {
                                    $("td:gt(" + e + ")", this).remove()
                                }), $(q).width(1), $(a.grid.fsDiv).append(q)
                            }
                            $(a).bind("jqGridResizeStop.setFrozenColumns", function (b, c, d) {
                                var e = $(".ui-jqgrid-htable", a.grid.fhDiv);
                                $("th:eq(" + d + ")", e).width(c);
                                var f = $(".ui-jqgrid-btable", a.grid.fbDiv);
                                if ($("tr:first td:eq(" + d + ")", f).width(c), a.p.footerrow) {
                                    var g = $(".ui-jqgrid-ftable", a.grid.fsDiv);
                                    $("tr:first td:eq(" + d + ")", g).width(c)
                                }
                            }), $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fbDiv), $(a.grid.fbDiv).bind("mousewheel DOMMouseScroll", function (b) {
                                var c = $(a.grid.bDiv).scrollTop();
                                $(a.grid.bDiv).scrollTop(b.originalEvent.wheelDelta > 0 || b.originalEvent.detail < 0 ? c - 25 : c + 25), b.preventDefault()
                            }), a.p.hoverrows === !0 && $("#" + $.jgrid.jqID(a.p.id)).unbind("mouseover").unbind("mouseout"), $(a).bind("jqGridAfterGridComplete.setFrozenColumns", function () {
                                $("#" + $.jgrid.jqID(a.p.id) + "_frozen").remove(), $(a.grid.fbDiv).height($(a.grid.bDiv).height() - 16);
                                var b = $("#" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr[role=row]", b).each(function () {
                                    $("td[role=gridcell]:gt(" + e + ")", this).remove()
                                }), $(b).width(1).attr("id", a.p.id + "_frozen"), $(a.grid.fbDiv).append(b), a.p.hoverrows === !0 && ($("tr.jqgrow", b).hover(function () {
                                    $(this).addClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).addClass(h)
                                }, function () {
                                    $(this).removeClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).removeClass(h)
                                }), $("tr.jqgrow", "#" + $.jgrid.jqID(a.p.id)).hover(function () {
                                    $(this).addClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").addClass(h)
                                }, function () {
                                    $(this).removeClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").removeClass(h)
                                })), b = null
                            }), a.grid.hDiv.loading || $(a).triggerHandler("jqGridAfterGridComplete"), a.p.frozenColumns = !0
                        }
                    }
                }
            })
        }, destroyFrozenColumns: function () {
            return this.each(function () {
                if (this.grid && this.p.frozenColumns === !0) {
                    var a = this, b = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0);
                    if ($(a.grid.fhDiv).remove(), $(a.grid.fbDiv).remove(), a.grid.fhDiv = null, a.grid.fbDiv = null, a.p.footerrow && ($(a.grid.fsDiv).remove(), a.grid.fsDiv = null), $(this).unbind(".setFrozenColumns"), a.p.hoverrows === !0) {
                        var c;
                        $("#" + $.jgrid.jqID(a.p.id)).bind("mouseover", function (a) {
                            c = $(a.target).closest("tr.jqgrow"), "ui-subgrid" !== $(c).attr("class") && $(c).addClass(b)
                        }).bind("mouseout", function (a) {
                            c = $(a.target).closest("tr.jqgrow"), $(c).removeClass(b)
                        })
                    }
                    this.p.frozenColumns = !1
                }
            })
        }, resizeColumn: function (a, b) {
            return this.each(function () {
                var c, d, e, f = this.grid, g = this.p, h = g.colModel, i = h.length;
                if ("string" == typeof a) {
                    for (c = 0; i > c; c++)if (h[c].name === a) {
                        a = c;
                        break
                    }
                } else a = parseInt(a, 10);
                if (b = parseInt(b, 10), !("number" != typeof a || 0 > a || a > h.length - 1 || "number" != typeof b || b < g.minColWidth)) {
                    if (g.forceFit)for (g.nv = 0, c = a + 1; i > c; c++)if (h[c].hidden !== !0) {
                        g.nv = c - a;
                        break
                    }
                    if (f.resizing = {idx: a}, d = b - f.headers[a].width, g.forceFit) {
                        if (e = f.headers[a + g.nv].width - d, e < g.minColWidth)return;
                        f.headers[a + g.nv].newWidth = f.headers[a + g.nv].width - d
                    }
                    f.newWidth = g.tblwidth + d, f.headers[a].newWidth = b, f.dragEnd(!1)
                }
            })
        }, getStyleUI: function (a, b, c, d) {
            try {
                var e = "", f = a.split("."), g = "";
                switch (c || (e = "class=", g = '"'), null == d && (d = ""), f.length) {
                    case 1:
                        e += g + d + " " + $.jgrid.styleUI[f[0]][b] + g;
                        break;
                    case 2:
                        e += g + d + " " + $.jgrid.styleUI[f[0]][f[1]][b] + g
                }
            } catch (h) {
                e = ""
            }
            return $.trim(e)
        }, resizeGrid: function (a) {
            return this.each(function () {
                var b = this;
                void 0 === a && (a = 500), setTimeout(function () {
                    var a = $(window).width(), c = $("#gbox_" + $.jgrid.jqID(b.p.id)).parent().width(), d = b.p.width;
                    d = a - c > 3 ? c : a, $("#" + $.jgrid.jqID(b.p.id)).jqGrid("setGridWidth", d)
                }, a)
            })
        }
    })
});