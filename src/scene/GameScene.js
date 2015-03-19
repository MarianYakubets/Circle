var GameScene = cc.Scene.extend({
    space:null,
    gameLayer:null,

    onEnter:function () {
        this._super();
        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.gameLayer.addChild(new AnimationLayer(), 1, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
    }
});
