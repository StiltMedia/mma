/**
 *
 * @license Guriddo jqGrid JS - v5.0.1
 * Copyright(c) 2008, Tony Tomov, tony@trirand.com
 *
 * License: http://guriddo.net/?page_id=103334
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./grid.utils", "./grid.base"], a) : a(jQuery)
}(function (a) {
    "use strict";
    a.jgrid = a.jgrid || {}, a.extend(a.jgrid, {
        saveState: function (b, c) {
            if (c = a.extend({
                    useStorage: !0,
                    storageType: "localStorage",
                    beforeSetItem: null,
                    compression: !1,
                    compressionModule: "LZString",
                    compressionMethod: "compressToUTF16"
                }, c || {}), b) {
                var d, e, f = "", g = "", h = a("#" + b)[0];
                if (h.grid) {
                    if (e = a(h).data("inlineNav"), e && h.p.inlineNav && a(h).jqGrid("setGridParam", {_iN: e}), e = a(h).data("filterToolbar"), e && h.p.filterToolbar && a(h).jqGrid("setGridParam", {_fT: e}), f = a(h).jqGrid("jqGridExport", {
                            exptype: "jsonstring",
                            ident: "",
                            root: ""
                        }), a(h.grid.bDiv).find(".ui-jqgrid-btable tr:gt(0)").each(function (a, b) {
                            g += b.outerHTML
                        }), a.isFunction(c.beforeSetItem) && (d = c.beforeSetItem.call(h, f), null != d && (f = d)), c.compression && c.compressionModule)try {
                        d = window[c.compressionModule][c.compressionMethod](f), null != d && (f = d, g = window[c.compressionModule][c.compressionMethod](g))
                    } catch (i) {
                    }
                    if (c.useStorage && a.jgrid.isLocalStorage())try {
                        window[c.storageType].setItem("jqGrid" + h.p.id, f), window[c.storageType].setItem("jqGrid" + h.p.id + "_data", g)
                    } catch (i) {
                        22 === i.code && alert("Local storage limit is over!")
                    }
                    return f
                }
            }
        }, loadState: function (b, c, d) {
            if (d = a.extend({
                    useStorage: !0,
                    storageType: "localStorage",
                    clearAfterLoad: !1,
                    beforeSetGrid: null,
                    afterSetGrid: null,
                    decompression: !1,
                    decompressionModule: "LZString",
                    decompressionMethod: "decompressFromUTF16"
                }, d || {}), b) {
                var e, f, g, h, i, j = a("#" + b)[0];
                if (d.useStorage)try {
                    c = window[d.storageType].getItem("jqGrid" + j.id), g = window[d.storageType].getItem("jqGrid" + j.id + "_data")
                } catch (k) {
                }
                if (c) {
                    if (d.decompression && d.decompressionModule)try {
                        e = window[d.decompressionModule][d.decompressionMethod](c), null != e && (c = e, g = window[d.decompressionModule][d.decompressionMethod](g))
                    } catch (k) {
                    }
                    if (e = jqGridUtils.parse(c), e && "object" === a.type(e)) {
                        j.grid && a.jgrid.gridUnload(b), a.isFunction(d.beforeSetGrid) && (f = d.beforeSetGrid(e), f && "object" === a.type(f) && (e = f));
                        var l = function (a) {
                            var b;
                            return b = a
                        }, m = {
                            reccount: e.reccount,
                            records: e.records,
                            lastpage: e.lastpage,
                            shrinkToFit: l(e.shrinkToFit),
                            data: l(e.data),
                            datatype: l(e.datatype),
                            grouping: l(e.grouping)
                        };
                        e.shrinkToFit = !1, e.data = [], e.datatype = "local", e.grouping = !1, e.inlineNav && (h = l(e._iN), e._iN = null, delete e._iN), e.filterToolbar && (i = l(e._fT), e._fT = null, delete e._fT);
                        var n = a("#" + b).jqGrid(e);
                        if (n.append(g), n.jqGrid("setGridParam", m), e.storeNavOptions && e.navGrid && (n[0].p.navGrid = !1, n.jqGrid("navGrid", e.pager, e.navOptions, e.editOptions, e.addOptions, e.delOptions, e.searchOptions, e.viewOptions), e.navButtons && e.navButtons.length))for (var o = 0; o < e.navButtons.length; o++)"sepclass"in e.navButtons[o][1] ? n.jqGrid("navSeparatorAdd", e.navButtons[o][0], e.navButtons[o][1]) : n.jqGrid("navButtonAdd", e.navButtons[o][0], e.navButtons[o][1]);
                        e.inlineNav && h && (n.jqGrid("setGridParam", {inlineNav: !1}), n.jqGrid("inlineNav", e.pager, h)), e.filterToolbar && i && (n.jqGrid("setGridParam", {filterToolbar: !1}), i.restoreFromFilters = !0, n.jqGrid("filterToolbar", i)), e.frozenColumns && n.jqGrid("setFrozenColumns"), n[0].updatepager(!0, !0), a.isFunction(d.afterSetGrid) && d.afterSetGrid(n), d.clearAfterLoad && (window[d.storageType].removeItem("jqGrid" + j.id), window[d.storageType].removeItem("jqGrid" + j.id + "_data"))
                    } else alert("can not convert to object")
                }
            }
        }, isGridInStorage: function (b, c) {
            var d = {storageType: "localStorage"};
            d = a.extend(d, c || {});
            var e, f, g;
            try {
                f = window[d.storageType].getItem("jqGrid" + b), g = window[d.storageType].getItem("jqGrid" + b + "_data"), e = null != f && null != g && "string" == typeof f && "string" == typeof g
            } catch (h) {
                e = !1
            }
            return e
        }, setRegional: function (b, c) {
            var d = {storageType: "sessionStorage"};
            if (d = a.extend(d, c || {}), d.regional) {
                a.jgrid.saveState(b, d), d.beforeSetGrid = function (a) {
                    return a.regional = d.regional, a.force_regional = !0, a
                }, a.jgrid.loadState(b, null, d);
                var e = a("#" + b)[0], f = a(e).jqGrid("getGridParam", "colModel"), g = -1, h = a.jgrid.getRegional(e, "nav");
                a.each(f, function (a) {
                    return this.formatter && "actions" === this.formatter ? (g = a, !1) : void 0
                }), -1 !== g && h && a("#" + b + " tbody tr").each(function () {
                    var b = this.cells[g];
                    a(b).find(".ui-inline-edit").attr("title", h.edittitle), a(b).find(".ui-inline-del").attr("title", h.deltitle), a(b).find(".ui-inline-save").attr("title", h.savetitle), a(b).find(".ui-inline-cancel").attr("title", h.canceltitle)
                });
                try {
                    window[d.storageType].removeItem("jqGrid" + e.id), window[d.storageType].removeItem("jqGrid" + e.id + "_data")
                } catch (i) {
                }
            }
        }, jqGridImport: function (b, c) {
            c = a.extend({
                imptype: "xml",
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData: {},
                xmlGrid: {config: "root>grid", data: "root>rows"},
                jsonGrid: {config: "grid", data: "data"},
                ajaxOptions: {}
            }, c || {});
            var d = (0 === b.indexOf("#") ? "" : "#") + a.jgrid.jqID(b), e = function (b, c) {
                var e, f, g, h = a(c.xmlGrid.config, b)[0], i = a(c.xmlGrid.data, b)[0];
                if (jqGridUtils.xmlToJSON) {
                    e = jqGridUtils.xmlToJSON(h);
                    for (g in e)e.hasOwnProperty(g) && (f = e[g]);
                    if (i) {
                        var j = e.grid.datatype;
                        e.grid.datatype = "xmlstring", e.grid.datastr = b, a(d).jqGrid(f).jqGrid("setGridParam", {datatype: j})
                    } else setTimeout(function () {
                        a(d).jqGrid(f)
                    }, 0)
                } else alert("xml2json or parse are not present")
            }, f = function (b, c) {
                if (b && "string" == typeof b) {
                    var e = jqGridUtils.parse(b), f = e[c.jsonGrid.config], g = e[c.jsonGrid.data];
                    if (g) {
                        var h = f.datatype;
                        f.datatype = "jsonstring", f.datastr = g, a(d).jqGrid(f).jqGrid("setGridParam", {datatype: h})
                    } else a(d).jqGrid(f)
                }
            };
            switch (c.imptype) {
                case"xml":
                    a.ajax(a.extend({
                        url: c.impurl,
                        type: c.mtype,
                        data: c.impData,
                        dataType: "xml",
                        complete: function (b, f) {
                            "success" === f && (e(b.responseXML, c), a(d).triggerHandler("jqGridImportComplete", [b, c]), a.isFunction(c.importComplete) && c.importComplete(b)), b = null
                        }
                    }, c.ajaxOptions));
                    break;
                case"xmlstring":
                    if (c.impstring && "string" == typeof c.impstring) {
                        var g = a.parseXML(c.impstring);
                        g && (e(g, c), a(d).triggerHandler("jqGridImportComplete", [g, c]), a.isFunction(c.importComplete) && c.importComplete(g))
                    }
                    break;
                case"json":
                    a.ajax(a.extend({
                        url: c.impurl,
                        type: c.mtype,
                        data: c.impData,
                        dataType: "json",
                        complete: function (b) {
                            try {
                                f(b.responseText, c), a(d).triggerHandler("jqGridImportComplete", [b, c]), a.isFunction(c.importComplete) && c.importComplete(b)
                            } catch (e) {
                            }
                            b = null
                        }
                    }, c.ajaxOptions));
                    break;
                case"jsonstring":
                    c.impstring && "string" == typeof c.impstring && (f(c.impstring, c), a(d).triggerHandler("jqGridImportComplete", [c.impstring, c]), a.isFunction(c.importComplete) && c.importComplete(c.impstring))
            }
        }
    }), a.jgrid.extend({
        jqGridExport: function (b) {
            b = a.extend({exptype: "xmlstring", root: "grid", ident: "	", addOptions: {}}, b || {});
            var c = null;
            return this.each(function () {
                if (this.grid) {
                    var d, e = a.extend(!0, {}, a(this).jqGrid("getGridParam"), b.addOptions);
                    if (e.rownumbers && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.multiselect && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.subGrid && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.knv = null, e.treeGrid)for (d in e.treeReader)e.treeReader.hasOwnProperty(d) && (e.colNames.splice(e.colNames.length - 1), e.colModel.splice(e.colModel.length - 1));
                    switch (b.exptype) {
                        case"xmlstring":
                            c = "<" + b.root + ">" + jqGridUtils.jsonToXML(e, {xmlDecl: ""}) + "</" + b.root + ">";
                            break;
                        case"jsonstring":
                            c = jqGridUtils.stringify(e), b.root && (c = "{" + b.root + ":" + c + "}")
                    }
                }
            }), c
        }, excelExport: function (b) {
            return b = a.extend({
                exptype: "remote",
                url: null,
                oper: "oper",
                tag: "excel",
                exportOptions: {}
            }, b || {}), this.each(function () {
                if (this.grid) {
                    var c;
                    if ("remote" === b.exptype) {
                        var d = a.extend({}, this.p.postData);
                        d[b.oper] = b.tag;
                        var e = jQuery.param(d);
                        c = -1 !== b.url.indexOf("?") ? b.url + "&" + e : b.url + "?" + e, window.location = c
                    }
                }
            })
        }
    })
});