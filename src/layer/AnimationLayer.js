var AnimationLayer = cc.Layer.extend({
    winSize: null,
    centerPos: null,

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

        this.loadLevel(canvas, new StubLevel());
    },

    loadLevel: function (canvas, level) {
        for (var i = 0; i < level.getSegments().length; i++) {
            this.drawSegment(canvas, level.getSegments()[i]);
        }
    },

    drawSegment: function (canvas, segment) {
        canvas.drawPoly(this.getEdges(segment), segment.getType().color, -100, cc.color(255, 255, 255));
    },

    getEdges: function (segment) {
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
});
