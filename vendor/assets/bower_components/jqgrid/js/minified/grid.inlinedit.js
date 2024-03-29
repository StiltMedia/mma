/**
 *
 * @license Guriddo jqGrid JS - v5.0.1
 * Copyright(c) 2008, Tony Tomov, tony@trirand.com
 *
 * License: http://guriddo.net/?page_id=103334
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./grid.base", "./grid.common"], a) : a(jQuery)
}(function (a) {
    "use strict";
    a.jgrid.inlineEdit = a.jgrid.inlineEdit || {}, a.jgrid.extend({
        editRow: function (b, c, d, e, f, g, h, i, j) {
            var k = {}, l = a.makeArray(arguments).slice(1);
            return "object" === a.type(l[0]) ? k = l[0] : (void 0 !== c && (k.keys = c), a.isFunction(d) && (k.oneditfunc = d), a.isFunction(e) && (k.successfunc = e), void 0 !== f && (k.url = f), void 0 !== g && (k.extraparam = g), a.isFunction(h) && (k.aftersavefunc = h), a.isFunction(i) && (k.errorfunc = i), a.isFunction(j) && (k.afterrestorefunc = j)), k = a.extend(!0, {
                keys: !1,
                keyevent: "keydown",
                oneditfunc: null,
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST",
                focusField: !0
            }, a.jgrid.inlineEdit, k), this.each(function () {
                var c, d, e, f, g, h, i = this, j = 0, l = null, m = {}, n = a(this).jqGrid("getStyleUI", i.p.styleUI + ".inlinedit", "inputClass", !0);
                i.grid && (f = a(i).jqGrid("getInd", b, !0), f !== !1 && (h = a.isFunction(k.beforeEditRow) ? k.beforeEditRow.call(i, k, b) : void 0, void 0 === h && (h = !0), h && (e = a(f).attr("editable") || "0", "0" !== e || a(f).hasClass("not-editable-row") || (g = i.p.colModel, a('td[role="gridcell"]', f).each(function (e) {
                    c = g[e].name;
                    var f = i.p.treeGrid === !0 && c === i.p.ExpandColumn;
                    if (f)d = a("span:first", this).html(); else try {
                        d = a.unformat.call(i, this, {rowId: b, colModel: g[e]}, e)
                    } catch (h) {
                        d = g[e].edittype && "textarea" === g[e].edittype ? a(this).text() : a(this).html()
                    }
                    if ("cb" !== c && "subgrid" !== c && "rn" !== c && (i.p.autoencode && (d = a.jgrid.htmlDecode(d)), m[c] = d, g[e].editable === !0)) {
                        null === l && (l = e), f ? a("span:first", this).html("") : a(this).html("");
                        var k = a.extend({}, g[e].editoptions || {}, {
                            id: b + "_" + c,
                            name: c,
                            rowId: b,
                            oper: "edit"
                        });
                        g[e].edittype || (g[e].edittype = "text"), ("&nbsp;" === d || "&#160;" === d || 1 === d.length && 160 === d.charCodeAt(0)) && (d = "");
                        var o = a.jgrid.createEl.call(i, g[e].edittype, k, d, !0, a.extend({}, a.jgrid.ajaxOptions, i.p.ajaxSelectOptions || {}));
                        a(o).addClass("editable inline-edit-cell"), a.inArray(g[e].edittype, ["text", "textarea", "password", "select"]) > -1 && a(o).addClass(n), f ? a("span:first", this).append(o) : a(this).append(o), a.jgrid.bindEv.call(i, o, k), "select" === g[e].edittype && void 0 !== g[e].editoptions && g[e].editoptions.multiple === !0 && void 0 === g[e].editoptions.dataUrl && a.jgrid.msie && a(o).width(a(o).width()), j++
                    }
                }), j > 0 && (m.id = b, i.p.savedRow.push(m), a(f).attr("editable", "1"), k.focusField && ("number" == typeof k.focusField && parseInt(k.focusField, 10) <= g.length && (l = k.focusField), setTimeout(function () {
                    var b = a("td:eq(" + l + ") :input:visible", f).not(":disabled");
                    b.length > 0 && b.focus()
                }, 0)), k.keys === !0 && a(f).bind(k.keyevent, function (c) {
                    if (27 === c.keyCode) {
                        if (a(i).jqGrid("restoreRow", b, k.afterrestorefunc), i.p.inlineNav)try {
                            a(i).jqGrid("showAddEditButtons")
                        } catch (d) {
                        }
                        return !1
                    }
                    if (13 === c.keyCode) {
                        var e = c.target;
                        if ("TEXTAREA" === e.tagName)return !0;
                        if (a(i).jqGrid("saveRow", b, k) && i.p.inlineNav)try {
                            a(i).jqGrid("showAddEditButtons")
                        } catch (f) {
                        }
                        return !1
                    }
                }), a(i).triggerHandler("jqGridInlineEditRow", [b, k]), a.isFunction(k.oneditfunc) && k.oneditfunc.call(i, b))))))
            })
        }, saveRow: function (b, c, d, e, f, g, h) {
            var i = a.makeArray(arguments).slice(1), j = {}, k = this[0];
            "object" === a.type(i[0]) ? j = i[0] : (a.isFunction(c) && (j.successfunc = c), void 0 !== d && (j.url = d), void 0 !== e && (j.extraparam = e), a.isFunction(f) && (j.aftersavefunc = f), a.isFunction(g) && (j.errorfunc = g), a.isFunction(h) && (j.afterrestorefunc = h)), j = a.extend(!0, {
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST",
                saveui: "enable",
                savetext: a.jgrid.getRegional(k, "defaults.savetext")
            }, a.jgrid.inlineEdit, j);
            var l, m, n, o, p, q = !1, r = {}, s = {}, t = {}, u = !1, v = a.trim(a(k).jqGrid("getStyleUI", k.p.styleUI + ".common", "error", !0));
            if (!k.grid)return q;
            if (p = a(k).jqGrid("getInd", b, !0), p === !1)return q;
            var w = a.jgrid.getRegional(this, "errors"), x = a.jgrid.getRegional(this, "edit"), y = a.isFunction(j.beforeSaveRow) ? j.beforeSaveRow.call(k, j, b) : void 0;
            if (void 0 === y && (y = !0), y) {
                if (m = a(p).attr("editable"), j.url = j.url || k.p.editurl, "1" === m) {
                    var z;
                    if (a('td[role="gridcell"]', p).each(function (b) {
                            if (z = k.p.colModel[b], l = z.name, "cb" !== l && "subgrid" !== l && z.editable === !0 && "rn" !== l && !a(this).hasClass("not-editable-cell")) {
                                switch (z.edittype) {
                                    case"checkbox":
                                        var c = ["Yes", "No"];
                                        z.editoptions && (c = z.editoptions.value.split(":")), r[l] = a("input", this).is(":checked") ? c[0] : c[1];
                                        break;
                                    case"text":
                                    case"password":
                                    case"textarea":
                                    case"button":
                                        r[l] = a("input, textarea", this).val();
                                        break;
                                    case"select":
                                        if (z.editoptions.multiple) {
                                            var d = a("select", this), e = [];
                                            r[l] = a(d).val(), r[l] = r[l] ? r[l].join(",") : "", a("select option:selected", this).each(function (b, c) {
                                                e[b] = a(c).text()
                                            }), s[l] = e.join(",")
                                        } else r[l] = a("select option:selected", this).val(), s[l] = a("select option:selected", this).text();
                                        z.formatter && "select" === z.formatter && (s = {});
                                        break;
                                    case"custom":
                                        try {
                                            if (!z.editoptions || !a.isFunction(z.editoptions.custom_value))throw"e1";
                                            if (r[l] = z.editoptions.custom_value.call(k, a(".customelement", this), "get"), void 0 === r[l])throw"e2"
                                        } catch (f) {
                                            "e1" === f ? a.jgrid.info_dialog(w.errcap, "function 'custom_value' " + x.msg.nodefined, x.bClose, {styleUI: k.p.styleUI}) : a.jgrid.info_dialog(w.errcap, f.message, x.bClose, {styleUI: k.p.styleUI})
                                        }
                                }
                                if (o = a.jgrid.checkValues.call(k, r[l], b), o[0] === !1)return !1;
                                k.p.autoencode && (r[l] = a.jgrid.htmlEncode(r[l])), "clientArray" !== j.url && z.editoptions && z.editoptions.NullIfEmpty === !0 && "" === r[l] && (t[l] = "null", u = !0)
                            }
                        }), o[0] === !1) {
                        try {
                            var A = a(k).jqGrid("getGridRowById", b), B = a.jgrid.findPos(A);
                            a.jgrid.info_dialog(w.errcap, o[1], x.bClose, {
                                left: B[0],
                                top: B[1] + a(A).outerHeight(),
                                styleUI: k.p.styleUI
                            })
                        } catch (C) {
                            alert(o[1])
                        }
                        return q
                    }
                    var D, E = k.p.prmNames, F = b;
                    if (D = k.p.keyName === !1 ? E.id : k.p.keyName, r) {
                        if (r[E.oper] = E.editoper, void 0 === r[D] || "" === r[D])r[D] = b; else if (p.id !== k.p.idPrefix + r[D]) {
                            var G = a.jgrid.stripPref(k.p.idPrefix, b);
                            if (void 0 !== k.p._index[G] && (k.p._index[r[D]] = k.p._index[G], delete k.p._index[G]), b = k.p.idPrefix + r[D], a(p).attr("id", b), k.p.selrow === F && (k.p.selrow = b), a.isArray(k.p.selarrrow)) {
                                var H = a.inArray(F, k.p.selarrrow);
                                H >= 0 && (k.p.selarrrow[H] = b)
                            }
                            if (k.p.multiselect) {
                                var I = "jqg_" + k.p.id + "_" + b;
                                a("input.cbox", p).attr("id", I).attr("name", I)
                            }
                        }
                        void 0 === k.p.inlineData && (k.p.inlineData = {}), r = a.extend({}, r, k.p.inlineData, j.extraparam)
                    }
                    if ("clientArray" === j.url) {
                        r = a.extend({}, r, s), k.p.autoencode && a.each(r, function (b, c) {
                            r[b] = a.jgrid.htmlDecode(c)
                        });
                        var J, K = a(k).jqGrid("setRowData", b, r);
                        for (a(p).attr("editable", "0"), J = 0; J < k.p.savedRow.length; J++)if (String(k.p.savedRow[J].id) === String(F)) {
                            n = J;
                            break
                        }
                        n >= 0 && k.p.savedRow.splice(n, 1), a(k).triggerHandler("jqGridInlineAfterSaveRow", [b, K, r, j]), a.isFunction(j.aftersavefunc) && j.aftersavefunc.call(k, b, K, r, j), q = !0, a(p).removeClass("jqgrid-new-row").unbind("keydown")
                    } else a(k).jqGrid("progressBar", {
                        method: "show",
                        loadtype: j.saveui,
                        htmlcontent: j.savetext
                    }), t = a.extend({}, r, t), t[D] = a.jgrid.stripPref(k.p.idPrefix, t[D]), a.ajax(a.extend({
                        url: j.url,
                        data: a.isFunction(k.p.serializeRowData) ? k.p.serializeRowData.call(k, t) : t,
                        type: j.mtype,
                        async: !1,
                        complete: function (c, d) {
                            if (a(k).jqGrid("progressBar", {
                                    method: "hide",
                                    loadtype: j.saveui,
                                    htmlcontent: j.savetext
                                }), "success" === d) {
                                var e, f, g = !0;
                                if (e = a(k).triggerHandler("jqGridInlineSuccessSaveRow", [c, b, j]), a.isArray(e) || (e = [!0, t]), e[0] && a.isFunction(j.successfunc) && (e = j.successfunc.call(k, c)), a.isArray(e) ? (g = e[0], r = e[1] || r) : g = e, g === !0) {
                                    for (k.p.autoencode && a.each(r, function (b, c) {
                                        r[b] = a.jgrid.htmlDecode(c)
                                    }), u && a.each(r, function (a) {
                                        "null" === r[a] && (r[a] = "")
                                    }), r = a.extend({}, r, s), a(k).jqGrid("setRowData", b, r), a(p).attr("editable", "0"), f = 0; f < k.p.savedRow.length; f++)if (String(k.p.savedRow[f].id) === String(b)) {
                                        n = f;
                                        break
                                    }
                                    n >= 0 && k.p.savedRow.splice(n, 1), a(k).triggerHandler("jqGridInlineAfterSaveRow", [b, c, r, j]), a.isFunction(j.aftersavefunc) && j.aftersavefunc.call(k, b, c, r, j), q = !0, a(p).removeClass("jqgrid-new-row").unbind("keydown")
                                } else a(k).triggerHandler("jqGridInlineErrorSaveRow", [b, c, d, null, j]), a.isFunction(j.errorfunc) && j.errorfunc.call(k, b, c, d, null), j.restoreAfterError === !0 && a(k).jqGrid("restoreRow", b, j.afterrestorefunc)
                            }
                        },
                        error: function (c, d, e) {
                            if (a("#lui_" + a.jgrid.jqID(k.p.id)).hide(), a(k).triggerHandler("jqGridInlineErrorSaveRow", [b, c, d, e, j]), a.isFunction(j.errorfunc))j.errorfunc.call(k, b, c, d, e); else {
                                var f = c.responseText || c.statusText;
                                try {
                                    a.jgrid.info_dialog(w.errcap, '<div class="' + v + '">' + f + "</div>", x.bClose, {
                                        buttonalign: "right",
                                        styleUI: k.p.styleUI
                                    })
                                } catch (g) {
                                    alert(f)
                                }
                            }
                            j.restoreAfterError === !0 && a(k).jqGrid("restoreRow", b, j.afterrestorefunc)
                        }
                    }, a.jgrid.ajaxOptions, k.p.ajaxRowOptions || {}))
                }
                return q
            }
        }, restoreRow: function (b, c) {
            var d = a.makeArray(arguments).slice(1), e = {};
            return "object" === a.type(d[0]) ? e = d[0] : a.isFunction(c) && (e.afterrestorefunc = c), e = a.extend(!0, {}, a.jgrid.inlineEdit, e), this.each(function () {
                var c, d, f = this, g = -1, h = {};
                if (f.grid && (c = a(f).jqGrid("getInd", b, !0), c !== !1)) {
                    var i = a.isFunction(e.beforeCancelRow) ? e.beforeCancelRow.call(f, e, b) : void 0;
                    if (void 0 === i && (i = !0), i) {
                        for (d = 0; d < f.p.savedRow.length; d++)if (String(f.p.savedRow[d].id) === String(b)) {
                            g = d;
                            break
                        }
                        if (g >= 0) {
                            if (a.isFunction(a.fn.datepicker))try {
                                a("input.hasDatepicker", "#" + a.jgrid.jqID(c.id)).datepicker("hide")
                            } catch (j) {
                            }
                            a.each(f.p.colModel, function () {
                                this.editable === !0 && f.p.savedRow[g].hasOwnProperty(this.name) && (h[this.name] = f.p.savedRow[g][this.name])
                            }), a(f).jqGrid("setRowData", b, h), a(c).attr("editable", "0").unbind("keydown"), f.p.savedRow.splice(g, 1), a("#" + a.jgrid.jqID(b), "#" + a.jgrid.jqID(f.p.id)).hasClass("jqgrid-new-row") && setTimeout(function () {
                                a(f).jqGrid("delRowData", b), a(f).jqGrid("showAddEditButtons")
                            }, 0)
                        }
                        a(f).triggerHandler("jqGridInlineAfterRestoreRow", [b]), a.isFunction(e.afterrestorefunc) && e.afterrestorefunc.call(f, b)
                    }
                }
            })
        }, addRow: function (b) {
            return b = a.extend(!0, {
                rowID: null,
                initdata: {},
                position: "first",
                useDefValues: !0,
                useFormatter: !1,
                addRowParams: {extraparam: {}}
            }, b || {}), this.each(function () {
                if (this.grid) {
                    var c = this, d = a.isFunction(b.beforeAddRow) ? b.beforeAddRow.call(c, b.addRowParams) : void 0;
                    if (void 0 === d && (d = !0), d)if (b.rowID = a.isFunction(b.rowID) ? b.rowID.call(c, b) : null != b.rowID ? b.rowID : a.jgrid.randId(), b.useDefValues === !0 && a(c.p.colModel).each(function () {
                            if (this.editoptions && this.editoptions.defaultValue) {
                                var d = this.editoptions.defaultValue, e = a.isFunction(d) ? d.call(c) : d;
                                b.initdata[this.name] = e
                            }
                        }), a(c).jqGrid("addRowData", b.rowID, b.initdata, b.position), b.rowID = c.p.idPrefix + b.rowID, a("#" + a.jgrid.jqID(b.rowID), "#" + a.jgrid.jqID(c.p.id)).addClass("jqgrid-new-row"), b.useFormatter)a("#" + a.jgrid.jqID(b.rowID) + " .ui-inline-edit", "#" + a.jgrid.jqID(c.p.id)).click(); else {
                        var e = c.p.prmNames, f = e.oper;
                        b.addRowParams.extraparam[f] = e.addoper, a(c).jqGrid("editRow", b.rowID, b.addRowParams), a(c).jqGrid("setSelection", b.rowID)
                    }
                }
            })
        }, inlineNav: function (b, c) {
            var d = this[0], e = a.jgrid.getRegional(d, "nav"), f = a.jgrid.styleUI[d.p.styleUI].inlinedit;
            return c = a.extend(!0, {
                edit: !0,
                editicon: f.icon_edit_nav,
                add: !0,
                addicon: f.icon_add_nav,
                save: !0,
                saveicon: f.icon_save_nav,
                cancel: !0,
                cancelicon: f.icon_cancel_nav,
                addParams: {addRowParams: {extraparam: {}}},
                editParams: {},
                restoreAfterSelect: !0
            }, e, c || {}), this.each(function () {
                if (this.grid && !this.p.inlineNav) {
                    var f = a.jgrid.jqID(d.p.id), g = a.trim(a(d).jqGrid("getStyleUI", d.p.styleUI + ".common", "disabled", !0));
                    if (d.p.navGrid || a(d).jqGrid("navGrid", b, {
                            refresh: !1,
                            edit: !1,
                            add: !1,
                            del: !1,
                            search: !1,
                            view: !1
                        }), a(d).data("inlineNav") || a(d).data("inlineNav", c), d.p.force_regional && (c = a.extend(c, e)), d.p.inlineNav = !0, c.addParams.useFormatter === !0) {
                        var h, i = d.p.colModel;
                        for (h = 0; h < i.length; h++)if (i[h].formatter && "actions" === i[h].formatter) {
                            if (i[h].formatoptions) {
                                var j = {
                                    keys: !1,
                                    onEdit: null,
                                    onSuccess: null,
                                    afterSave: null,
                                    onError: null,
                                    afterRestore: null,
                                    extraparam: {},
                                    url: null
                                }, k = a.extend(j, i[h].formatoptions);
                                c.addParams.addRowParams = {
                                    keys: k.keys,
                                    oneditfunc: k.onEdit,
                                    successfunc: k.onSuccess,
                                    url: k.url,
                                    extraparam: k.extraparam,
                                    aftersavefunc: k.afterSave,
                                    errorfunc: k.onError,
                                    afterrestorefunc: k.afterRestore
                                }
                            }
                            break
                        }
                    }
                    c.add && a(d).jqGrid("navButtonAdd", b, {
                        caption: c.addtext,
                        title: c.addtitle,
                        buttonicon: c.addicon,
                        id: d.p.id + "_iladd",
                        internal: !0,
                        onClickButton: function () {
                            a(d).jqGrid("addRow", c.addParams), c.addParams.useFormatter || (a("#" + f + "_ilsave").removeClass(g), a("#" + f + "_ilcancel").removeClass(g), a("#" + f + "_iladd").addClass(g), a("#" + f + "_iledit").addClass(g))
                        }
                    }), c.edit && a(d).jqGrid("navButtonAdd", b, {
                        caption: c.edittext,
                        title: c.edittitle,
                        buttonicon: c.editicon,
                        id: d.p.id + "_iledit",
                        internal: !0,
                        onClickButton: function () {
                            var b = a(d).jqGrid("getGridParam", "selrow");
                            b ? (a(d).jqGrid("editRow", b, c.editParams), a("#" + f + "_ilsave").removeClass(g), a("#" + f + "_ilcancel").removeClass(g), a("#" + f + "_iladd").addClass(g), a("#" + f + "_iledit").addClass(g)) : (a.jgrid.viewModal("#alertmod_" + f, {
                                gbox: "#gbox_" + f,
                                jqm: !0
                            }), a("#jqg_alrt").focus())
                        }
                    }), c.save && (a(d).jqGrid("navButtonAdd", b, {
                        caption: c.savetext || "",
                        title: c.savetitle || "Save row",
                        buttonicon: c.saveicon,
                        id: d.p.id + "_ilsave",
                        internal: !0,
                        onClickButton: function () {
                            var b = d.p.savedRow[0].id;
                            if (b) {
                                var e = d.p.prmNames, g = e.oper, h = c.editParams;
                                a("#" + a.jgrid.jqID(b), "#" + f).hasClass("jqgrid-new-row") ? (c.addParams.addRowParams.extraparam[g] = e.addoper, h = c.addParams.addRowParams) : (c.editParams.extraparam || (c.editParams.extraparam = {}), c.editParams.extraparam[g] = e.editoper), a(d).jqGrid("saveRow", b, h) && a(d).jqGrid("showAddEditButtons")
                            } else a.jgrid.viewModal("#alertmod_" + f, {
                                gbox: "#gbox_" + f,
                                jqm: !0
                            }), a("#jqg_alrt").focus()
                        }
                    }), a("#" + f + "_ilsave").addClass(g)), c.cancel && (a(d).jqGrid("navButtonAdd", b, {
                        caption: c.canceltext || "",
                        title: c.canceltitle || "Cancel row editing",
                        buttonicon: c.cancelicon,
                        id: d.p.id + "_ilcancel",
                        internal: !0,
                        onClickButton: function () {
                            var b = d.p.savedRow[0].id, e = c.editParams;
                            b ? (a("#" + a.jgrid.jqID(b), "#" + f).hasClass("jqgrid-new-row") && (e = c.addParams.addRowParams), a(d).jqGrid("restoreRow", b, e), a(d).jqGrid("showAddEditButtons")) : (a.jgrid.viewModal("#alertmod", {
                                gbox: "#gbox_" + f,
                                jqm: !0
                            }), a("#jqg_alrt").focus())
                        }
                    }), a("#" + f + "_ilcancel").addClass(g)), c.restoreAfterSelect === !0 && a(d).bind("jqGridBeforeSelectRow.inlineNav", function (b, e) {
                        d.p.savedRow.length > 0 && d.p.inlineNav === !0 && e !== d.p.selrow && null !== d.p.selrow && (d.p.selrow === c.addParams.rowID ? a(d).jqGrid("delRowData", d.p.selrow) : a(d).jqGrid("restoreRow", d.p.selrow, c.editParams), a(d).jqGrid("showAddEditButtons"))
                    })
                }
            })
        }, showAddEditButtons: function () {
            return this.each(function () {
                if (this.grid) {
                    var b = a.jgrid.jqID(this.p.id), c = a.trim(a(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "disabled", !0));
                    a("#" + b + "_ilsave").addClass(c), a("#" + b + "_ilcancel").addClass(c), a("#" + b + "_iladd").removeClass(c), a("#" + b + "_iledit").removeClass(c)
                }
            })
        }
    })
});