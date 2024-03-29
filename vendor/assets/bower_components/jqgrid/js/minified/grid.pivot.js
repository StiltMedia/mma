/**
 *
 * @license Guriddo jqGrid JS - v5.0.1
 * Copyright(c) 2008, Tony Tomov, tony@trirand.com
 *
 * License: http://guriddo.net/?page_id=103334
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./grid.base", "./grid.grouping"], a) : a(jQuery)
}(function (a) {
    "use strict";
    function b(a, b) {
        var c, d, e, f = [];
        if (!this || "function" != typeof a || a instanceof RegExp)throw new TypeError;
        for (e = this.length, c = 0; e > c; c++)if (this.hasOwnProperty(c) && (d = this[c], a.call(b, d, c, this))) {
            f.push(d);
            break
        }
        return f
    }

    a.assocArraySize = function (a) {
        var b, c = 0;
        for (b in a)a.hasOwnProperty(b) && c++;
        return c
    }, a.jgrid.extend({
        pivotSetup: function (c, d) {
            var e = [], f = [], g = [], h = [], i = [], j = {
                grouping: !0,
                groupingView: {groupField: [], groupSummary: [], groupSummaryPos: []}
            }, k = [], l = a.extend({
                rowTotals: !1,
                rowTotalsText: "Total",
                colTotals: !1,
                groupSummary: !0,
                groupSummaryPos: "header",
                frozenStaticCols: !1
            }, d || {});
            return this.each(function () {
                function d(a, c, d) {
                    var e;
                    return e = b.call(a, c, d), e.length > 0 ? e[0] : null
                }

                function m(a, b) {
                    var c, d = 0, e = !0;
                    for (c in a)if (a.hasOwnProperty(c)) {
                        if (a[c] != this[d]) {
                            e = !1;
                            break
                        }
                        if (d++, d >= this.length)break
                    }
                    return e && (r = b), e
                }

                function n(a, b, c, d, e) {
                    var f;
                    switch (a) {
                        case"sum":
                            f = parseFloat(b || 0) + parseFloat(d[c] || 0);
                            break;
                        case"count":
                            ("" === b || null == b) && (b = 0), f = d.hasOwnProperty(c) ? b + 1 : 0;
                            break;
                        case"min":
                            f = "" === b || null == b ? parseFloat(d[c] || 0) : Math.min(parseFloat(b), parseFloat(d[c] || 0));
                            break;
                        case"max":
                            f = "" === b || null == b ? parseFloat(d[c] || 0) : Math.max(parseFloat(b), parseFloat(d[c] || 0));
                            break;
                        case"avg":
                            f = (parseFloat(b || 0) * (e - 1) + parseFloat(d[c] || 0)) / e
                    }
                    return f
                }

                function o(b, c, d, e) {
                    var f, g, j, k, l = c.length, m = "", o = [];
                    for (a.isArray(d) ? (k = d.length, o = d) : (k = 1, o[0] = d), h = [], i = [], h.root = 0, e._count ? e._count++ : e._count = 1, j = 0; k > j; j++) {
                        var p, q = [];
                        for (f = 0; l > f; f++) {
                            if (null == d)g = a.trim(c[f].member) + "_" + c[f].aggregator, p = g, o[0] = c[f].label || c[f].aggregator + " " + a.trim(c[f].member); else {
                                p = d[j].replace(/\s+/g, "");
                                try {
                                    g = 1 === l ? m + p : m + p + "_" + c[f].aggregator + "_" + String(f)
                                } catch (r) {
                                }
                                o[j] = d[j]
                            }
                            g = isNaN(parseInt(g, 10)) ? g : g + " ", e[g] = q[g] = n(c[f].aggregator, e[g], c[f].member, b, e._count), 1 >= j && "_r_Totals" !== p && "" === m && (m = p)
                        }
                        h[g] = q, i[g] = o[j]
                    }
                    return e
                }

                function p(a) {
                    var b, c, d, f, g;
                    for (d in a)if (a.hasOwnProperty(d)) {
                        if ("object" != typeof a[d]) {
                            if ("level" === d) {
                                if (void 0 === L[a.level] && (L[a.level] = "", a.level > 0 && -1 === a.text.indexOf("_r_Totals") && (k[a.level - 1] = {
                                        useColSpanStyle: !1,
                                        groupHeaders: []
                                    })), L[a.level] !== a.text && a.children.length && -1 === a.text.indexOf("_r_Totals") && a.level > 0) {
                                    k[a.level - 1].groupHeaders.push({titleText: a.label, numberOfColumns: 0});
                                    var h = k[a.level - 1].groupHeaders.length - 1, i = 0 === h ? N : M + v;
                                    if (a.level - 1 === (l.rowTotals ? 1 : 0) && h > 0) {
                                        for (var j = 0, m = 0; h > m; m++)j += k[a.level - 1].groupHeaders[m].numberOfColumns;
                                        j && (i = j + t)
                                    }
                                    e[i] && (k[a.level - 1].groupHeaders[h].startColumnName = e[i].name, k[a.level - 1].groupHeaders[h].numberOfColumns = e.length - i), M = e.length
                                }
                                L[a.level] = a.text
                            }
                            if (a.level === u && "level" === d && u > 0)if (v > 1) {
                                var n = 1;
                                for (b in a.fields)a.fields.hasOwnProperty(b) && (1 === n && k[u - 1].groupHeaders.push({
                                    startColumnName: b,
                                    numberOfColumns: 1,
                                    titleText: a.label || a.text
                                }), n++);
                                k[u - 1].groupHeaders[k[u - 1].groupHeaders.length - 1].numberOfColumns = n - 1
                            } else k.splice(u - 1, 1)
                        }
                        if (null != a[d] && "object" == typeof a[d] && p(a[d]), "level" === d && a.level > 0 && (a.level === (0 === u ? a.level : u) || -1 !== L[a.level].indexOf("_r_Totals"))) {
                            c = 0;
                            for (b in a.fields)if (a.fields.hasOwnProperty(b)) {
                                g = {};
                                for (f in l.aggregates[c])if (l.aggregates[c].hasOwnProperty(f))switch (f) {
                                    case"member":
                                    case"label":
                                    case"aggregator":
                                        break;
                                    default:
                                        g[f] = l.aggregates[c][f]
                                }
                                v > 1 ? (g.name = b, g.label = l.aggregates[c].label || a.label) : (g.name = a.text, g.label = "_r_Totals" === a.text ? l.rowTotalsText : a.label), e.push(g), c++
                            }
                        }
                    }
                }

                var q, r, s, t, u, v, w, x, y = c.length, z = 0;
                if (l.rowTotals && l.yDimension.length > 0) {
                    var A = l.yDimension[0].dataName;
                    l.yDimension.splice(0, 0, {dataName: A}), l.yDimension[0].converter = function () {
                        return "_r_Totals"
                    }
                }
                if (t = a.isArray(l.xDimension) ? l.xDimension.length : 0, u = l.yDimension.length, v = a.isArray(l.aggregates) ? l.aggregates.length : 0, 0 === t || 0 === v)throw"xDimension or aggregates optiona are not set!";
                var B;
                for (s = 0; t > s; s++)B = {
                    name: l.xDimension[s].dataName,
                    frozen: l.frozenStaticCols
                }, null == l.xDimension[s].isGroupField && (l.xDimension[s].isGroupField = !0), B = a.extend(!0, B, l.xDimension[s]), e.push(B);
                for (var C = t - 1, D = {}; y > z;) {
                    q = c[z];
                    var E = [], F = [];
                    w = {}, s = 0;
                    do E[s] = a.trim(q[l.xDimension[s].dataName]), w[l.xDimension[s].dataName] = E[s], s++; while (t > s);
                    var G = 0;
                    if (r = -1, x = d(f, m, E)) {
                        if (r >= 0) {
                            if (G = 0, u >= 1) {
                                for (G = 0; u > G; G++)F[G] = a.trim(q[l.yDimension[G].dataName]), l.yDimension[G].converter && a.isFunction(l.yDimension[G].converter) && (F[G] = l.yDimension[G].converter.call(this, F[G], E, F));
                                x = o(q, l.aggregates, F, x)
                            } else 0 === u && (x = o(q, l.aggregates, null, x));
                            f[r] = x
                        }
                    } else {
                        if (G = 0, u >= 1) {
                            for (G = 0; u > G; G++)F[G] = a.trim(q[l.yDimension[G].dataName]), l.yDimension[G].converter && a.isFunction(l.yDimension[G].converter) && (F[G] = l.yDimension[G].converter.call(this, F[G], E, F));
                            w = o(q, l.aggregates, F, w)
                        } else 0 === u && (w = o(q, l.aggregates, null, w));
                        f.push(w)
                    }
                    var H, I = 0, J = null, K = null;
                    for (H in h)if (h.hasOwnProperty(H)) {
                        if (0 === I)D.children && void 0 !== D.children || (D = {
                            text: H,
                            level: 0,
                            children: [],
                            label: H
                        }), J = D.children; else {
                            for (K = null, s = 0; s < J.length; s++)if (J[s].text === H) {
                                K = J[s];
                                break
                            }
                            K ? J = K.children : (J.push({
                                children: [],
                                text: H,
                                level: I,
                                fields: h[H],
                                label: i[H]
                            }), J = J[J.length - 1].children)
                        }
                        I++
                    }
                    z++
                }
                var L = [], M = e.length, N = M;
                u > 0 && (k[u - 1] = {useColSpanStyle: !1, groupHeaders: []}), p(D);
                var O;
                if (l.colTotals)for (var P = f.length; P--;)for (s = t; s < e.length; s++)O = e[s].name, g[O] ? g[O] += parseFloat(f[P][O] || 0) : g[O] = parseFloat(f[P][O] || 0);
                if (C > 0)for (s = 0; C > s; s++)e[s].isGroupField && (j.groupingView.groupField.push(e[s].name), j.groupingView.groupSummary.push(l.groupSummary), j.groupingView.groupSummaryPos.push(l.groupSummaryPos)); else j.grouping = !1;
                j.sortname = e[C].name, j.groupingView.hideFirstGroupCol = !0
            }), {colModel: e, rows: f, groupOptions: j, groupHeaders: k, summary: g}
        }, jqPivot: function (b, c, d, e) {
            return this.each(function () {
                function f(b) {
                    var e, f, h, i, j = jQuery(g).jqGrid("pivotSetup", b, c), k = a.assocArraySize(j.summary) > 0 ? !0 : !1, l = a.jgrid.from.call(g, j.rows);
                    for (c.ignoreCase && (l = l.ignoreCase()), e = 0; e < j.groupOptions.groupingView.groupField.length; e++)f = c.xDimension[e].sortorder ? c.xDimension[e].sortorder : "asc", h = c.xDimension[e].sorttype ? c.xDimension[e].sorttype : "text", l.orderBy(j.groupOptions.groupingView.groupField[e], f, h, "", h);
                    i = c.xDimension.length, j.groupOptions.sortname && i && (f = c.xDimension[i - 1].sortorder ? c.xDimension[i - 1].sortorder : "asc", h = c.xDimension[i - 1].sorttype ? c.xDimension[i - 1].sorttype : "text", l.orderBy(j.groupOptions.sortname, f, h, "", h)), jQuery(g).jqGrid(a.extend(!0, {
                        datastr: a.extend(l.select(), k ? {userdata: j.summary} : {}),
                        datatype: "jsonstring",
                        footerrow: k,
                        userDataOnFooter: k,
                        colModel: j.colModel,
                        viewrecords: !0,
                        sortname: c.xDimension[0].dataName
                    }, j.groupOptions, d || {}));
                    var m = j.groupHeaders;
                    if (m.length)for (e = 0; e < m.length; e++)m[e] && m[e].groupHeaders.length && jQuery(g).jqGrid("setGroupHeaders", m[e]);
                    c.frozenStaticCols && jQuery(g).jqGrid("setFrozenColumns")
                }

                var g = this;
                "string" == typeof b ? a.ajax(a.extend({
                    url: b, dataType: "json", success: function (b) {
                        f(a.jgrid.getAccessor(b, e && e.reader ? e.reader : "rows"))
                    }
                }, e || {})) : f(b)
            })
        }
    })
});