var StubLevel = Level.extend({
    getNumber: function () {
        return 1;
    },

    getSegments: function () {
        this.segments = [new Segment(0,180,270,Type.BLUE),
            new Segment(180,90,300,Type.RED),
            new Segment(270,90,150,Type.GREEN)];
        return this.segments;
    }

});
