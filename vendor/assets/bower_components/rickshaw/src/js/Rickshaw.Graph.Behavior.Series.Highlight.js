Rickshaw.namespace('Rickshaw.Graph.Behavior.Series.Highlight');

Rickshaw.Graph.Behavior.Series.Highlight = function (args) {

    this.graph = args.graph;
    this.legend = args.legend;

    var self = this;

    var colorSafe = {};
    var activeLine = null;

    var disabledColor = args.disabledColor || function (seriesColor) {
            return d3.interpolateRgb(seriesColor, d3.rgb('#d8d8d8'))(0.8).toString();
        };

    this.addHighlightEvents = function (l) {

        l.element.addEventListener('mouseover', function (e) {

            if (activeLine) return;
            else activeLine = l;

            self.legend.lines.forEach(function (line) {

                if (l === line) {

                    // if we're not in a stacked renderer bring active line to the top
                    if (self.graph.renderer.unstack && (line.series.renderer ? line.series.renderer.unstack : true)) {

                        var seriesIndex = self.graph.series.indexOf(line.series);
                        line.originalIndex = seriesIndex;

                        var series = self.graph.series.splice(seriesIndex, 1)[0];
                        self.graph.series.push(series);
                    }
                    return;
                }

                colorSafe[line.series.name] = colorSafe[line.series.name] || line.series.color;
                line.series.color = disabledColor(line.series.color);

            });

            self.graph.update();

        }, false);

        l.element.addEventListener('mouseout', function (e) {

            if (!activeLine) return;
            else activeLine = null;

            self.legend.lines.forEach(function (line) {

                // return reordered series to its original place
                if (l === line && line.hasOwnProperty('originalIndex')) {

                    var series = self.graph.series.pop();
                    self.graph.series.splice(line.originalIndex, 0, series);
                    delete line.originalIndex;
                }

                if (colorSafe[line.series.name]) {
                    line.series.color = colorSafe[line.series.name];
                }
            });

            self.graph.update();

        }, false);
    };

    if (this.legend) {
        this.legend.lines.forEach(function (l) {
            self.addHighlightEvents(l);
        });
    }

};
