var AnimationLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        var draw = new cc.DrawNode();
        //this.addChild(draw, 10);
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        //drawDot
       /* draw.drawDot(cc.p(winSize.width / 2, winSize.height / 2), 40, cc.color(0, 0, 255, 128));
        var points = [cc.p(60, 60), cc.p(70, 70), cc.p(60, 70), cc.p(70, 60)];
        for (var i = 0; i < points.length; i++) {
            draw.drawDot(points[i], 4, cc.color(0, 255, 255, 255));
        }*/
        //drawCircle
        draw.drawCircle(cc.p(winSize.width / 2, winSize.height / 2), 100, 0, 100, false, 90, cc.color(0, 255, 0, 255));
        //fill
        draw.drawRect(cc.p(120, 220), cc.p(200, 300), cc.color(0, 255, 255, 50), 2, cc.color(128, 128, 0, 255));
        var circle = new MyCircle(cc.size(200,200));
        circle.setPosition(centerPos);
        this.addChild(circle, 10);

    }
});
