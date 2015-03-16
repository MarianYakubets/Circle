var TAG_TITLELABEL = 1;
var TAG_SUBTITLELABEL = 2;
var TAG_STENCILNODE = 100;
var TAG_CLIPPERNODE = 101;
var TAG_CONTENTNODE = 102;

var clippingNodeTestSceneIdx = -1;

var BaseClippingNodeTest = BaseTestLayer.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));
        this.setup();
    },

    onRestartCallback:function (sender) {
        var s = new ClippingNodeTestScene();
        s.addChild(restartClippingNodeTest());
        director.runScene(s);
    },
    onNextCallback:function (sender) {
        var s = new ClippingNodeTestScene();
        s.addChild(nextClippingNodeTest());
        director.runScene(s);
    },
    onBackCallback:function (sender) {
        var s = new ClippingNodeTestScene();
        s.addChild(previousClippingNodeTest());
        director.runScene(s);
    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfClippingNodeTest.length-1) - clippingNodeTestSceneIdx );
    },

    getTestNumber:function() {
        return clippingNodeTestSceneIdx;
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
        //content.x = 400;
        //content.y = 225;
        //this.addChild(content);
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
    title:function () {
        return "Shape Basic Test";
    },

    subtitle:function () {
        return "A DrawNode as stencil and Sprite as content";
    },

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

var _stencilBits = -1;
var _alphaThreshold = 0.05;
var _PLANE_COUNT = 8;

var _planeColor = [
    cc.color(0, 0, 0, 166),
    cc.color(179, 0, 0, 153),
    cc.color(0, 179, 0, 140),
    cc.color(0, 0, 179, 128),
    cc.color(179, 179, 0, 115),
    cc.color(0, 179, 179, 102),
    cc.color(179, 0, 179, 89),
    cc.color(179, 179, 179, 77)
];

var arrayOfClippingNodeTest = [
    ShapeTest];


if (!cc.sys.isNative && ("opengl" in cc.sys.capabilities)) {
    arrayOfClippingNodeTest.push(
        //TODO re-open them later.
        /*    RawStencilBufferTest,
         RawStencilBufferTest2,
         RawStencilBufferTest3,
         RawStencilBufferTest4,
         RawStencilBufferTest5,
         RawStencilBufferTest6*/
    );
}

var nextClippingNodeTest = function () {
    clippingNodeTestSceneIdx++;
    clippingNodeTestSceneIdx = clippingNodeTestSceneIdx % arrayOfClippingNodeTest.length;

    if(window.sideIndexBar){
        clippingNodeTestSceneIdx = window.sideIndexBar.changeTest(clippingNodeTestSceneIdx, 5);
    }

    return new arrayOfClippingNodeTest[clippingNodeTestSceneIdx]();
};

var previousClippingNodeTest = function () {
    clippingNodeTestSceneIdx--;
    if (clippingNodeTestSceneIdx < 0)
        clippingNodeTestSceneIdx += arrayOfClippingNodeTest.length;

    if(window.sideIndexBar){
        clippingNodeTestSceneIdx = window.sideIndexBar.changeTest(clippingNodeTestSceneIdx, 5);
    }

    return new arrayOfClippingNodeTest[clippingNodeTestSceneIdx]();
};

var restartClippingNodeTest = function () {
    return new arrayOfClippingNodeTest[clippingNodeTestSceneIdx]();
};

var ClippingNodeTestScene = TestScene.extend({
    runThisTest:function (num) {
        clippingNodeTestSceneIdx = (num || num == 0) ? (num - 1) : -1;
        cc.director.runScene(this);
	    var layer = nextClippingNodeTest();
	    this.addChild(layer);
    }
});