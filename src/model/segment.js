var Segment = cc.Class.extend({
    angle: 0,
    start: 0,
    radius: 0,
    ctor: function (angle, start, radius) {
        this._super();
        this.angle = angle;
        this.start = startAngle;
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
        return this.angle;
    }

});
