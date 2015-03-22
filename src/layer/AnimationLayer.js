var AnimationLayer = cc.Layer.extend({
    centerPos: null,
    segments: [],
    segmentsMask: null,
    drawCircle: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        this.centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        this.segments = (new StubLevel()).getSegments();

        var maskLayer = new cc.DrawNode();

        var segmentsMask = new cc.DrawNode();
        maskLayer.addChild(segmentsMask, 10);

        this.drawCircle = this.draw(segmentsMask);
        this.segmentsMask = segmentsMask;

        var clippingNode = new cc.ClippingNode();
        clippingNode.setPosition(this.centerPos);
        clippingNode.setAnchorPoint(this.centerPos);
        clippingNode.stencil = maskLayer;
        clippingNode.setInverted(true);
        this.addChild(clippingNode);

        var visibleLines = new cc.DrawNode();
        visibleLines.setPosition(this.centerPos);
        this.drawLines(visibleLines, this.segments);
        this.addChild(visibleLines);

        var background = new cc.Sprite(res.circles_jpg);
        clippingNode.addChild(background);

        this.scheduleUpdate();
        cc.eventManager.addListener(touchHandler.clone(), segmentsMask);
    },

    drawLines: function (canvas, segments) {
        for (var i = 0; i < segments.length; i++) {
            canvas.drawSegment(cc.p(0, 0), Utils.calculateCirclePoint(1000, segments[i].getAngle() + segments[i].getStart()), 3, cc.color(255, 255, 255));
        }
    },

    draw: function (canvas) {
        function getEdges(segment) {
            var radius = segment.getRadius();
            var start = segment.getStart();
            var angle = segment.getAngle();
            var edges = [cc.p(0, 0)];
            for (var i = 0; i <= angle; i++) {
                edges.push(Utils.calculateCirclePoint(radius, i + start));
            }

            edges.push(cc.p(0, 0));
            return edges;
        }

        return function (segment) {
            canvas.drawPoly(getEdges(segment), segment.getType().color, -100, cc.color(255, 255, 255));
        };
    },

    update: function (dt) {
        this.segmentsMask.clear();
        Utils.doForEach(this.segments, [this.makeStep, this.drawCircle]);
    },

    makeStep: function (segment) {
        segment.setRadius(segment.getRadius() - segment.getSpeed());
        return segment;
    }
});

var touchHandler = cc.EventListener.create({
    event: cc.EventListener.MOUSE,
    onTouch: function (event) {
        var target = event.getCurrentTarget();
        cc.log(event);
    }
});