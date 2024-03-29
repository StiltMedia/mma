/**
 *
 * @license Guriddo jqGrid JS - v5.0.1
 * Copyright(c) 2008, Tony Tomov, tony@trirand.com
 *
 * License: http://guriddo.net/?page_id=103334
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./grid.base", "jquery-ui/dialog", "jquery-ui/draggable", "jquery-ui/droppable", "jquery-ui/resizable", "jquery-ui/sortable", "./addons/ui.multiselect"], a) : a(jQuery)
}(function ($) {
    "use strict";
    if ($.jgrid.msie && 8 === $.jgrid.msiever() && ($.expr[":"].hidden = function (a) {
            return 0 === a.offsetWidth || 0 === a.offsetHeight || "none" === a.style.display
        }), $.jgrid._multiselect = !1, $.ui && $.ui.multiselect) {
        if ($.ui.multiselect.prototype._setSelected) {
            var setSelected = $.ui.multiselect.prototype._setSelected;
            $.ui.multiselect.prototype._setSelected = function (a, b) {
                var c = setSelected.call(this, a, b);
                if (b && this.selectedList) {
                    var d = this.element;
                    this.selectedList.find("li").each(function () {
                        $(this).data("optionLink") && $(this).data("optionLink").remove().appendTo(d)
                    })
                }
                return c
            }
        }
        $.ui.multiselect.prototype.destroy && ($.ui.multiselect.prototype.destroy = function () {
            this.element.show(), this.container.remove(), void 0 === $.Widget ? $.widget.prototype.destroy.apply(this, arguments) : $.Widget.prototype.destroy.apply(this, arguments)
        }), $.jgrid._multiselect = !0
    }
    $.jgrid.extend({
        sortableColumns: function (a) {
            return this.each(function () {
                function b() {
                    c.p.disableClick = !0
                }

                var c = this, d = $.jgrid.jqID(c.p.id), e = {
                    tolerance: "pointer",
                    axis: "x",
                    scrollSensitivity: "1",
                    items: ">th:not(:has(#jqgh_" + d + "_cb,#jqgh_" + d + "_rn,#jqgh_" + d + "_subgrid),:hidden)",
                    placeholder: {
                        element: function (a) {
                            var b = $(document.createElement(a[0].nodeName)).addClass(a[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0];
                            return b
                        }, update: function (a, b) {
                            b.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10)), b.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") || 0, 10))
                        }
                    },
                    update: function (a, b) {
                        var d = $(b.item).parent(), e = $(">th", d), f = c.p.colModel, g = {}, h = c.p.id + "_";
                        $.each(f, function (a) {
                            g[this.name] = a
                        });
                        var i = [];
                        e.each(function () {
                            var a = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(h, "");
                            g.hasOwnProperty(a) && i.push(g[a])
                        }), $(c).jqGrid("remapColumns", i, !0, !0), $.isFunction(c.p.sortable.update) && c.p.sortable.update(i), setTimeout(function () {
                            c.p.disableClick = !1
                        }, 50)
                    }
                };
                if (c.p.sortable.options ? $.extend(e, c.p.sortable.options) : $.isFunction(c.p.sortable) && (c.p.sortable = {update: c.p.sortable}), e.start) {
                    var f = e.start;
                    e.start = function (a, c) {
                        b(), f.call(this, a, c)
                    }
                } else e.start = b;
                c.p.sortable.exclude && (e.items += ":not(" + c.p.sortable.exclude + ")");
                var g = a.sortable(e), h = g.data("sortable") || g.data("uiSortable");
                null != h && (h.data("sortable").floating = !0)
            })
        }, columnChooser: function (a) {
            function b(a, b, c) {
                var d, e;
                return b >= 0 ? (d = a.slice(), e = d.splice(b, Math.max(a.length - b, b)), b > a.length && (b = a.length), d[b] = c, d.concat(e)) : a
            }

            function c(a, b) {
                a && ("string" == typeof a ? $.fn[a] && $.fn[a].apply(b, $.makeArray(arguments).slice(2)) : $.isFunction(a) && a.apply(b, $.makeArray(arguments).slice(2)))
            }

            var d, e, f, g, h, i, j, k = this, l = {}, m = [], n = k.jqGrid("getGridParam", "colModel"), o = k.jqGrid("getGridParam", "colNames"), p = function (a) {
                return $.ui.multiselect.prototype && a.data($.ui.multiselect.prototype.widgetFullName || $.ui.multiselect.prototype.widgetName) || a.data("ui-multiselect") || a.data("multiselect")
            }, q = $.jgrid.getRegional(this[0], "col");
            if (!$("#colchooser_" + $.jgrid.jqID(k[0].p.id)).length) {
                if (d = $('<div id="colchooser_' + k[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>'), e = $("select", d), a = $.extend({
                        width: 400,
                        height: 240,
                        classname: null,
                        done: function (a) {
                            a && k.jqGrid("remapColumns", a, !0)
                        },
                        msel: "multiselect",
                        dlog: "dialog",
                        dialog_opts: {minWidth: 470, dialogClass: "ui-jqdialog"},
                        dlog_opts: function (a) {
                            var b = {};
                            return b[a.bSubmit] = function () {
                                a.apply_perm(), a.cleanup(!1)
                            }, b[a.bCancel] = function () {
                                a.cleanup(!0)
                            }, $.extend(!0, {
                                buttons: b,
                                close: function () {
                                    a.cleanup(!0)
                                },
                                modal: a.modal || !1,
                                resizable: a.resizable || !0,
                                width: a.width + 70,
                                resize: function () {
                                    var a = p(e), b = a.container.closest(".ui-dialog-content");
                                    b.length > 0 && "object" == typeof b[0].style ? b[0].style.width = "" : b.css("width", ""), a.selectedList.height(Math.max(a.selectedContainer.height() - a.selectedActions.outerHeight() - 1, 1)), a.availableList.height(Math.max(a.availableContainer.height() - a.availableActions.outerHeight() - 1, 1))
                                }
                            }, a.dialog_opts || {})
                        },
                        apply_perm: function () {
                            var c = [];
                            $("option", e).each(function () {
                                $(this).is(":selected") ? k.jqGrid("showCol", n[this.value].name) : k.jqGrid("hideCol", n[this.value].name)
                            }), $("option[selected]", e).each(function () {
                                c.push(parseInt(this.value, 10))
                            }), $.each(c, function () {
                                delete l[n[parseInt(this, 10)].name]
                            }), $.each(l, function () {
                                var a = parseInt(this, 10);
                                c = b(c, a, a)
                            }), a.done && a.done.call(k, c), k.jqGrid("setGridWidth", k[0].p.width, k[0].p.shrinkToFit)
                        },
                        cleanup: function (b) {
                            c(a.dlog, d, "destroy"), c(a.msel, e, "destroy"), d.remove(), b && a.done && a.done.call(k)
                        },
                        msel_opts: {}
                    }, q, a || {}), $.ui && $.ui.multiselect && $.ui.multiselect.defaults) {
                    if (!$.jgrid._multiselect)return void alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
                    a.msel_opts = $.extend($.ui.multiselect.defaults, a.msel_opts)
                }
                a.caption && d.attr("title", a.caption), a.classname && (d.addClass(a.classname), e.addClass(a.classname)), a.width && ($(">div", d).css({
                    width: a.width,
                    margin: "0 auto"
                }), e.css("width", a.width)), a.height && ($(">div", d).css("height", a.height), e.css("height", a.height - 10)), e.empty(), $.each(n, function (a) {
                    return l[this.name] = a, this.hidedlg ? void(this.hidden || m.push(a)) : void e.append("<option value='" + a + "' " + (this.hidden ? "" : "selected='selected'") + ">" + $.jgrid.stripHtml(o[a]) + "</option>")
                }), f = $.isFunction(a.dlog_opts) ? a.dlog_opts.call(k, a) : a.dlog_opts, c(a.dlog, d, f), g = $.isFunction(a.msel_opts) ? a.msel_opts.call(k, a) : a.msel_opts, c(a.msel, e, g), h = $("#colchooser_" + $.jgrid.jqID(k[0].p.id)), h.css({margin: "auto"}), h.find(">div").css({
                    width: "100%",
                    height: "100%",
                    margin: "auto"
                }), i = p(e), i.container.css({
                    width: "100%",
                    height: "100%",
                    margin: "auto"
                }), i.selectedContainer.css({
                    width: 100 * i.options.dividerLocation + "%",
                    height: "100%",
                    margin: "auto",
                    boxSizing: "border-box"
                }), i.availableContainer.css({
                    width: 100 - 100 * i.options.dividerLocation + "%",
                    height: "100%",
                    margin: "auto",
                    boxSizing: "border-box"
                }), i.selectedList.css("height", "auto"), i.availableList.css("height", "auto"), j = Math.max(i.selectedList.height(), i.availableList.height()), j = Math.min(j, $(window).height()), i.selectedList.css("height", j), i.availableList.css("height", j)
            }
        }, sortableRows: function (a) {
            return this.each(function () {
                var b = this;
                b.grid && (b.p.treeGrid || $.fn.sortable && (a = $.extend({
                    cursor: "move",
                    axis: "y",
                    items: " > .jqgrow"
                }, a || {}), a.start && $.isFunction(a.start) ? (a._start_ = a.start, delete a.start) : a._start_ = !1, a.update && $.isFunction(a.update) ? (a._update_ = a.update, delete a.update) : a._update_ = !1, a.start = function (c, d) {
                    if ($(d.item).css("border-width", "0"), $("td", d.item).each(function (a) {
                            this.style.width = b.grid.cols[a].style.width
                        }), b.p.subGrid) {
                        var e = $(d.item).attr("id");
                        try {
                            $(b).jqGrid("collapseSubGridRow", e)
                        } catch (f) {
                        }
                    }
                    a._start_ && a._start_.apply(this, [c, d])
                }, a.update = function (c, d) {
                    $(d.item).css("border-width", ""), b.p.rownumbers === !0 && $("td.jqgrid-rownum", b.rows).each(function (a) {
                        $(this).html(a + 1 + (parseInt(b.p.page, 10) - 1) * parseInt(b.p.rowNum, 10))
                    }), a._update_ && a._update_.apply(this, [c, d])
                }, $("tbody:first", b).sortable(a), $("tbody:first > .jqgrow", b).disableSelection()))
            })
        }, gridDnD: function (a) {
            return this.each(function () {
                function b() {
                    var a = $.data(e, "dnd");
                    $("tr.jqgrow:not(.ui-draggable)", e).draggable($.isFunction(a.drag) ? a.drag.call($(e), a) : a.drag)
                }

                var c, d, e = this;
                if (e.grid && !e.p.treeGrid && $.fn.draggable && $.fn.droppable) {
                    var f = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";
                    if (void 0 === $("#jqgrid_dnd")[0] && $("body").append(f), "string" == typeof a && "updateDnD" === a && e.p.jqgdnd === !0)return void b();
                    if (a = $.extend({
                            drag: function (a) {
                                return $.extend({
                                    start: function (b, c) {
                                        var d, f;
                                        if (e.p.subGrid) {
                                            f = $(c.helper).attr("id");
                                            try {
                                                $(e).jqGrid("collapseSubGridRow", f)
                                            } catch (g) {
                                            }
                                        }
                                        for (d = 0; d < $.data(e, "dnd").connectWith.length; d++)0 === $($.data(e, "dnd").connectWith[d]).jqGrid("getGridParam", "reccount") && $($.data(e, "dnd").connectWith[d]).jqGrid("addRowData", "jqg_empty_row", {});
                                        c.helper.addClass("ui-state-highlight"), $("td", c.helper).each(function (a) {
                                            this.style.width = e.grid.headers[a].width + "px"
                                        }), a.onstart && $.isFunction(a.onstart) && a.onstart.call($(e), b, c)
                                    }, stop: function (b, c) {
                                        var d, f;
                                        for (c.helper.dropped && !a.dragcopy && (f = $(c.helper).attr("id"), void 0 === f && (f = $(this).attr("id")), $(e).jqGrid("delRowData", f)), d = 0; d < $.data(e, "dnd").connectWith.length; d++)$($.data(e, "dnd").connectWith[d]).jqGrid("delRowData", "jqg_empty_row");
                                        a.onstop && $.isFunction(a.onstop) && a.onstop.call($(e), b, c)
                                    }
                                }, a.drag_opts || {})
                            },
                            drop: function (a) {
                                return $.extend({
                                    accept: function (a) {
                                        if (!$(a).hasClass("jqgrow"))return a;
                                        var b = $(a).closest("table.ui-jqgrid-btable");
                                        if (b.length > 0 && void 0 !== $.data(b[0], "dnd")) {
                                            var c = $.data(b[0], "dnd").connectWith;
                                            return -1 !== $.inArray("#" + $.jgrid.jqID(this.id), c) ? !0 : !1
                                        }
                                        return !1
                                    }, drop: function (b, c) {
                                        if ($(c.draggable).hasClass("jqgrow")) {
                                            var d = $(c.draggable).attr("id"), f = c.draggable.parent().parent().jqGrid("getRowData", d);
                                            if (!a.dropbyname) {
                                                var g, h, i = 0, j = {}, k = $("#" + $.jgrid.jqID(this.id)).jqGrid("getGridParam", "colModel");
                                                try {
                                                    for (h in f)f.hasOwnProperty(h) && (g = k[i].name, "cb" !== g && "rn" !== g && "subgrid" !== g && f.hasOwnProperty(h) && k[i] && (j[g] = f[h]), i++);
                                                    f = j
                                                } catch (l) {
                                                }
                                            }
                                            if (c.helper.dropped = !0, a.beforedrop && $.isFunction(a.beforedrop)) {
                                                var m = a.beforedrop.call(this, b, c, f, $("#" + $.jgrid.jqID(e.p.id)), $(this));
                                                void 0 !== m && null !== m && "object" == typeof m && (f = m)
                                            }
                                            if (c.helper.dropped) {
                                                var n;
                                                a.autoid && ($.isFunction(a.autoid) ? n = a.autoid.call(this, f) : (n = Math.ceil(1e3 * Math.random()), n = a.autoidprefix + n)), $("#" + $.jgrid.jqID(this.id)).jqGrid("addRowData", n, f, a.droppos)
                                            }
                                            a.ondrop && $.isFunction(a.ondrop) && a.ondrop.call(this, b, c, f)
                                        }
                                    }
                                }, a.drop_opts || {})
                            },
                            onstart: null,
                            onstop: null,
                            beforedrop: null,
                            ondrop: null,
                            drop_opts: {activeClass: "ui-state-active", hoverClass: "ui-state-hover"},
                            drag_opts: {
                                revert: "invalid",
                                helper: "clone",
                                cursor: "move",
                                appendTo: "#jqgrid_dnd",
                                zIndex: 5e3
                            },
                            dragcopy: !1,
                            dropbyname: !1,
                            droppos: "first",
                            autoid: !0,
                            autoidprefix: "dnd_"
                        }, a || {}), a.connectWith)for (a.connectWith = a.connectWith.split(","), a.connectWith = $.map(a.connectWith, function (a) {
                        return $.trim(a)
                    }), $.data(e, "dnd", a), 0 === e.p.reccount || e.p.jqgdnd || b(), e.p.jqgdnd = !0, c = 0; c < a.connectWith.length; c++)d = a.connectWith[c], $(d).droppable($.isFunction(a.drop) ? a.drop.call($(e), a) : a.drop)
                }
            })
        }, gridResize: function (opts) {
            return this.each(function () {
                var $t = this, gID = $.jgrid.jqID($t.p.id), req;
                if ($t.grid && $.fn.resizable) {
                    if (opts = $.extend({}, opts || {}), opts.alsoResize ? (opts._alsoResize_ = opts.alsoResize, delete opts.alsoResize) : opts._alsoResize_ = !1, opts.stop && $.isFunction(opts.stop) ? (opts._stop_ = opts.stop, delete opts.stop) : opts._stop_ = !1, opts.stop = function (a, b) {
                            $($t).jqGrid("setGridParam", {height: $("#gview_" + gID + " .ui-jqgrid-bdiv").height()}), $($t).jqGrid("setGridWidth", b.size.width, opts.shrinkToFit), opts._stop_ && opts._stop_.call($t, a, b), $t.p.caption && $("#gbox_" + gID).css({height: "auto"}), $t.p.frozenColumns && (req && clearTimeout(req), req = setTimeout(function () {
                                req && clearTimeout(req), $("#" + gID).jqGrid("destroyFrozenColumns"), $("#" + gID).jqGrid("setFrozenColumns")
                            }))
                        }, opts._alsoResize_) {
                        var optstest = "{'#gview_" + gID + " .ui-jqgrid-bdiv':true,'" + opts._alsoResize_ + "':true}";
                        opts.alsoResize = eval("(" + optstest + ")")
                    } else opts.alsoResize = $(".ui-jqgrid-bdiv", "#gview_" + gID);
                    delete opts._alsoResize_, $("#gbox_" + gID).resizable(opts)
                }
            })
        }
    })
});