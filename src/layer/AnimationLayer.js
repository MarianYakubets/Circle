var AnimationLayer = cc.Layer.extend({
    winSize: null,
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
        this.winSize = cc.director.getWinSize();
        this.centerPos = cc.p(this.winSize.width / 2, this.winSize.height / 2);
        this.segments = (new StubLevel()).getSegments();

        var maskLayer = new cc.DrawNode();
        //maskLayer.setPosition(this.centerPos);
        //maskLayer.setAnchorPoint(this.centerPos);

        var segmentsMask = new cc.DrawNode();
        maskLayer.addChild(segmentsMask, 10);

        var lineMask = new cc.DrawNode();
        maskLayer.addChild(lineMask, 9);

        this.drawLines(lineMask, this.segments);

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
            canvas.drawSegment(cc.p(0, 0), this.calculatePoint(1000, segments[i].getAngle() + segments[i].getStart()), 3, cc.color(255, 255, 255));
        }
    },

    draw: function (canvas) {
        function getEdges(segment) {
            var radius = segment.getRadius();
            var start = segment.getStart();
            var angle = segment.getAngle();
            var edges = [cc.p(0, 0)];
            for (var i = 0; i <= angle; i++) {
                edges.push(calculatePoint(radius, i + start));
            }

            edges.push(cc.p(0, 0));
            return edges;
        }

        function calculatePoint(radius, angle) {
            return cc.p(radius * Math.cos(((angle) * Math.PI) / 180),
                -radius * Math.sin(((angle) * Math.PI) / 180))
        }

        return function (segment) {
            canvas.drawPoly(getEdges(segment), segment.getType().color, -100, cc.color(255, 255, 255));
        };
    },

    update: function (dt) {
        this.segmentsMask.clear();
        this.doForEach(this.segments, [this.makeStep, this.drawCircle]);
    },

    calculatePoint: function (radius, angle) {
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