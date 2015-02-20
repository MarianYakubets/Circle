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
        draw.setPosition(centerPos)
        var edges = [centerPos];
        var topR = 160;
        var startAngle = 0;
        for (var i = 0; i < 200; i++) {
            edges.push(cc.p(topR * Math.cos(((i + startAngle) * Math.PI) / 180),
                - topR * Math.sin(((i + startAngle) * Math.PI) / 180)));
        }
        edges.push(centerPos);
        draw.drawPoly(edges,cc.color(0,0,255,255),3,cc.color(0,0,255,255));
        var edges2 = [centerPos];
        var topR = 140;
        var startAngle = 201;
        for (var i = 0; i < 159; i++) {
            edges2.push(cc.p(topR * Math.cos(((i + startAngle) * Math.PI) / 180),
                - topR * Math.sin(((i + startAngle) * Math.PI) / 180)));
        }
        edges2.push(centerPos);
        draw.drawPoly(edges2,cc.color(0,100,255,100),3,cc.color(0,255,0,255));

    }
});
