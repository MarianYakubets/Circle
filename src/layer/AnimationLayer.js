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

        cc.eventManager.addListener(touchHandler.clone(), canvas);
    },

    draw: function (canvas) {
        function getEdges(segment) {

            var radius = segment.getRadius();
            var start = segment.getStart();
            var angle = segment.getAngle();
            var max = this.winSize.width;

            var edges = [cc.p(max * Math.cos(((start) * Math.PI) / 180),
                -max * Math.sin(((start) * Math.PI) / 180))];

            for (var i = 0; i <= angle; i++) {
                edges.push(cc.p(radius * Math.cos(((i + start) * Math.PI) / 180),
                    -radius * Math.sin(((i + start) * Math.PI) / 180)));
            }

            edges.push(cc.p(max * Math.cos(((start + angle - 1) * Math.PI) / 180),
                -max * Math.sin(((start + angle - 1) * Math.PI) / 180)));

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
        segment.setRadius(segment.getRadius() - 1);
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

