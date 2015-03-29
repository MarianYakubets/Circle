var Utils = {
    calculateCirclePoint: function (radius, angle) {
        return cc.p(radius * Math.cos(((angle) * Math.PI) / 180),
            -radius * Math.sin(((angle) * Math.PI) / 180))
    },

    doForEach: function (array, functions) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < functions.length; j++) {
                functions[j](array[i]);
            }
        }
    },

    getSegmentEdges: function (segment) {
        return Utils.getEdges(segment, segment.getRadius());
    },

    getEdges: function (segment, radius) {
        var start = segment.getStart();
        var angle = segment.getAngle();
        var edges = [cc.p(0, 0)];
        for (var i = 0; i <= angle; i++) {
            edges.push(Utils.calculateCirclePoint(radius, i + start));
        }
        edges.push(cc.p(0, 0));
        return edges;
    }
};
