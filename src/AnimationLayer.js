var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var draw = new cc.DrawNode();
        this.addChild(draw, 10);
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        //drawCircle
        draw.drawCircle(cc.p(winSize.width / 2, winSize.height / 2), 50, cc.degreesToRadians(90), 50, false, 2, cc.color(0, 255, 255, 255));

    }
});
