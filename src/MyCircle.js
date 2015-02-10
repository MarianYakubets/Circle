var MyCircle = cc.Node.extend({
    _isDrawLineToCenter : false,
    _lineWidth : 1,
    _fillColor : null,
    _lineColor : null,

    ctor:function(size){
        this._super();
        this.setContentSize(size);
        this._center = cc.p(size.width/2,size.height/2);
        this._radius = size.width/2;
        this._drawingUtil = cc._drawingUtil;
        this._fillColor = cc.color(0,255,0,255);    // alpha is not working
        this._lineColor = cc.color(255,0,0,255);
    },
    draw:function(ctx){

        this._super();
        this._drawingUtil.setDrawColor(this._lineColor.r,this._lineColor.g,this._lineColor.b,this._lineColor.a);

        //drawCircle: function (center, radius, angle, segments, drawLineToCenter)
        this._drawingUtil.setLineWidth(this._lineWidth);
        this._drawingUtil.drawCircle(this._center,this._radius, 0, 0,this._isDrawLineToCenter);
        var colorStr = "rgba(" + (0 | this._fillColor.r) + "," + (0 | this._fillColor.g) + "," + (0 | this._fillColor.b);
        ctx.fillStyle = colorStr + ",1)";
        ctx.fill();
    }});