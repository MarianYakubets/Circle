var AnimationLayer = cc.Layer.extend({
    winSize: null,
    centerPos: null,
    segments: [],
    canvas: null,
    drawCircle: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        this.winSize = cc.director.getWinSize();
        this.centerPos = cc.p(this.winSize.width / 2, this.winSize.height / 2);
        var canvas = new cc.DrawNode();
        canvas.setPosition(this.centerPos);
        canvas.setAnchorPoint(this.centerPos);
        this.addChild(canvas, 10);
        this.canvas = canvas;

        this.segments = (new StubLevel()).getSegments();

        this.drawCircle = this.draw(canvas);
        this.doForEach(this.segments, [this.drawCircle]);

        this.scheduleUpdate();
    },

    draw: function (canvas) {
        function getEdges(segment) {
            var edges = [cc.p(0, 0)];
            var radius = segment.getRadius();
            var start = segment.getStart();
            var angle = segment.getAngle();
            for (var i = 0; i <= angle; i++) {
                edges.push(cc.p(radius * Math.cos(((i + start) * Math.PI) / 180),
                    -radius * Math.sin(((i + start) * Math.PI) / 180)));
            }

            edges.push(cc.p(0, 0));
            return edges;
        }

        return function (segment) {
            canvas.drawPoly(getEdges(segment), segment.getType().color, -100, cc.color(255, 255, 255));
        };
    },

    update: function (dt) {
        this.canvas.clear();
        this.doForEach(this.segments, [this.makeStep, this.drawCircle]);
    },

    doForEach: function (array, functions) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < functions.length; j++) {
                functions[j](array[i]);
            }
        }
    },

    makeStep: function (segment) {
        segment.setRadius(segment.getRadius() + 1);
        return segment;
    }
});
