/* ========================================================================
 * bootstrap-tour - v0.10.1
 * http://bootstraptour.com
 * ========================================================================
 * Copyright 2012-2013 Ulrich Sossou
 *
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */


+function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var n = t(this), i = n.data("bs.tooltip"), r = "object" == typeof e && e;
            (i || "destroy" != e) && (i || n.data("bs.tooltip", i = new o(this, r)), "string" == typeof e && i[e]())
        })
    }

    var o = function (t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    o.VERSION = "3.2.0", o.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, o.prototype.init = function (e, o, n) {
        this.enabled = !0, this.type = e, this.$element = t(o), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var i = this.options.trigger.split(" "), r = i.length; r--;) {
            var s = i[r];
            if ("click" == s)this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != s) {
                var a = "hover" == s ? "mouseenter" : "focusin", p = "hover" == s ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(p + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, o.prototype.getDefaults = function () {
        return o.DEFAULTS
    }, o.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, o.prototype.getDelegateOptions = function () {
        var e = {}, o = this.getDefaults();
        return this._options && t.each(this._options, function (t, n) {
            o[t] != n && (e[t] = n)
        }), e
    }, o.prototype.enter = function (e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), clearTimeout(o.timeout), o.hoverState = "in", o.options.delay && o.options.delay.show ? (o.timeout = setTimeout(function () {
            "in" == o.hoverState && o.show()
        }, o.options.delay.show), void 0) : o.show()
    }, o.prototype.leave = function (e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), clearTimeout(o.timeout), o.hoverState = "out", o.options.delay && o.options.delay.hide ? (o.timeout = setTimeout(function () {
            "out" == o.hoverState && o.hide()
        }, o.options.delay.hide), void 0) : o.hide()
    }, o.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(document.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o)return;
            var n = this, i = this.tip(), r = this.getUID(this.type);
            this.setContent(), i.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && i.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement, a = /\s?auto?\s?/i, p = a.test(s);
            p && (s = s.replace(a, "") || "top"), i.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
            var h = this.getPosition(), l = i[0].offsetWidth, u = i[0].offsetHeight;
            if (p) {
                var c = s, d = this.$element.parent(), f = this.getPosition(d);
                s = "bottom" == s && h.top + h.height + u - f.scroll > f.height ? "top" : "top" == s && h.top - f.scroll - u < 0 ? "bottom" : "right" == s && h.right + l > f.width ? "left" : "left" == s && h.left - l < f.left ? "right" : s, i.removeClass(c).addClass(s)
            }
            var m = this.getCalculatedOffset(s, h, l, u);
            this.applyPlacement(m, s);
            var v = function () {
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null
            };
            t.support.transition && this.$tip.hasClass("fade") ? i.one("bsTransitionEnd", v).emulateTransitionEnd(150) : v()
        }
    }, o.prototype.applyPlacement = function (e, o) {
        var n = this.tip(), i = n[0].offsetWidth, r = n[0].offsetHeight, s = parseInt(n.css("margin-top"), 10), a = parseInt(n.css("margin-left"), 10);
        isNaN(s) && (s = 0), isNaN(a) && (a = 0), e.top = e.top + s, e.left = e.left + a, t.offset.setOffset(n[0], t.extend({
            using: function (t) {
                n.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), n.addClass("in");
        var p = n[0].offsetWidth, h = n[0].offsetHeight;
        "top" == o && h != r && (e.top = e.top + r - h);
        var l = this.getViewportAdjustedDelta(o, e, p, h);
        l.left ? e.left += l.left : e.top += l.top;
        var u = l.left ? 2 * l.left - i + p : 2 * l.top - r + h, c = l.left ? "left" : "top", d = l.left ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(u, n[0][d], c)
    }, o.prototype.replaceArrow = function (t, e, o) {
        this.arrow().css(o, t ? 50 * (1 - t / e) + "%" : "")
    }, o.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, o.prototype.hide = function () {
        function e() {
            "in" != o.hoverState && n.detach(), o.$element.trigger("hidden.bs." + o.type)
        }

        var o = this, n = this.tip(), i = t.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(i), i.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), this.hoverState = null, this)
    }, o.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, o.prototype.hasContent = function () {
        return this.getTitle()
    }, o.prototype.getPosition = function (e) {
        e = e || this.$element;
        var o = e[0], n = "BODY" == o.tagName;
        return t.extend({}, "function" == typeof o.getBoundingClientRect ? o.getBoundingClientRect() : null, {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop(),
            width: n ? t(window).width() : e.outerWidth(),
            height: n ? t(window).height() : e.outerHeight()
        }, n ? {top: 0, left: 0} : e.offset())
    }, o.prototype.getCalculatedOffset = function (t, e, o, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - o / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - o / 2
        } : "left" == t ? {top: e.top + e.height / 2 - n / 2, left: e.left - o} : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, o.prototype.getViewportAdjustedDelta = function (t, e, o, n) {
        var i = {top: 0, left: 0};
        if (!this.$viewport)return i;
        var r = this.options.viewport && this.options.viewport.padding || 0, s = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - r - s.scroll, p = e.top + r - s.scroll + n;
            a < s.top ? i.top = s.top - a : p > s.top + s.height && (i.top = s.top + s.height - p)
        } else {
            var h = e.left - r, l = e.left + r + o;
            h < s.left ? i.left = s.left - h : l > s.width && (i.left = s.left + s.width - l)
        }
        return i
    }, o.prototype.getTitle = function () {
        var t, e = this.$element, o = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call(e[0]) : o.title)
    }, o.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, o.prototype.tip = function () {
        return this.$tip = this.$tip || t(this.options.template)
    }, o.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, o.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, o.prototype.enable = function () {
        this.enabled = !0
    }, o.prototype.disable = function () {
        this.enabled = !1
    }, o.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, o.prototype.toggle = function (e) {
        var o = this;
        e && (o = t(e.currentTarget).data("bs." + this.type), o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o))), o.tip().hasClass("in") ? o.leave(o) : o.enter(o)
    }, o.prototype.destroy = function () {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = o, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = n, this
    }
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var n = t(this), i = n.data("bs.popover"), r = "object" == typeof e && e;
            (i || "destroy" != e) && (i || n.data("bs.popover", i = new o(this, r)), "string" == typeof e && i[e]())
        })
    }

    var o = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
    o.VERSION = "3.2.0", o.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), o.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), o.prototype.constructor = o, o.prototype.getDefaults = function () {
        return o.DEFAULTS
    }, o.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), o = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").empty()[this.options.html ? "string" == typeof o ? "html" : "append" : "text"](o), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, o.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, o.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, o.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, o.prototype.tip = function () {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var n = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = o, t.fn.popover.noConflict = function () {
        return t.fn.popover = n, this
    }
}(jQuery), function (t, e) {
    var o, n;
    return n = e.document, o = function () {
        function o(o) {
            var n;
            try {
                n = e.localStorage
            } catch (i) {
                n = !1
            }
            this._options = t.extend({
                name: "tour",
                steps: [],
                container: "body",
                autoscroll: !0,
                keyboard: !0,
                storage: n,
                debug: !1,
                backdrop: !1,
                backdropPadding: 0,
                redirect: !0,
                orphan: !1,
                duration: !1,
                delay: !1,
                basePath: "",
                template: '<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> <button class="btn btn-sm btn-default" data-role="end">End tour</button> </div> </div>',
                afterSetState: function () {
                },
                afterGetState: function () {
                },
                afterRemoveState: function () {
                },
                onStart: function () {
                },
                onEnd: function () {
                },
                onShow: function () {
                },
                onShown: function () {
                },
                onHide: function () {
                },
                onHidden: function () {
                },
                onNext: function () {
                },
                onPrev: function () {
                },
                onPause: function () {
                },
                onResume: function () {
                }
            }, o), this._force = !1, this._inited = !1, this.backdrop = {
                overlay: null,
                $element: null,
                $background: null,
                backgroundShown: !1,
                overlayElementShown: !1
            }
        }

        return o.prototype.addSteps = function (t) {
            var e, o, n;
            for (o = 0, n = t.length; n > o; o++)e = t[o], this.addStep(e);
            return this
        }, o.prototype.addStep = function (t) {
            return this._options.steps.push(t), this
        }, o.prototype.getStep = function (e) {
            return null != this._options.steps[e] ? t.extend({
                id: "step-" + e,
                path: "",
                placement: "right",
                title: "",
                content: "<p></p>",
                next: e === this._options.steps.length - 1 ? -1 : e + 1,
                prev: e - 1,
                animation: !0,
                container: this._options.container,
                autoscroll: this._options.autoscroll,
                backdrop: this._options.backdrop,
                backdropPadding: this._options.backdropPadding,
                redirect: this._options.redirect,
                orphan: this._options.orphan,
                duration: this._options.duration,
                delay: this._options.delay,
                template: this._options.template,
                onShow: this._options.onShow,
                onShown: this._options.onShown,
                onHide: this._options.onHide,
                onHidden: this._options.onHidden,
                onNext: this._options.onNext,
                onPrev: this._options.onPrev,
                onPause: this._options.onPause,
                onResume: this._options.onResume
            }, this._options.steps[e]) : void 0
        }, o.prototype.init = function (t) {
            return this._force = t, this.ended() ? (this._debug("Tour ended, init prevented."), this) : (this.setCurrentStep(), this._initMouseNavigation(), this._initKeyboardNavigation(), this._onResize(function (t) {
                return function () {
                    return t.showStep(t._current)
                }
            }(this)), null !== this._current && this.showStep(this._current), this._inited = !0, this)
        }, o.prototype.start = function (t) {
            var e;
            return null == t && (t = !1), this._inited || this.init(t), null === this._current && (e = this._makePromise(null != this._options.onStart ? this._options.onStart(this) : void 0), this._callOnPromiseDone(e, this.showStep, 0)), this
        }, o.prototype.next = function () {
            var t;
            return t = this.hideStep(this._current), this._callOnPromiseDone(t, this._showNextStep)
        }, o.prototype.prev = function () {
            var t;
            return t = this.hideStep(this._current), this._callOnPromiseDone(t, this._showPrevStep)
        }, o.prototype.goTo = function (t) {
            var e;
            return e = this.hideStep(this._current), this._callOnPromiseDone(e, this.showStep, t)
        }, o.prototype.end = function () {
            var o, i;
            return o = function (o) {
                return function () {
                    return t(n).off("click.tour-" + o._options.name), t(n).off("keyup.tour-" + o._options.name), t(e).off("resize.tour-" + o._options.name), o._setState("end", "yes"), o._inited = !1, o._force = !1, o._clearTimer(), null != o._options.onEnd ? o._options.onEnd(o) : void 0
                }
            }(this), i = this.hideStep(this._current), this._callOnPromiseDone(i, o)
        }, o.prototype.ended = function () {
            return !this._force && !!this._getState("end")
        }, o.prototype.restart = function () {
            return this._removeState("current_step"), this._removeState("end"), this.start()
        }, o.prototype.pause = function () {
            var t;
            return t = this.getStep(this._current), t && t.duration ? (this._paused = !0, this._duration -= (new Date).getTime() - this._start, e.clearTimeout(this._timer), this._debug("Paused/Stopped step " + (this._current + 1) + " timer (" + this._duration + " remaining)."), null != t.onPause ? t.onPause(this, this._duration) : void 0) : this
        }, o.prototype.resume = function () {
            var t;
            return t = this.getStep(this._current), t && t.duration ? (this._paused = !1, this._start = (new Date).getTime(), this._duration = this._duration || t.duration, this._timer = e.setTimeout(function (t) {
                return function () {
                    return t._isLast() ? t.next() : t.end()
                }
            }(this), this._duration), this._debug("Started step " + (this._current + 1) + " timer with duration " + this._duration), null != t.onResume && this._duration !== t.duration ? t.onResume(this, this._duration) : void 0) : this
        }, o.prototype.hideStep = function (e) {
            var o, n, i;
            return (i = this.getStep(e)) ? (this._clearTimer(), n = this._makePromise(null != i.onHide ? i.onHide(this, e) : void 0), o = function (o) {
                return function () {
                    var n;
                    return n = t(i.element), n.data("bs.popover") || n.data("popover") || (n = t("body")), n.popover("destroy").removeClass("tour-" + o._options.name + "-element tour-" + o._options.name + "-" + e + "-element"), i.reflex && n.removeClass("tour-step-element-reflex").off("" + o._reflexEvent(i.reflex) + ".tour-" + o._options.name), i.backdrop && o._hideBackdrop(), null != i.onHidden ? i.onHidden(o) : void 0
                }
            }(this), this._callOnPromiseDone(n, o), n) : void 0
        }, o.prototype.showStep = function (t) {
            var o, i, r, s;
            return this.ended() ? (this._debug("Tour ended, showStep prevented."), this) : (s = this.getStep(t)) ? (r = t < this._current, o = this._makePromise(null != s.onShow ? s.onShow(this, t) : void 0), i = function (e) {
                return function () {
                    var o, i, a;
                    if (e.setCurrentStep(t), i = function () {
                            switch ({}.toString.call(s.path)) {
                                case"[object Function]":
                                    return s.path();
                                case"[object String]":
                                    return this._options.basePath + s.path;
                                default:
                                    return s.path
                            }
                        }.call(e), o = [n.location.pathname, n.location.hash].join(""), e._isRedirect(i, o))return e._redirect(s, i), void 0;
                    if (e._isOrphan(s)) {
                        if (!s.orphan)return e._debug("Skip the orphan step " + (e._current + 1) + ".\nOrphan option is false and the element does not exist or is hidden."), r ? e._showPrevStep() : e._showNextStep(), void 0;
                        e._debug("Show the orphan step " + (e._current + 1) + ". Orphans option is true.")
                    }
                    return s.backdrop && e._showBackdrop(e._isOrphan(s) ? void 0 : s.element), a = function () {
                        return e.getCurrentStep() === t ? (null != s.element && s.backdrop && e._showOverlayElement(s), e._showPopover(s, t), null != s.onShown && s.onShown(e), e._debug("Step " + (e._current + 1) + " of " + e._options.steps.length)) : void 0
                    }, s.autoscroll ? e._scrollIntoView(s.element, a) : a(), s.duration ? e.resume() : void 0
                }
            }(this), s.delay ? (this._debug("Wait " + s.delay + " milliseconds to show the step " + (this._current + 1)), e.setTimeout(function (t) {
                return function () {
                    return t._callOnPromiseDone(o, i)
                }
            }(this), s.delay)) : this._callOnPromiseDone(o, i), o) : void 0
        }, o.prototype.getCurrentStep = function () {
            return this._current
        }, o.prototype.setCurrentStep = function (t) {
            return null != t ? (this._current = t, this._setState("current_step", t)) : (this._current = this._getState("current_step"), this._current = null === this._current ? null : parseInt(this._current, 10)), this
        }, o.prototype._setState = function (t, e) {
            var o, n;
            if (this._options.storage) {
                n = "" + this._options.name + "_" + t;
                try {
                    this._options.storage.setItem(n, e)
                } catch (i) {
                    o = i, o.code === DOMException.QUOTA_EXCEEDED_ERR && this._debug("LocalStorage quota exceeded. State storage failed.")
                }
                return this._options.afterSetState(n, e)
            }
            return null == this._state && (this._state = {}), this._state[t] = e
        }, o.prototype._removeState = function (t) {
            var e;
            return this._options.storage ? (e = "" + this._options.name + "_" + t, this._options.storage.removeItem(e), this._options.afterRemoveState(e)) : null != this._state ? delete this._state[t] : void 0
        }, o.prototype._getState = function (t) {
            var e, o;
            return this._options.storage ? (e = "" + this._options.name + "_" + t, o = this._options.storage.getItem(e)) : null != this._state && (o = this._state[t]), (void 0 === o || "null" === o) && (o = null), this._options.afterGetState(t, o), o
        }, o.prototype._showNextStep = function () {
            var t, e, o;
            return o = this.getStep(this._current), e = function (t) {
                return function () {
                    return t.showStep(o.next)
                }
            }(this), t = this._makePromise(null != o.onNext ? o.onNext(this) : void 0), this._callOnPromiseDone(t, e)
        }, o.prototype._showPrevStep = function () {
            var t, e, o;
            return o = this.getStep(this._current), e = function (t) {
                return function () {
                    return t.showStep(o.prev)
                }
            }(this), t = this._makePromise(null != o.onPrev ? o.onPrev(this) : void 0), this._callOnPromiseDone(t, e)
        }, o.prototype._debug = function (t) {
            return this._options.debug ? e.console.log("Bootstrap Tour '" + this._options.name + "' | " + t) : void 0
        }, o.prototype._isRedirect = function (t, e) {
            return null != t && "" !== t && ("[object RegExp]" === {}.toString.call(t) && !t.test(e) || "[object String]" === {}.toString.call(t) && t.replace(/\?.*$/, "").replace(/\/?$/, "") !== e.replace(/\/?$/, ""))
        }, o.prototype._redirect = function (e, o) {
            return t.isFunction(e.redirect) ? e.redirect.call(this, o) : e.redirect === !0 ? (this._debug("Redirect to " + o), n.location.href = o) : void 0
        }, o.prototype._isOrphan = function (e) {
            return null == e.element || !t(e.element).length || t(e.element).is(":hidden") && "http://www.w3.org/2000/svg" !== t(e.element)[0].namespaceURI
        }, o.prototype._isLast = function () {
            return this._current < this._options.steps.length - 1
        }, o.prototype._showPopover = function (e, o) {
            var n, i, r, s;
            return t(".tour-" + this._options.name).remove(), s = t.extend({}, this._options), r = this._isOrphan(e), e.template = this._template(e, o), r && (e.element = "body", e.placement = "top"), n = t(e.element), n.addClass("tour-" + this._options.name + "-element tour-" + this._options.name + "-" + o + "-element"), e.options && t.extend(s, e.options), e.reflex && !r && (n.addClass("tour-step-element-reflex"), n.off("" + this._reflexEvent(e.reflex) + ".tour-" + this._options.name), n.on("" + this._reflexEvent(e.reflex) + ".tour-" + this._options.name, function (t) {
                return function () {
                    return t._isLast() ? t.next() : t.end()
                }
            }(this))), n.popover({
                placement: e.placement,
                trigger: "manual",
                title: e.title,
                content: e.content,
                html: !0,
                animation: e.animation,
                container: e.container,
                template: e.template,
                selector: e.element
            }).popover("show"), i = n.data("bs.popover") ? n.data("bs.popover").tip() : n.data("popover").tip(), i.attr("id", e.id), this._reposition(i, e), r ? this._center(i) : void 0
        }, o.prototype._template = function (e, o) {
            var n, i, r, s, a;
            return a = t.isFunction(e.template) ? t(e.template(o, e)) : t(e.template), n = a.find(".popover-navigation"), r = n.find('[data-role="prev"]'), i = n.find('[data-role="next"]'), s = n.find('[data-role="pause-resume"]'), this._isOrphan(e) && a.addClass("orphan"), a.addClass("tour-" + this._options.name + " tour-" + this._options.name + "-" + o), e.prev < 0 && r.addClass("disabled"), e.next < 0 && i.addClass("disabled"), e.duration || s.remove(), a.clone().wrap("<div>").parent().html()
        }, o.prototype._reflexEvent = function (t) {
            return "[object Boolean]" === {}.toString.call(t) ? "click" : t
        }, o.prototype._reposition = function (e, o) {
            var i, r, s, a, p, h, l;
            if (a = e[0].offsetWidth, r = e[0].offsetHeight, l = e.offset(), p = l.left, h = l.top, i = t(n).outerHeight() - l.top - e.outerHeight(), 0 > i && (l.top = l.top + i), s = t("html").outerWidth() - l.left - e.outerWidth(), 0 > s && (l.left = l.left + s), l.top < 0 && (l.top = 0), l.left < 0 && (l.left = 0), e.offset(l), "bottom" === o.placement || "top" === o.placement) {
                if (p !== l.left)return this._replaceArrow(e, 2 * (l.left - p), a, "left")
            } else if (h !== l.top)return this._replaceArrow(e, 2 * (l.top - h), r, "top")
        }, o.prototype._center = function (o) {
            return o.css("top", t(e).outerHeight() / 2 - o.outerHeight() / 2)
        }, o.prototype._replaceArrow = function (t, e, o, n) {
            return t.find(".arrow").css(n, e ? 50 * (1 - e / o) + "%" : "")
        }, o.prototype._scrollIntoView = function (o, n) {
            var i, r, s, a, p, h;
            return i = t(o), i.length ? (r = t(e), a = i.offset().top, h = r.height(), p = Math.max(0, a - h / 2), this._debug("Scroll into view. ScrollTop: " + p + ". Element offset: " + a + ". Window height: " + h + "."), s = 0, t("body, html").stop(!0, !0).animate({scrollTop: Math.ceil(p)}, function (t) {
                return function () {
                    return 2 === ++s ? (n(), t._debug("Scroll into view.\nAnimation end element offset: " + i.offset().top + ".\nWindow height: " + r.height() + ".")) : void 0
                }
            }(this))) : n()
        }, o.prototype._onResize = function (o, n) {
            return t(e).on("resize.tour-" + this._options.name, function () {
                return clearTimeout(n), n = setTimeout(o, 100)
            })
        }, o.prototype._initMouseNavigation = function () {
            var e;
            return e = this, t(n).off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='prev']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='next']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='end']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='pause-resume']").on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='next']", function (t) {
                return function (e) {
                    return e.preventDefault(), t.next()
                }
            }(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='prev']", function (t) {
                return function (e) {
                    return e.preventDefault(), t.prev()
                }
            }(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='end']", function (t) {
                return function (e) {
                    return e.preventDefault(), t.end()
                }
            }(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='pause-resume']", function (o) {
                var n;
                return o.preventDefault(), n = t(this), n.text(e._paused ? n.data("pause-text") : n.data("resume-text")), e._paused ? e.resume() : e.pause()
            })
        }, o.prototype._initKeyboardNavigation = function () {
            return this._options.keyboard ? t(n).on("keyup.tour-" + this._options.name, function (t) {
                return function (e) {
                    if (e.which)switch (e.which) {
                        case 39:
                            return e.preventDefault(), t._isLast() ? t.next() : t.end();
                        case 37:
                            if (e.preventDefault(), t._current > 0)return t.prev();
                            break;
                        case 27:
                            return e.preventDefault(), t.end()
                    }
                }
            }(this)) : void 0
        }, o.prototype._makePromise = function (e) {
            return e && t.isFunction(e.then) ? e : null
        }, o.prototype._callOnPromiseDone = function (t, e, o) {
            return t ? t.then(function (t) {
                return function () {
                    return e.call(t, o)
                }
            }(this)) : e.call(this, o)
        }, o.prototype._showBackdrop = function () {
            return this.backdrop.backgroundShown ? void 0 : (this.backdrop = t("<div>", {"class": "tour-backdrop"}), this.backdrop.backgroundShown = !0, t("body").append(this.backdrop))
        }, o.prototype._hideBackdrop = function () {
            return this._hideOverlayElement(), this._hideBackground()
        }, o.prototype._hideBackground = function () {
            return this.backdrop ? (this.backdrop.remove(), this.backdrop.overlay = null, this.backdrop.backgroundShown = !1) : void 0
        }, o.prototype._showOverlayElement = function (e) {
            var o, n;
            return o = t(e.element), o && 0 !== o.length && !this.backdrop.overlayElementShown ? (this.backdrop.overlayElementShown = !0, this.backdrop.$element = o.addClass("tour-step-backdrop"), this.backdrop.$background = t("<div>", {"class": "tour-step-background"}), n = {
                width: o.innerWidth(),
                height: o.innerHeight(),
                offset: o.offset()
            }, this.backdrop.$background.appendTo("body"), e.backdropPadding && (n = this._applyBackdropPadding(e.backdropPadding, n)), this.backdrop.$background.width(n.width).height(n.height).offset(n.offset)) : void 0
        }, o.prototype._hideOverlayElement = function () {
            return this.backdrop.overlayElementShown ? (this.backdrop.$element.removeClass("tour-step-backdrop"), this.backdrop.$background.remove(), this.backdrop.$element = null, this.backdrop.$background = null, this.backdrop.overlayElementShown = !1) : void 0
        }, o.prototype._applyBackdropPadding = function (t, e) {
            return "object" == typeof t ? (null == t.top && (t.top = 0), null == t.right && (t.right = 0), null == t.bottom && (t.bottom = 0), null == t.left && (t.left = 0), e.offset.top = e.offset.top - t.top, e.offset.left = e.offset.left - t.left, e.width = e.width + t.left + t.right, e.height = e.height + t.top + t.bottom) : (e.offset.top = e.offset.top - t, e.offset.left = e.offset.left - t, e.width = e.width + 2 * t, e.height = e.height + 2 * t), e
        }, o.prototype._clearTimer = function () {
            return e.clearTimeout(this._timer), this._timer = null, this._duration = null
        }, o
    }(), e.Tour = o
}(jQuery, window);
