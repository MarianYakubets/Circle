var BlinkSegment = cc.DrawNode.extend({
    white: cc.color(255, 255, 255),
    transparent: cc.color(255, 255, 255, 0),
    segment: null,
    ctor: function (segment) {
        this.segment = segment;
        this._super();
        this.drawPoly(Utils.getEdges(segment, 1000), this.white, -100, this.white);
    },

    blink: function () {
        var delay = cc.delayTime(2.0);
        var setTransparent = this.setPositionZ(-1000);
        this.runAction(cc.sequence(delay, this.clear(), setTransparent));
    }
});