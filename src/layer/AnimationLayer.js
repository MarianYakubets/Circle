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

        var clippingNode = new cc.ClippingNode();
        clippingNode.anchorX = 0.5;
        clippingNode.anchorY = 0.5;
        clippingNode.x = this.winSize.width / 2 - 50;
        clippingNode.y = this.winSize.height / 2 - 50;
        clippingNode.stencil = this.canvas;
        clippingNode.setInverted(true);
        this.addChild(clippingNode);

        var background = new cc.Sprite(res.micro_jpg);
        background.x = 50;
        background.y = 50;
        clippingNode.addChild(background);

        this.scheduleUpdate();

        cc.eventManager.addListener(touchHandler.clone(), canvas);
    },

    actionRotate: function () {
        return cc.rotateBy(1.0, 90.0).repeatForever();
    },

    actionScale: function () {
        var scale = cc.scaleBy(1.33, 1.5);
        return cc.sequence(scale, scale.reverse()).repeatForever();
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
        segment.setRadius(segment.getRadius() - .1);
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