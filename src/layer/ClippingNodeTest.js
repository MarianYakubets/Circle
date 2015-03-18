var BasicTest = cc.Layer.extend({
    ctor:function() {
        this._super();
        this.setup();
    },

    setup:function () {
        var winSize = cc.director.getWinSize();
        var mask = this.mask();
        mask.runAction(this.actionRotate());
        mask.x = 50;
        mask.y = 50;

        var clippingNode = new cc.ClippingNode();
        clippingNode.anchorX = 0.5;
        clippingNode.anchorY = 0.5;
        clippingNode.x = winSize.width / 2 - 50;
        clippingNode.y = winSize.height / 2 - 50;
        clippingNode.stencil = mask;
        this.addChild(clippingNode);

        var background = new cc.Sprite(res.HelloWorld_png);
        background.runAction(this.actionScale());
        background.x = 50;
        background.y = 50;
        clippingNode.addChild(background);
    },

    actionRotate:function () {
        return cc.rotateBy(1.0, 90.0).repeatForever();
    },

    actionScale:function () {
        var scale = cc.scaleBy(1.33, 1.5);
        return cc.sequence(scale, scale.reverse()).repeatForever();
    },

    mask:function () {
        var maskShape = new cc.DrawNode();
        var triangle = [cc.p(-100, -100),cc.p(100, -100), cc.p(0, 100)];

        var green = cc.color(0, 255, 0, 255);
        maskShape.drawPoly(triangle, green, 3, green);
        return maskShape;
    }
});

var ClippingNodeTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new BasicTest());
    }
});