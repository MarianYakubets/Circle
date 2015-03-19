var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        var layer = new cc.LayerColor(cc.color(91, 204, 255, 128));

        layer.ignoreAnchor = false;
        layer.anchorX = 0.5;
        layer.anchorY = 0.5;
        //layer.setContentSize(winSize.width ,  winSize.height);
        layer.x = centerPos.x;
        layer.y = centerPos.y;

        this.addChild(layer);
    },

    actionRotate: function () {
        return cc.rotateBy(1.0, 90.0).repeatForever();
    },

    actionScale: function () {
        var scale = cc.scaleBy(1.33, 1.5);
        return cc.sequence(scale, scale.reverse()).repeatForever();
    }
});
