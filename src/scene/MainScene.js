/**
 * Created by yam on 2/10/2015.
 */
var MainScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        cc.director.runScene(new GameScene());
    }
});
