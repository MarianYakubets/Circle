var TAG_STENCILNODE = 100;
var TAG_CLIPPERNODE = 101;

var BaseClippingNodeTest = BaseTestLayer.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));
        this.setup();
    }
});

var BasicTest = BaseClippingNodeTest.extend({
    title:function () {
        return "Basic Test";
    },

    subtitle:function () {
        return "";
    },

    setup:function () {
        var winSize = cc.director.getWinSize();

        var stencil = this.stencil();
        stencil.tag = TAG_STENCILNODE;
        stencil.x = 50;
        stencil.y = 50;

        var clipper = this.clipper();
        clipper.tag = TAG_CLIPPERNODE;
        clipper.anchorX = 0.5;
        clipper.anchorY = 0.5;
        clipper.x = winSize.width / 2 - 50;
        clipper.y = winSize.height / 2 - 50;
        clipper.stencil = stencil;
        this.addChild(clipper);

        var content = this.content();
        content.x = 50;
        content.y = 50;
        clipper.addChild(content);
    },

    actionRotate:function () {
        return cc.rotateBy(1.0, 90.0).repeatForever();
    },

    actionScale:function () {
        var scale = cc.scaleBy(1.33, 1.5);
        return cc.sequence(scale, scale.reverse()).repeatForever();
    },

    shape:function () {
        var shape = new cc.DrawNode();
        var triangle = [cc.p(-100, -100),cc.p(100, -100), cc.p(0, 100)];

        var green = cc.color(0, 255, 0, 255);
        shape.drawPoly(triangle, green, 3, green);
        return shape;
    },

    grossini:function () {
        var grossini = new cc.Sprite(s_pathGrossini);
        grossini.scale = 1.5;
        return grossini;
    },

    stencil:function () {
        return null;
    },

    clipper:function () {
        return new cc.ClippingNode();
    },

    content:function () {
        return null;
    }
});

var ShapeTest = BasicTest.extend({
    stencil:function () {
        var node = this.shape();
        node.runAction(this.actionRotate());
        return node;
    },

    content:function () {
        var node = this.grossini();
        node.runAction(this.actionScale());
        return node;
    }
});

var ClippingNodeTestScene = TestScene.extend({
    runThisTest:function (num) {
        cc.director.runScene(this);
        this.addChild(new ShapeTest());
    }
});