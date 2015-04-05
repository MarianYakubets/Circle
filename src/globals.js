if (typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.Status = 2;
}
var Dim = {
    width: 0,
    height: 0,
    center: null,
    fillGlobals: function () {
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        this.width = winSize.width;
        this.height = winSize.height;
        this.center = centerPos;
    }
}

