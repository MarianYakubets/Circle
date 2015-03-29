var GameLayer = cc.Layer.extend({
    segments: [],
    mask: null,
    drawCircle: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        this.segments = (new StubLevel()).getSegments();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        var circle = new CircleNode();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        circle.setPosition(centerPos);
        circle.setAnchorPoint(centerPos);
        this.addChild(circle);
        this.mask = circle.mask;
        this.drawCircle = this.draw(this.mask);

        var visibleLines = new cc.DrawNode();
        visibleLines.setPosition(centerPos);
        this.drawLines(visibleLines, this.segments);
        this.addChild(visibleLines);

        var blink;
        for (var i = 0; i < this.segments.length; i++) {
            blink = new BlinkSegment(this.segments[i]);
            blink.setPosition(centerPos);
            blink.setAnchorPoint(centerPos);
            this.addChild(blink);
            cc.eventManager.addListener(listener.clone(), blink);

        }

        this.scheduleUpdate();
    },

    drawLines: function (canvas, segments) {
        for (var i = 0; i < segments.length; i++) {
            canvas.drawSegment(cc.p(0, 0), Utils.calculateCirclePoint(1000, segments[i].getAngle() + segments[i].getStart()), 3, cc.color(255, 255, 255));
        }
    },

    draw: function (canvas) {
        return function (segment) {
            canvas.drawPoly(Utils.getSegmentEdges(segment), segment.getType().color, -100, cc.color(255, 255, 255));
        };
    },

    update: function (dt) {
        this.mask.clear();
        Utils.doForEach(this.segments, [this.makeStep, this.drawCircle]);
    },

    makeStep: function (segment) {
        segment.setRadius(segment.getRadius() - segment.getSpeed());
        return segment;
    }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        target.blink();
        return true;
    },
    onTouchMoved: function (touch, event) {

    },

    onTouchEnded: function (touch, event) {

    }
});