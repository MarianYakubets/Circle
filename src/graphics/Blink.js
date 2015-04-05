var Blink = cc.Node.extend({
    whiteWithAlpha: cc.color(255, 255, 255, 100),
    canvas: null,

    ctor: function (segment) {
        this._super();
        this.canvas = new cc.DrawNode();
        this.canvas.drawPoly(Utils.getEdges(segment, Dim.width / 2), this.whiteWithAlpha, -100, this.whiteWithAlpha);
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