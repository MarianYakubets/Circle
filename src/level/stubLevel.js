var StubLevel = Level.extend({
    getNumber: function () {
        return 1;
    },

    getSegments: function () {
        this.segments = [new Segment(0, 180, 120, .2, Type.BLUE),
            new Segment(180, 90, 100, .1, Type.RED),
            new Segment(270, 90, 150, .05, Type.GREEN)];
        return this.segments;
    }

});
