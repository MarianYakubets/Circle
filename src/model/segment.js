var Segment = cc.Class.extend({
    angle: 0,
    start: 0,
    radius: 0,
    type:null,
    ctor: function (start, angle, radius,type) {
        this.start = start;
        this.angle = angle;
        this.radius = radius;
        this.type = type;
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

    getType: function () {
        return this.type;
    }

});
