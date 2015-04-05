var Segment = cc.Class.extend({
    angle: 0,
    start: 0,
    radius: 0,
    speed:0,
    type:null,

    ctor: function (start, angle, radius, speed,type) {
        this.start = start;
        this.angle = angle;
        this.radius = radius;
        this.type = type;
        this.speed = speed;
    },

    getAngle: function () {
        return this.angle;
    },

    getStart: function () {
        return this.start;
    },

    setRadius: function (radius) {
        this.radius = radius;
    },

    getRadius: function () {
        return this.radius;
    },

    getSpeed: function () {
        return this.speed;
    },

    getType: function () {
        return this.type;
    }

});
