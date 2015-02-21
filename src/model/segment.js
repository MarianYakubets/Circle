var Segment = cc.Class.extend({
    angle: 0,
    start: 0,
    radius: 0,
    ctor: function (start, angle, radius) {
        this.start = start;
        this.angle = angle;
        this.radius = radius;
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
    }

});
