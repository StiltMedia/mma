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
    a.fn.jqFilter = function (b) {
        if ("string" == typeof b) {
            var c = a.fn.jqFilter[b];
            if (!c)throw"jqFilter - No such method: " + b;
            var d = a.makeArray(arguments).slice(1);
            return c.apply(this, d)
        }
        var e = a.extend(!0, {
            filter: null,
            columns: [],
            sortStrategy: null,
            onChange: null,
            afterRedraw: null,
            checkValues: null,
            error: !1,
            errmsg: "",
            errorcheck: !0,
            showQuery: !0,
            sopt: null,
            ops: [],
            operands: null,
            numopts: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
            stropts: ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
            strarr: ["text", "string", "blob"],
            groupOps: [{op: "AND", text: "AND"}, {op: "OR", text: "OR"}],
            groupButton: !0,
            ruleButtons: !0,
            direction: "ltr"
        }, a.jgrid.filter, b || {});
        return this.each(function () {
            if (!this.filter) {
                this.p = e, (null === this.p.filter || void 0 === this.p.filter) && (this.p.filter = {
                    groupOp: this.p.groupOps[0].op,
                    rules: [],
                    groups: []
                }), null != this.p.sortStrategy && a.isFunction(this.p.sortStrategy) && this.p.columns.sort(this.p.sortStrategy);
                var b, c, d = this.p.columns.length, f = /msie/i.test(navigator.userAgent) && !window.opera;
                if (this.p.initFilter = a.extend(!0, {}, this.p.filter), d) {
                    for (b = 0; d > b; b++)c = this.p.columns[b], c.stype ? c.inputtype = c.stype : c.inputtype || (c.inputtype = "text"), c.sorttype ? c.searchtype = c.sorttype : c.searchtype || (c.searchtype = "string"), void 0 === c.hidden && (c.hidden = !1), c.label || (c.label = c.name), c.index && (c.name = c.index), c.hasOwnProperty("searchoptions") || (c.searchoptions = {}), c.hasOwnProperty("searchrules") || (c.searchrules = {});
                    var g = function () {
                        return a("#" + a.jgrid.jqID(e.id))[0] || null
                    }, h = g(), i = a.jgrid.styleUI[h.p.styleUI || "jQueryUI"].filter, j = a.jgrid.styleUI[h.p.styleUI || "jQueryUI"].common;
                    this.p.showQuery && a(this).append("<table class='queryresult " + i.table_widget + "' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
                    var k = function (b, c) {
                        var d = [!0, ""], f = g();
                        if (a.isFunction(c.searchrules))d = c.searchrules.call(f, b, c); else if (a.jgrid && a.jgrid.checkValues)try {
                            d = a.jgrid.checkValues.call(f, b, -1, c.searchrules, c.label)
                        } catch (h) {
                        }
                        d && d.length && d[0] === !1 && (e.error = !d[0], e.errmsg = d[1])
                    };
                    this.onchange = function () {
                        return this.p.error = !1, this.p.errmsg = "", a.isFunction(this.p.onChange) ? this.p.onChange.call(this, this.p) : !1
                    }, this.reDraw = function () {
                        a("table.group:first", this).remove();
                        var b = this.createTableForGroup(e.filter, null);
                        a(this).append(b), a.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p)
                    }, this.createTableForGroup = function (b, c) {
                        var d, f = this, g = a("<table class='group " + i.table_widget + " ui-search-table' style='border:0px none;'><tbody></tbody></table>"), h = "left";
                        "rtl" === this.p.direction && (h = "right", g.attr("dir", "rtl")), null === c && g.append("<tr class='error' style='display:none;'><th colspan='5' class='" + j.error + "' align='" + h + "'></th></tr>");
                        var k = a("<tr></tr>");
                        g.append(k);
                        var l = a("<th colspan='5' align='" + h + "'></th>");
                        if (k.append(l), this.p.ruleButtons === !0) {
                            var m = a("<select class='opsel " + i.srSelect + "'></select>");
                            l.append(m);
                            var n, o = "";
                            for (d = 0; d < e.groupOps.length; d++)n = b.groupOp === f.p.groupOps[d].op ? " selected='selected'" : "", o += "<option value='" + f.p.groupOps[d].op + "'" + n + ">" + f.p.groupOps[d].text + "</option>";
                            m.append(o).bind("change", function () {
                                b.groupOp = a(m).val(), f.onchange()
                            })
                        }
                        var p = "<span></span>";
                        if (this.p.groupButton && (p = a("<input type='button' value='+ {}' title='Add subgroup' class='add-group " + j.button + "'/>"), p.bind("click", function () {
                                return void 0 === b.groups && (b.groups = []), b.groups.push({
                                    groupOp: e.groupOps[0].op,
                                    rules: [],
                                    groups: []
                                }), f.reDraw(), f.onchange(), !1
                            })), l.append(p), this.p.ruleButtons === !0) {
                            var q, r = a("<input type='button' value='+' title='Add rule' class='add-rule ui-add " + j.button + "'/>");
                            r.bind("click", function () {
                                for (void 0 === b.rules && (b.rules = []), d = 0; d < f.p.columns.length; d++) {
                                    var c = void 0 === f.p.columns[d].search ? !0 : f.p.columns[d].search, e = f.p.columns[d].hidden === !0, g = f.p.columns[d].searchoptions.searchhidden === !0;
                                    if (g && c || c && !e) {
                                        q = f.p.columns[d];
                                        break
                                    }
                                }
                                var h;
                                return h = q.searchoptions.sopt ? q.searchoptions.sopt : f.p.sopt ? f.p.sopt : -1 !== a.inArray(q.searchtype, f.p.strarr) ? f.p.stropts : f.p.numopts, b.rules.push({
                                    field: q.name,
                                    op: h[0],
                                    data: ""
                                }), f.reDraw(), !1
                            }), l.append(r)
                        }
                        if (null !== c) {
                            var s = a("<input type='button' value='-' title='Delete group' class='delete-group " + j.button + "'/>");
                            l.append(s), s.bind("click", function () {
                                for (d = 0; d < c.groups.length; d++)if (c.groups[d] === b) {
                                    c.groups.splice(d, 1);
                                    break
                                }
                                return f.reDraw(), f.onchange(), !1
                            })
                        }
                        if (void 0 !== b.groups)for (d = 0; d < b.groups.length; d++) {
                            var t = a("<tr></tr>");
                            g.append(t);
                            var u = a("<td class='first'></td>");
                            t.append(u);
                            var v = a("<td colspan='4'></td>");
                            v.append(this.createTableForGroup(b.groups[d], b)), t.append(v)
                        }
                        if (void 0 === b.groupOp && (b.groupOp = f.p.groupOps[0].op), void 0 !== b.rules)for (d = 0; d < b.rules.length; d++)g.append(this.createTableRowForRule(b.rules[d], b));
                        return g
                    }, this.createTableRowForRule = function (b, c) {
                        var d, h, k, l, m, n = this, o = g(), p = a("<tr></tr>"), q = "";
                        p.append("<td class='first'></td>");
                        var r = a("<td class='columns'></td>");
                        p.append(r);
                        var s, t = a("<select class='" + i.srSelect + "'></select>"), u = [];
                        r.append(t), t.bind("change", function () {
                            for (b.field = a(t).val(), k = a(this).parents("tr:first"), a(".data", k).empty(), d = 0; d < n.p.columns.length; d++)if (n.p.columns[d].name === b.field) {
                                l = n.p.columns[d];
                                break
                            }
                            if (l) {
                                l.searchoptions.id = a.jgrid.randId(), l.searchoptions.name = b.field, l.searchoptions.oper = "filter", f && "text" === l.inputtype && (l.searchoptions.size || (l.searchoptions.size = 10));
                                var c = a.jgrid.createEl.call(o, l.inputtype, l.searchoptions, "", !0, n.p.ajaxSelectOptions || {}, !0);
                                a(c).addClass("input-elm " + i.srInput), h = l.searchoptions.sopt ? l.searchoptions.sopt : n.p.sopt ? n.p.sopt : -1 !== a.inArray(l.searchtype, n.p.strarr) ? n.p.stropts : n.p.numopts;
                                var e = "", g = 0;
                                for (u = [], a.each(n.p.ops, function () {
                                    u.push(this.oper)
                                }), d = 0; d < h.length; d++)s = a.inArray(h[d], u), -1 !== s && (0 === g && (b.op = n.p.ops[s].oper), e += "<option value='" + n.p.ops[s].oper + "'>" + n.p.ops[s].text + "</option>", g++);
                                if (a(".selectopts", k).empty().append(e), a(".selectopts", k)[0].selectedIndex = 0, a.jgrid.msie && a.jgrid.msiever() < 9) {
                                    var j = parseInt(a("select.selectopts", k)[0].offsetWidth, 10) + 1;
                                    a(".selectopts", k).width(j), a(".selectopts", k).css("width", "auto")
                                }
                                a(".data", k).append(c), a.jgrid.bindEv.call(o, c, l.searchoptions), a(".input-elm", k).bind("change", function (c) {
                                    var d = c.target;
                                    b.data = "SPAN" === d.nodeName.toUpperCase() && l.searchoptions && a.isFunction(l.searchoptions.custom_value) ? l.searchoptions.custom_value.call(o, a(d).children(".customelement:first"), "get") : d.value, n.onchange()
                                }), setTimeout(function () {
                                    b.data = a(c).val(), n.onchange()
                                }, 0)
                            }
                        });
                        var v = 0;
                        for (d = 0; d < n.p.columns.length; d++) {
                            var w = void 0 === n.p.columns[d].search ? !0 : n.p.columns[d].search, x = n.p.columns[d].hidden === !0, y = n.p.columns[d].searchoptions.searchhidden === !0;
                            (y && w || w && !x) && (m = "", b.field === n.p.columns[d].name && (m = " selected='selected'", v = d), q += "<option value='" + n.p.columns[d].name + "'" + m + ">" + n.p.columns[d].label + "</option>")
                        }
                        t.append(q);
                        var z = a("<td class='operators'></td>");
                        p.append(z), l = e.columns[v], l.searchoptions.id = a.jgrid.randId(), f && "text" === l.inputtype && (l.searchoptions.size || (l.searchoptions.size = 10)), l.searchoptions.name = b.field, l.searchoptions.oper = "filter";
                        var A = a.jgrid.createEl.call(o, l.inputtype, l.searchoptions, b.data, !0, n.p.ajaxSelectOptions || {}, !0);
                        ("nu" === b.op || "nn" === b.op) && (a(A).attr("readonly", "true"), a(A).attr("disabled", "true"));
                        var B = a("<select class='selectopts " + i.srSelect + "'></select>");
                        for (z.append(B), B.bind("change", function () {
                            b.op = a(B).val(), k = a(this).parents("tr:first");
                            var c = a(".input-elm", k)[0];
                            "nu" === b.op || "nn" === b.op ? (b.data = "", "SELECT" !== c.tagName.toUpperCase() && (c.value = ""), c.setAttribute("readonly", "true"), c.setAttribute("disabled", "true")) : ("SELECT" === c.tagName.toUpperCase() && (b.data = c.value), c.removeAttribute("readonly"), c.removeAttribute("disabled")), n.onchange()
                        }), h = l.searchoptions.sopt ? l.searchoptions.sopt : n.p.sopt ? n.p.sopt : -1 !== a.inArray(l.searchtype, n.p.strarr) ? n.p.stropts : n.p.numopts, q = "", a.each(n.p.ops, function () {
                            u.push(this.oper)
                        }), d = 0; d < h.length; d++)s = a.inArray(h[d], u), -1 !== s && (m = b.op === n.p.ops[s].oper ? " selected='selected'" : "", q += "<option value='" + n.p.ops[s].oper + "'" + m + ">" + n.p.ops[s].text + "</option>");
                        B.append(q);
                        var C = a("<td class='data'></td>");
                        p.append(C), C.append(A), a.jgrid.bindEv.call(o, A, l.searchoptions), a(A).addClass("input-elm " + i.srInput).bind("change", function () {
                            b.data = "custom" === l.inputtype ? l.searchoptions.custom_value.call(o, a(this).children(".customelement:first"), "get") : a(this).val(), n.onchange()
                        });
                        var D = a("<td></td>");
                        if (p.append(D), this.p.ruleButtons === !0) {
                            var E = a("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del " + j.button + "'/>");
                            D.append(E), E.bind("click", function () {
                                for (d = 0; d < c.rules.length; d++)if (c.rules[d] === b) {
                                    c.rules.splice(d, 1);
                                    break
                                }
                                return n.reDraw(), n.onchange(), !1
                            })
                        }
                        return p
                    }, this.getStringForGroup = function (a) {
                        var b, c = "(";
                        if (void 0 !== a.groups)for (b = 0; b < a.groups.length; b++) {
                            c.length > 1 && (c += " " + a.groupOp + " ");
                            try {
                                c += this.getStringForGroup(a.groups[b])
                            } catch (d) {
                                alert(d)
                            }
                        }
                        if (void 0 !== a.rules)try {
                            for (b = 0; b < a.rules.length; b++)c.length > 1 && (c += " " + a.groupOp + " "), c += this.getStringForRule(a.rules[b])
                        } catch (e) {
                            alert(e)
                        }
                        return c += ")", "()" === c ? "" : c
                    }, this.getStringForRule = function (b) {
                        var c, d, f, g, h = "", i = "", j = ["int", "integer", "float", "number", "currency"];
                        for (c = 0; c < this.p.ops.length; c++)if (this.p.ops[c].oper === b.op) {
                            h = this.p.operands.hasOwnProperty(b.op) ? this.p.operands[b.op] : "", i = this.p.ops[c].oper;
                            break
                        }
                        for (c = 0; c < this.p.columns.length; c++)if (this.p.columns[c].name === b.field) {
                            d = this.p.columns[c];
                            break
                        }
                        return void 0 === d ? "" : (g = b.data, ("bw" === i || "bn" === i) && (g += "%"), ("ew" === i || "en" === i) && (g = "%" + g), ("cn" === i || "nc" === i) && (g = "%" + g + "%"), ("in" === i || "ni" === i) && (g = " (" + g + ")"), e.errorcheck && k(b.data, d), f = -1 !== a.inArray(d.searchtype, j) || "nn" === i || "nu" === i ? b.field + " " + h + " " + g : b.field + " " + h + ' "' + g + '"')
                    }, this.resetFilter = function () {
                        this.p.filter = a.extend(!0, {}, this.p.initFilter), this.reDraw(), this.onchange()
                    }, this.hideError = function () {
                        a("th." + j.error, this).html(""), a("tr.error", this).hide()
                    }, this.showError = function () {
                        a("th." + j.error, this).html(this.p.errmsg), a("tr.error", this).show()
                    }, this.toUserFriendlyString = function () {
                        return this.getStringForGroup(e.filter)
                    }, this.toString = function () {
                        function a(a) {
                            if (c.p.errorcheck) {
                                var b, d;
                                for (b = 0; b < c.p.columns.length; b++)if (c.p.columns[b].name === a.field) {
                                    d = c.p.columns[b];
                                    break
                                }
                                d && k(a.data, d)
                            }
                            return a.op + "(item." + a.field + ",'" + a.data + "')"
                        }

                        function b(c) {
                            var d, e = "(";
                            if (void 0 !== c.groups)for (d = 0; d < c.groups.length; d++)e.length > 1 && (e += "OR" === c.groupOp ? " || " : " && "), e += b(c.groups[d]);
                            if (void 0 !== c.rules)for (d = 0; d < c.rules.length; d++)e.length > 1 && (e += "OR" === c.groupOp ? " || " : " && "), e += a(c.rules[d]);
                            return e += ")", "()" === e ? "" : e
                        }

                        var c = this;
                        return b(this.p.filter)
                    }, this.reDraw(), this.p.showQuery && this.onchange(), this.filter = !0
                }
            }
        })
    }, a.extend(a.fn.jqFilter, {
        toSQLString: function () {
            var a = "";
            return this.each(function () {
                a = this.toUserFriendlyString()
            }), a
        }, filterData: function () {
            var a;
            return this.each(function () {
                a = this.p.filter
            }), a
        }, getParameter: function (a) {
            return void 0 !== a && this.p.hasOwnProperty(a) ? this.p[a] : this.p
        }, resetFilter: function () {
            return this.each(function () {
                this.resetFilter()
            })
        }, addFilter: function (b) {
            "string" == typeof b && (b = a.jgrid.parse(b)), this.each(function () {
                this.p.filter = b, this.reDraw(), this.onchange()
            })
        }
    }), a.jgrid.extend({
        filterToolbar: function (b) {
            var c = a.jgrid.getRegional(this[0], "search");
            return b = a.extend({
                autosearch: !0,
                autosearchDelay: 500,
                searchOnEnter: !0,
                beforeSearch: null,
                afterSearch: null,
                beforeClear: null,
                afterClear: null,
                searchurl: "",
                stringResult: !1,
                groupOp: "AND",
                defaultSearch: "bw",
                searchOperators: !1,
                resetIcon: "x",
                operands: {
                    eq: "==",
                    ne: "!",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "^",
                    bn: "!^",
                    "in": "=",
                    ni: "!=",
                    ew: "|",
                    en: "!@",
                    cn: "~",
                    nc: "!~",
                    nu: "#",
                    nn: "!#"
                }
            }, c, b || {}), this.each(function () {
                var d = this;
                if (!d.p.filterToolbar) {
                    a(d).data("filterToolbar") || a(d).data("filterToolbar", b), d.p.force_regional && (b = a.extend(b, c));
                    var e, f, g, h = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].filter, i = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].common, j = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].base, k = function () {
                        var c, e, f, g = {}, h = 0, i = {};
                        a.each(d.p.colModel, function () {
                            var j = a("#gs_" + d.p.idPrefix + a.jgrid.jqID(this.name), this.frozen === !0 && d.p.frozenColumns === !0 ? d.grid.fhDiv : d.grid.hDiv);
                            if (e = this.index || this.name, f = b.searchOperators ? j.parent().prev().children("a").attr("soper") || b.defaultSearch : this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq" : b.defaultSearch, c = "custom" === this.stype && a.isFunction(this.searchoptions.custom_value) && j.length > 0 && "SPAN" === j[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(d, j.children(".customelement:first"), "get") : j.val(), c || "nu" === f || "nn" === f)g[e] = c, i[e] = f, h++; else try {
                                delete d.p.postData[e]
                            } catch (k) {
                            }
                        });
                        var j = h > 0 ? !0 : !1;
                        if (b.stringResult === !0 || "local" === d.p.datatype || b.searchOperators === !0) {
                            var k = '{"groupOp":"' + b.groupOp + '","rules":[', l = 0;
                            a.each(g, function (a, b) {
                                l > 0 && (k += ","), k += '{"field":"' + a + '",', k += '"op":"' + i[a] + '",', b += "", k += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}', l++
                            }), k += "]}", a.extend(d.p.postData, {filters: k}), a.each(["searchField", "searchString", "searchOper"], function (a, b) {
                                d.p.postData.hasOwnProperty(b) && delete d.p.postData[b]
                            })
                        } else a.extend(d.p.postData, g);
                        var m;
                        d.p.searchurl && (m = d.p.url, a(d).jqGrid("setGridParam", {url: d.p.searchurl}));
                        var n = "stop" === a(d).triggerHandler("jqGridToolbarBeforeSearch") ? !0 : !1;
                        !n && a.isFunction(b.beforeSearch) && (n = b.beforeSearch.call(d)), n || a(d).jqGrid("setGridParam", {search: j}).trigger("reloadGrid", [{page: 1}]), m && a(d).jqGrid("setGridParam", {url: m}), a(d).triggerHandler("jqGridToolbarAfterSearch"), a.isFunction(b.afterSearch) && b.afterSearch.call(d)
                    }, l = function (c) {
                        var e, f = {}, g = 0;
                        c = "boolean" != typeof c ? !0 : c, a.each(d.p.colModel, function () {
                            var b, c = a("#gs_" + d.p.idPrefix + a.jgrid.jqID(this.name), this.frozen === !0 && d.p.frozenColumns === !0 ? d.grid.fhDiv : d.grid.hDiv);
                            switch (this.searchoptions && void 0 !== this.searchoptions.defaultValue && (b = this.searchoptions.defaultValue), e = this.index || this.name, this.stype) {
                                case"select":
                                    if (c.find("option").each(function (c) {
                                            return 0 === c && (this.selected = !0), a(this).val() === b ? (this.selected = !0, !1) : void 0
                                        }), void 0 !== b)f[e] = b, g++; else try {
                                        delete d.p.postData[e]
                                    } catch (h) {
                                    }
                                    break;
                                case"text":
                                    if (c.val(b || ""), void 0 !== b)f[e] = b, g++; else try {
                                        delete d.p.postData[e]
                                    } catch (i) {
                                    }
                                    break;
                                case"custom":
                                    a.isFunction(this.searchoptions.custom_value) && c.length > 0 && "SPAN" === c[0].nodeName.toUpperCase() && this.searchoptions.custom_value.call(d, c.children(".customelement:first"), "set", b || "")
                            }
                        });
                        var h = g > 0 ? !0 : !1;
                        if (d.p.resetsearch = !0, b.stringResult === !0 || "local" === d.p.datatype) {
                            var i = '{"groupOp":"' + b.groupOp + '","rules":[', j = 0;
                            a.each(f, function (a, b) {
                                j > 0 && (i += ","), i += '{"field":"' + a + '",', i += '"op":"eq",', b += "", i += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}', j++
                            }), i += "]}", a.extend(d.p.postData, {filters: i}), a.each(["searchField", "searchString", "searchOper"], function (a, b) {
                                d.p.postData.hasOwnProperty(b) && delete d.p.postData[b]
                            })
                        } else a.extend(d.p.postData, f);
                        var k;
                        d.p.searchurl && (k = d.p.url, a(d).jqGrid("setGridParam", {url: d.p.searchurl}));
                        var l = "stop" === a(d).triggerHandler("jqGridToolbarBeforeClear") ? !0 : !1;
                        !l && a.isFunction(b.beforeClear) && (l = b.beforeClear.call(d)), l || c && a(d).jqGrid("setGridParam", {search: h}).trigger("reloadGrid", [{page: 1}]), k && a(d).jqGrid("setGridParam", {url: k}), a(d).triggerHandler("jqGridToolbarAfterClear"), a.isFunction(b.afterClear) && b.afterClear()
                    }, m = function () {
                        var b = a("tr.ui-search-toolbar", d.grid.hDiv), c = d.p.frozenColumns === !0 ? a("tr.ui-search-toolbar", d.grid.fhDiv) : !1;
                        "none" === b.css("display") ? (b.show(), c && c.show()) : (b.hide(), c && c.hide())
                    }, n = function (c, e, f) {
                        a("#sopt_menu").remove(), e = parseInt(e, 10), f = parseInt(f, 10) + 18;
                        for (var g, j, l = a(".ui-jqgrid-view").css("font-size") || "11px", m = '<ul id="sopt_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="font-size:' + l + ";left:" + e + "px;top:" + f + 'px;">', n = a(c).attr("soper"), o = [], p = 0, q = a(c).attr("colname"), r = d.p.colModel.length; r > p && d.p.colModel[p].name !== q;)p++;
                        var s = d.p.colModel[p], t = a.extend({}, s.searchoptions);
                        for (t.sopt || (t.sopt = [], t.sopt[0] = "select" === s.stype ? "eq" : b.defaultSearch), a.each(b.odata, function () {
                            o.push(this.oper)
                        }), p = 0; p < t.sopt.length; p++)j = a.inArray(t.sopt[p], o), -1 !== j && (g = n === b.odata[j].oper ? i.highlight : "", m += '<li class="ui-menu-item ' + g + '" role="presentation"><a class="' + i.cornerall + ' g-menu-item" tabindex="0" role="menuitem" value="' + b.odata[j].oper + '" oper="' + b.operands[b.odata[j].oper] + '"><table class="ui-common-table"><tr><td width="25px">' + b.operands[b.odata[j].oper] + "</td><td>" + b.odata[j].text + "</td></tr></table></a></li>");
                        m += "</ul>", a("body").append(m), a("#sopt_menu").addClass("ui-menu " + h.menu_widget), a("#sopt_menu > li > a").hover(function () {
                            a(this).addClass(i.hover)
                        }, function () {
                            a(this).removeClass(i.hover)
                        }).click(function () {
                            var e = a(this).attr("value"), f = a(this).attr("oper");
                            if (a(d).triggerHandler("jqGridToolbarSelectOper", [e, f, c]), a("#sopt_menu").hide(), a(c).text(f).attr("soper", e), b.autosearch === !0) {
                                var g = a(c).parent().next().children()[0];
                                (a(g).val() || "nu" === e || "nn" === e) && k()
                            }
                        })
                    }, o = a("<tr class='ui-search-toolbar' role='row'></tr>");
                    b.restoreFromFilters && (g = d.p.postData.filters, g && ("string" == typeof g && (g = a.jgrid.parse(g)), f = g.rules.length ? g.rules : !1)), a.each(d.p.colModel, function (c) {
                        var g, i, l, m, n, p, q, r, s = this, t = "", u = "=", v = a("<th role='columnheader' class='" + j.headerBox + " ui-th-" + d.p.direction + "' id='gsh_" + d.p.id + "_" + s.name + "' ></th>"), w = a("<div></div>"), x = a("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper' headers=''></td><td class='ui-search-input' headers=''></td><td class='ui-search-clear' headers=''></td></tr></table>");
                        if (this.hidden === !0 && a(v).css("display", "none"), this.search = this.search === !1 ? !1 : !0, void 0 === this.stype && (this.stype = "text"), g = a.extend({}, this.searchoptions || {}, {
                                name: s.index || s.name,
                                id: "gs_" + d.p.idPrefix + s.name,
                                oper: "search"
                            }), this.search) {
                            if (b.restoreFromFilters && f) {
                                r = !1;
                                for (var y = 0; y < f.length; y++)if (f[y].field) {
                                    var z = s.index || s.name;
                                    if (z === f[y].field) {
                                        r = f[y];
                                        break
                                    }
                                }
                            }
                            if (b.searchOperators) {
                                for (i = g.sopt ? g.sopt[0] : "select" === s.stype ? "eq" : b.defaultSearch, b.restoreFromFilters && r && (i = r.op), l = 0; l < b.odata.length; l++)if (b.odata[l].oper === i) {
                                    u = b.operands[i] || "";
                                    break
                                }
                                m = null != g.searchtitle ? g.searchtitle : b.operandTitle, t = "<a title='" + m + "' style='padding-right: 0.5em;' soper='" + i + "' class='soptclass' colname='" + this.name + "'>" + u + "</a>"
                            }
                            switch (a("td:eq(0)", x).attr("colindex", c).append(t), void 0 === g.clearSearch && (g.clearSearch = !0), g.clearSearch ? (n = b.resetTitle || "Clear Search Value", a("td:eq(2)", x).append("<a title='" + n + "' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>" + b.resetIcon + "</a>")) : a("td:eq(2)", x).hide(), this.surl && (g.dataUrl = this.surl), p = "", g.defaultValue && (p = a.isFunction(g.defaultValue) ? g.defaultValue.call(d) : g.defaultValue), b.restoreFromFilters && r && (p = r.data), q = a.jgrid.createEl.call(d, this.stype, g, p, !1, a.extend({}, a.jgrid.ajaxOptions, d.p.ajaxSelectOptions || {})), a(q).css({width: "100%"}).addClass(h.srInput), a("td:eq(1)", x).append(q), a(w).append(x), this.stype) {
                                case"select":
                                    b.autosearch === !0 && (g.dataEvents = [{
                                        type: "change", fn: function () {
                                            return k(), !1
                                        }
                                    }]);
                                    break;
                                case"text":
                                    b.autosearch === !0 && (g.dataEvents = b.searchOnEnter ? [{
                                        type: "keypress",
                                        fn: function (a) {
                                            var b = a.charCode || a.keyCode || 0;
                                            return 13 === b ? (k(), !1) : this
                                        }
                                    }] : [{
                                        type: "keydown", fn: function (a) {
                                            var c = a.which;
                                            switch (c) {
                                                case 13:
                                                    return !1;
                                                case 9:
                                                case 16:
                                                case 37:
                                                case 38:
                                                case 39:
                                                case 40:
                                                case 27:
                                                    break;
                                                default:
                                                    e && clearTimeout(e), e = setTimeout(function () {
                                                        k()
                                                    }, b.autosearchDelay)
                                            }
                                        }
                                    }])
                            }
                            a.jgrid.bindEv.call(d, q, g)
                        }
                        a(v).append(w), a(o).append(v), b.searchOperators || a("td:eq(0)", x).hide()
                    }), a("table thead", d.grid.hDiv).append(o), b.searchOperators && (a(".soptclass", o).click(function (b) {
                        var c = a(this).offset(), d = c.left, e = c.top;
                        n(this, d, e), b.stopPropagation()
                    }), a("body").on("click", function (b) {
                        "soptclass" !== b.target.className && a("#sopt_menu").hide()
                    })), a(".clearsearchclass", o).click(function () {
                        var c = a(this).parents("tr:first"), e = parseInt(a("td.ui-search-oper", c).attr("colindex"), 10), f = a.extend({}, d.p.colModel[e].searchoptions || {}), g = f.defaultValue ? f.defaultValue : "";
                        "select" === d.p.colModel[e].stype ? g ? a("td.ui-search-input select", c).val(g) : a("td.ui-search-input select", c)[0].selectedIndex = 0 : a("td.ui-search-input input", c).val(g), b.autosearch === !0 && k()
                    }), this.p.filterToolbar = !0, this.triggerToolbar = k, this.clearToolbar = l, this.toggleToolbar = m
                }
            })
        }, destroyFilterToolbar: function () {
            return this.each(function () {
                this.p.filterToolbar && (this.triggerToolbar = null, this.clearToolbar = null, this.toggleToolbar = null, this.p.filterToolbar = !1, a(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
            })
        }, searchGrid: function (b) {
            var c = a.jgrid.getRegional(this[0], "search");
            return b = a.extend(!0, {
                recreateFilter: !1,
                drag: !0,
                sField: "searchField",
                sValue: "searchString",
                sOper: "searchOper",
                sFilter: "filters",
                loadDefaults: !0,
                beforeShowSearch: null,
                afterShowSearch: null,
                onInitializeSearch: null,
                afterRedraw: null,
                afterChange: null,
                sortStrategy: null,
                closeAfterSearch: !1,
                closeAfterReset: !1,
                closeOnEscape: !1,
                searchOnEnter: !1,
                multipleSearch: !1,
                multipleGroup: !1,
                top: 0,
                left: 0,
                jqModal: !0,
                modal: !1,
                resize: !0,
                width: 450,
                height: "auto",
                dataheight: "auto",
                showQuery: !1,
                errorcheck: !0,
                sopt: null,
                stringResult: void 0,
                onClose: null,
                onSearch: null,
                onReset: null,
                toTop: !0,
                overlay: 30,
                columns: [],
                tmplNames: null,
                tmplFilters: null,
                tmplLabel: " Template: ",
                showOnLoad: !1,
                layer: null,
                operands: {
                    eq: "=",
                    ne: "<>",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "LIKE",
                    bn: "NOT LIKE",
                    "in": "IN",
                    ni: "NOT IN",
                    ew: "LIKE",
                    en: "NOT LIKE",
                    cn: "LIKE",
                    nc: "NOT LIKE",
                    nu: "IS NULL",
                    nn: "ISNOT NULL"
                }
            }, c, b || {}), this.each(function () {
                function c(c) {
                    g = a(d).triggerHandler("jqGridFilterBeforeShow", [c]), void 0 === g && (g = !0), g && a.isFunction(b.beforeShowSearch) && (g = b.beforeShowSearch.call(d, c)), g && (a.jgrid.viewModal("#" + a.jgrid.jqID(i.themodal), {
                        gbox: "#gbox_" + a.jgrid.jqID(f),
                        jqm: b.jqModal,
                        modal: b.modal,
                        overlay: b.overlay,
                        toTop: b.toTop
                    }), a(d).triggerHandler("jqGridFilterAfterShow", [c]), a.isFunction(b.afterShowSearch) && b.afterShowSearch.call(d, c))
                }

                var d = this;
                if (d.grid) {
                    var e, f = "fbox_" + d.p.id, g = !0, h = !0, i = {
                        themodal: "searchmod" + f,
                        modalhead: "searchhd" + f,
                        modalcontent: "searchcnt" + f,
                        scrollelm: f
                    }, j = d.p.postData[b.sFilter], k = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].filter, l = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].common;
                    if (b.styleUI = d.p.styleUI, "string" == typeof j && (j = a.jgrid.parse(j)), b.recreateFilter === !0 && a("#" + a.jgrid.jqID(i.themodal)).remove(), void 0 !== a("#" + a.jgrid.jqID(i.themodal))[0])c(a("#fbox_" + a.jgrid.jqID(d.p.id))); else {
                        var m = a("<div><div id='" + f + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + a.jgrid.jqID(d.p.id)), n = "left", o = "";
                        "rtl" === d.p.direction && (n = "right", o = " style='text-align:left'", m.attr("dir", "rtl"));
                        var p, q, r = a.extend([], d.p.colModel), s = "<a id='" + f + "_search' class='fm-button " + l.button + " fm-button-icon-right ui-search'><span class='" + l.icon_base + " " + k.icon_search + "'></span>" + b.Find + "</a>", t = "<a id='" + f + "_reset' class='fm-button " + l.button + " fm-button-icon-left ui-reset'><span class='" + l.icon_base + " " + k.icon_reset + "'></span>" + b.Reset + "</a>", u = "", v = "", w = !1, x = -1;
                        if (b.showQuery && (u = "<a id='" + f + "_query' class='fm-button " + l.button + " fm-button-icon-left'><span class='" + l.icon_base + " " + k.icon_query + "'></span>Query</a>"), b.columns.length ? (r = b.columns, x = 0, p = r[0].index || r[0].name) : a.each(r, function (a, b) {
                                if (b.label || (b.label = d.p.colNames[a]), !w) {
                                    var c = void 0 === b.search ? !0 : b.search, e = b.hidden === !0, f = b.searchoptions && b.searchoptions.searchhidden === !0;
                                    (f && c || c && !e) && (w = !0, p = b.index || b.name, x = a)
                                }
                            }), !j && p || b.multipleSearch === !1) {
                            var y = "eq";
                            x >= 0 && r[x].searchoptions && r[x].searchoptions.sopt ? y = r[x].searchoptions.sopt[0] : b.sopt && b.sopt.length && (y = b.sopt[0]), j = {
                                groupOp: "AND",
                                rules: [{field: p, op: y, data: ""}]
                            }
                        }
                        w = !1, b.tmplNames && b.tmplNames.length && (w = !0, v = "<tr><td class='ui-search-label'>" + b.tmplLabel + "</td>", v += "<td><select class='ui-template " + k.srSelect + "'>", v += "<option value='default'>Default</option>", a.each(b.tmplNames, function (a, b) {
                            v += "<option value='" + a + "'>" + b + "</option>"
                        }), v += "</select></td></tr>"), q = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + f + "_2'><tbody><tr><td colspan='2'><hr class='" + l.content + "' style='margin:1px'/></td></tr>" + v + "<tr><td class='EditButton' style='text-align:" + n + "'>" + t + "</td><td class='EditButton' " + o + ">" + u + s + "</td></tr></tbody></table>", f = a.jgrid.jqID(f), a("#" + f).jqFilter({
                            columns: r,
                            sortStrategy: b.sortStrategy,
                            filter: b.loadDefaults ? j : null,
                            showQuery: b.showQuery,
                            errorcheck: b.errorcheck,
                            sopt: b.sopt,
                            groupButton: b.multipleGroup,
                            ruleButtons: b.multipleSearch,
                            afterRedraw: b.afterRedraw,
                            ops: b.odata,
                            operands: b.operands,
                            ajaxSelectOptions: d.p.ajaxSelectOptions,
                            groupOps: b.groupOps,
                            onChange: function () {
                                this.p.showQuery && a(".query", this).html(this.toUserFriendlyString()), a.isFunction(b.afterChange) && b.afterChange.call(d, a("#" + f), b)
                            },
                            direction: d.p.direction,
                            id: d.p.id
                        }), m.append(q), w && b.tmplFilters && b.tmplFilters.length && a(".ui-template", m).bind("change", function () {
                            var c = a(this).val();
                            return "default" === c ? a("#" + f).jqFilter("addFilter", j) : a("#" + f).jqFilter("addFilter", b.tmplFilters[parseInt(c, 10)]), !1
                        }), b.multipleGroup === !0 && (b.multipleSearch = !0), a(d).triggerHandler("jqGridFilterInitialize", [a("#" + f)]), a.isFunction(b.onInitializeSearch) && b.onInitializeSearch.call(d, a("#" + f)), b.gbox = "#gbox_" + f, b.layer ? a.jgrid.createModal(i, m, b, "#gview_" + a.jgrid.jqID(d.p.id), a("#gbox_" + a.jgrid.jqID(d.p.id))[0], "#" + a.jgrid.jqID(b.layer), {position: "relative"}) : a.jgrid.createModal(i, m, b, "#gview_" + a.jgrid.jqID(d.p.id), a("#gbox_" + a.jgrid.jqID(d.p.id))[0]), (b.searchOnEnter || b.closeOnEscape) && a("#" + a.jgrid.jqID(i.themodal)).keydown(function (c) {
                            var d = a(c.target);
                            return !b.searchOnEnter || 13 !== c.which || d.hasClass("add-group") || d.hasClass("add-rule") || d.hasClass("delete-group") || d.hasClass("delete-rule") || d.hasClass("fm-button") && d.is("[id$=_query]") ? b.closeOnEscape && 27 === c.which ? (a("#" + a.jgrid.jqID(i.modalhead)).find(".ui-jqdialog-titlebar-close").click(), !1) : void 0 : (a("#" + f + "_search").click(), !1)
                        }), u && a("#" + f + "_query").bind("click", function () {
                            return a(".queryresult", m).toggle(), !1
                        }), void 0 === b.stringResult && (b.stringResult = b.multipleSearch), a("#" + f + "_search").bind("click", function () {
                            var c, g, j = {};
                            if (e = a("#" + f), e.find(".input-elm:focus").change(), g = e.jqFilter("filterData"), b.errorcheck && (e[0].hideError(), b.showQuery || e.jqFilter("toSQLString"), e[0].p.error))return e[0].showError(), !1;
                            if (b.stringResult) {
                                try {
                                    c = JSON.stringify(g)
                                } catch (k) {
                                }
                                "string" == typeof c && (j[b.sFilter] = c, a.each([b.sField, b.sValue, b.sOper], function () {
                                    j[this] = ""
                                }))
                            } else b.multipleSearch ? (j[b.sFilter] = g, a.each([b.sField, b.sValue, b.sOper], function () {
                                j[this] = ""
                            })) : (j[b.sField] = g.rules[0].field, j[b.sValue] = g.rules[0].data, j[b.sOper] = g.rules[0].op, j[b.sFilter] = "");
                            return d.p.search = !0, a.extend(d.p.postData, j), h = a(d).triggerHandler("jqGridFilterSearch"), void 0 === h && (h = !0), h && a.isFunction(b.onSearch) && (h = b.onSearch.call(d, d.p.filters)), h !== !1 && a(d).trigger("reloadGrid", [{page: 1}]), b.closeAfterSearch && a.jgrid.hideModal("#" + a.jgrid.jqID(i.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(d.p.id),
                                jqm: b.jqModal,
                                onClose: b.onClose
                            }), !1
                        }), a("#" + f + "_reset").bind("click", function () {
                            var c = {}, e = a("#" + f);
                            return d.p.search = !1, d.p.resetsearch = !0, b.multipleSearch === !1 ? c[b.sField] = c[b.sValue] = c[b.sOper] = "" : c[b.sFilter] = "", e[0].resetFilter(), w && a(".ui-template", m).val("default"), a.extend(d.p.postData, c), h = a(d).triggerHandler("jqGridFilterReset"), void 0 === h && (h = !0), h && a.isFunction(b.onReset) && (h = b.onReset.call(d)), h !== !1 && a(d).trigger("reloadGrid", [{page: 1}]), b.closeAfterReset && a.jgrid.hideModal("#" + a.jgrid.jqID(i.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(d.p.id),
                                jqm: b.jqModal,
                                onClose: b.onClose
                            }), !1
                        }), c(a("#" + f)), a(".fm-button:not(." + l.disabled + ")", m).hover(function () {
                            a(this).addClass(l.hover)
                        }, function () {
                            a(this).removeClass(l.hover)
                        })
                    }
                }
            })
        }
    })
});