var BlinkSegment = cc.Node.extend({
    white: cc.color(255, 255, 255, 100),
    segment: null,
    canvas: null,
    ctor: function (segment) {
        this._super();
        this.canvas = new cc.DrawNode();
        this.canvas.drawPoly(Utils.getEdges(segment, 1000), this.white, -100, this.white);
    },

    blink: function () {
        var add = cc.callFunc(this.callbackAdd, this);
        var remove = cc.callFunc(this.callbackRemove, this);
        this.runAction(cc.sequence(add, cc.delayTime(.1), remove));
    },

    callbackAdd: function () {
        this.addChild(this.canvas);
    },

    callbackRemove: function () {
        this.removeChild(this.canvas);
    }
});