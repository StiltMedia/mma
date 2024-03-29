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
    var b = {};
    a.jgrid.extend({
        editGridRow: function (c, d) {
            var e = a.jgrid.getRegional(this[0], "edit"), f = this[0].p.styleUI, g = a.jgrid.styleUI[f].formedit, h = a.jgrid.styleUI[f].common;
            return d = a.extend(!0, {
                top: 0,
                left: 0,
                width: "500",
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: null,
                mtype: "POST",
                clearAfterAdd: !0,
                closeAfterEdit: !1,
                reloadAfterSubmit: !0,
                onInitializeForm: null,
                beforeInitData: null,
                beforeShowForm: null,
                afterShowForm: null,
                beforeSubmit: null,
                afterSubmit: null,
                onclickSubmit: null,
                afterComplete: null,
                onclickPgButtons: null,
                afterclickPgButtons: null,
                editData: {},
                recreateForm: !1,
                jqModal: !0,
                closeOnEscape: !1,
                addedrow: "first",
                topinfo: "",
                bottominfo: "",
                saveicon: [],
                closeicon: [],
                savekey: [!1, 13],
                navkeys: [!1, 38, 40],
                checkOnSubmit: !1,
                checkOnUpdate: !1,
                _savedData: {},
                processing: !1,
                onClose: null,
                ajaxEditOptions: {},
                serializeEditData: null,
                viewPagerButtons: !0,
                overlayClass: h.overlay,
                removemodal: !0,
                form: "edit",
                template: null,
                focusField: !0
            }, e, d || {}), b[a(this)[0].p.id] = d, this.each(function () {
                function e() {
                    return a(z).find(".FormElement").each(function () {
                        var c = a(".customelement", this);
                        if (c.length) {
                            var d = c[0], e = a(d).attr("name");
                            a.each(r.p.colModel, function () {
                                if (this.name === e && this.editoptions && a.isFunction(this.editoptions.custom_value)) {
                                    try {
                                        if (t[e] = this.editoptions.custom_value.call(r, a("#" + a.jgrid.jqID(e), z), "get"), void 0 === t[e])throw"e1"
                                    } catch (c) {
                                        "e1" === c ? a.jgrid.info_dialog(F.errcap, "function 'custom_value' " + b[a(this)[0]].p.msg.novalue, b[a(this)[0]].p.bClose, {styleUI: b[a(this)[0]].p.styleUI}) : a.jgrid.info_dialog(F.errcap, c.message, b[a(this)[0]].p.bClose, {styleUI: b[a(this)[0]].p.styleUI})
                                    }
                                    return !0
                                }
                            })
                        } else {
                            switch (a(this).get(0).type) {
                                case"checkbox":
                                    if (a(this).is(":checked"))t[this.name] = a(this).val(); else {
                                        var f = a(this).attr("offval");
                                        t[this.name] = f
                                    }
                                    break;
                                case"select-one":
                                    t[this.name] = a("option:selected", this).val();
                                    break;
                                case"select-multiple":
                                    t[this.name] = a(this).val(), t[this.name] = t[this.name] ? t[this.name].join(",") : "";
                                    var g = [];
                                    a("option:selected", this).each(function (b, c) {
                                        g[b] = a(c).text()
                                    });
                                    break;
                                case"password":
                                case"text":
                                case"textarea":
                                case"button":
                                    t[this.name] = a(this).val()
                            }
                            r.p.autoencode && (t[this.name] = a.jgrid.htmlEncode(t[this.name]))
                        }
                    }), !0
                }

                function f(c, d, e, f) {
                    var h, i, j, k, l, m, n, o = 0, p = [], q = !1, s = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>", t = "";
                    for (n = 1; f >= n; n++)t += s;
                    if ("_empty" !== c && (q = a(d).jqGrid("getInd", c)), a(d.p.colModel).each(function (n) {
                            if (h = this.name, i = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, l = i ? "style='display:none'" : "", "cb" !== h && "subgrid" !== h && this.editable === !0 && "rn" !== h) {
                                if (q === !1)k = ""; else if (h === d.p.ExpandColumn && d.p.treeGrid === !0)k = a("td[role='gridcell']:eq(" + n + ")", d.rows[q]).text(); else {
                                    try {
                                        k = a.unformat.call(d, a("td[role='gridcell']:eq(" + n + ")", d.rows[q]), {
                                            rowId: c,
                                            colModel: this
                                        }, n)
                                    } catch (s) {
                                        k = this.edittype && "textarea" === this.edittype ? a("td[role='gridcell']:eq(" + n + ")", d.rows[q]).text() : a("td[role='gridcell']:eq(" + n + ")", d.rows[q]).html()
                                    }
                                    (!k || "&nbsp;" === k || "&#160;" === k || 1 === k.length && 160 === k.charCodeAt(0)) && (k = "")
                                }
                                var u = a.extend({}, this.editoptions || {}, {
                                    id: h,
                                    name: h,
                                    rowId: c,
                                    oper: "edit"
                                }), v = a.extend({}, {
                                    elmprefix: "",
                                    elmsuffix: "",
                                    rowabove: !1,
                                    rowcontent: ""
                                }, this.formoptions || {}), w = parseInt(v.rowpos, 10) || o + 1, y = parseInt(2 * (parseInt(v.colpos, 10) || 1), 10);
                                if ("_empty" === c && u.defaultValue && (k = a.isFunction(u.defaultValue) ? u.defaultValue.call(r) : u.defaultValue), this.edittype || (this.edittype = "text"), r.p.autoencode && (k = a.jgrid.htmlDecode(k)), m = a.jgrid.createEl.call(r, this.edittype, u, k, !1, a.extend({}, a.jgrid.ajaxOptions, d.p.ajaxSelectOptions || {})), "select" === this.edittype && (k = a(m).val(), "select-multiple" === a(m).get(0).type && k && (k = k.join(","))), "checkbox" === this.edittype && (k = a(m).is(":checked") ? a(m).val() : a(m).attr("offval")), (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[h] = k), a(m).addClass("FormElement"), a.inArray(this.edittype, ["text", "textarea", "password", "select"]) > -1 && a(m).addClass(g.inputClass), E)a(K).find("#" + h).replaceWith(m); else {
                                    if (j = a(e).find("tr[rowpos=" + w + "]"), v.rowabove) {
                                        var z = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + v.rowcontent + "</td></tr>");
                                        a(e).append(z), z[0].rp = w
                                    }
                                    0 === j.length && (j = a("<tr " + l + " rowpos='" + w + "'></tr>").addClass("FormData").attr("id", "tr_" + h), a(j).append(t), a(e).append(j), j[0].rp = w), a("td:eq(" + (y - 2) + ")", j[0]).html("<label for='" + h + "'>" + (void 0 === v.label ? d.p.colNames[n] : v.label) + "</label>"), a("td:eq(" + (y - 1) + ")", j[0]).append(v.elmprefix).append(m).append(v.elmsuffix)
                                }
                                "custom" === this.edittype && a.isFunction(u.custom_value) && u.custom_value.call(r, a("#" + h, x), "set", k), a.jgrid.bindEv.call(r, m, u), p[o] = n, o++
                            }
                        }), o > 0) {
                        var u;
                        E ? (u = "<div class='FormData' style='display:none'><input class='FormElement' id='id_g' type='text' name='" + d.p.id + "_id' value='" + c + "'/>", a(K).append(u)) : (u = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + d.p.id + "_id' value='" + c + "'/></td></tr>"), u[0].rp = o + 999, a(e).append(u)), (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[d.p.id + "_id"] = c)
                    }
                    return p
                }

                function i(c, d, e) {
                    var f, g, h, i, j, k, l = 0;
                    (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData = {}, b[r.p.id]._savedData[d.p.id + "_id"] = c);
                    var m = d.p.colModel;
                    if ("_empty" === c)return a(m).each(function () {
                        f = this.name, i = a.extend({}, this.editoptions || {}), h = a("#" + a.jgrid.jqID(f), e), h && h.length && null !== h[0] && (j = "", "custom" === this.edittype && a.isFunction(i.custom_value) ? i.custom_value.call(r, a("#" + f, e), "set", j) : i.defaultValue ? (j = a.isFunction(i.defaultValue) ? i.defaultValue.call(r) : i.defaultValue, "checkbox" === h[0].type ? (k = j.toLowerCase(), k.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== k ? (h[0].checked = !0, h[0].defaultChecked = !0, h[0].value = j) : (h[0].checked = !1, h[0].defaultChecked = !1)) : h.val(j)) : "checkbox" === h[0].type ? (h[0].checked = !1, h[0].defaultChecked = !1, j = a(h).attr("offval")) : h[0].type && "select" === h[0].type.substr(0, 6) ? h[0].selectedIndex = 0 : h.val(j), (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[f] = j))
                    }), void a("#id_g", e).val(c);
                    var n = a(d).jqGrid("getInd", c, !0);
                    n && (a('td[role="gridcell"]', n).each(function (h) {
                        if (f = m[h].name, "cb" !== f && "subgrid" !== f && "rn" !== f && m[h].editable === !0) {
                            if (f === d.p.ExpandColumn && d.p.treeGrid === !0)g = a(this).text(); else try {
                                g = a.unformat.call(d, a(this), {rowId: c, colModel: m[h]}, h)
                            } catch (i) {
                                g = "textarea" === m[h].edittype ? a(this).text() : a(this).html()
                            }
                            switch (r.p.autoencode && (g = a.jgrid.htmlDecode(g)), (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[f] = g), f = a.jgrid.jqID(f), m[h].edittype) {
                                case"password":
                                case"text":
                                case"button":
                                case"image":
                                case"textarea":
                                    ("&nbsp;" === g || "&#160;" === g || 1 === g.length && 160 === g.charCodeAt(0)) && (g = ""), a("#" + f, e).val(g);
                                    break;
                                case"select":
                                    var j = g.split(",");
                                    j = a.map(j, function (b) {
                                        return a.trim(b)
                                    }), a("#" + f + " option", e).each(function () {
                                        this.selected = m[h].editoptions.multiple || a.trim(g) !== a.trim(a(this).text()) && j[0] !== a.trim(a(this).text()) && j[0] !== a.trim(a(this).val()) ? m[h].editoptions.multiple && (a.inArray(a.trim(a(this).text()), j) > -1 || a.inArray(a.trim(a(this).val()), j) > -1) ? !0 : !1 : !0
                                    }), (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (g = a("#" + f, e).val(), m[h].editoptions.multiple && (g = g.join(",")), b[r.p.id]._savedData[f] = g);
                                    break;
                                case"checkbox":
                                    if (g = String(g), m[h].editoptions && m[h].editoptions.value) {
                                        var k = m[h].editoptions.value.split(":");
                                        a("#" + f, e)[r.p.useProp ? "prop" : "attr"](k[0] === g ? {
                                            checked: !0,
                                            defaultChecked: !0
                                        } : {checked: !1, defaultChecked: !1})
                                    } else g = g.toLowerCase(), g.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== g ? (a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("checked", !0), a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("defaultChecked", !0)) : (a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("checked", !1), a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("defaultChecked", !1));
                                    (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (g = a("#" + f, e).is(":checked") ? a("#" + f, e).val() : a("#" + f, e).attr("offval"));
                                    break;
                                case"custom":
                                    try {
                                        if (!m[h].editoptions || !a.isFunction(m[h].editoptions.custom_value))throw"e1";
                                        m[h].editoptions.custom_value.call(r, a("#" + f, e), "set", g)
                                    } catch (n) {
                                        "e1" === n ? a.jgrid.info_dialog(F.errcap, "function 'custom_value' " + b[a(this)[0]].p.msg.nodefined, a.rp_ge[a(this)[0]].p.bClose, {styleUI: b[a(this)[0]].p.styleUI}) : a.jgrid.info_dialog(F.errcap, n.message, a.rp_ge[a(this)[0]].p.bClose, {styleUI: b[a(this)[0]].p.styleUI})
                                    }
                            }
                            l++
                        }
                    }), l > 0 && a("#id_g", z).val(c))
                }

                function j() {
                    a.each(r.p.colModel, function (a, b) {
                        b.editoptions && b.editoptions.NullIfEmpty === !0 && t.hasOwnProperty(b.name) && "" === t[b.name] && (t[b.name] = "null")
                    })
                }

                function k() {
                    var c, e, f, g, k, l, m, n = [!0, "", ""], o = {}, p = r.p.prmNames, q = a(r).triggerHandler("jqGridAddEditBeforeCheckValues", [a(x), v]);
                    q && "object" == typeof q && (t = q), a.isFunction(b[r.p.id].beforeCheckValues) && (q = b[r.p.id].beforeCheckValues.call(r, t, a(x), v), q && "object" == typeof q && (t = q));
                    for (g in t)if (t.hasOwnProperty(g) && (n = a.jgrid.checkValues.call(r, t[g], g), n[0] === !1))break;
                    if (j(), n[0] && (o = a(r).triggerHandler("jqGridAddEditClickSubmit", [b[r.p.id], t, v]), void 0 === o && a.isFunction(b[r.p.id].onclickSubmit) && (o = b[r.p.id].onclickSubmit.call(r, b[r.p.id], t, v) || {}), n = a(r).triggerHandler("jqGridAddEditBeforeSubmit", [t, a(x), v]), void 0 === n && (n = [!0, "", ""]), n[0] && a.isFunction(b[r.p.id].beforeSubmit) && (n = b[r.p.id].beforeSubmit.call(r, t, a(x), v))), n[0] && !b[r.p.id].processing) {
                        if (b[r.p.id].processing = !0, a("#sData", z + "_2").addClass(h.active), m = b[r.p.id].url || a(r).jqGrid("getGridParam", "editurl"), f = p.oper, e = "clientArray" === m ? r.p.keyName : p.id, t[f] = "_empty" === a.trim(t[r.p.id + "_id"]) ? p.addoper : p.editoper, t[f] !== p.addoper ? t[e] = t[r.p.id + "_id"] : void 0 === t[e] && (t[e] = t[r.p.id + "_id"]), delete t[r.p.id + "_id"], t = a.extend(t, b[r.p.id].editData, o), r.p.treeGrid === !0) {
                            if (t[f] === p.addoper) {
                                k = a(r).jqGrid("getGridParam", "selrow");
                                var s = "adjacency" === r.p.treeGridModel ? r.p.treeReader.parent_id_field : "parent_id";
                                t[s] = k
                            }
                            for (l in r.p.treeReader)if (r.p.treeReader.hasOwnProperty(l)) {
                                var u = r.p.treeReader[l];
                                if (t.hasOwnProperty(u)) {
                                    if (t[f] === p.addoper && "parent_id_field" === l)continue;
                                    delete t[u]
                                }
                            }
                        }
                        t[e] = a.jgrid.stripPref(r.p.idPrefix, t[e]);
                        var y = a.extend({
                            url: m,
                            type: b[r.p.id].mtype,
                            data: a.isFunction(b[r.p.id].serializeEditData) ? b[r.p.id].serializeEditData.call(r, t) : t,
                            complete: function (g, j) {
                                var l;
                                if (a("#sData", z + "_2").removeClass(h.active), t[e] = r.p.idPrefix + t[e], g.status >= 300 && 304 !== g.status ? (n[0] = !1, n[1] = a(r).triggerHandler("jqGridAddEditErrorTextFormat", [g, v]), n[1] = a.isFunction(b[r.p.id].errorTextFormat) ? b[r.p.id].errorTextFormat.call(r, g, v) : j + " Status: '" + g.statusText + "'. Error code: " + g.status) : (n = a(r).triggerHandler("jqGridAddEditAfterSubmit", [g, t, v]), void 0 === n && (n = [!0, "", ""]), n[0] && a.isFunction(b[r.p.id].afterSubmit) && (n = b[r.p.id].afterSubmit.call(r, g, t, v))), n[0] === !1)a(".FormError", x).html(n[1]), a(".FormError", x).show(); else if (r.p.autoencode && a.each(t, function (b, c) {
                                        t[b] = a.jgrid.htmlDecode(c)
                                    }), t[f] === p.addoper ? (n[2] || (n[2] = a.jgrid.randId()), null == t[e] || "_empty" === t[e] ? t[e] = n[2] : n[2] = t[e], b[r.p.id].reloadAfterSubmit ? a(r).trigger("reloadGrid") : r.p.treeGrid === !0 ? a(r).jqGrid("addChildNode", n[2], k, t) : a(r).jqGrid("addRowData", n[2], t, d.addedrow), b[r.p.id].closeAfterAdd ? (r.p.treeGrid !== !0 && a(r).jqGrid("setSelection", n[2]), a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                        gb: "#gbox_" + a.jgrid.jqID(w),
                                        jqm: d.jqModal,
                                        onClose: b[r.p.id].onClose,
                                        removemodal: b[r.p.id].removemodal,
                                        formprop: !b[r.p.id].recreateForm,
                                        form: b[r.p.id].form
                                    })) : b[r.p.id].clearAfterAdd && i("_empty", r, x)) : (b[r.p.id].reloadAfterSubmit ? (a(r).trigger("reloadGrid"), b[r.p.id].closeAfterEdit || setTimeout(function () {
                                        a(r).jqGrid("setSelection", t[e])
                                    }, 1e3)) : r.p.treeGrid === !0 ? a(r).jqGrid("setTreeRow", t[e], t) : a(r).jqGrid("setRowData", t[e], t), b[r.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                        gb: "#gbox_" + a.jgrid.jqID(w),
                                        jqm: d.jqModal,
                                        onClose: b[r.p.id].onClose,
                                        removemodal: b[r.p.id].removemodal,
                                        formprop: !b[r.p.id].recreateForm,
                                        form: b[r.p.id].form
                                    })), a.isFunction(b[r.p.id].afterComplete) && (c = g, setTimeout(function () {
                                        a(r).triggerHandler("jqGridAddEditAfterComplete", [c, t, a(x), v]), b[r.p.id].afterComplete.call(r, c, t, a(x), v), c = null
                                    }, 500)), (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (a(x).data("disabled", !1), "_empty" !== b[r.p.id]._savedData[r.p.id + "_id"]))for (l in b[r.p.id]._savedData)b[r.p.id]._savedData.hasOwnProperty(l) && t[l] && (b[r.p.id]._savedData[l] = t[l]);
                                b[r.p.id].processing = !1;
                                try {
                                    a(":input:visible", x)[0].focus()
                                } catch (m) {
                                }
                            }
                        }, a.jgrid.ajaxOptions, b[r.p.id].ajaxEditOptions);
                        if (y.url || b[r.p.id].useDataProxy || (a.isFunction(r.p.dataProxy) ? b[r.p.id].useDataProxy = !0 : (n[0] = !1, n[1] += " " + F.nourl)), n[0])if (b[r.p.id].useDataProxy) {
                            var B = r.p.dataProxy.call(r, y, "set_" + r.p.id);
                            void 0 === B && (B = [!0, ""]), B[0] === !1 ? (n[0] = !1, n[1] = B[1] || "Error deleting the selected row!") : (y.data.oper === p.addoper && b[r.p.id].closeAfterAdd && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(w),
                                jqm: d.jqModal,
                                onClose: b[r.p.id].onClose,
                                removemodal: b[r.p.id].removemodal,
                                formprop: !b[r.p.id].recreateForm,
                                form: b[r.p.id].form
                            }), y.data.oper === p.editoper && b[r.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(w),
                                jqm: d.jqModal,
                                onClose: b[r.p.id].onClose,
                                removemodal: b[r.p.id].removemodal,
                                formprop: !b[r.p.id].recreateForm,
                                form: b[r.p.id].form
                            }))
                        } else"clientArray" === y.url ? (b[r.p.id].reloadAfterSubmit = !1, t = y.data, y.complete({
                            status: 200,
                            statusText: ""
                        }, "")) : a.ajax(y)
                    }
                    n[0] === !1 && (a(".FormError", x).html(n[1]), a(".FormError", x).show())
                }

                function l(a, b) {
                    var c, d = !1;
                    for (c in a)if (a.hasOwnProperty(c) && a[c] != b[c]) {
                        d = !0;
                        break
                    }
                    return d
                }

                function m() {
                    var c = !0;
                    return a(".FormError", x).hide(), b[r.p.id].checkOnUpdate && (t = {}, e(), u = l(t, b[r.p.id]._savedData), u && (a(x).data("disabled", !0), a(".confirm", "#" + A.themodal).show(), c = !1)), c
                }

                function n() {
                    var b;
                    if ("_empty" !== c && void 0 !== r.p.savedRow && r.p.savedRow.length > 0 && a.isFunction(a.fn.jqGrid.restoreRow))for (b = 0; b < r.p.savedRow.length; b++)if (r.p.savedRow[b].id === c) {
                        a(r).jqGrid("restoreRow", c);
                        break
                    }
                }

                function o(b, c) {
                    var d = c[1].length - 1;
                    0 === b ? a("#pData", s).addClass(h.disabled) : void 0 !== c[1][b - 1] && a("#" + a.jgrid.jqID(c[1][b - 1])).hasClass(h.disabled) ? a("#pData", s).addClass(h.disabled) : a("#pData", s).removeClass(h.disabled), b === d ? a("#nData", s).addClass(h.disabled) : void 0 !== c[1][b + 1] && a("#" + a.jgrid.jqID(c[1][b + 1])).hasClass(h.disabled) ? a("#nData", s).addClass(h.disabled) : a("#nData", s).removeClass(h.disabled)
                }

                function p() {
                    var b = a(r).jqGrid("getDataIDs"), c = a("#id_g", z).val(), d = a.inArray(c, b);
                    return [d, b]
                }

                function q(a) {
                    var b = "";
                    return "string" == typeof a && (b = a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function (a, b) {
                        return '<span id="' + b + '" ></span>'
                    })), b
                }

                var r = this;
                if (r.grid && c) {
                    var s, t, u, v, w = r.p.id, x = "FrmGrid_" + w, y = "TblGrid_" + w, z = "#" + a.jgrid.jqID(y), A = {
                        themodal: "editmod" + w,
                        modalhead: "edithd" + w,
                        modalcontent: "editcnt" + w,
                        scrollelm: x
                    }, B = !0, C = 1, D = 0, E = "string" == typeof b[r.p.id].template && b[r.p.id].template.length > 0, F = a.jgrid.getRegional(this, "errors");
                    b[r.p.id].styleUI = r.p.styleUI || "jQueryUI", a.jgrid.isMobile() && (b[r.p.id].resize = !1), "new" === c ? (c = "_empty", v = "add", d.caption = b[r.p.id].addCaption) : (d.caption = b[r.p.id].editCaption, v = "edit"), d.recreateForm || a(r).data("formProp") && a.extend(b[a(this)[0].p.id], a(r).data("formProp"));
                    var G = !0;
                    d.checkOnUpdate && d.jqModal && !d.modal && (G = !1);
                    var H, I = isNaN(b[a(this)[0].p.id].dataheight) ? b[a(this)[0].p.id].dataheight : b[a(this)[0].p.id].dataheight + "px", J = isNaN(b[a(this)[0].p.id].datawidth) ? b[a(this)[0].p.id].datawidth : b[a(this)[0].p.id].datawidth + "px", K = a("<form name='FormPost' id='" + x + "' class='FormGrid' onSubmit='return false;' style='width:" + J + ";height:" + I + ";'></form>").data("disabled", !1);
                    if (E ? (H = q(b[a(this)[0].p.id].template), s = z) : (H = a("<table id='" + y + "' class='EditTable ui-common-table'><tbody></tbody></table>"), s = z + "_2"), x = "#" + a.jgrid.jqID(x), a(K).append("<div class='FormError " + h.error + "' style='display:none;'></div>"), a(K).append("<div class='tinfo topinfo'>" + b[r.p.id].topinfo + "</div>"), a(r.p.colModel).each(function () {
                            var a = this.formoptions;
                            C = Math.max(C, a ? a.colpos || 0 : 0), D = Math.max(D, a ? a.rowpos || 0 : 0)
                        }), a(K).append(H), B = a(r).triggerHandler("jqGridAddEditBeforeInitData", [K, v]), void 0 === B && (B = !0), B && a.isFunction(b[r.p.id].beforeInitData) && (B = b[r.p.id].beforeInitData.call(r, K, v)), B !== !1) {
                        n(), f(c, r, H, C);
                        var L = "rtl" === r.p.direction ? !0 : !1, M = L ? "nData" : "pData", N = L ? "pData" : "nData", O = "<a id='" + M + "' class='fm-button " + h.button + "'><span class='" + h.icon_base + " " + g.icon_prev + "'></span></a>", P = "<a id='" + N + "' class='fm-button " + h.button + "'><span class='" + h.icon_base + " " + g.icon_next + "'></span></a>", Q = "<a id='sData' class='fm-button " + h.button + "'>" + d.bSubmit + "</a>", R = "<a id='cData' class='fm-button " + h.button + "'>" + d.bCancel + "</a>", S = "<table style='height:auto' class='EditTable ui-common-table' id='" + y + "_2'><tbody><tr><td colspan='2'><hr class='" + h.content + "' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>" + (L ? P + O : O + P) + "</td><td class='EditButton'>" + Q + R + "</td></tr>";
                        if (S += "</tbody></table>", D > 0) {
                            var T = [];
                            a.each(a(H)[0].rows, function (a, b) {
                                T[a] = b
                            }), T.sort(function (a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }), a.each(T, function (b, c) {
                                a("tbody", H).append(c)
                            })
                        }
                        d.gbox = "#gbox_" + a.jgrid.jqID(w);
                        var U = !1;
                        d.closeOnEscape === !0 && (d.closeOnEscape = !1, U = !0);
                        var V;
                        if (E ? (a(K).find("#pData").replaceWith(O), a(K).find("#nData").replaceWith(P), a(K).find("#sData").replaceWith(Q), a(K).find("#cData").replaceWith(R), V = a("<div id=" + y + "></div>").append(K)) : V = a("<div></div>").append(K).append(S), a(K).append("<div class='binfo topinfo bottominfo'>" + b[r.p.id].bottominfo + "</div>"), a.jgrid.createModal(A, V, b[a(this)[0].p.id], "#gview_" + a.jgrid.jqID(r.p.id), a("#gbox_" + a.jgrid.jqID(r.p.id))[0]), L && (a("#pData, #nData", z + "_2").css("float", "right"), a(".EditButton", z + "_2").css("text-align", "left")), b[r.p.id].topinfo && a(".tinfo", x).show(), b[r.p.id].bottominfo && a(".binfo", x).show(), V = null, S = null, a("#" + a.jgrid.jqID(A.themodal)).keydown(function (c) {
                                var e = c.target;
                                if (a(x).data("disabled") === !0)return !1;
                                if (b[r.p.id].savekey[0] === !0 && c.which === b[r.p.id].savekey[1] && "TEXTAREA" !== e.tagName)return a("#sData", z + "_2").trigger("click"), !1;
                                if (27 === c.which)return m() ? (U && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: d.gbox,
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }), !1) : !1;
                                if (b[r.p.id].navkeys[0] === !0) {
                                    if ("_empty" === a("#id_g", z).val())return !0;
                                    if (c.which === b[r.p.id].navkeys[1])return a("#pData", s).trigger("click"), !1;
                                    if (c.which === b[r.p.id].navkeys[2])return a("#nData", s).trigger("click"), !1
                                }
                            }), d.checkOnUpdate && (a("a.ui-jqdialog-titlebar-close span", "#" + a.jgrid.jqID(A.themodal)).removeClass("jqmClose"), a("a.ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(A.themodal)).unbind("click").click(function () {
                                return m() ? (a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: "#gbox_" + a.jgrid.jqID(w),
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }), !1) : !1
                            })), d.saveicon = a.extend([!0, "left", g.icon_save], d.saveicon), d.closeicon = a.extend([!0, "left", g.icon_close], d.closeicon), d.saveicon[0] === !0 && a("#sData", s).addClass("right" === d.saveicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + h.icon_base + " " + d.saveicon[2] + "'></span>"), d.closeicon[0] === !0 && a("#cData", s).addClass("right" === d.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + h.icon_base + " " + d.closeicon[2] + "'></span>"), b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) {
                            Q = "<a id='sNew' class='fm-button " + h.button + "' style='z-index:1002'>" + d.bYes + "</a>", P = "<a id='nNew' class='fm-button " + h.button + "' style='z-index:1002;margin-left:5px'>" + d.bNo + "</a>", R = "<a id='cNew' class='fm-button " + h.button + "' style='z-index:1002;margin-left:5px;'>" + d.bExit + "</a>";
                            var W = d.zIndex || 999;
                            W++, a("<div class='" + d.overlayClass + " jqgrid-overlay confirm' style='z-index:" + W + ";display:none;'>&#160;</div><div class='confirm ui-jqconfirm " + h.content + "' style='z-index:" + (W + 1) + "'>" + d.saveData + "<br/><br/>" + Q + P + R + "</div>").insertAfter(x), a("#sNew", "#" + a.jgrid.jqID(A.themodal)).click(function () {
                                return k(), a(x).data("disabled", !1), a(".confirm", "#" + a.jgrid.jqID(A.themodal)).hide(), !1
                            }), a("#nNew", "#" + a.jgrid.jqID(A.themodal)).click(function () {
                                return a(".confirm", "#" + a.jgrid.jqID(A.themodal)).hide(), a(x).data("disabled", !1), setTimeout(function () {
                                    a(":input:visible", x)[0].focus()
                                }, 0), !1
                            }), a("#cNew", "#" + a.jgrid.jqID(A.themodal)).click(function () {
                                return a(".confirm", "#" + a.jgrid.jqID(A.themodal)).hide(), a(x).data("disabled", !1), a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: "#gbox_" + a.jgrid.jqID(w),
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }), !1
                            })
                        }
                        a(r).triggerHandler("jqGridAddEditInitializeForm", [a(x), v]), a.isFunction(b[r.p.id].onInitializeForm) && b[r.p.id].onInitializeForm.call(r, a(x), v), "_empty" !== c && b[r.p.id].viewPagerButtons ? a("#pData,#nData", s).show() : a("#pData,#nData", s).hide(), a(r).triggerHandler("jqGridAddEditBeforeShowForm", [a(x), v]), a.isFunction(b[r.p.id].beforeShowForm) && b[r.p.id].beforeShowForm.call(r, a(x), v), a("#" + a.jgrid.jqID(A.themodal)).data("onClose", b[r.p.id].onClose), a.jgrid.viewModal("#" + a.jgrid.jqID(A.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(w),
                            jqm: d.jqModal,
                            overlay: d.overlay,
                            modal: d.modal,
                            overlayClass: d.overlayClass,
                            focusField: d.focusField,
                            onHide: function (b) {
                                var c = a("#editmod" + w)[0].style.height, d = a("#editmod" + w)[0].style.width;
                                c.indexOf("px") > -1 && (c = parseFloat(c)), d.indexOf("px") > -1 && (d = parseFloat(d)), a(r).data("formProp", {
                                    top: parseFloat(a(b.w).css("top")),
                                    left: parseFloat(a(b.w).css("left")),
                                    width: d,
                                    height: c,
                                    dataheight: a(x).height(),
                                    datawidth: a(x).width()
                                }), b.w.remove(), b.o && b.o.remove()
                            }
                        }), G || a("." + a.jgrid.jqID(d.overlayClass)).click(function () {
                            return m() ? (a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(w),
                                jqm: d.jqModal,
                                onClose: b[r.p.id].onClose,
                                removemodal: b[r.p.id].removemodal,
                                formprop: !b[r.p.id].recreateForm,
                                form: b[r.p.id].form
                            }), !1) : !1
                        }), a(".fm-button", "#" + a.jgrid.jqID(A.themodal)).hover(function () {
                            a(this).addClass(h.hover)
                        }, function () {
                            a(this).removeClass(h.hover)
                        }), a("#sData", s).click(function () {
                            return t = {}, a(".FormError", x).hide(), e(), "_empty" === t[r.p.id + "_id"] ? k() : d.checkOnSubmit === !0 ? (u = l(t, b[r.p.id]._savedData), u ? (a(x).data("disabled", !0), a(".confirm", "#" + a.jgrid.jqID(A.themodal)).show()) : k()) : k(), !1
                        }), a("#cData", s).click(function () {
                            return m() ? (a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(w),
                                jqm: d.jqModal,
                                onClose: b[r.p.id].onClose,
                                removemodal: b[r.p.id].removemodal,
                                formprop: !b[r.p.id].recreateForm,
                                form: b[r.p.id].form
                            }), !1) : !1
                        }), a("#nData", s).click(function () {
                            if (!m())return !1;
                            a(".FormError", x).hide();
                            var b = p();
                            if (b[0] = parseInt(b[0], 10), -1 !== b[0] && b[1][b[0] + 1]) {
                                a(r).triggerHandler("jqGridAddEditClickPgButtons", ["next", a(x), b[1][b[0]]]);
                                var c;
                                if (a.isFunction(d.onclickPgButtons) && (c = d.onclickPgButtons.call(r, "next", a(x), b[1][b[0]]), void 0 !== c && c === !1))return !1;
                                if (a("#" + a.jgrid.jqID(b[1][b[0] + 1])).hasClass(h.disabled))return !1;
                                i(b[1][b[0] + 1], r, x), a(r).jqGrid("setSelection", b[1][b[0] + 1]), a(r).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", a(x), b[1][b[0]]]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(r, "next", a(x), b[1][b[0] + 1]), o(b[0] + 1, b)
                            }
                            return !1
                        }), a("#pData", s).click(function () {
                            if (!m())return !1;
                            a(".FormError", x).hide();
                            var b = p();
                            if (-1 !== b[0] && b[1][b[0] - 1]) {
                                a(r).triggerHandler("jqGridAddEditClickPgButtons", ["prev", a(x), b[1][b[0]]]);
                                var c;
                                if (a.isFunction(d.onclickPgButtons) && (c = d.onclickPgButtons.call(r, "prev", a(x), b[1][b[0]]), void 0 !== c && c === !1))return !1;
                                if (a("#" + a.jgrid.jqID(b[1][b[0] - 1])).hasClass(h.disabled))return !1;
                                i(b[1][b[0] - 1], r, x), a(r).jqGrid("setSelection", b[1][b[0] - 1]), a(r).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", a(x), b[1][b[0]]]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(r, "prev", a(x), b[1][b[0] - 1]), o(b[0] - 1, b)
                            }
                            return !1
                        }), a(r).triggerHandler("jqGridAddEditAfterShowForm", [a(x), v]), a.isFunction(b[r.p.id].afterShowForm) && b[r.p.id].afterShowForm.call(r, a(x), v);
                        var X = p();
                        o(X[0], X)
                    }
                }
            })
        }, viewGridRow: function (c, d) {
            var e = a.jgrid.getRegional(this[0], "view"), f = this[0].p.styleUI, g = a.jgrid.styleUI[f].formedit, h = a.jgrid.styleUI[f].common;
            return d = a.extend(!0, {
                top: 0,
                left: 0,
                width: 500,
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                jqModal: !0,
                closeOnEscape: !1,
                labelswidth: "30%",
                closeicon: [],
                navkeys: [!1, 38, 40],
                onClose: null,
                beforeShowForm: null,
                beforeInitData: null,
                viewPagerButtons: !0,
                recreateForm: !1,
                removemodal: !0,
                form: "view"
            }, e, d || {}), b[a(this)[0].p.id] = d, this.each(function () {
                function e() {
                    (b[l.p.id].closeOnEscape === !0 || b[l.p.id].navkeys[0] === !0) && setTimeout(function () {
                        a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(r.modalhead)).attr("tabindex", "-1").focus()
                    }, 0)
                }

                function f(b, c, e, f) {
                    var g, i, j, k, l, m, n, o, p, q = 0, r = [], s = !1, t = "<td class='CaptionTD form-view-label " + h.content + "' width='" + d.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset " + h.content + "'>&#160;</td>", u = "", v = "<td class='CaptionTD form-view-label " + h.content + "'>&#160;</td><td class='DataTD form-view-data " + h.content + "'>&#160;</td>", w = ["integer", "number", "currency"], x = 0, y = 0;
                    for (m = 1; f >= m; m++)u += 1 === m ? t : v;
                    if (a(c.p.colModel).each(function () {
                            i = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, i || "right" !== this.align || (this.formatter && -1 !== a.inArray(this.formatter, w) ? x = Math.max(x, parseInt(this.width, 10)) : y = Math.max(y, parseInt(this.width, 10)))
                        }), n = 0 !== x ? x : 0 !== y ? y : 0, s = a(c).jqGrid("getInd", b), a(c.p.colModel).each(function (b) {
                            if (g = this.name, o = !1, i = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, l = i ? "style='display:none'" : "", p = "boolean" != typeof this.viewable ? !0 : this.viewable, "cb" !== g && "subgrid" !== g && "rn" !== g && p) {
                                k = s === !1 ? "" : g === c.p.ExpandColumn && c.p.treeGrid === !0 ? a("td:eq(" + b + ")", c.rows[s]).text() : a("td:eq(" + b + ")", c.rows[s]).html(), o = "right" === this.align && 0 !== n ? !0 : !1;
                                var d = a.extend({}, {
                                    rowabove: !1,
                                    rowcontent: ""
                                }, this.formoptions || {}), h = parseInt(d.rowpos, 10) || q + 1, m = parseInt(2 * (parseInt(d.colpos, 10) || 1), 10);
                                if (d.rowabove) {
                                    var t = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + d.rowcontent + "</td></tr>");
                                    a(e).append(t), t[0].rp = h
                                }
                                j = a(e).find("tr[rowpos=" + h + "]"), 0 === j.length && (j = a("<tr " + l + " rowpos='" + h + "'></tr>").addClass("FormData").attr("id", "trv_" + g), a(j).append(u), a(e).append(j), j[0].rp = h), a("td:eq(" + (m - 2) + ")", j[0]).html("<b>" + (void 0 === d.label ? c.p.colNames[b] : d.label) + "</b>"), a("td:eq(" + (m - 1) + ")", j[0]).append("<span>" + k + "</span>").attr("id", "v_" + g), o && a("td:eq(" + (m - 1) + ") span", j[0]).css({
                                    "text-align": "right",
                                    width: n + "px"
                                }), r[q] = b, q++
                            }
                        }), q > 0) {
                        var z = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + b + "'/></td></tr>");
                        z[0].rp = q + 99, a(e).append(z)
                    }
                    return r
                }

                function i(b, c) {
                    var d, e, f, g, h = 0;
                    g = a(c).jqGrid("getInd", b, !0), g && (a("td", g).each(function (b) {
                        d = c.p.colModel[b].name, e = c.p.colModel[b].editrules && c.p.colModel[b].editrules.edithidden === !0 ? !1 : c.p.colModel[b].hidden === !0 ? !0 : !1, "cb" !== d && "subgrid" !== d && "rn" !== d && (f = d === c.p.ExpandColumn && c.p.treeGrid === !0 ? a(this).text() : a(this).html(), d = a.jgrid.jqID("v_" + d), a("#" + d + " span", "#" + o).html(f), e && a("#" + d, "#" + o).parents("tr:first").hide(), h++)
                    }), h > 0 && a("#id_g", "#" + o).val(b))
                }

                function j(b, c) {
                    var d = c[1].length - 1;
                    0 === b ? a("#pData", "#" + o + "_2").addClass(h.disabled) : void 0 !== c[1][b - 1] && a("#" + a.jgrid.jqID(c[1][b - 1])).hasClass(h.disabled) ? a("#pData", o + "_2").addClass(h.disabled) : a("#pData", "#" + o + "_2").removeClass(h.disabled), b === d ? a("#nData", "#" + o + "_2").addClass(h.disabled) : void 0 !== c[1][b + 1] && a("#" + a.jgrid.jqID(c[1][b + 1])).hasClass(h.disabled) ? a("#nData", o + "_2").addClass(h.disabled) : a("#nData", "#" + o + "_2").removeClass(h.disabled)
                }

                function k() {
                    var b = a(l).jqGrid("getDataIDs"), c = a("#id_g", "#" + o).val(), d = a.inArray(c, b);
                    return [d, b]
                }

                var l = this;
                if (l.grid && c) {
                    var m = l.p.id, n = "ViewGrid_" + a.jgrid.jqID(m), o = "ViewTbl_" + a.jgrid.jqID(m), p = "ViewGrid_" + m, q = "ViewTbl_" + m, r = {
                        themodal: "viewmod" + m,
                        modalhead: "viewhd" + m,
                        modalcontent: "viewcnt" + m,
                        scrollelm: n
                    }, s = a.isFunction(b[l.p.id].beforeInitData) ? b[l.p.id].beforeInitData : !1, t = !0, u = 1, v = 0;
                    b[l.p.id].styleUI = l.p.styleUI || "jQueryUI", d.recreateForm || a(l).data("viewProp") && a.extend(b[a(this)[0].p.id], a(l).data("viewProp"));
                    var w = isNaN(b[a(this)[0].p.id].dataheight) ? b[a(this)[0].p.id].dataheight : b[a(this)[0].p.id].dataheight + "px", x = isNaN(b[a(this)[0].p.id].datawidth) ? b[a(this)[0].p.id].datawidth : b[a(this)[0].p.id].datawidth + "px", y = a("<form name='FormPost' id='" + p + "' class='FormGrid' style='width:" + x + ";height:" + w + ";'></form>"), z = a("<table id='" + q + "' class='EditTable ViewTable'><tbody></tbody></table>");
                    if (a(l.p.colModel).each(function () {
                            var a = this.formoptions;
                            u = Math.max(u, a ? a.colpos || 0 : 0), v = Math.max(v, a ? a.rowpos || 0 : 0)
                        }), a(y).append(z), s && (t = s.call(l, y), void 0 === t && (t = !0)), t !== !1) {
                        f(c, l, z, u);
                        var A = "rtl" === l.p.direction ? !0 : !1, B = A ? "nData" : "pData", C = A ? "pData" : "nData", D = "<a id='" + B + "' class='fm-button " + h.button + "'><span class='" + h.icon_base + " " + g.icon_prev + "'></span></a>", E = "<a id='" + C + "' class='fm-button " + h.button + "'><span class='" + h.icon_base + " " + g.icon_next + "'></span></a>", F = "<a id='cData' class='fm-button " + h.button + "'>" + d.bClose + "</a>";
                        if (v > 0) {
                            var G = [];
                            a.each(a(z)[0].rows, function (a, b) {
                                G[a] = b
                            }), G.sort(function (a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }), a.each(G, function (b, c) {
                                a("tbody", z).append(c)
                            })
                        }
                        d.gbox = "#gbox_" + a.jgrid.jqID(m);
                        var H = a("<div></div>").append(y).append("<table border='0' class='EditTable' id='" + o + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + d.labelswidth + "'>" + (A ? E + D : D + E) + "</td><td class='EditButton'>" + F + "</td></tr></tbody></table>");
                        a.jgrid.createModal(r, H, b[a(this)[0].p.id], "#gview_" + a.jgrid.jqID(l.p.id), a("#gview_" + a.jgrid.jqID(l.p.id))[0]), A && (a("#pData, #nData", "#" + o + "_2").css("float", "right"), a(".EditButton", "#" + o + "_2").css("text-align", "left")), d.viewPagerButtons || a("#pData, #nData", "#" + o + "_2").hide(), H = null, a("#" + r.themodal).keydown(function (c) {
                            if (27 === c.which)return b[l.p.id].closeOnEscape && a.jgrid.hideModal("#" + a.jgrid.jqID(r.themodal), {
                                gb: d.gbox,
                                jqm: d.jqModal,
                                onClose: d.onClose,
                                removemodal: b[l.p.id].removemodal,
                                formprop: !b[l.p.id].recreateForm,
                                form: b[l.p.id].form
                            }), !1;
                            if (d.navkeys[0] === !0) {
                                if (c.which === d.navkeys[1])return a("#pData", "#" + o + "_2").trigger("click"), !1;
                                if (c.which === d.navkeys[2])return a("#nData", "#" + o + "_2").trigger("click"), !1
                            }
                        }), d.closeicon = a.extend([!0, "left", g.icon_close], d.closeicon), d.closeicon[0] === !0 && a("#cData", "#" + o + "_2").addClass("right" === d.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + h.icon_base + " " + d.closeicon[2] + "'></span>"), a.isFunction(d.beforeShowForm) && d.beforeShowForm.call(l, a("#" + n)), a.jgrid.viewModal("#" + a.jgrid.jqID(r.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(m),
                            jqm: d.jqModal,
                            overlay: d.overlay,
                            modal: d.modal,
                            onHide: function (b) {
                                a(l).data("viewProp", {
                                    top: parseFloat(a(b.w).css("top")),
                                    left: parseFloat(a(b.w).css("left")),
                                    width: a(b.w).width(),
                                    height: a(b.w).height(),
                                    dataheight: a("#" + n).height(),
                                    datawidth: a("#" + n).width()
                                }), b.w.remove(), b.o && b.o.remove()
                            }
                        }), a(".fm-button:not(." + h.disabled + ")", "#" + o + "_2").hover(function () {
                            a(this).addClass(h.hover)
                        }, function () {
                            a(this).removeClass(h.hover)
                        }), e(), a("#cData", "#" + o + "_2").click(function () {
                            return a.jgrid.hideModal("#" + a.jgrid.jqID(r.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(m),
                                jqm: d.jqModal,
                                onClose: d.onClose,
                                removemodal: b[l.p.id].removemodal,
                                formprop: !b[l.p.id].recreateForm,
                                form: b[l.p.id].form
                            }), !1
                        }), a("#nData", "#" + o + "_2").click(function () {
                            a("#FormError", "#" + o).hide();
                            var b = k();
                            return b[0] = parseInt(b[0], 10), -1 !== b[0] && b[1][b[0] + 1] && (a.isFunction(d.onclickPgButtons) && d.onclickPgButtons.call(l, "next", a("#" + n), b[1][b[0]]), i(b[1][b[0] + 1], l), a(l).jqGrid("setSelection", b[1][b[0] + 1]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(l, "next", a("#" + n), b[1][b[0] + 1]), j(b[0] + 1, b)), e(), !1
                        }), a("#pData", "#" + o + "_2").click(function () {
                            a("#FormError", "#" + o).hide();
                            var b = k();
                            return -1 !== b[0] && b[1][b[0] - 1] && (a.isFunction(d.onclickPgButtons) && d.onclickPgButtons.call(l, "prev", a("#" + n), b[1][b[0]]), i(b[1][b[0] - 1], l), a(l).jqGrid("setSelection", b[1][b[0] - 1]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(l, "prev", a("#" + n), b[1][b[0] - 1]), j(b[0] - 1, b)), e(), !1
                        });
                        var I = k();
                        j(I[0], I)
                    }
                }
            })
        }, delGridRow: function (c, d) {
            var e = a.jgrid.getRegional(this[0], "del"), f = this[0].p.styleUI, g = a.jgrid.styleUI[f].formedit, h = a.jgrid.styleUI[f].common;
            return d = a.extend(!0, {
                top: 0,
                left: 0,
                width: 240,
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: "",
                mtype: "POST",
                reloadAfterSubmit: !0,
                beforeShowForm: null,
                beforeInitData: null,
                afterShowForm: null,
                beforeSubmit: null,
                onclickSubmit: null,
                afterSubmit: null,
                jqModal: !0,
                closeOnEscape: !1,
                delData: {},
                delicon: [],
                cancelicon: [],
                onClose: null,
                ajaxDelOptions: {},
                processing: !1,
                serializeDelData: null,
                useDataProxy: !1
            }, e, d || {}), b[a(this)[0].p.id] = d, this.each(function () {
                var e = this;
                if (e.grid && c) {
                    var f, i, j, k, l = a.isFunction(b[e.p.id].beforeShowForm), m = a.isFunction(b[e.p.id].afterShowForm), n = a.isFunction(b[e.p.id].beforeInitData) ? b[e.p.id].beforeInitData : !1, o = e.p.id, p = {}, q = !0, r = "DelTbl_" + a.jgrid.jqID(o), s = "DelTbl_" + o, t = {
                        themodal: "delmod" + o,
                        modalhead: "delhd" + o,
                        modalcontent: "delcnt" + o,
                        scrollelm: r
                    };
                    if (b[e.p.id].styleUI = e.p.styleUI || "jQueryUI", a.isArray(c) && (c = c.join()), void 0 !== a("#" + a.jgrid.jqID(t.themodal))[0]) {
                        if (n && (q = n.call(e, a("#" + r)), void 0 === q && (q = !0)), q === !1)return;
                        a("#DelData>td", "#" + r).text(c), a("#DelError", "#" + r).hide(), b[e.p.id].processing === !0 && (b[e.p.id].processing = !1, a("#dData", "#" + r).removeClass(h.active)), l && b[e.p.id].beforeShowForm.call(e, a("#" + r)), a.jgrid.viewModal("#" + a.jgrid.jqID(t.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(o),
                            jqm: b[e.p.id].jqModal,
                            jqM: !1,
                            overlay: b[e.p.id].overlay,
                            modal: b[e.p.id].modal
                        }), m && b[e.p.id].afterShowForm.call(e, a("#" + r))
                    } else {
                        var u = isNaN(b[e.p.id].dataheight) ? b[e.p.id].dataheight : b[e.p.id].dataheight + "px", v = isNaN(d.datawidth) ? d.datawidth : d.datawidth + "px", w = "<div id='" + s + "' class='formdata' style='width:" + v + ";overflow:auto;position:relative;height:" + u + ";'>";
                        w += "<table class='DelTable'><tbody>", w += "<tr id='DelError' style='display:none'><td class='" + h.error + "'></td></tr>", w += "<tr id='DelData' style='display:none'><td >" + c + "</td></tr>", w += '<tr><td class="delmsg" style="white-space:pre;">' + b[e.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>", w += "</tbody></table></div>";
                        var x = "<a id='dData' class='fm-button " + h.button + "'>" + d.bSubmit + "</a>", y = "<a id='eData' class='fm-button " + h.button + "'>" + d.bCancel + "</a>";
                        if (w += "<table class='EditTable ui-common-table' id='" + r + "_2'><tbody><tr><td><hr class='" + h.content + "' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>" + x + "&#160;" + y + "</td></tr></tbody></table>", d.gbox = "#gbox_" + a.jgrid.jqID(o), a.jgrid.createModal(t, w, b[e.p.id], "#gview_" + a.jgrid.jqID(e.p.id), a("#gview_" + a.jgrid.jqID(e.p.id))[0]), n && (q = n.call(e, a(w)), void 0 === q && (q = !0)), q === !1)return;
                        a(".fm-button", "#" + r + "_2").hover(function () {
                            a(this).addClass(h.hover)
                        }, function () {
                            a(this).removeClass(h.hover)
                        }), d.delicon = a.extend([!0, "left", g.icon_del], b[e.p.id].delicon), d.cancelicon = a.extend([!0, "left", g.icon_cancel], b[e.p.id].cancelicon), d.delicon[0] === !0 && a("#dData", "#" + r + "_2").addClass("right" === d.delicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + h.icon_base + " " + d.delicon[2] + "'></span>"), d.cancelicon[0] === !0 && a("#eData", "#" + r + "_2").addClass("right" === d.cancelicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + h.icon_base + " " + d.cancelicon[2] + "'></span>"), a("#dData", "#" + r + "_2").click(function () {
                            var c, g = [!0, ""], l = a("#DelData>td", "#" + r).text();
                            if (p = {}, a.isFunction(b[e.p.id].onclickSubmit) && (p = b[e.p.id].onclickSubmit.call(e, b[e.p.id], l) || {}), a.isFunction(b[e.p.id].beforeSubmit) && (g = b[e.p.id].beforeSubmit.call(e, l)), g[0] && !b[e.p.id].processing) {
                                if (b[e.p.id].processing = !0, j = e.p.prmNames, f = a.extend({}, b[e.p.id].delData, p), k = j.oper, f[k] = j.deloper, i = j.id, l = String(l).split(","), !l.length)return !1;
                                for (c in l)l.hasOwnProperty(c) && (l[c] = a.jgrid.stripPref(e.p.idPrefix, l[c]));
                                f[i] = l.join(), a(this).addClass(h.active);
                                var m = a.extend({
                                    url: b[e.p.id].url || a(e).jqGrid("getGridParam", "editurl"),
                                    type: b[e.p.id].mtype,
                                    data: a.isFunction(b[e.p.id].serializeDelData) ? b[e.p.id].serializeDelData.call(e, f) : f,
                                    complete: function (c, i) {
                                        var j;
                                        if (a("#dData", "#" + r + "_2").removeClass(h.active), c.status >= 300 && 304 !== c.status ? (g[0] = !1, g[1] = a.isFunction(b[e.p.id].errorTextFormat) ? b[e.p.id].errorTextFormat.call(e, c) : i + " Status: '" + c.statusText + "'. Error code: " + c.status) : a.isFunction(b[e.p.id].afterSubmit) && (g = b[e.p.id].afterSubmit.call(e, c, f)), g[0] === !1)a("#DelError>td", "#" + r).html(g[1]), a("#DelError", "#" + r).show(); else {
                                            if (b[e.p.id].reloadAfterSubmit && "local" !== e.p.datatype)a(e).trigger("reloadGrid"); else {
                                                if (e.p.treeGrid === !0)try {
                                                    a(e).jqGrid("delTreeNode", e.p.idPrefix + l[0])
                                                } catch (k) {
                                                } else for (j = 0; j < l.length; j++)a(e).jqGrid("delRowData", e.p.idPrefix + l[j]);
                                                e.p.selrow = null, e.p.selarrrow = []
                                            }
                                            a.isFunction(b[e.p.id].afterComplete) && setTimeout(function () {
                                                b[e.p.id].afterComplete.call(e, c, l)
                                            }, 500)
                                        }
                                        b[e.p.id].processing = !1, g[0] && a.jgrid.hideModal("#" + a.jgrid.jqID(t.themodal), {
                                            gb: "#gbox_" + a.jgrid.jqID(o),
                                            jqm: d.jqModal,
                                            onClose: b[e.p.id].onClose
                                        })
                                    }
                                }, a.jgrid.ajaxOptions, b[e.p.id].ajaxDelOptions);
                                if (m.url || b[e.p.id].useDataProxy || (a.isFunction(e.p.dataProxy) ? b[e.p.id].useDataProxy = !0 : (g[0] = !1, g[1] += " " + a.jgrid.getRegional(e, "errors.nourl"))), g[0])if (b[e.p.id].useDataProxy) {
                                    var n = e.p.dataProxy.call(e, m, "del_" + e.p.id);
                                    void 0 === n && (n = [!0, ""]), n[0] === !1 ? (g[0] = !1, g[1] = n[1] || "Error deleting the selected row!") : a.jgrid.hideModal("#" + a.jgrid.jqID(t.themodal), {
                                        gb: "#gbox_" + a.jgrid.jqID(o),
                                        jqm: d.jqModal,
                                        onClose: b[e.p.id].onClose
                                    })
                                } else"clientArray" === m.url ? (f = m.data, m.complete({
                                    status: 200,
                                    statusText: ""
                                }, "")) : a.ajax(m)
                            }
                            return g[0] === !1 && (a("#DelError>td", "#" + r).html(g[1]), a("#DelError", "#" + r).show()), !1
                        }), a("#eData", "#" + r + "_2").click(function () {
                            return a.jgrid.hideModal("#" + a.jgrid.jqID(t.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(o),
                                jqm: b[e.p.id].jqModal,
                                onClose: b[e.p.id].onClose
                            }), !1
                        }), l && b[e.p.id].beforeShowForm.call(e, a("#" + r)), a.jgrid.viewModal("#" + a.jgrid.jqID(t.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(o),
                            jqm: b[e.p.id].jqModal,
                            overlay: b[e.p.id].overlay,
                            modal: b[e.p.id].modal
                        }), m && b[e.p.id].afterShowForm.call(e, a("#" + r))
                    }
                    b[e.p.id].closeOnEscape === !0 && setTimeout(function () {
                        a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(t.modalhead)).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        }, navGrid: function (b, c, d, e, f, g, h) {
            var i = a.jgrid.getRegional(this[0], "nav"), j = this[0].p.styleUI, k = a.jgrid.styleUI[j].navigator, l = a.jgrid.styleUI[j].common;
            return c = a.extend({
                edit: !0,
                editicon: k.icon_edit_nav,
                add: !0,
                addicon: k.icon_add_nav,
                del: !0,
                delicon: k.icon_del_nav,
                search: !0,
                searchicon: k.icon_search_nav,
                refresh: !0,
                refreshicon: k.icon_refresh_nav,
                refreshstate: "firstpage",
                view: !1,
                viewicon: k.icon_view_nav,
                position: "left",
                closeOnEscape: !0,
                beforeRefresh: null,
                afterRefresh: null,
                cloneToTop: !1,
                alertwidth: 200,
                alertheight: "auto",
                alerttop: null,
                alertleft: null,
                alertzIndex: null,
                dropmenu: !1,
                navButtonText: ""
            }, i, c || {}), this.each(function () {
                if (!this.p.navGrid) {
                    var k, m, n, o = {
                        themodal: "alertmod_" + this.p.id,
                        modalhead: "alerthd_" + this.p.id,
                        modalcontent: "alertcnt_" + this.p.id
                    }, p = this;
                    if (p.grid && "string" == typeof b) {
                        a(p).data("navGrid") || a(p).data("navGrid", c), n = a(p).data("navGrid"), p.p.force_regional && (n = a.extend(n, i)), void 0 === a("#" + o.themodal)[0] && (n.alerttop || n.alertleft || (void 0 !== window.innerWidth ? (n.alertleft = window.innerWidth, n.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (n.alertleft = document.documentElement.clientWidth, n.alerttop = document.documentElement.clientHeight) : (n.alertleft = 1024, n.alerttop = 768), n.alertleft = n.alertleft / 2 - parseInt(n.alertwidth, 10) / 2, n.alerttop = n.alerttop / 2 - 25), a.jgrid.createModal(o, "<div>" + n.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>", {
                            gbox: "#gbox_" + a.jgrid.jqID(p.p.id),
                            jqModal: !0,
                            drag: !0,
                            resize: !0,
                            caption: n.alertcap,
                            top: n.alerttop,
                            left: n.alertleft,
                            width: n.alertwidth,
                            height: n.alertheight,
                            closeOnEscape: n.closeOnEscape,
                            zIndex: n.alertzIndex,
                            styleUI: p.p.styleUI
                        }, "#gview_" + a.jgrid.jqID(p.p.id), a("#gbox_" + a.jgrid.jqID(p.p.id))[0], !0));
                        var q, r = 1, s = function () {
                            a(this).hasClass(l.disabled) || a(this).addClass(l.hover)
                        }, t = function () {
                            a(this).removeClass(l.hover)
                        };
                        for (n.cloneToTop && p.p.toppager && (r = 2), q = 0; r > q; q++) {
                            var u, v, w, x = a("<table class='ui-pg-table navtable ui-common-table'><tbody><tr></tr></tbody></table>"), y = "<td class='ui-pg-button " + l.disabled + "' style='width:4px;'><span class='ui-separator'></span></td>";
                            0 === q ? (v = b, w = p.p.id, v === p.p.toppager && (w += "_top", r = 1)) : (v = p.p.toppager, w = p.p.id + "_top"), "rtl" === p.p.direction && a(x).attr("dir", "rtl").css("float", "right"), e = e || {}, n.add && (u = a("<td class='ui-pg-button " + l.cornerall + "'></td>"), a(u).append("<div class='ui-pg-div'><span class='" + l.icon_base + " " + n.addicon + "'></span>" + n.addtext + "</div>"), a("tr", x).append(u), a(u, x).attr({
                                title: n.addtitle || "",
                                id: e.id || "add_" + w
                            }).click(function () {
                                return a(this).hasClass(l.disabled) || (a.isFunction(n.addfunc) ? n.addfunc.call(p) : a(p).jqGrid("editGridRow", "new", e)), !1
                            }).hover(s, t), u = null), d = d || {}, n.edit && (u = a("<td class='ui-pg-button " + l.cornerall + "'></td>"), a(u).append("<div class='ui-pg-div'><span class='" + l.icon_base + " " + n.editicon + "'></span>" + n.edittext + "</div>"), a("tr", x).append(u), a(u, x).attr({
                                title: n.edittitle || "",
                                id: d.id || "edit_" + w
                            }).click(function () {
                                if (!a(this).hasClass(l.disabled)) {
                                    var b = p.p.selrow;
                                    b ? a.isFunction(n.editfunc) ? n.editfunc.call(p, b) : a(p).jqGrid("editGridRow", b, d) : (a.jgrid.viewModal("#" + o.themodal, {
                                        gbox: "#gbox_" + a.jgrid.jqID(p.p.id),
                                        jqm: !0
                                    }), a("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(s, t), u = null), h = h || {}, n.view && (u = a("<td class='ui-pg-button " + l.cornerall + "'></td>"), a(u).append("<div class='ui-pg-div'><span class='" + l.icon_base + " " + n.viewicon + "'></span>" + n.viewtext + "</div>"), a("tr", x).append(u), a(u, x).attr({
                                title: n.viewtitle || "",
                                id: h.id || "view_" + w
                            }).click(function () {
                                if (!a(this).hasClass(l.disabled)) {
                                    var b = p.p.selrow;
                                    b ? a.isFunction(n.viewfunc) ? n.viewfunc.call(p, b) : a(p).jqGrid("viewGridRow", b, h) : (a.jgrid.viewModal("#" + o.themodal, {
                                        gbox: "#gbox_" + a.jgrid.jqID(p.p.id),
                                        jqm: !0
                                    }), a("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(s, t), u = null), f = f || {}, n.del && (u = a("<td class='ui-pg-button " + l.cornerall + "'></td>"), a(u).append("<div class='ui-pg-div'><span class='" + l.icon_base + " " + n.delicon + "'></span>" + n.deltext + "</div>"), a("tr", x).append(u), a(u, x).attr({
                                title: n.deltitle || "",
                                id: f.id || "del_" + w
                            }).click(function () {
                                if (!a(this).hasClass(l.disabled)) {
                                    var b;
                                    p.p.multiselect ? (b = p.p.selarrrow, 0 === b.length && (b = null)) : b = p.p.selrow, b ? a.isFunction(n.delfunc) ? n.delfunc.call(p, b) : a(p).jqGrid("delGridRow", b, f) : (a.jgrid.viewModal("#" + o.themodal, {
                                        gbox: "#gbox_" + a.jgrid.jqID(p.p.id),
                                        jqm: !0
                                    }), a("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(s, t), u = null), (n.add || n.edit || n.del || n.view) && a("tr", x).append(y), g = g || {}, n.search && (u = a("<td class='ui-pg-button " + l.cornerall + "'></td>"), a(u).append("<div class='ui-pg-div'><span class='" + l.icon_base + " " + n.searchicon + "'></span>" + n.searchtext + "</div>"), a("tr", x).append(u), a(u, x).attr({
                                title: n.searchtitle || "",
                                id: g.id || "search_" + w
                            }).click(function () {
                                return a(this).hasClass(l.disabled) || (a.isFunction(n.searchfunc) ? n.searchfunc.call(p, g) : a(p).jqGrid("searchGrid", g)), !1
                            }).hover(s, t), g.showOnLoad && g.showOnLoad === !0 && a(u, x).click(), u = null), n.refresh && (u = a("<td class='ui-pg-button " + l.cornerall + "'></td>"), a(u).append("<div class='ui-pg-div'><span class='" + l.icon_base + " " + n.refreshicon + "'></span>" + n.refreshtext + "</div>"), a("tr", x).append(u), a(u, x).attr({
                                title: n.refreshtitle || "",
                                id: "refresh_" + w
                            }).click(function () {
                                if (!a(this).hasClass(l.disabled)) {
                                    a.isFunction(n.beforeRefresh) && n.beforeRefresh.call(p), p.p.search = !1, p.p.resetsearch = !0;
                                    try {
                                        if ("currentfilter" !== n.refreshstate) {
                                            var b = p.p.id;
                                            p.p.postData.filters = "";
                                            try {
                                                a("#fbox_" + a.jgrid.jqID(b)).jqFilter("resetFilter")
                                            } catch (c) {
                                            }
                                            a.isFunction(p.clearToolbar) && p.clearToolbar.call(p, !1)
                                        }
                                    } catch (d) {
                                    }
                                    switch (n.refreshstate) {
                                        case"firstpage":
                                            a(p).trigger("reloadGrid", [{page: 1}]);
                                            break;
                                        case"current":
                                        case"currentfilter":
                                            a(p).trigger("reloadGrid", [{current: !0}])
                                    }
                                    a.isFunction(n.afterRefresh) && n.afterRefresh.call(p)
                                }
                                return !1
                            }).hover(s, t), u = null), m = a(".ui-jqgrid").css("font-size") || "11px", a("body").append("<div id='testpg2' class='ui-jqgrid " + a.jgrid.styleUI[j].base.entrieBox + "' style='font-size:" + m + ";visibility:hidden;' ></div>"), k = a(x).clone().appendTo("#testpg2").width(), a("#testpg2").remove(), p.p._nvtd && (n.dropmenu ? (x = null, a(p).jqGrid("_buildNavMenu", v, w, c, d, e, f, g, h)) : k > p.p._nvtd[0] ? (p.p.responsive ? (x = null, a(p).jqGrid("_buildNavMenu", v, w, c, d, e, f, g, h)) : a(v + "_" + n.position, v).append(x).width(k), p.p._nvtd[0] = k) : a(v + "_" + n.position, v).append(x), p.p._nvtd[1] = k), p.p.navGrid = !0
                        }
                        p.p.storeNavOptions && (p.p.navOptions = n, p.p.editOptions = d, p.p.addOptions = e, p.p.delOptions = f, p.p.searchOptions = g, p.p.viewOptions = h, p.p.navButtons = [])
                    }
                }
            })
        }, navButtonAdd: function (b, c) {
            var d = this[0].p.styleUI, e = a.jgrid.styleUI[d].navigator;
            return c = a.extend({
                caption: "newButton",
                title: "",
                buttonicon: e.icon_newbutton_nav,
                onClickButton: null,
                position: "last",
                cursor: "pointer",
                internal: !1
            }, c || {}), this.each(function () {
                if (this.grid) {
                    "string" == typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var e = a(".navtable", b)[0], f = this, g = a.jgrid.styleUI[d].common.disabled, h = a.jgrid.styleUI[d].common.hover, i = a.jgrid.styleUI[d].common.cornerall, j = a.jgrid.styleUI[d].common.icon_base;
                    if (f.p.storeNavOptions && !c.internal && f.p.navButtons.push([b, c]), e) {
                        if (c.id && void 0 !== a("#" + a.jgrid.jqID(c.id), e)[0])return;
                        var k = a("<td></td>");
                        a(k).addClass("ui-pg-button " + i).append("NONE" === c.buttonicon.toString().toUpperCase() ? "<div class='ui-pg-div'>" + c.caption + "</div>" : "<div class='ui-pg-div'><span class='" + j + " " + c.buttonicon + "'></span>" + c.caption + "</div>"), c.id && a(k).attr("id", c.id), "first" === c.position ? 0 === e.rows[0].cells.length ? a("tr", e).append(k) : a("tr td:eq(0)", e).before(k) : a("tr", e).append(k), a(k, e).attr("title", c.title || "").click(function (b) {
                            return a(this).hasClass(g) || a.isFunction(c.onClickButton) && c.onClickButton.call(f, b), !1
                        }).hover(function () {
                            a(this).hasClass(g) || a(this).addClass(h)
                        }, function () {
                            a(this).removeClass(h)
                        })
                    } else if (e = a(".dropdownmenu", b)[0]) {
                        var l = a(e).val(), m = c.id || a.jgrid.randId(), n = a('<li class="ui-menu-item" role="presentation"><a class="' + i + ' g-menu-item" tabindex="0" role="menuitem" id="' + m + '">' + (c.caption || c.title) + "</a></li>");
                        l && ("first" === c.position ? a("#" + l).prepend(n) : a("#" + l).append(n), a(n).on("click", function (b) {
                            return a(this).hasClass(g) || (a("#" + l).hide(), a.isFunction(c.onClickButton) && c.onClickButton.call(f, b)), !1
                        }).find("a").hover(function () {
                            a(this).hasClass(g) || a(this).addClass(h)
                        }, function () {
                            a(this).removeClass(h)
                        }))
                    }
                }
            })
        }, navSeparatorAdd: function (b, c) {
            var d = this[0].p.styleUI, e = a.jgrid.styleUI[d].common;
            return c = a.extend({
                sepclass: "ui-separator",
                sepcontent: "",
                position: "last"
            }, c || {}), this.each(function () {
                if (this.grid) {
                    "string" == typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var d, f, g = a(".navtable", b)[0];
                    this.p.storeNavOptions && this.p.navButtons.push([b, c]), g ? (d = "<td class='ui-pg-button " + e.disabled + "' style='width:4px;'><span class='" + c.sepclass + "'></span>" + c.sepcontent + "</td>", "first" === c.position ? 0 === g.rows[0].cells.length ? a("tr", g).append(d) : a("tr td:eq(0)", g).before(d) : a("tr", g).append(d)) : (g = a(".dropdownmenu", b)[0], d = "<li class='ui-menu-item " + e.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>", g && (f = a(g).val(), f && ("first" === c.position ? a("#" + f).prepend(d) : a("#" + f).append(d))))
                }
            })
        }, _buildNavMenu: function (b, c, d, e, f, g, h, i) {
            return this.each(function () {
                var j = this, k = a.jgrid.getRegional(j, "nav"), l = j.p.styleUI, m = (a.jgrid.styleUI[l].navigator, a.jgrid.styleUI[l].filter), n = a.jgrid.styleUI[l].common, o = "form_menu_" + a.jgrid.randId(), p = d.navButtonText ? d.navButtonText : k.selectcaption || "Actions", q = "<button class='dropdownmenu " + n.button + "' value='" + o + "'>" + p + "</button>";
                a(b + "_" + d.position, b).append(q);
                var r = {
                    themodal: "alertmod_" + this.p.id,
                    modalhead: "alerthd_" + this.p.id,
                    modalcontent: "alertcnt_" + this.p.id
                }, s = function () {
                    var b, k, l = a(".ui-jqgrid-view").css("font-size") || "11px", p = a('<ul id="' + o + '" class="ui-nav-menu modal-content" role="menu" tabindex="0" style="display:none;font-size:' + l + '"></ul>');
                    d.add && (f = f || {}, b = f.id || "add_" + c, k = a('<li class="ui-menu-item" role="presentation"><a class="' + n.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + b + '">' + (d.addtext || d.addtitle) + "</a></li>").click(function () {
                        return a(this).hasClass(n.disabled) || (a.isFunction(d.addfunc) ? d.addfunc.call(j) : a(j).jqGrid("editGridRow", "new", f), a(p).hide()), !1
                    }), a(p).append(k)), d.edit && (e = e || {}, b = e.id || "edit_" + c, k = a('<li class="ui-menu-item" role="presentation"><a class="' + n.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + b + '">' + (d.edittext || d.edittitle) + "</a></li>").click(function () {
                        if (!a(this).hasClass(n.disabled)) {
                            var b = j.p.selrow;
                            b ? a.isFunction(d.editfunc) ? d.editfunc.call(j, b) : a(j).jqGrid("editGridRow", b, e) : (a.jgrid.viewModal("#" + r.themodal, {
                                gbox: "#gbox_" + a.jgrid.jqID(j.p.id),
                                jqm: !0
                            }), a("#jqg_alrt").focus()), a(p).hide()
                        }
                        return !1
                    }), a(p).append(k)), d.view && (i = i || {}, b = i.id || "view_" + c, k = a('<li class="ui-menu-item" role="presentation"><a class="' + n.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + b + '">' + (d.viewtext || d.viewtitle) + "</a></li>").click(function () {
                        if (!a(this).hasClass(n.disabled)) {
                            var b = j.p.selrow;
                            b ? a.isFunction(d.editfunc) ? d.viewfunc.call(j, b) : a(j).jqGrid("viewGridRow", b, i) : (a.jgrid.viewModal("#" + r.themodal, {
                                gbox: "#gbox_" + a.jgrid.jqID(j.p.id),
                                jqm: !0
                            }), a("#jqg_alrt").focus()), a(p).hide()
                        }
                        return !1
                    }), a(p).append(k)), d.del && (g = g || {}, b = g.id || "del_" + c, k = a('<li class="ui-menu-item" role="presentation"><a class="' + n.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + b + '">' + (d.deltext || d.deltitle) + "</a></li>").click(function () {
                        if (!a(this).hasClass(n.disabled)) {
                            var b;
                            j.p.multiselect ? (b = j.p.selarrrow, 0 === b.length && (b = null)) : b = j.p.selrow, b ? a.isFunction(d.delfunc) ? d.delfunc.call(j, b) : a(j).jqGrid("delGridRow", b, g) : (a.jgrid.viewModal("#" + r.themodal, {
                                gbox: "#gbox_" + a.jgrid.jqID(j.p.id),
                                jqm: !0
                            }), a("#jqg_alrt").focus()), a(p).hide()
                        }
                        return !1
                    }), a(p).append(k)), (d.add || d.edit || d.del || d.view) && a(p).append("<li class='ui-menu-item " + n.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>"), d.search && (h = h || {}, b = h.id || "search_" + c, k = a('<li class="ui-menu-item" role="presentation"><a class="' + n.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + b + '">' + (d.searchtext || d.searchtitle) + "</a></li>").click(function () {
                        return a(this).hasClass(n.disabled) || (a.isFunction(d.searchfunc) ? d.searchfunc.call(j, h) : a(j).jqGrid("searchGrid", h), a(p).hide()), !1
                    }), a(p).append(k), h.showOnLoad && h.showOnLoad === !0 && a(k).click()), d.refresh && (b = h.id || "search_" + c, k = a('<li class="ui-menu-item" role="presentation"><a class="' + n.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + b + '">' + (d.refreshtext || d.refreshtitle) + "</a></li>").click(function () {
                        if (!a(this).hasClass(n.disabled)) {
                            a.isFunction(d.beforeRefresh) && d.beforeRefresh.call(j), j.p.search = !1, j.p.resetsearch = !0;
                            try {
                                if ("currentfilter" !== d.refreshstate) {
                                    var b = j.p.id;
                                    j.p.postData.filters = "";
                                    try {
                                        a("#fbox_" + a.jgrid.jqID(b)).jqFilter("resetFilter")
                                    } catch (c) {
                                    }
                                    a.isFunction(j.clearToolbar) && j.clearToolbar.call(j, !1)
                                }
                            } catch (e) {
                            }
                            switch (d.refreshstate) {
                                case"firstpage":
                                    a(j).trigger("reloadGrid", [{page: 1}]);
                                    break;
                                case"current":
                                case"currentfilter":
                                    a(j).trigger("reloadGrid", [{current: !0}])
                            }
                            a.isFunction(d.afterRefresh) && d.afterRefresh.call(j), a(p).hide()
                        }
                        return !1
                    }), a(p).append(k)), a(p).hide(), a("body").append(p), a("#" + o).addClass("ui-menu " + m.menu_widget), a("#" + o + " > li > a").hover(function () {
                        a(this).addClass(n.hover)
                    }, function () {
                        a(this).removeClass(n.hover)
                    })
                };
                s(), a(".dropdownmenu", b + "_" + d.position).on("click", function (b) {
                    var c = a(this).offset(), d = c.left, e = parseInt(c.top), f = a(this).val();
                    a("#" + f).show().css({
                        top: e - (a("#" + f).height() + 10) + "px",
                        left: d + "px"
                    }), b.stopPropagation()
                }), a("body").on("click", function (b) {
                    a(b.target).hasClass("dropdownmenu") || a("#" + o).hide()
                })
            })
        }, GridToForm: function (b, c) {
            return this.each(function () {
                var d, e = this;
                if (e.grid) {
                    var f = a(e).jqGrid("getRowData", b);
                    if (f)for (d in f)f.hasOwnProperty(d) && (a("[name=" + a.jgrid.jqID(d) + "]", c).is("input:radio") || a("[name=" + a.jgrid.jqID(d) + "]", c).is("input:checkbox") ? a("[name=" + a.jgrid.jqID(d) + "]", c).each(function () {
                        a(this).val() == f[d] ? a(this)[e.p.useProp ? "prop" : "attr"]("checked", !0) : a(this)[e.p.useProp ? "prop" : "attr"]("checked", !1)
                    }) : a("[name=" + a.jgrid.jqID(d) + "]", c).val(f[d]))
                }
            })
        }, FormToGrid: function (b, c, d, e) {
            return this.each(function () {
                var f = this;
                if (f.grid) {
                    d || (d = "set"), e || (e = "first");
                    var g = a(c).serializeArray(), h = {};
                    a.each(g, function (a, b) {
                        h[b.name] = b.value
                    }), "add" === d ? a(f).jqGrid("addRowData", b, h, e) : "set" === d && a(f).jqGrid("setRowData", b, h)
                }
            })
        }
    })
});