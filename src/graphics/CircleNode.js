var CircleNode =  cc.ClippingNode.extend({
    mask:null,
    circle:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init:function(){
        this._super();
        this.setInverted(true);

        this.mask = new cc.DrawNode();
        this.stencil = this.mask;

        this.circle = new cc.Sprite(res.circles_jpg);
        this.addChild(this.circle);
    }
});
