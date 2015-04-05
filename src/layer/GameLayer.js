var GameLayer = cc.Layer.extend({
    segments: [],
    blinks: [],
    mask: null,
    drawCircle: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        this.segments = (new StubLevel()).getSegments();

        var circle = new cc.DrawNode();
        circle.setPosition(Dim.center);
        circle.setAnchorPoint(Dim.center);
        this.addChild(circle);
        this.mask = circle;
        this.drawCircle = this.draw(circle);



        var visibleLines = new cc.DrawNode();
        visibleLines.setPosition(Dim.center);
        this.drawLines(visibleLines, this.segments);
        this.addChild(visibleLines);

        var blink;
        for (var i = 0; i < this.segments.length; i++) {
            blink = new Blink(this.segments[i]);
            blink.setPosition(Dim.center);
            blink.setAnchorPoint(Dim.center);
            this.addChild(blink);
            this.blinks.push(blink);
        }

        cc.eventManager.addListener(listener.clone(), this);
        this.scheduleUpdate();
    },

    drawLines: function (canvas, segments) {
        for (var i = 0; i < segments.length; i++) {
            canvas.drawSegment(Utils.calculateCirclePoint(50, segments[i].getAngle() + segments[i].getStart()),
                Utils.calculateCirclePoint(1000, segments[i].getAngle() + segments[i].getStart()), 1, cc.color(255, 255, 255));
        }
    },

    draw: function (canvas) {
        return function (segment) {
            canvas.drawPoly(Utils.getSegmentEdges(segment), segment.getType().color, -100, cc.color(255, 255, 255));
        };
    },

    update: function (dt) {
        this.mask.clear();
        this.segments.forEach(this.makeStep);
        this.segments.forEach(this.drawCircle);
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

        var p = touch.getLocation();
        var delx = p.x - Dim.center.x;
        var dely = p.y - Dim.center.y;
        var rad = Math.atan2(delx, dely);
        var deg = rad * (180 / Math.PI);
        deg -= 90;
        if (deg < 0)
            deg += 360;


        for (var i = 0; i < target.segments.length; i++) {
            var segment = target.segments[i];
            if (segment.getStart() < deg &&
                (deg - segment.getStart()) < segment.getAngle()) {
                target.blinks[i].blink();

                segment.setRadius(segment.getRadius()+5);
                break;
            }
        }

        return true;
    },

    onTouchMoved: function (touch, event) {

    },

    onTouchEnded: function (touch, event) {

    }
});