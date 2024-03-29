/**
 *
 * @license Guriddo jqGrid JS - v5.0.1
 * Copyright(c) 2008, Tony Tomov, tony@trirand.com
 *
 * License: http://guriddo.net/?page_id=103334
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./grid.base"], a) : a(jQuery)
}(function (a) {
    "use strict";
    a.jgrid.extend({
        groupingSetup: function () {
            return this.each(function () {
                var b, c, d, e = this, f = e.p.colModel, g = e.p.groupingView, h = a.jgrid.styleUI[e.p.styleUI || "jQueryUI"].grouping;
                if (null === g || "object" != typeof g && !a.isFunction(g))e.p.grouping = !1; else if (g.plusicon || (g.plusicon = h.icon_plus), g.minusicon || (g.minusicon = h.icon_minus), g.groupField.length) {
                    for (void 0 === g.visibiltyOnNextGrouping && (g.visibiltyOnNextGrouping = []), g.lastvalues = [], g._locgr || (g.groups = []), g.counters = [], b = 0; b < g.groupField.length; b++)g.groupOrder[b] || (g.groupOrder[b] = "asc"), g.groupText[b] || (g.groupText[b] = "{0}"), "boolean" != typeof g.groupColumnShow[b] && (g.groupColumnShow[b] = !0), "boolean" != typeof g.groupSummary[b] && (g.groupSummary[b] = !1), g.groupSummaryPos[b] || (g.groupSummaryPos[b] = "footer"), g.groupColumnShow[b] === !0 ? (g.visibiltyOnNextGrouping[b] = !0, a(e).jqGrid("showCol", g.groupField[b])) : (g.visibiltyOnNextGrouping[b] = a("#" + a.jgrid.jqID(e.p.id + "_" + g.groupField[b])).is(":visible"), a(e).jqGrid("hideCol", g.groupField[b]));
                    for (g.summary = [], g.hideFirstGroupCol && (g.formatDisplayField[0] = function (a) {
                        return a
                    }), c = 0, d = f.length; d > c; c++)g.hideFirstGroupCol && (f[c].hidden || g.groupField[0] !== f[c].name || (f[c].formatter = function () {
                        return ""
                    })), f[c].summaryType && g.summary.push(f[c].summaryDivider ? {
                        nm: f[c].name,
                        st: f[c].summaryType,
                        v: "",
                        sd: f[c].summaryDivider,
                        vd: "",
                        sr: f[c].summaryRound,
                        srt: f[c].summaryRoundType || "round"
                    } : {
                        nm: f[c].name,
                        st: f[c].summaryType,
                        v: "",
                        sr: f[c].summaryRound,
                        srt: f[c].summaryRoundType || "round"
                    })
                } else e.p.grouping = !1
            })
        }, groupingPrepare: function (b, c) {
            return this.each(function () {
                var d, e, f, g, h, i = this.p.groupingView, j = this, k = function () {
                    a.isFunction(this.st) ? this.v = this.st.call(j, this.v, this.nm, b) : (this.v = a(j).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, b), "avg" === this.st.toLowerCase() && this.sd && (this.vd = a(j).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, b)))
                }, l = i.groupField.length, m = 0;
                for (d = 0; l > d; d++)e = i.groupField[d], g = i.displayField[d], f = b[e], h = null == g ? null : b[g], null == h && (h = f), void 0 !== f && (0 === c ? (i.groups.push({
                    idx: d,
                    dataIndex: e,
                    value: f,
                    displayValue: h,
                    startRow: c,
                    cnt: 1,
                    summary: []
                }), i.lastvalues[d] = f, i.counters[d] = {
                    cnt: 1,
                    pos: i.groups.length - 1,
                    summary: a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : "object" == typeof f || (a.isArray(i.isInTheSameGroup) && a.isFunction(i.isInTheSameGroup[d]) ? i.isInTheSameGroup[d].call(j, i.lastvalues[d], f, d, i) : i.lastvalues[d] === f) ? 1 === m ? (i.groups.push({
                    idx: d,
                    dataIndex: e,
                    value: f,
                    displayValue: h,
                    startRow: c,
                    cnt: 1,
                    summary: []
                }), i.lastvalues[d] = f, i.counters[d] = {
                    cnt: 1,
                    pos: i.groups.length - 1,
                    summary: a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : (i.counters[d].cnt += 1, i.groups[i.counters[d].pos].cnt = i.counters[d].cnt, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : (i.groups.push({
                    idx: d,
                    dataIndex: e,
                    value: f,
                    displayValue: h,
                    startRow: c,
                    cnt: 1,
                    summary: []
                }), i.lastvalues[d] = f, m = 1, i.counters[d] = {
                    cnt: 1,
                    pos: i.groups.length - 1,
                    summary: a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary))
            }), this
        }, groupingToggle: function (b) {
            return this.each(function () {
                var c = this, d = c.p.groupingView, e = b.split("_"), f = parseInt(e[e.length - 2], 10);
                e.splice(e.length - 2, 2);
                var g, h, i = e.join("_"), j = d.minusicon, k = d.plusicon, l = a("#" + a.jgrid.jqID(b)), m = l.length ? l[0].nextSibling : null, n = a("#" + a.jgrid.jqID(b) + " span.tree-wrap-" + c.p.direction), o = function (b) {
                    var c = a.map(b.split(" "), function (a) {
                        return a.substring(0, i.length + 1) === i + "_" ? parseInt(a.substring(i.length + 1), 10) : void 0
                    });
                    return c.length > 0 ? c[0] : void 0
                }, p = !1, q = !1, r = c.p.frozenColumns ? c.p.id + "_frozen" : !1, s = r ? a("#" + a.jgrid.jqID(b), "#" + a.jgrid.jqID(r)) : !1, t = s && s.length ? s[0].nextSibling : null;
                if (n.hasClass(j)) {
                    if (d.showSummaryOnHide) {
                        if (m)for (; m && (g = o(m.className), !(void 0 !== g && f >= g));)a(m).hide(), m = m.nextSibling, r && (a(t).hide(), t = t.nextSibling)
                    } else if (m)for (; m && (g = o(m.className), !(void 0 !== g && f >= g));)a(m).hide(), m = m.nextSibling, r && (a(t).hide(), t = t.nextSibling);
                    n.removeClass(j).addClass(k), p = !0
                } else {
                    if (m)for (h = void 0; m;) {
                        if (g = o(m.className), void 0 === h && (h = void 0 === g), q = a(m).hasClass("ui-subgrid") && a(m).hasClass("ui-sg-collapsed"), void 0 !== g) {
                            if (f >= g)break;
                            g === f + 1 && (q || (a(m).show().find(">td>span.tree-wrap-" + c.p.direction).removeClass(j).addClass(k), r && a(t).show().find(">td>span.tree-wrap-" + c.p.direction).removeClass(j).addClass(k)))
                        } else h && (q || (a(m).show(), r && a(t).show()));
                        m = m.nextSibling, r && (t = t.nextSibling)
                    }
                    n.removeClass(k).addClass(j)
                }
                a(c).triggerHandler("jqGridGroupingClickGroup", [b, p]), a.isFunction(c.p.onClickGroup) && c.p.onClickGroup.call(c, b, p)
            }), !1
        }, groupingRender: function (b, c, d, e) {
            return this.each(function () {
                function f(a, b, c) {
                    var d, e = !1;
                    if (0 === b)e = c[a]; else {
                        var f = c[a].idx;
                        if (0 === f)e = c[a]; else for (d = a; d >= 0; d--)if (c[d].idx === f - b) {
                            e = c[d];
                            break
                        }
                    }
                    return e
                }

                function g(b, d, e, g) {
                    var h, i, j = f(b, d, e), l = k.p.colModel, m = j.cnt, n = "";
                    for (i = g; c > i; i++) {
                        var o = "<td " + k.formatCol(i, 1, "") + ">&#160;</td>", p = "{0}";
                        a.each(j.summary, function () {
                            if (this.nm === l[i].name) {
                                l[i].summaryTpl && (p = l[i].summaryTpl), "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && m > 0 && (this.v = this.v / m));
                                try {
                                    this.groupCount = j.cnt, this.groupIndex = j.dataIndex, this.groupValue = j.value, h = k.formatter("", this.v, i, this)
                                } catch (b) {
                                    h = this.v
                                }
                                return o = "<td " + k.formatCol(i, 1, "") + ">" + a.jgrid.template(p, h) + "</td>", !1
                            }
                        }), n += o
                    }
                    return n
                }

                var h, i, j, k = this, l = k.p.groupingView, m = "", n = "", o = l.groupCollapse ? l.plusicon : l.minusicon, p = [], q = l.groupField.length, r = a.jgrid.styleUI[k.p.styleUI || "jQueryUI"].common;
                o = o + " tree-wrap-" + k.p.direction, a.each(k.p.colModel, function (a, b) {
                    var c;
                    for (c = 0; q > c; c++)if (l.groupField[c] === b.name) {
                        p[c] = a;
                        break
                    }
                });
                var s, t = 0, u = a.makeArray(l.groupSummary);
                u.reverse(), s = k.p.multiselect ? ' colspan="2"' : "", a.each(l.groups, function (f, v) {
                    if (l._locgr && !(v.startRow + v.cnt > (d - 1) * e && v.startRow < d * e))return !0;
                    t++, i = k.p.id + "ghead_" + v.idx, h = i + "_" + f, n = "<span style='cursor:pointer;margin-right:8px;margin-left:5px;' class='" + r.icon_base + " " + o + "' onclick=\"jQuery('#" + a.jgrid.jqID(k.p.id) + "').jqGrid('groupingToggle','" + h + "');return false;\"></span>";
                    try {
                        a.isArray(l.formatDisplayField) && a.isFunction(l.formatDisplayField[v.idx]) ? (v.displayValue = l.formatDisplayField[v.idx].call(k, v.displayValue, v.value, k.p.colModel[p[v.idx]], v.idx, l), j = v.displayValue) : j = k.formatter(h, v.displayValue, p[v.idx], v.value)
                    } catch (w) {
                        j = v.displayValue
                    }
                    var x = "";
                    x = a.isFunction(l.groupText[v.idx]) ? l.groupText[v.idx].call(k, j, v.cnt, v.summary) : a.jgrid.template(l.groupText[v.idx], j, v.cnt, v.summary), "string" != typeof x && "number" != typeof x && (x = j), "header" === l.groupSummaryPos[v.idx] ? (m += '<tr id="' + h + '"' + (l.groupCollapse && v.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "' + r.content + " jqgroup ui-row-" + k.p.direction + " " + i + '"><td style="padding-left:' + 12 * v.idx + 'px;"' + s + ">" + n + x + "</td>", m += g(f, 0, l.groups, l.groupColumnShow[v.idx] === !1 ? "" === s ? 2 : 3 : "" === s ? 1 : 2), m += "</tr>") : m += '<tr id="' + h + '"' + (l.groupCollapse && v.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "' + r.content + " jqgroup ui-row-" + k.p.direction + " " + i + '"><td style="padding-left:' + 12 * v.idx + 'px;" colspan="' + (l.groupColumnShow[v.idx] === !1 ? c - 1 : c) + '">' + n + x + "</td></tr>";
                    var y = q - 1 === v.idx;
                    if (y) {
                        var z, A, B = l.groups[f + 1], C = 0, D = v.startRow, E = void 0 !== B ? B.startRow : l.groups[f].startRow + l.groups[f].cnt;
                        for (l._locgr && (C = (d - 1) * e, C > v.startRow && (D = C)), z = D; E > z && b[z - C]; z++)m += b[z - C].join("");
                        if ("header" !== l.groupSummaryPos[v.idx]) {
                            var F;
                            if (void 0 !== B) {
                                for (F = 0; F < l.groupField.length && B.dataIndex !== l.groupField[F]; F++);
                                t = l.groupField.length - F
                            }
                            for (A = 0; t > A; A++)if (u[A]) {
                                var G = "";
                                l.groupCollapse && !l.showSummaryOnHide && (G = ' style="display:none;"'), m += "<tr" + G + ' jqfootlevel="' + (v.idx - A) + '" role="row" class="' + r.content + " jqfoot ui-row-" + k.p.direction + '">', m += g(f, A, l.groups, 0), m += "</tr>"
                            }
                            t = F
                        }
                    }
                }), a("#" + a.jgrid.jqID(k.p.id) + " tbody:first").append(m), m = null
            })
        }, groupingGroupBy: function (b, c) {
            return this.each(function () {
                var d = this;
                "string" == typeof b && (b = [b]);
                var e = d.p.groupingView;
                d.p.grouping = !0, e._locgr = !1, void 0 === e.visibiltyOnNextGrouping && (e.visibiltyOnNextGrouping = []);
                var f;
                for (f = 0; f < e.groupField.length; f++)!e.groupColumnShow[f] && e.visibiltyOnNextGrouping[f] && a(d).jqGrid("showCol", e.groupField[f]);
                for (f = 0; f < b.length; f++)e.visibiltyOnNextGrouping[f] = a("#" + a.jgrid.jqID(d.p.id) + "_" + a.jgrid.jqID(b[f])).is(":visible");
                d.p.groupingView = a.extend(d.p.groupingView, c || {}), e.groupField = b, a(d).trigger("reloadGrid")
            })
        }, groupingRemove: function (b) {
            return this.each(function () {
                var c = this;
                if (void 0 === b && (b = !0), c.p.grouping = !1, b === !0) {
                    var d, e = c.p.groupingView;
                    for (d = 0; d < e.groupField.length; d++)!e.groupColumnShow[d] && e.visibiltyOnNextGrouping[d] && a(c).jqGrid("showCol", e.groupField);
                    a("tr.jqgroup, tr.jqfoot", "#" + a.jgrid.jqID(c.p.id) + " tbody:first").remove(), a("tr.jqgrow:hidden", "#" + a.jgrid.jqID(c.p.id) + " tbody:first").show()
                } else a(c).trigger("reloadGrid")
            })
        }, groupingCalculations: {
            handler: function (a, b, c, d, e, f) {
                var g = {
                    sum: function () {
                        return parseFloat(b || 0) + parseFloat(f[c] || 0)
                    }, min: function () {
                        return "" === b ? parseFloat(f[c] || 0) : Math.min(parseFloat(b), parseFloat(f[c] || 0))
                    }, max: function () {
                        return "" === b ? parseFloat(f[c] || 0) : Math.max(parseFloat(b), parseFloat(f[c] || 0))
                    }, count: function () {
                        return "" === b && (b = 0), f.hasOwnProperty(c) ? b + 1 : 0
                    }, avg: function () {
                        return g.sum()
                    }
                };
                if (!g[a])throw"jqGrid Grouping No such method: " + a;
                var h = g[a]();
                if (null != d)if ("fixed" === e)h = h.toFixed(d); else {
                    var i = Math.pow(10, d);
                    h = Math.round(h * i) / i
                }
                return h
            }
        }, setGroupHeaders: function (b) {
            return b = a.extend({useColSpanStyle: !1, groupHeaders: []}, b || {}), this.each(function () {
                var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = this, r = 0, s = q.p.colModel, t = s.length, u = q.grid.headers, v = a("table.ui-jqgrid-htable", q.grid.hDiv), w = v.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"), x = v.children("thead"), y = v.find(".jqg-first-row-header"), z = a.jgrid.styleUI[q.p.styleUI || "jQueryUI"].base;
                q.p.groupHeader || (q.p.groupHeader = []), q.p.groupHeader.push(b), void 0 === y[0] ? y = a("<tr>", {
                    role: "row",
                    "aria-hidden": "true"
                }).addClass("jqg-first-row-header").css("height", "auto") : y.empty();
                var A, B = function (a, b) {
                    var c, d = b.length;
                    for (c = 0; d > c; c++)if (b[c].startColumnName === a)return c;
                    return -1
                };
                for (a(q).prepend(x), e = a("<tr>", {role: "row"}).addClass("ui-jqgrid-labels jqg-third-row-header"), c = 0; t > c; c++)if (g = u[c].el, h = a(g), d = s[c], i = {
                        height: "0px",
                        width: u[c].width + "px",
                        display: d.hidden ? "none" : ""
                    }, a("<th>", {role: "gridcell"}).css(i).addClass("ui-first-th-" + q.p.direction).appendTo(y), g.style.width = "", j = B(d.name, b.groupHeaders), j >= 0) {
                    for (k = b.groupHeaders[j], l = k.numberOfColumns, m = k.titleText, o = k.className || "", n = 0, j = 0; l > j && t > c + j; j++)s[c + j].hidden || n++;
                    f = a("<th>").attr({role: "columnheader"}).addClass(z.headerBox + " ui-th-column-header ui-th-" + q.p.direction + " " + o).html(m), n > 0 && f.attr("colspan", String(n)), q.p.headertitles && f.attr("title", f.text()), 0 === n && f.hide(), h.before(f), e.append(g), r = l - 1
                } else 0 === r ? b.useColSpanStyle ? h.attr("rowspan", "2") : (a("<th>", {role: "columnheader"}).addClass(z.headerBox + " ui-th-column-header ui-th-" + q.p.direction).css({display: d.hidden ? "none" : ""}).insertBefore(h), e.append(g)) : (e.append(g), r--);
                p = a(q).children("thead"), p.prepend(y), e.insertAfter(w), v.append(p), b.useColSpanStyle && (v.find("span.ui-jqgrid-resize").each(function () {
                    var b = a(this).parent();
                    b.is(":visible") && (this.style.cssText = "height: " + b.height() + "px !important; cursor: col-resize;")
                }), v.find("div.ui-jqgrid-sortable").each(function () {
                    var b = a(this), c = b.parent();
                    c.is(":visible") && c.is(":has(span.ui-jqgrid-resize)") && b.css("top", (c.height() - b.outerHeight()) / 2 - 4 + "px")
                })), A = p.find("tr.jqg-first-row-header"), a(q).bind("jqGridResizeStop.setGroupHeaders", function (a, b, c) {
                    A.find("th").eq(c).width(b)
                })
            })
        }, destroyGroupHeader: function (b) {
            return void 0 === b && (b = !0), this.each(function () {
                var c, d, e, f, g, h, i, j = this, k = j.grid, l = a("table.ui-jqgrid-htable thead", k.hDiv), m = j.p.colModel;
                if (k) {
                    for (a(this).unbind(".setGroupHeaders"), c = a("<tr>", {role: "row"}).addClass("ui-jqgrid-labels"), f = k.headers, d = 0, e = f.length; e > d; d++) {
                        i = m[d].hidden ? "none" : "", g = a(f[d].el).width(f[d].width).css("display", i);
                        try {
                            g.removeAttr("rowSpan")
                        } catch (n) {
                            g.attr("rowSpan", 1)
                        }
                        c.append(g), h = g.children("span.ui-jqgrid-resize"), h.length > 0 && (h[0].style.height = ""), g.children("div")[0].style.top = ""
                    }
                    a(l).children("tr.ui-jqgrid-labels").remove(), a(l).prepend(c), b === !0 && a(j).jqGrid("setGridParam", {groupHeader: null})
                }
            })
        }
    })
});