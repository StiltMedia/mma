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
        setTreeNode: function (b, c) {
            return this.each(function () {
                var d = this;
                if (d.grid && d.p.treeGrid)for (var e, f, g, h, i, j, k, l, m = d.p.expColInd, n = d.p.treeReader.expanded_field, o = d.p.treeReader.leaf_field, p = d.p.treeReader.level_field, q = d.p.treeReader.icon_field, r = d.p.treeReader.loaded, s = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].common; c > b;) {
                    var t, u = a.jgrid.stripPref(d.p.idPrefix, d.rows[b].id), v = d.p._index[u];
                    k = d.p.data[v], "nested" === d.p.treeGridModel && (k[o] || (e = parseInt(k[d.p.treeReader.left_field], 10), f = parseInt(k[d.p.treeReader.right_field], 10), k[o] = f === e + 1 ? "true" : "false", d.rows[b].cells[d.p._treeleafpos].innerHTML = k[o])), g = parseInt(k[p], 10), 0 === d.p.tree_root_level ? (h = g + 1, i = g) : (h = g, i = g - 1), j = "<div class='tree-wrap tree-wrap-" + d.p.direction + "' style='width:" + 18 * h + "px;'>", j += "<div style='" + ("rtl" === d.p.direction ? "right:" : "left:") + 18 * i + "px;' class='" + s.icon_base + " ", void 0 !== k[r] && (k[r] = "true" === k[r] || k[r] === !0 ? !0 : !1), "true" === k[o] || k[o] === !0 ? (j += (void 0 !== k[q] && "" !== k[q] ? k[q] : d.p.treeIcons.leaf) + " tree-leaf treeclick", k[o] = !0, l = "leaf") : (k[o] = !1, l = ""), k[n] = ("true" === k[n] || k[n] === !0 ? !0 : !1) && (k[r] || void 0 === k[r]), j += k[n] === !1 ? k[o] === !0 ? "'" : d.p.treeIcons.plus + " tree-plus treeclick'" : k[o] === !0 ? "'" : d.p.treeIcons.minus + " tree-minus treeclick'", j += "></div></div>", a(d.rows[b].cells[m]).wrapInner("<span class='cell-wrapper" + l + "'></span>").prepend(j), g !== parseInt(d.p.tree_root_level, 10) && (t = a(d).jqGrid("isVisibleNode", k), t || a(d.rows[b]).css("display", "none")), a(d.rows[b].cells[m]).find("div.treeclick").bind("click", function (b) {
                        var c = b.target || b.srcElement, e = a.jgrid.stripPref(d.p.idPrefix, a(c, d.rows).closest("tr.jqgrow")[0].id), f = d.p._index[e];
                        return d.p.data[f][o] || (d.p.data[f][n] ? (a(d).jqGrid("collapseRow", d.p.data[f]), a(d).jqGrid("collapseNode", d.p.data[f])) : (a(d).jqGrid("expandRow", d.p.data[f]), a(d).jqGrid("expandNode", d.p.data[f]))), !1
                    }), d.p.ExpandColClick === !0 && a(d.rows[b].cells[m]).find("span.cell-wrapper").css("cursor", "pointer").bind("click", function (b) {
                        var c = b.target || b.srcElement, e = a.jgrid.stripPref(d.p.idPrefix, a(c, d.rows).closest("tr.jqgrow")[0].id), f = d.p._index[e];
                        return d.p.data[f][o] || (d.p.data[f][n] ? (a(d).jqGrid("collapseRow", d.p.data[f]), a(d).jqGrid("collapseNode", d.p.data[f])) : (a(d).jqGrid("expandRow", d.p.data[f]), a(d).jqGrid("expandNode", d.p.data[f]))), a(d).jqGrid("setSelection", e), !1
                    }), b++
                }
            })
        }, setTreeGrid: function () {
            return this.each(function () {
                var b, c, d, e, f = this, g = 0, h = !1, i = [], j = a.jgrid.styleUI[f.p.styleUI || "jQueryUI"].treegrid;
                if (f.p.treeGrid) {
                    f.p.treedatatype || a.extend(f.p, {treedatatype: f.p.datatype}), f.p.loadonce && (f.p.treedatatype = "local"), f.p.subGrid = !1, f.p.altRows = !1, f.p.pgbuttons = !1, f.p.pginput = !1, f.p.gridview = !0, null === f.p.rowTotal && (f.p.rowNum = 1e4), f.p.multiselect = !1, f.p.rowList = [], f.p.expColInd = 0, b = j.icon_plus, "jQueryUI" === f.p.styleUI && (b += "rtl" === f.p.direction ? "w" : "e"), f.p.treeIcons = a.extend({
                        plus: b,
                        minus: j.icon_minus,
                        leaf: j.icon_leaf
                    }, f.p.treeIcons || {}), "nested" === f.p.treeGridModel ? f.p.treeReader = a.extend({
                        level_field: "level",
                        left_field: "lft",
                        right_field: "rgt",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    }, f.p.treeReader) : "adjacency" === f.p.treeGridModel && (f.p.treeReader = a.extend({
                        level_field: "level",
                        parent_id_field: "parent",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    }, f.p.treeReader));
                    for (d in f.p.colModel)if (f.p.colModel.hasOwnProperty(d)) {
                        c = f.p.colModel[d].name, c !== f.p.ExpandColumn || h || (h = !0, f.p.expColInd = g), g++;
                        for (e in f.p.treeReader)f.p.treeReader.hasOwnProperty(e) && f.p.treeReader[e] === c && i.push(c)
                    }
                    a.each(f.p.treeReader, function (b, c) {
                        c && -1 === a.inArray(c, i) && ("leaf_field" === b && (f.p._treeleafpos = g), g++, f.p.colNames.push(c), f.p.colModel.push({
                            name: c,
                            width: 1,
                            hidden: !0,
                            sortable: !1,
                            resizable: !1,
                            hidedlg: !0,
                            editable: !0,
                            search: !1
                        }))
                    })
                }
            })
        }, expandRow: function (b) {
            this.each(function () {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = a(c).jqGrid("getNodeChildren", b), e = c.p.treeReader.expanded_field, f = b[c.p.localReader.id], g = a.isFunction(c.p.beforeExpandTreeGridRow) ? c.p.beforeExpandTreeGridRow.call(c, f, b, d) : !0;
                    g !== !1 && (a(d).each(function () {
                        var b = c.p.idPrefix + a.jgrid.getAccessor(this, c.p.localReader.id);
                        a(a(c).jqGrid("getGridRowById", b)).css("display", ""), this[e] && a(c).jqGrid("expandRow", this)
                    }), a.isFunction(c.p.afterExpandTreeGridRow) && c.p.afterExpandTreeGridRow.call(c, f, b, d))
                }
            })
        }, collapseRow: function (b) {
            this.each(function () {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = a(c).jqGrid("getNodeChildren", b), e = c.p.treeReader.expanded_field, f = b[c.p.localReader.id], g = a.isFunction(c.p.beforeCollapseTreeGridRow) ? c.p.beforeCollapseTreeGridRow.call(c, f, b, d) : !0;
                    g !== !1 && (a(d).each(function () {
                        var b = c.p.idPrefix + a.jgrid.getAccessor(this, c.p.localReader.id);
                        a(a(c).jqGrid("getGridRowById", b)).css("display", "none"), this[e] && a(c).jqGrid("collapseRow", this)
                    }), a.isFunction(c.p.afterCollapseTreeGridRow) && c.p.afterCollapseTreeGridRow.call(c, f, b, d))
                }
            })
        }, getRootNodes: function (b) {
            var c = [];
            return this.each(function () {
                var d, e, f, g = this;
                if (g.grid && g.p.treeGrid)switch ("boolean" != typeof b && (b = !1), f = b ? a(g).jqGrid("getRowData", null, !0) : g.p.data, g.p.treeGridModel) {
                    case"nested":
                        d = g.p.treeReader.level_field, a(f).each(function () {
                            parseInt(this[d], 10) === parseInt(g.p.tree_root_level, 10) && c.push(b ? g.p.data[g.p._index[this[g.p.keyName]]] : this)
                        });
                        break;
                    case"adjacency":
                        e = g.p.treeReader.parent_id_field, a(f).each(function () {
                            (null === this[e] || "null" === String(this[e]).toLowerCase()) && c.push(b ? g.p.data[g.p._index[this[g.p.keyName]]] : this)
                        })
                }
            }), c
        }, getNodeDepth: function (b) {
            var c = null;
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var d = this;
                    switch (d.p.treeGridModel) {
                        case"nested":
                            var e = d.p.treeReader.level_field;
                            c = parseInt(b[e], 10) - parseInt(d.p.tree_root_level, 10);
                            break;
                        case"adjacency":
                            c = a(d).jqGrid("getNodeAncestors", b).length
                    }
                }
            }), c
        }, getNodeParent: function (b) {
            var c = null;
            return this.each(function () {
                var d = this;
                if (d.grid && d.p.treeGrid)switch (d.p.treeGridModel) {
                    case"nested":
                        var e = d.p.treeReader.left_field, f = d.p.treeReader.right_field, g = d.p.treeReader.level_field, h = parseInt(b[e], 10), i = parseInt(b[f], 10), j = parseInt(b[g], 10);
                        a(this.p.data).each(function () {
                            return parseInt(this[g], 10) === j - 1 && parseInt(this[e], 10) < h && parseInt(this[f], 10) > i ? (c = this, !1) : void 0
                        });
                        break;
                    case"adjacency":
                        for (var k = d.p.treeReader.parent_id_field, l = d.p.localReader.id, m = b[l], n = d.p._index[m]; n--;)if (d.p.data[n][l] === a.jgrid.stripPref(d.p.idPrefix, b[k])) {
                            c = d.p.data[n];
                            break
                        }
                }
            }), c
        }, getNodeChildren: function (b) {
            var c = [];
            return this.each(function () {
                var d = this;
                if (d.grid && d.p.treeGrid)switch (d.p.treeGridModel) {
                    case"nested":
                        var e = d.p.treeReader.left_field, f = d.p.treeReader.right_field, g = d.p.treeReader.level_field, h = parseInt(b[e], 10), i = parseInt(b[f], 10), j = parseInt(b[g], 10);
                        a(this.p.data).each(function () {
                            parseInt(this[g], 10) === j + 1 && parseInt(this[e], 10) > h && parseInt(this[f], 10) < i && c.push(this)
                        });
                        break;
                    case"adjacency":
                        var k = d.p.treeReader.parent_id_field, l = d.p.localReader.id;
                        a(this.p.data).each(function () {
                            this[k] == a.jgrid.stripPref(d.p.idPrefix, b[l]) && c.push(this)
                        })
                }
            }), c
        }, getFullTreeNode: function (b, c) {
            var d = [];
            return this.each(function () {
                var e, f = this, g = f.p.treeReader.expanded_field;
                if (f.grid && f.p.treeGrid)switch ((null == c || "boolean" != typeof c) && (c = !1), f.p.treeGridModel) {
                    case"nested":
                        var h = f.p.treeReader.left_field, i = f.p.treeReader.right_field, j = f.p.treeReader.level_field, k = parseInt(b[h], 10), l = parseInt(b[i], 10), m = parseInt(b[j], 10);
                        a(this.p.data).each(function () {
                            parseInt(this[j], 10) >= m && parseInt(this[h], 10) >= k && parseInt(this[h], 10) <= l && (c && (this[g] = !0), d.push(this))
                        });
                        break;
                    case"adjacency":
                        if (b) {
                            d.push(b);
                            var n = f.p.treeReader.parent_id_field, o = f.p.localReader.id;
                            a(this.p.data).each(function (b) {
                                for (e = d.length, b = 0; e > b; b++)if (a.jgrid.stripPref(f.p.idPrefix, d[b][o]) === this[n]) {
                                    c && (this[g] = !0), d.push(this);
                                    break
                                }
                            })
                        }
                }
            }), d
        }, getNodeAncestors: function (b) {
            var c = [];
            return this.each(function () {
                if (this.grid && this.p.treeGrid)for (var d = a(this).jqGrid("getNodeParent", b); d;)c.push(d), d = a(this).jqGrid("getNodeParent", d)
            }), c
        }, isVisibleNode: function (b) {
            var c = !0;
            return this.each(function () {
                var d = this;
                if (d.grid && d.p.treeGrid) {
                    var e = a(d).jqGrid("getNodeAncestors", b), f = d.p.treeReader.expanded_field;
                    a(e).each(function () {
                        return c = c && this[f], c ? void 0 : !1
                    })
                }
            }), c
        }, isNodeLoaded: function (b) {
            var c;
            return this.each(function () {
                var d = this;
                if (d.grid && d.p.treeGrid) {
                    var e = d.p.treeReader.leaf_field, f = d.p.treeReader.loaded;
                    c = void 0 !== b ? void 0 !== b[f] ? b[f] : b[e] || a(d).jqGrid("getNodeChildren", b).length > 0 ? !0 : !1 : !1
                }
            }), c
        }, reloadNode: function (b) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var c = this.p.localReader.id, d = this.p.selrow;
                    a(this).jqGrid("delChildren", b[c]);
                    var e = this.p.treeReader.expanded_field, f = this.p.treeReader.parent_id_field, g = this.p.treeReader.loaded, h = this.p.treeReader.level_field, i = this.p.treeReader.left_field, j = this.p.treeReader.right_field, k = a.jgrid.getAccessor(b, this.p.localReader.id), l = a("#" + k, this.grid.bDiv)[0];
                    b[e] = !0, a("div.treeclick", l).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"), this.p.treeANode = l.rowIndex, this.p.datatype = this.p.treedatatype, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: k,
                            n_left: b[i],
                            n_right: b[j],
                            n_level: b[h]
                        }
                    }) : a(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: k,
                            parentid: b[f],
                            n_level: b[h]
                        }
                    }), a(this).trigger("reloadGrid"), b[g] = !0, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {
                        selrow: d,
                        postData: {nodeid: "", n_left: "", n_right: "", n_level: ""}
                    }) : a(this).jqGrid("setGridParam", {selrow: d, postData: {nodeid: "", parentid: "", n_level: ""}})
                }
            })
        }, expandNode: function (b) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var c = this.p.treeReader.expanded_field, d = this.p.treeReader.parent_id_field, e = this.p.treeReader.loaded, f = this.p.treeReader.level_field, g = this.p.treeReader.left_field, h = this.p.treeReader.right_field;
                    if (!b[c]) {
                        var i = a.jgrid.getAccessor(b, this.p.localReader.id), j = a("#" + this.p.idPrefix + a.jgrid.jqID(i), this.grid.bDiv)[0], k = this.p._index[i], l = a.isFunction(this.p.beforeExpandTreeGridNode) ? this.p.beforeExpandTreeGridNode.call(this, i, b) : !0;
                        if (l === !1)return;
                        a(this).jqGrid("isNodeLoaded", this.p.data[k]) ? (b[c] = !0, a("div.treeclick", j).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")) : this.grid.hDiv.loading || (b[c] = !0, a("div.treeclick", j).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"), this.p.treeANode = j.rowIndex, this.p.datatype = this.p.treedatatype, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: i,
                                n_left: b[g],
                                n_right: b[h],
                                n_level: b[f]
                            }
                        }) : a(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: i,
                                parentid: b[d],
                                n_level: b[f]
                            }
                        }), a(this).trigger("reloadGrid"), b[e] = !0, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: "",
                                n_left: "",
                                n_right: "",
                                n_level: ""
                            }
                        }) : a(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: "",
                                parentid: "",
                                n_level: ""
                            }
                        })), a.isFunction(this.p.afterExpandTreeGridNode) && this.p.afterExpandTreeGridNode.call(this, i, b)
                    }
                }
            })
        }, collapseNode: function (b) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var c = this.p.treeReader.expanded_field;
                    if (b[c]) {
                        var d = a.jgrid.getAccessor(b, this.p.localReader.id), e = a.isFunction(this.p.beforeCollapseTreeGridNode) ? this.p.beforeCollapseTreeGridNode.call(this, d, b) : !0, f = a("#" + this.p.idPrefix + a.jgrid.jqID(d), this.grid.bDiv)[0];
                        if (b[c] = !1, e === !1)return;
                        a("div.treeclick", f).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus"), a.isFunction(this.p.afterCollapseTreeGridNode) && this.p.afterCollapseTreeGridNode.call(this, d, b)
                    }
                }
            })
        }, SortTree: function (b, c, d, e) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var f, g, h, i, j, k = [], l = this, m = a(this).jqGrid("getRootNodes", l.p.search);
                    for (i = a.jgrid.from.call(this, m), i.orderBy(b, c, d, e), j = i.select(), f = 0, g = j.length; g > f; f++)h = j[f], k.push(h), a(this).jqGrid("collectChildrenSortTree", k, h, b, c, d, e);
                    a.each(k, function (b) {
                        var c = a.jgrid.getAccessor(this, l.p.localReader.id);
                        a("#" + a.jgrid.jqID(l.p.id) + " tbody tr:eq(" + b + ")").after(a("tr#" + a.jgrid.jqID(c), l.grid.bDiv))
                    }), i = null, j = null, k = null
                }
            })
        }, searchTree: function (b) {
            var c, d, e, f = b.length || 0, g = [], h = [], i = [];
            return this.each(function () {
                if (this.grid && this.p.treeGrid && f)for (d = this.p.localReader.id, c = 0; f > c; c++)g = a(this).jqGrid("getNodeAncestors", b[c]), g.length || g.push(b[c]), e = g[g.length - 1][d], -1 === a.inArray(e, h) && (h.push(e), g = a(this).jqGrid("getFullTreeNode", g[g.length - 1], !0), i = i.concat(g))
            }), i
        }, collectChildrenSortTree: function (b, c, d, e, f, g) {
            return this.each(function () {
                if (this.grid && this.p.treeGrid) {
                    var h, i, j, k, l, m;
                    for (k = a(this).jqGrid("getNodeChildren", c), l = a.jgrid.from.call(this, k), l.orderBy(d, e, f, g), m = l.select(), h = 0, i = m.length; i > h; h++)j = m[h], b.push(j), a(this).jqGrid("collectChildrenSortTree", b, j, d, e, f, g)
                }
            })
        }, setTreeRow: function (b, c) {
            var d = !1;
            return this.each(function () {
                var e = this;
                e.grid && e.p.treeGrid && (d = a(e).jqGrid("setRowData", b, c))
            }), d
        }, delTreeNode: function (b) {
            return this.each(function () {
                var c, d, e, f, g, h = this, i = h.p.localReader.id, j = h.p.treeReader.left_field, k = h.p.treeReader.right_field;
                if (h.grid && h.p.treeGrid) {
                    var l = h.p._index[b];
                    if (void 0 !== l) {
                        d = parseInt(h.p.data[l][k], 10), e = d - parseInt(h.p.data[l][j], 10) + 1;
                        var m = a(h).jqGrid("getFullTreeNode", h.p.data[l]);
                        if (m.length > 0)for (c = 0; c < m.length; c++)a(h).jqGrid("delRowData", m[c][i]);
                        if ("nested" === h.p.treeGridModel) {
                            if (f = a.jgrid.from.call(h, h.p.data).greater(j, d, {stype: "integer"}).select(), f.length)for (g in f)f.hasOwnProperty(g) && (f[g][j] = parseInt(f[g][j], 10) - e);
                            if (f = a.jgrid.from.call(h, h.p.data).greater(k, d, {stype: "integer"}).select(), f.length)for (g in f)f.hasOwnProperty(g) && (f[g][k] = parseInt(f[g][k], 10) - e)
                        }
                    }
                }
            })
        }, delChildren: function (b) {
            return this.each(function () {
                var c, d, e, f, g = this, h = g.p.localReader.id, i = g.p.treeReader.left_field, j = g.p.treeReader.right_field;
                if (g.grid && g.p.treeGrid) {
                    var k = g.p._index[b];
                    if (void 0 !== k) {
                        c = parseInt(g.p.data[k][j], 10), d = c - parseInt(g.p.data[k][i], 10) + 1;
                        var l = a(g).jqGrid("getFullTreeNode", g.p.data[k]);
                        if (l.length > 0)for (var m = 0; m < l.length; m++)l[m][h] !== b && a(g).jqGrid("delRowData", l[m][h]);
                        if ("nested" === g.p.treeGridModel) {
                            if (e = a.jgrid.from(g.p.data).greater(i, c, {stype: "integer"}).select(), e.length)for (f in e)e.hasOwnProperty(f) && (e[f][i] = parseInt(e[f][i], 10) - d);
                            if (e = a.jgrid.from(g.p.data).greater(j, c, {stype: "integer"}).select(), e.length)for (f in e)e.hasOwnProperty(f) && (e[f][j] = parseInt(e[f][j], 10) - d)
                        }
                    }
                }
            })
        }, addChildNode: function (b, c, d, e) {
            var f = this[0];
            if (d) {
                var g, h, i, j, k, l, m, n, o = f.p.treeReader.expanded_field, p = f.p.treeReader.leaf_field, q = f.p.treeReader.level_field, r = f.p.treeReader.parent_id_field, s = f.p.treeReader.left_field, t = f.p.treeReader.right_field, u = f.p.treeReader.loaded, v = 0, w = c;
                if (void 0 === e && (e = !1), null == b) {
                    if (k = f.p.data.length - 1, k >= 0)for (; k >= 0;)v = Math.max(v, parseInt(f.p.data[k][f.p.localReader.id], 10)), k--;
                    b = v + 1
                }
                var x = a(f).jqGrid("getInd", c);
                if (m = !1, void 0 === c || null === c || "" === c)c = null, w = null, g = "last", j = f.p.tree_root_level, k = f.p.data.length + 1; else {
                    g = "after", h = f.p._index[c], i = f.p.data[h], c = i[f.p.localReader.id], j = parseInt(i[q], 10) + 1;
                    var y = a(f).jqGrid("getFullTreeNode", i);
                    y.length ? (k = y[y.length - 1][f.p.localReader.id], w = k, k = a(f).jqGrid("getInd", w) + 1) : k = a(f).jqGrid("getInd", c) + 1, i[p] && (m = !0, i[o] = !0, a(f.rows[x]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(f.p.treeIcons.leaf + " tree-leaf").addClass(f.p.treeIcons.minus + " tree-minus"), f.p.data[h][p] = !1, i[u] = !0)
                }
                if (l = k + 1, void 0 === d[o] && (d[o] = !1), void 0 === d[u] && (d[u] = !1), d[q] = j, void 0 === d[p] && (d[p] = !0), "adjacency" === f.p.treeGridModel && (d[r] = c), "nested" === f.p.treeGridModel) {
                    var z, A, B;
                    if (null !== c) {
                        if (n = parseInt(i[t], 10), z = a.jgrid.from.call(f, f.p.data), z = z.greaterOrEquals(t, n, {stype: "integer"}), A = z.select(), A.length)for (B in A)A.hasOwnProperty(B) && (A[B][s] = A[B][s] > n ? parseInt(A[B][s], 10) + 2 : A[B][s], A[B][t] = A[B][t] >= n ? parseInt(A[B][t], 10) + 2 : A[B][t]);
                        d[s] = n, d[t] = n + 1
                    } else {
                        if (n = parseInt(a(f).jqGrid("getCol", t, !1, "max"), 10), A = a.jgrid.from.call(f, f.p.data).greater(s, n, {stype: "integer"}).select(), A.length)for (B in A)A.hasOwnProperty(B) && (A[B][s] = parseInt(A[B][s], 10) + 2);
                        if (A = a.jgrid.from.call(f, f.p.data).greater(t, n, {stype: "integer"}).select(), A.length)for (B in A)A.hasOwnProperty(B) && (A[B][t] = parseInt(A[B][t], 10) + 2);
                        d[s] = n + 1, d[t] = n + 2
                    }
                }
                (null === c || a(f).jqGrid("isNodeLoaded", i) || m) && (a(f).jqGrid("addRowData", b, d, g, w), a(f).jqGrid("setTreeNode", k, l)), i && !i[o] && e && a(f.rows[x]).find("div.treeclick").click()
            }
        }
    })
});