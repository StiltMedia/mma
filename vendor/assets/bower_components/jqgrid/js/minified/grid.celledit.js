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
        editCell: function (b, c, d) {
            return this.each(function () {
                var e, f, g, h, i = this, j = a(this).jqGrid("getStyleUI", i.p.styleUI + ".common", "highlight", !0), k = a(this).jqGrid("getStyleUI", i.p.styleUI + ".common", "hover", !0), l = a(this).jqGrid("getStyleUI", i.p.styleUI + ".celledit", "inputClass", !0);
                if (i.grid && i.p.cellEdit === !0) {
                    if (c = parseInt(c, 10), i.p.selrow = i.rows[b].id, i.p.knv || a(i).jqGrid("GridNav"), i.p.savedRow.length > 0) {
                        if (d === !0 && b == i.p.iRow && c == i.p.iCol)return;
                        a(i).jqGrid("saveCell", i.p.savedRow[0].id, i.p.savedRow[0].ic)
                    } else window.setTimeout(function () {
                        a("#" + a.jgrid.jqID(i.p.knv)).attr("tabindex", "-1").focus()
                    }, 1);
                    if (h = i.p.colModel[c], e = h.name, "subgrid" !== e && "cb" !== e && "rn" !== e) {
                        if (g = a("td:eq(" + c + ")", i.rows[b]), h.editable !== !0 || d !== !0 || g.hasClass("not-editable-cell") || a.isFunction(i.p.isCellEditable) && !i.p.isCellEditable.call(i, e, b, c))parseInt(i.p.iCol, 10) >= 0 && parseInt(i.p.iRow, 10) >= 0 && a(i.rows[i.p.iRow]).removeClass("selected-row " + k).find("td:eq(" + i.p.iCol + ")").removeClass("edit-cell " + j), g.addClass("edit-cell " + j), a(i.rows[b]).addClass("selected-row " + k), f = g.html().replace(/\&#160\;/gi, ""), a(i).triggerHandler("jqGridSelectCell", [i.rows[b].id, e, f, b, c]), a.isFunction(i.p.onSelectCell) && i.p.onSelectCell.call(i, i.rows[b].id, e, f, b, c); else {
                            parseInt(i.p.iCol, 10) >= 0 && parseInt(i.p.iRow, 10) >= 0 && a(i.rows[i.p.iRow]).removeClass("selected-row " + k).find("td:eq(" + i.p.iCol + ")").removeClass("edit-cell " + j), a(g).addClass("edit-cell " + j), a(i.rows[b]).addClass("selected-row " + k);
                            try {
                                f = a.unformat.call(i, g, {rowId: i.rows[b].id, colModel: h}, c)
                            } catch (m) {
                                f = h.edittype && "textarea" === h.edittype ? a(g).text() : a(g).html()
                            }
                            if (i.p.autoencode && (f = a.jgrid.htmlDecode(f)), h.edittype || (h.edittype = "text"), i.p.savedRow.push({
                                    id: b,
                                    ic: c,
                                    name: e,
                                    v: f
                                }), ("&nbsp;" === f || "&#160;" === f || 1 === f.length && 160 === f.charCodeAt(0)) && (f = ""), a.isFunction(i.p.formatCell)) {
                                var n = i.p.formatCell.call(i, i.rows[b].id, e, f, b, c);
                                void 0 !== n && (f = n)
                            }
                            a(i).triggerHandler("jqGridBeforeEditCell", [i.rows[b].id, e, f, b, c]), a.isFunction(i.p.beforeEditCell) && i.p.beforeEditCell.call(i, i.rows[b].id, e, f, b, c);
                            var o = a.extend({}, h.editoptions || {}, {
                                id: b + "_" + e,
                                name: e,
                                rowId: i.rows[b].id,
                                oper: "edit"
                            }), p = a.jgrid.createEl.call(i, h.edittype, o, f, !0, a.extend({}, a.jgrid.ajaxOptions, i.p.ajaxSelectOptions || {}));
                            a.inArray(h.edittype, ["text", "textarea", "password", "select"]) > -1 && a(p).addClass(l), a(g).html("").append(p).attr("tabindex", "0"), a.jgrid.bindEv.call(i, p, o), window.setTimeout(function () {
                                a(p).focus()
                            }, 1), a("input, select, textarea", g).bind("keydown", function (d) {
                                if (27 === d.keyCode && (a("input.hasDatepicker", g).length > 0 ? a(".ui-datepicker").is(":hidden") ? a(i).jqGrid("restoreCell", b, c) : a("input.hasDatepicker", g).datepicker("hide") : a(i).jqGrid("restoreCell", b, c)), 13 === d.keyCode && !d.shiftKey)return a(i).jqGrid("saveCell", b, c), !1;
                                if (9 === d.keyCode) {
                                    if (i.grid.hDiv.loading)return !1;
                                    d.shiftKey ? a(i).jqGrid("prevCell", b, c) : a(i).jqGrid("nextCell", b, c)
                                }
                                d.stopPropagation()
                            }), a(i).triggerHandler("jqGridAfterEditCell", [i.rows[b].id, e, f, b, c]), a.isFunction(i.p.afterEditCell) && i.p.afterEditCell.call(i, i.rows[b].id, e, f, b, c)
                        }
                        i.p.iCol = c, i.p.iRow = b
                    }
                }
            })
        }, saveCell: function (b, c) {
            return this.each(function () {
                var d, e = this, f = a.jgrid.getRegional(this, "errors"), g = a.jgrid.getRegional(this, "edit");
                if (e.grid && e.p.cellEdit === !0) {
                    if (d = e.p.savedRow.length >= 1 ? 0 : null, null !== d) {
                        var h, i, j = a("td:eq(" + c + ")", e.rows[b]), k = e.p.colModel[c], l = k.name, m = a.jgrid.jqID(l), n = a(j).offset();
                        switch (k.edittype) {
                            case"select":
                                if (k.editoptions.multiple) {
                                    var o = a("#" + b + "_" + m, e.rows[b]), p = [];
                                    h = a(o).val(), h ? h.join(",") : h = "", a("option:selected", o).each(function (b, c) {
                                        p[b] = a(c).text()
                                    }), i = p.join(",")
                                } else h = a("#" + b + "_" + m + " option:selected", e.rows[b]).val(), i = a("#" + b + "_" + m + " option:selected", e.rows[b]).text();
                                k.formatter && (i = h);
                                break;
                            case"checkbox":
                                var q = ["Yes", "No"];
                                k.editoptions && (q = k.editoptions.value.split(":")), h = a("#" + b + "_" + m, e.rows[b]).is(":checked") ? q[0] : q[1], i = h;
                                break;
                            case"password":
                            case"text":
                            case"textarea":
                            case"button":
                                h = a("#" + b + "_" + m, e.rows[b]).val(), i = h;
                                break;
                            case"custom":
                                try {
                                    if (!k.editoptions || !a.isFunction(k.editoptions.custom_value))throw"e1";
                                    if (h = k.editoptions.custom_value.call(e, a(".customelement", j), "get"), void 0 === h)throw"e2";
                                    i = h
                                } catch (r) {
                                    "e1" === r ? a.jgrid.info_dialog(f.errcap, "function 'custom_value' " + g.msg.nodefined, g.bClose, {styleUI: e.p.styleUI}) : "e2" === r ? a.jgrid.info_dialog(f.errcap, "function 'custom_value' " + g.msg.novalue, g.bClose, {styleUI: e.p.styleUI}) : a.jgrid.info_dialog(f.errcap, r.message, g.bClose, {styleUI: e.p.styleUI})
                                }
                        }
                        if (i !== e.p.savedRow[d].v) {
                            var s = a(e).triggerHandler("jqGridBeforeSaveCell", [e.rows[b].id, l, h, b, c]);
                            if (s && (h = s, i = s), a.isFunction(e.p.beforeSaveCell)) {
                                var t = e.p.beforeSaveCell.call(e, e.rows[b].id, l, h, b, c);
                                t && (h = t, i = t)
                            }
                            var u = a.jgrid.checkValues.call(e, h, c);
                            if (u[0] === !0) {
                                var v = a(e).triggerHandler("jqGridBeforeSubmitCell", [e.rows[b].id, l, h, b, c]) || {};
                                if (a.isFunction(e.p.beforeSubmitCell) && (v = e.p.beforeSubmitCell.call(e, e.rows[b].id, l, h, b, c), v || (v = {})), a("input.hasDatepicker", j).length > 0 && a("input.hasDatepicker", j).datepicker("hide"), "remote" === e.p.cellsubmit)if (e.p.cellurl) {
                                    var w = {};
                                    e.p.autoencode && (h = a.jgrid.htmlEncode(h)), w[l] = h;
                                    var x, y, z;
                                    z = e.p.prmNames, x = z.id, y = z.oper, w[x] = a.jgrid.stripPref(e.p.idPrefix, e.rows[b].id), w[y] = z.editoper, w = a.extend(v, w), a(e).jqGrid("progressBar", {
                                        method: "show",
                                        loadtype: e.p.loadui,
                                        htmlcontent: a.jgrid.getRegional(e, "defaults.savetext")
                                    }), e.grid.hDiv.loading = !0, a.ajax(a.extend({
                                        url: e.p.cellurl,
                                        data: a.isFunction(e.p.serializeCellData) ? e.p.serializeCellData.call(e, w) : w,
                                        type: "POST",
                                        complete: function (d, k) {
                                            if (a(e).jqGrid("progressBar", {
                                                    method: "hide",
                                                    loadtype: e.p.loadui
                                                }), e.grid.hDiv.loading = !1, "success" === k) {
                                                var m = a(e).triggerHandler("jqGridAfterSubmitCell", [e, d, w.id, l, h, b, c]) || [!0, ""];
                                                m[0] === !0 && a.isFunction(e.p.afterSubmitCell) && (m = e.p.afterSubmitCell.call(e, d, w.id, l, h, b, c)), m[0] === !0 ? (a(j).empty(), a(e).jqGrid("setCell", e.rows[b].id, c, i, !1, !1, !0), a(j).addClass("dirty-cell"), a(e.rows[b]).addClass("edited"), a(e).triggerHandler("jqGridAfterSaveCell", [e.rows[b].id, l, h, b, c]), a.isFunction(e.p.afterSaveCell) && e.p.afterSaveCell.call(e, e.rows[b].id, l, h, b, c), e.p.savedRow.splice(0, 1)) : (a.jgrid.info_dialog(f.errcap, m[1], g.bClose, {styleUI: e.p.styleUI}), e.p.restoreCellonFail && a(e).jqGrid("restoreCell", b, c))
                                            }
                                        },
                                        error: function (d, h, i) {
                                            a("#lui_" + a.jgrid.jqID(e.p.id)).hide(), e.grid.hDiv.loading = !1, a(e).triggerHandler("jqGridErrorCell", [d, h, i]), a.isFunction(e.p.errorCell) ? e.p.errorCell.call(e, d, h, i) : a.jgrid.info_dialog(f.errcap, d.status + " : " + d.statusText + "<br/>" + h, g.bClose, {styleUI: e.p.styleUI}), e.p.restoreCellonFail && a(e).jqGrid("restoreCell", b, c)
                                        }
                                    }, a.jgrid.ajaxOptions, e.p.ajaxCellOptions || {}))
                                } else try {
                                    a.jgrid.info_dialog(f.errcap, f.nourl, g.bClose, {styleUI: e.p.styleUI}), e.p.restoreCellonFail && a(e).jqGrid("restoreCell", b, c)
                                } catch (r) {
                                }
                                "clientArray" === e.p.cellsubmit && (a(j).empty(), a(e).jqGrid("setCell", e.rows[b].id, c, i, !1, !1, !0), a(j).addClass("dirty-cell"), a(e.rows[b]).addClass("edited"), a(e).triggerHandler("jqGridAfterSaveCell", [e.rows[b].id, l, h, b, c]), a.isFunction(e.p.afterSaveCell) && e.p.afterSaveCell.call(e, e.rows[b].id, l, h, b, c), e.p.savedRow.splice(0, 1))
                            } else try {
                                window.setTimeout(function () {
                                    a.jgrid.info_dialog(f.errcap, h + " " + u[1], g.bClose, {
                                        styleUI: e.p.styleUI,
                                        top: n.top + 40,
                                        left: n.left
                                    })
                                }, 100), a(e).jqGrid("restoreCell", b, c)
                            } catch (r) {
                            }
                        } else a(e).jqGrid("restoreCell", b, c)
                    }
                    window.setTimeout(function () {
                        a("#" + a.jgrid.jqID(e.p.knv)).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        }, restoreCell: function (b, c) {
            return this.each(function () {
                var d, e = this;
                if (e.grid && e.p.cellEdit === !0) {
                    if (d = e.p.savedRow.length >= 1 ? 0 : null, null !== d) {
                        var f = a("td:eq(" + c + ")", e.rows[b]);
                        if (a.isFunction(a.fn.datepicker))try {
                            a("input.hasDatepicker", f).datepicker("hide")
                        } catch (g) {
                        }
                        a(f).empty().attr("tabindex", "-1"), a(e).jqGrid("setCell", e.rows[b].id, c, e.p.savedRow[d].v, !1, !1, !0), a(e).triggerHandler("jqGridAfterRestoreCell", [e.rows[b].id, e.p.savedRow[d].v, b, c]), a.isFunction(e.p.afterRestoreCell) && e.p.afterRestoreCell.call(e, e.rows[b].id, e.p.savedRow[d].v, b, c), e.p.savedRow.splice(0, 1)
                    }
                    window.setTimeout(function () {
                        a("#" + e.p.knv).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        }, nextCell: function (b, c) {
            return this.each(function () {
                var d, e = this, f = !1;
                if (e.grid && e.p.cellEdit === !0) {
                    for (d = c + 1; d < e.p.colModel.length; d++)if (e.p.colModel[d].editable === !0 && (!a.isFunction(e.p.isCellEditable) || e.p.isCellEditable.call(e, e.p.colModel[d].name, b, d))) {
                        f = d;
                        break
                    }
                    f !== !1 ? a(e).jqGrid("editCell", b, f, !0) : e.p.savedRow.length > 0 && a(e).jqGrid("saveCell", b, c)
                }
            })
        }, prevCell: function (b, c) {
            return this.each(function () {
                var d, e = this, f = !1;
                if (e.grid && e.p.cellEdit === !0) {
                    for (d = c - 1; d >= 0; d--)if (e.p.colModel[d].editable === !0 && (!a.isFunction(e.p.isCellEditable) || e.p.isCellEditable.call(e, e.p.colModel[d].name, b, d))) {
                        f = d;
                        break
                    }
                    f !== !1 ? a(e).jqGrid("editCell", b, f, !0) : e.p.savedRow.length > 0 && a(e).jqGrid("saveCell", b, c)
                }
            })
        }, GridNav: function () {
            return this.each(function () {
                function b(b, c, e) {
                    if ("v" === e.substr(0, 1)) {
                        var f = a(d.grid.bDiv)[0].clientHeight, g = a(d.grid.bDiv)[0].scrollTop, h = d.rows[b].offsetTop + d.rows[b].clientHeight, i = d.rows[b].offsetTop;
                        "vd" === e && h >= f && (a(d.grid.bDiv)[0].scrollTop = a(d.grid.bDiv)[0].scrollTop + d.rows[b].clientHeight), "vu" === e && g > i && (a(d.grid.bDiv)[0].scrollTop = a(d.grid.bDiv)[0].scrollTop - d.rows[b].clientHeight)
                    }
                    if ("h" === e) {
                        var j = a(d.grid.bDiv)[0].clientWidth, k = a(d.grid.bDiv)[0].scrollLeft, l = d.rows[b].cells[c].offsetLeft + d.rows[b].cells[c].clientWidth, m = d.rows[b].cells[c].offsetLeft;
                        l >= j + parseInt(k, 10) ? a(d.grid.bDiv)[0].scrollLeft = a(d.grid.bDiv)[0].scrollLeft + d.rows[b].cells[c].clientWidth : k > m && (a(d.grid.bDiv)[0].scrollLeft = a(d.grid.bDiv)[0].scrollLeft - d.rows[b].cells[c].clientWidth)
                    }
                }

                function c(a, b) {
                    var c, e;
                    if ("lft" === b)for (c = a + 1, e = a; e >= 0; e--)if (d.p.colModel[e].hidden !== !0) {
                        c = e;
                        break
                    }
                    if ("rgt" === b)for (c = a - 1, e = a; e < d.p.colModel.length; e++)if (d.p.colModel[e].hidden !== !0) {
                        c = e;
                        break
                    }
                    return c
                }

                var d = this;
                if (d.grid && d.p.cellEdit === !0) {
                    d.p.knv = d.p.id + "_kn";
                    var e, f, g = a("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + d.p.knv + "'></div></div>");
                    a(g).insertBefore(d.grid.cDiv), a("#" + d.p.knv).focus().keydown(function (g) {
                        switch (f = g.keyCode, "rtl" === d.p.direction && (37 === f ? f = 39 : 39 === f && (f = 37)), f) {
                            case 38:
                                d.p.iRow - 1 > 0 && (b(d.p.iRow - 1, d.p.iCol, "vu"), a(d).jqGrid("editCell", d.p.iRow - 1, d.p.iCol, !1));
                                break;
                            case 40:
                                d.p.iRow + 1 <= d.rows.length - 1 && (b(d.p.iRow + 1, d.p.iCol, "vd"), a(d).jqGrid("editCell", d.p.iRow + 1, d.p.iCol, !1));
                                break;
                            case 37:
                                d.p.iCol - 1 >= 0 && (e = c(d.p.iCol - 1, "lft"), b(d.p.iRow, e, "h"), a(d).jqGrid("editCell", d.p.iRow, e, !1));
                                break;
                            case 39:
                                d.p.iCol + 1 <= d.p.colModel.length - 1 && (e = c(d.p.iCol + 1, "rgt"), b(d.p.iRow, e, "h"), a(d).jqGrid("editCell", d.p.iRow, e, !1));
                                break;
                            case 13:
                                parseInt(d.p.iCol, 10) >= 0 && parseInt(d.p.iRow, 10) >= 0 && a(d).jqGrid("editCell", d.p.iRow, d.p.iCol, !0);
                                break;
                            default:
                                return !0
                        }
                        return !1
                    })
                }
            })
        }, getChangedCells: function (b) {
            var c = [];
            return b || (b = "all"), this.each(function () {
                var d, e = this;
                e.grid && e.p.cellEdit === !0 && a(e.rows).each(function (f) {
                    var g = {};
                    a(this).hasClass("edited") && (a("td", this).each(function (c) {
                        if (d = e.p.colModel[c].name, "cb" !== d && "subgrid" !== d)if ("dirty" === b) {
                            if (a(this).hasClass("dirty-cell"))try {
                                g[d] = a.unformat.call(e, this, {rowId: e.rows[f].id, colModel: e.p.colModel[c]}, c)
                            } catch (h) {
                                g[d] = a.jgrid.htmlDecode(a(this).html())
                            }
                        } else try {
                            g[d] = a.unformat.call(e, this, {rowId: e.rows[f].id, colModel: e.p.colModel[c]}, c)
                        } catch (h) {
                            g[d] = a.jgrid.htmlDecode(a(this).html())
                        }
                    }), g.id = this.id, c.push(g))
                })
            }), c
        }
    })
});