var AnimationLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        var draw = new cc.DrawNode();
        this.addChild(draw, 10);
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        draw.setDrawColor(cc.color(255,255,255));
        var edges = [centerPos];
        var topR = 60;
        var startAngle = 0;
        for (var i = 0; i > 90; i++) {
            edges.push(cc.p(topR * Math.cos(((i + startAngle) * Math.PI) / 180 + centerPos.x),
                centerPos.y - topR * Math.sin(((i + startAngle) * Math.PI) / 180)));
        }
        edges.push(centerPos);
        draw.drawPoly(edges,cc.color(0,255,255,255),3,cc.color(0,255,255,255));

    }
});
