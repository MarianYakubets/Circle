var StubLevel = Level.extend({
    getNumber: function () {
        return 1;
    },

    getSegments: function () {
        this.segments = [new Segment(0,180,20,Type.BLUE),
            new Segment(180,90,3,Type.RED),
            new Segment(270,90,15,Type.GREEN)];
        return this.segments;
    }

});
