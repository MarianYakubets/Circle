var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        var layer = new cc.LayerColor(cc.color(51, 204, 255, 128));

        layer.ignoreAnchor = false;
        layer.anchorX = 0.5;
        layer.anchorY = 0.5;
        layer.setContentSize(winSize.width ,  winSize.height);
        layer.x = centerPos.x;
        layer.y = centerPos.y;

        this.addChild(layer);
    }
});
