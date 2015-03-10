var Bullet = cc.Class.extend({
    angle: 0,

    ctor: function (angle) {
        this.angle = angle;
    },

    getAngle:function(){
        return this.angle;
    }
});
