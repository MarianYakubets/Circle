var CircleNode =  cc.ClippingNode.extend({
    mask:null,
    circle:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init:function(){
        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        this.setPosition(centerPos);
        this.setAnchorPoint(centerPos);
        this.setInverted(true);

        this.mask = new cc.DrawNode();
        this.stencil = this.mask;

        this.circle = new cc.Sprite(res.circles_jpg);
        this.addChild(this.circle);
    }

});
