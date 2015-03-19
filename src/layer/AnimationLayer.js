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

        var segmentsMask = new cc.DrawNode();
        segmentsMask.setPosition(this.centerPos);
        segmentsMask.setAnchorPoint(this.centerPos);
        maskLayer.addChild(segmentsMask, -10);
        this.addChild(maskLayer);
        this.segmentsMask = segmentsMask;
        this.drawLines(maskLayer, this.segments);


        this.drawCircle = this.draw(segmentsMask);

        var clippingNode = new cc.ClippingNode();
        clippingNode.setPosition(this.centerPos);
        clippingNode.setAnchorPoint(this.centerPos);
        clippingNode.stencil = maskLayer;
        clippingNode.setInverted(true);
        this.addChild(clippingNode);

        var background = new cc.Sprite(res.circles_jpg);
        background.x = 50;
        background.y = 50;
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