/*
 * bootstrap-tagsinput v0.7.1 by Tim Schlechter
 * 
 */


angular.module("bootstrap-tagsinput", []).directive("bootstrapTagsinput", [function () {
    function a(a, b) {
        return b ? angular.isFunction(a.$parent[b]) ? a.$parent[b] : function (a) {
            return a[b]
        } : void 0
    }

    return {
        restrict: "EA",
        scope: {model: "=ngModel"},
        template: "<select multiple></select>",
        replace: !1,
        link: function (b, c, d) {
            $(function () {
                angular.isArray(b.model) || (b.model = []);
                var e = $("select", c), f = d.typeaheadSource ? d.typeaheadSource.split(".") : null, g = f ? f.length > 1 ? b.$parent[f[0]][f[1]] : b.$parent[f[0]] : null;
                e.tagsinput(b.$parent[d.options || ""] || {
                        typeahead: {source: angular.isFunction(g) ? g : null},
                        itemValue: a(b, d.itemvalue),
                        itemText: a(b, d.itemtext),
                        confirmKeys: a(b, d.confirmkeys) ? JSON.parse(d.confirmkeys) : [13],
                        tagClass: angular.isFunction(b.$parent[d.tagclass]) ? b.$parent[d.tagclass] : function (a) {
                            return d.tagclass
                        }
                    });
                for (var h = 0; h < b.model.length; h++)e.tagsinput("add", b.model[h]);
                e.on("itemAdded", function (a) {
                    -1 === b.model.indexOf(a.item) && b.model.push(a.item)
                }), e.on("itemRemoved", function (a) {
                    var c = b.model.indexOf(a.item);
                    -1 !== c && b.model.splice(c, 1)
                });
                var i = b.model.slice();
                b.$watch("model", function () {
                    var a, c = b.model.filter(function (a) {
                        return -1 === i.indexOf(a)
                    }), d = i.filter(function (a) {
                        return -1 === b.model.indexOf(a)
                    });
                    for (i = b.model.slice(), a = 0; a < d.length; a++)e.tagsinput("remove", d[a]);
                    for (e.tagsinput("refresh"), a = 0; a < c.length; a++)e.tagsinput("add", c[a])
                }, !0)
            })
        }
    }
}]);
//# sourceMappingURL=bootstrap-tagsinput-angular.min.js.map
