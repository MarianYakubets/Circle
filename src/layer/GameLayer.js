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
        this.addChild(circle);
        this.mask = circle.mask;
        this.drawCircle = this.draw(this.mask);

        var visibleLines = new cc.DrawNode();
        visibleLines.setPosition(centerPos);
        this.drawLines(visibleLines, this.segments);
        this.addChild(visibleLines);

        this.scheduleUpdate();
        cc.eventManager.addListener(listener, this);
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
        this.mask.clear();
        Utils.doForEach(this.segments, [this.makeStep, this.drawCircle]);
    },

    makeStep: function (segment) {
        segment.setRadius(segment.getRadius() - segment.getSpeed());
        return segment;
    }
});

// Make sprite1 touchable
var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {
            cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
            target.opacity = 180;
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        target.x += delta.x;
        target.y += delta.y;
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        cc.log("sprite onTouchesEnded.. ");
        target.setOpacity(255);
    }
});