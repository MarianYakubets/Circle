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
            var edges = [calculatePoint(5000, start)];
            edges.push(calculatePoint(10000, start + angle / 2));


            for (var i = 0; i <= angle; i++) {
                edges.push(calculatePoint(radius, i + start));
            }

            edges.push(calculatePoint(5000, start + angle));
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

var touchHandler = cc.EventListener.create({
    event: cc.EventListener.MOUSE,
    onTouch: function (event) {
        var target = event.getCurrentTarget();
        cc.log(event);
    }
});

